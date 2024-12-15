import { UrlFormRequest } from '@url-program/common/dist/types';
import { IsNumber, IsOptional, IsString, Matches } from 'class-validator';

export class CreateUrlDto implements UrlFormRequest {
    @IsString()
    @Matches(/^(https?:\/\/)[^\s$.?#].[^\s]*$/, {
        message: 'The URL must start with http:// or https://',
    })
    originalUrl: string;

    @IsNumber()
    @IsOptional()
    expirationMinutes?: number;
}
