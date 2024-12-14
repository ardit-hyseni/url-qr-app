import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma.service';

@Injectable()
export class UrlRepository {
    constructor(private prismaService: PrismaService) { }

    async fetchAllUrls(): Promise<any> {
        return await this.prismaService.url.findMany({});
    }
}