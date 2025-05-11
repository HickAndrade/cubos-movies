import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movies.entity';
import { MovieService } from './movies.service';
import { MovieController } from './movies.controller';
import { StorageModule } from 'src/storage/storage.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Movie]),
        StorageModule
],
    providers: [MovieService],
    controllers: [MovieController],
    exports: [MovieService]
})

export class MoviesModule {}
