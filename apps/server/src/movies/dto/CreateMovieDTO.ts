import {
  IsString,
  IsOptional,
  IsDateString,
  IsInt,
  IsArray,
  IsNumber,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateMovieDTO {
  @IsString()
  title: string;

  @IsString()
  originalTitle: string;

  @IsString()
  @MaxLength(1000)
  description: string;

  @IsString()
  @IsOptional()
  tagline?: string;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @IsOptional()
  popularity?: number;

  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @IsOptional()
  voteCount?: number;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @IsOptional()
  voteAverage?: number;

  @IsDateString()
  releaseDate: string;

  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  duration: number;

  @IsString()
  status: string;

  @IsString()
  language: string;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  budget: number;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  revenue: number;

  @Transform(({ value }) => {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  })
  @IsArray()
  @IsString({ each: true })
  genres: string[];

  @IsUrl()
  @IsOptional()
  coverImageUrl?: string;

  @IsUrl()
  @IsOptional()
  trailerUrl?: string;
}
