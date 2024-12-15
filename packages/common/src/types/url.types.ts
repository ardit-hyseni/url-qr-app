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

export type CreateUrlRequest = {
    originalUrl: string;
    shortUrl: string;
    qrCode: string;
    expiration?: Date | string;
}

export type UrlFormRequest = {
    originalUrl: string;
    expirationMinutes?: number;
}