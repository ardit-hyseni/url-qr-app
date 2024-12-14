import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/url.dto';
import { UrlObject } from '@url-program/common/dist/types';

// http:localhost:3001/v1/url
@UsePipes(new ValidationPipe())
@Controller('v1/url')
export class UrlController {
    constructor(private readonly urlService: UrlService) { }
    @Get()
    async fetchAllUrls(): Promise<any> {
        return await this.urlService.fetchAllUrls();
    }

    @Post()
    async createUrl(@Body() request: CreateUrlDto): Promise<UrlObject> {
        return await this.urlService.createUrl(request);
    }

    @Patch(':id/click')
    async incrementClickCount(@Param('id', ParseIntPipe) id: number): Promise<UrlObject> {
        return await this.urlService.incrementClickCount(id);
    }

    @Delete(':id')
    async deleteUrl(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return await this.urlService.deleteUrl(id);
    }
}