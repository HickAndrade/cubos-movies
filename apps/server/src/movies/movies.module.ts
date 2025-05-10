import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movies.entity';
import { MovieService } from './movies.service';
import { MovieController } from './movies.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Movie])],
    providers: [MovieService],
    controllers: [MovieController],
    exports: [MovieService]
})

export class MoviesModule {}
