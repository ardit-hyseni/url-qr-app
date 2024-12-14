import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateUrlDto {
    @IsString()
    @IsUrl()
    originalUrl: string;

    @IsNumber()
    @IsOptional()
    expirationMinutes?: number;
}