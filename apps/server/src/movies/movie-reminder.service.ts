import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MovieService } from './movies.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class MovieReminderService {
  constructor(
    private readonly movieService: MovieService,
    private readonly emailService: EmailService
  ) {}

  @Cron('0 8 * * *')
  async handleReminders() {
    const today = new Date().toISOString().split('T')[0];

    const movies = await this.movieService.findReleasesByDate(today);

    for (const movie of movies) {
      if (!movie.user?.email) continue;

      const html = `
        <h1>${movie.title} estreia hoje! 🎬</h1>
        <p>Não perca a estreia do filme <strong>${movie.title}</strong>.</p>
      `;

      await this.emailService.send(
        movie.user.email,
        `🎬 Estreia hoje: ${movie.title}`,
        html
      );

    }
  }
}
