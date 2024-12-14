import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma.service';
import { CreateUrlRequest, UrlObject } from '@url-program/common/dist/types';

@Injectable()
export class UrlRepository {
    constructor(private prismaService: PrismaService) { }

    async fetchAllUrls(): Promise<any> {
        return await this.prismaService.url.findMany({});
    }

    async createUrl(fullRequest: CreateUrlRequest): Promise<UrlObject> {
        return await this.prismaService.url.create({ data: fullRequest });
    }

    async incrementClickCount(id: number): Promise<UrlObject> {
        return await this.prismaService.url.update({ where: { id }, data: { clickCount: { increment: 1 } } });
    }

    async deleteUrl(id: number): Promise<void> {
        await this.prismaService.url.delete({ where: { id } });
    }

    async deleteExpiredUrls(): Promise<void> {
        const now = new Date();
        await this.prismaService.url.deleteMany({ where: { expiration: { lte: now } } });
    }
}