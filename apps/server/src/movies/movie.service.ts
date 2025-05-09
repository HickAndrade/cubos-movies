import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Movie } from "./movie.entity";
import { Repository } from "typeorm";
import { CreateMovieDTO } from "./dto/CreateMovieDTO";
import { UpdateMovieDTO } from "./dto/UpdateMovieDTO";
import { FilterMovieDTO } from "./dto/FilterMovieDTO";

@Injectable()
export class MovieService {
    constructor(@InjectRepository(Movie) private readonly movieRepo: Repository<Movie> ){}

    create(data: CreateMovieDTO): Promise<Movie> {
        const movie = this.movieRepo.create(data)
        return this.movieRepo.save(movie)
    }

    async findAll(filter: FilterMovieDTO): Promise<{data: Movie[], total: number, page: number, lastPage: number}> {

        const {
            search, 
            startDate, endDate,
            minDuration, maxDuration,
            language,
            limit = 10,
            page =1
         } = filter;

        const skip = (page - 1) * limit;

        const query = this.movieRepo.createQueryBuilder('movie')

        if(search){
            query.where('LOWER(movie.title) LIKE LOWER(:search)', {
                search: `%${search}%`
            })
        }

        if (startDate) query.andWhere('movie.releaseDate >= :startDate', { startDate })
        if (endDate) query.andWhere('movie.releaseDate <= :endDate', { endDate })
        if (minDuration) query.andWhere('movie.duration >= :minDuration', { minDuration })
        if (maxDuration) query.andWhere('movie.duration <= :maxDuration', { maxDuration })
        if (language) query.andWhere('LOWER(movie.language) = LOWER(:language)', { language })
        
        const [data, total] = await query.skip(skip).take(limit).getManyAndCount();


        return { data, total, page, lastPage: Math.ceil( total / limit) }
    }

    
    async findOne(id: number): Promise<Movie> {
        const movie = await this.movieRepo.findOne({ where: { id } })
        
        if (!movie) throw new NotFoundException('Filme não encontrado')
        
        return movie;
    }

    async update(id: number, data: UpdateMovieDTO): Promise<Movie> {
        const movie = await this.findOne(id);
        const updated = Object.assign(movie, data);
        return this.movieRepo.save(updated)
    }

    async delete(id: number): Promise<void> {
        const movie = await this.findOne(id);

        await this.movieRepo.remove(movie);
    }

    async findLanguages(): Promise<string[]> {
        const results = await this.movieRepo
        .createQueryBuilder('movie').select('DISTINCT movie.language','language')
        .orderBy('language', 'ASC').getRawMany();

        return results.map((row) => row.language)
    }
}