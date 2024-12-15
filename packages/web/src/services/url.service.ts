import { UrlObject } from '@url-program/common/dist/types';

const apiUrl = import.meta.env.VITE_APP_API_URL;

export class UrlApiService {
    async fetchAllUrls(): Promise<UrlObject[]> {
        console.log(apiUrl)
        const response = await fetch(`${apiUrl}/v1/url`,
            { method: 'GET' }
        );

        return await response.json();
    }

    async deleteUrl(id: number): Promise<any> {
        const response = await fetch(`${apiUrl}/v1/url/${id}`,
            { method: 'DELETE' }
        );

        return await response.json();
    };
}