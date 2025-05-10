import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { MovieService } from "./movies.service";
import { CreateMovieDTO } from "./dto/CreateMovieDTO";
import { Movie } from "./movies.entity";
import { UpdateMovieDTO } from "./dto/UpdateMovieDTO";
import { FilterMovieDTO } from "./dto/FilterMovieDTO";

@UseGuards(AuthGuard('jwt'))
@Controller('movies')
export class MovieController {
    constructor(private readonly movieService: MovieService) {}

    @Post()
    create(@Body() data: CreateMovieDTO): Promise<Movie> {
        return this.movieService.create(data)
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

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Movie> {
        return this.movieService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, data: UpdateMovieDTO): Promise<Movie> {
        return this.movieService.update(id, data);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.movieService.delete(id);
    }

}