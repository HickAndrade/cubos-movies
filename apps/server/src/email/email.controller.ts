import { Body, Controller, Post } from "@nestjs/common";
import { EmailService } from "./email.service";

@Controller('email-test')
export class EmailTestController {
    constructor(private readonly emailService: EmailService) {}

    @Post()
  async testEmail(@Body() body: { to: string }) {
    const html = `
      <h1>🎬 Teste de envio de e-mail com Resend</h1>
      <p>Este é um e-mail de teste enviado via <strong>Resend</strong>.</p>
    `;

    const result = await this.emailService.send(
      body.to,
      '📨 Teste de envio - Cubos Movies',
      html
    );

    return {
      message: 'E-mail enviado (ou tentativa feita)',
      resultado: result,
    };
  }
}