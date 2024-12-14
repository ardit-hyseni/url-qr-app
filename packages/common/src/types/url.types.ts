export type UrlObject = {
    id: number;
    originalUrl: string;
    shortUrl: string;
    qrCode: string;
    expiration?: Date | string;
    clickCount: number;
    createdAt: Date;
    updatedAt: Date;
};