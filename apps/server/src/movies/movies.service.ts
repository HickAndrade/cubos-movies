import { Injectable, NotFoundException, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Movie } from "./movies.entity";
import { Repository } from "typeorm";
import { CreateMovieDTO } from "./dto/CreateMovieDTO";
import { UpdateMovieDTO } from "./dto/UpdateMovieDTO";
import { FilterMovieDTO } from "./dto/FilterMovieDTO";
import { S3Service } from "src/storage/s3.service";

@Injectable()
export class MovieService {
    constructor(
        @InjectRepository(Movie) private readonly movieRepo: Repository<Movie>,
        private readonly s3: S3Service
    ){}

    
    async create(data: CreateMovieDTO, file?: Express.Multer.File): Promise<Movie> {
        const { popularity = 0, voteCount = 0 } = data
      
        const rawAverage = voteCount > 0 ? (Number(popularity) / voteCount) * 100 : 0;
        const voteAverage = parseFloat(Math.min(rawAverage, 100).toFixed(2));


        const movie = this.movieRepo.create({
          ...data,
          voteAverage,
        })
        
        if (file) {
            const url = await this.s3.uploadFile(file.buffer, file.originalname, file.mimetype)
            movie.coverImageUrl = url
        }
      
        return this.movieRepo.save(movie)
      }
      

    async findAll(filter: FilterMovieDTO): Promise<{data: Movie[], total: number, page: number, lastPage: number}> {

        const {
            search, 
            startDate, endDate,
            minDuration, maxDuration,
            language, genres,
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

        if (startDate) {
            query.andWhere('movie.releaseDate >= :startDate', { startDate })
        }
        if (endDate) {
            query.andWhere('movie.releaseDate <= :endDate', { endDate })
        }
        if (minDuration) {
            query.andWhere('movie.duration >= :minDuration', { minDuration })
        }
        if (maxDuration) {
            query.andWhere('movie.duration <= :maxDuration', { maxDuration })
        }
        if (language) {
            query.andWhere('LOWER(movie.language) = LOWER(:language)', { language })
        }
        
        if (genres && genres.length) {
            query.andWhere("movie.genres && :genres", { genres });
        }

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
    
        if (data.popularity != null) movie.popularity = Number(data.popularity);
        if (data.voteCount != null) movie.voteCount = data.voteCount;
        if (data.genres) movie.genres = data.genres;
    
        Object.assign(movie, {
          ...data,
          voteAverage:
            data.voteCount != null || data.popularity != null
              ? parseFloat(
                  Math.min(
                    ((movie.popularity || 0) / (movie.voteCount || 1)) * 100,
                    100,
                  ).toFixed(2),
                )
              : movie.voteAverage,
        });
    
        return this.movieRepo.save(movie);
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
    async findGenres(): Promise<string[]> {
        const rows = await this.movieRepo
          .createQueryBuilder('movie')
          .select('UNNEST(movie.genres)', 'genre')
          .distinct(true)
          .orderBy('genre', 'ASC')
          .getRawMany<{ genre: string }>();
    
        return rows.map(r => r.genre);
      }
    
}