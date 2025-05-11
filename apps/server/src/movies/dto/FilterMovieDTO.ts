import { Type } from "class-transformer";
import { IsArray, IsDateString, IsInt, IsOptional, IsString, Min } from "class-validator";

export class FilterMovieDTO {

    @IsOptional()
    @IsString()
    search?: string

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page: number = 1
    
    @Type(() => Number)
    @IsInt()
    limit: number = 10
    
    @IsOptional()
    @IsDateString()
    startDate?: string

    @IsOptional()
    @IsDateString()
    endDate?: string

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    minDuration?: number

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    maxDuration?: number

    @IsOptional()
    @IsString()
    language?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    genres?:string[];

}