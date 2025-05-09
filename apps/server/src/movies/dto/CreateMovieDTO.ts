import {
    IsString,
    IsOptional,
    IsDateString,
    IsInt,
    IsArray,
    IsNumber,
    IsUrl,
    MaxLength
  } from 'class-validator'
  
  export class CreateMovieDTO {
    @IsString()
    title: string
  
    @IsString()
    originalTitle: string
  
    @IsString()
    @MaxLength(1000)
    description: string
  
    @IsString()
    @IsOptional()
    tagline?: string
  
    @IsNumber()
    @IsOptional()
    popularity?: number
  
    @IsInt()
    @IsOptional()
    voteCount?: number
  
    @IsNumber()
    @IsOptional()
    voteAverage?: number
  
    @IsDateString()
    releaseDate: string
  
    @IsInt()
    duration: number
  
    @IsString()
    status: string
  
    @IsString()
    language: string
  
    @IsNumber()
    budget: number
  
    @IsNumber()
    revenue: number
  
    @IsArray()
    @IsString({ each: true })
    genres: string[]
  
    @IsUrl()
    @IsOptional()
    coverImageUrl?: string
  
    @IsUrl()
    @IsOptional()
    trailerUrl?: string
  }
  