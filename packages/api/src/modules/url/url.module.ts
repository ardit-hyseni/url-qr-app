import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { UrlRepository } from './url.repository';

@Module({
    controllers: [UrlController],
    providers: [UrlService, UrlRepository, PrismaService],
})
export class UrlModule { }