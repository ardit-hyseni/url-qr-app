import { Controller, Get } from '@nestjs/common';
import { UrlService } from './url.service';

// http:localhost:3001/v1/url
@Controller('v1/url')
export class UrlController {
    constructor (private readonly urlService: UrlService) {}
    @Get()
    fetchAllUrls(): any {
        return this.urlService.fetchAllUrls();
    }
}