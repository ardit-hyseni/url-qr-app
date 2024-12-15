import { UrlFormRequest, UrlObject } from '@url-program/common/dist/types';

const apiUrl = import.meta.env.VITE_APP_API_URL;

export class UrlApiService {
    async fetchAllUrls(): Promise<UrlObject[]> {
        console.log(apiUrl)
        const response = await fetch(`${apiUrl}/v1/url`,
            { method: 'GET' }
        );

        return await response.json();
    }

    async createUrl(request: UrlFormRequest): Promise<UrlObject> {
        const response = await fetch(`${apiUrl}/v1/url`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request),
        });

        return await response.json();
    }


    async deleteUrl(id: number): Promise<boolean> {
        const response = await fetch(`${apiUrl}/v1/url/${id}`,
            { method: 'DELETE' }
        );

        return response.ok ? true : false;
    };

    async incrementClickCount(id: number): Promise<UrlObject> {
        const response = await fetch(`${apiUrl}/v1/url/${id}/click`,
            { method: 'PATCH' }
        );

        return await response.json();
    };
}