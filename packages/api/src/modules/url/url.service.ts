import { Injectable, Logger } from '@nestjs/common';
import { UrlRepository } from './url.repository';
import { CreateUrlDto } from './dto/url.dto';
import QRCode from 'qrcode';
import crypto from 'crypto';
import { CreateUrlRequest, UrlObject } from '@url-program/common/dist/types';
import { Cron, CronExpression } from '@nestjs/schedule';

const URL_POSTFIX_LENGTH = 10;
const ZERO = 0;
const URL_PREFIX = 'https://short.link/';
const MINUTES_TO_MILLISECONDS = 60000;
const WEEK_IN_MILLISECONDS = 604800000;

@Injectable()
export class UrlService {
    constructor(private urlRepository: UrlRepository) { }
    private readonly logger = new Logger('UrlService');

    async fetchAllUrls(): Promise<any> {
        return await this.urlRepository.fetchAllUrls();
    }

    async createUrl(request: CreateUrlDto): Promise<UrlObject> {
        const now = new Date();
        const qrCode = await this.generateQrCode(request.originalUrl);
        const shortenedUrl = this.shortenUrl(request.originalUrl);

        // if expirationMinutes is not provided, set expiration to a week from now
        const expirationDate = request.expirationMinutes ?
            new Date(now.getTime() + request.expirationMinutes * MINUTES_TO_MILLISECONDS) :
            new Date(now.getTime() + WEEK_IN_MILLISECONDS);

        const fullRequest: CreateUrlRequest = {
            originalUrl: request.originalUrl,
            shortUrl: shortenedUrl,
            expiration: expirationDate,
            qrCode,
        };
        // console.log('Generated URL:', fullRequest);

        // Send data to repository
        return await this.urlRepository.createUrl(fullRequest);
    }

    async incrementClickCount(id: number): Promise<UrlObject> {
        return await this.urlRepository.incrementClickCount(id);
    }

    async deleteUrl(id: number): Promise<void> {
        return await this.urlRepository.deleteUrl(id);
    }

    @Cron(CronExpression.EVERY_MINUTE)
    async deleteExpiredUrls(): Promise<void> {
        this.logger.log('Deleting expired URLs...');
        await this.urlRepository.deleteExpiredUrls();
    }

    private async generateQrCode(url: string): Promise<string> {
        return await QRCode.toDataURL(url);
    }

    private shortenUrl(originalUrl: string): string {
        // Create a hash of the original URL
        const hash = crypto.createHash('sha256').update(originalUrl).digest('hex');
        // Truncate the hash to the desired length
        const shortId = hash.slice(ZERO, URL_POSTFIX_LENGTH);
        return `${URL_PREFIX}${shortId}`;
    }
}
