import { Injectable } from '@nestjs/common';
import { UrlRepository } from './url.repository';

@Injectable()
export class UrlService {
    constructor(private urlRepository: UrlRepository) { }

    async fetchAllUrls(): Promise<any> {
        return await this.urlRepository.fetchAllUrls();
    }
}