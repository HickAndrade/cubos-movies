import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movies.entity';
import { MovieService } from './movies.service';
import { MovieController } from './movies.controller';
import { StorageModule } from 'src/storage/storage.module';
import { EmailModule } from 'src/email/email.module';
import { MovieReminderService } from './movie-reminder.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Movie]),
        StorageModule,
        EmailModule
],
    providers: [MovieService, MovieReminderService],
    controllers: [MovieController],
    exports: [MovieService]
})

export class MoviesModule {}
