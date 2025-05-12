import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { MovieService } from "./movies.service";
import { CreateMovieDTO } from "./dto/CreateMovieDTO";
import { Movie } from "./movies.entity";
import { UpdateMovieDTO } from "./dto/UpdateMovieDTO";
import { FilterMovieDTO } from "./dto/FilterMovieDTO";
import { FileInterceptor } from "@nestjs/platform-express";
import { memoryStorage } from 'multer'
import { CurrentUserId } from "src/auth/decorators/current-user.decorator";


@UseGuards(AuthGuard('jwt'))
@Controller('movies')
export class MovieController {
    constructor(
        private readonly movieService: MovieService
    ) {}

    @Post()
    @UseInterceptors(FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024 },
    }))
    create(
      @CurrentUserId() userId: number,
      @Body() data: CreateMovieDTO,
      @UploadedFile() file: Express.Multer.File,
    ): Promise<Movie> {
    
        return this.movieService.create(userId, data, file)
    }

    @Get()
    findAll(@Query() query: FilterMovieDTO): Promise<{
      data: Movie[]
      total: number
      page: number
      lastPage: number
    }> {
      return this.movieService.findAll(query)
    }
    @Get('languages')
    findLanguages(): Promise<string[]> {
        return this.movieService.findLanguages()
    }
    @Get('genres')
    findGenres(): Promise<string[]> {
        return this.movieService.findGenres()
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Movie> {
        return this.movieService.findOne(id);
    }

    @Patch(':id')
    @UseInterceptors(FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024 } }))
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() data: UpdateMovieDTO, @UploadedFile() file?: Express.Multer.File): Promise<Movie> {
      return this.movieService.update(id, data, file);
    }
    

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.movieService.delete(id);
    }
    

}