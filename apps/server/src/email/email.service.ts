import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private resend: Resend;
  private from: string;
  private readonly logger = new Logger(EmailService.name);

  constructor(private config: ConfigService) {
    this.resend = new Resend(this.config.getOrThrow('RESEND_API_KEY'));
    this.from = this.config.getOrThrow('FROM_EMAIL');
  }

  async send(to: string, subject: string, html: string) {
    this.logger.log(`📤 Enviando e-mail para ${to}`);
    this.logger.debug(`Assunto: ${subject}`);
    this.logger.debug(`De: ${this.from}`);

    try {
      const result = await this.resend.emails.send({
        from: this.from,
        to,
        subject,
        html,
      });

      if (result.error) {
        this.logger.error(`❌ Erro do Resend: ${JSON.stringify(result.error)}`);
      } else {
        this.logger.log(`✅ E-mail enviado com sucesso para ${to}`);
        this.logger.debug(`Resposta Resend: ${JSON.stringify(result)}`);
      }

      return result;
    } catch (error) {
      this.logger.error('❌ Erro ao tentar enviar e-mail:', error);
      throw error;
    }
  }
}
