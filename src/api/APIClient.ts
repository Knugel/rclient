import { OAuthResponse } from '../types';

class APIClient {
    private static readonly API_URL = 'https://oauth.reddit.com/';
    private static readonly AUTH_URL = 'https://www.reddit.com/api/v1/access_token';
    private static readonly CLIENT_ID = 'LzBGozxpbmJNRA'

    private readonly DEVICE_ID = 'DO_NOT_TRACK_THIS_DEVICE';
    private _token?: string;

    public async get<T>(url: string, params?: URLSearchParams): Promise<T> {
        if(params)
            url = `${url}?${params}`;

        const headers = await this.getDefaultHeaders();
        const request: RequestInit = {
            headers: headers,
            method: 'GET'
        }

        return await this.fetch<T>(APIClient.API_URL + url, request);
    }

    private async getDefaultHeaders(): Promise<Headers> {
        if(!this._token)
            this._token = await this.fetchToken();

        return new Headers({
            Authorization: `bearer ${this._token}`,
            'Content-Type': 'application/json'
        })
    }

    private async fetchToken(): Promise<string> {
        const request: RequestInit = {
            headers: {
                Authorization: `Basic ${ window.btoa(`${ APIClient.CLIENT_ID }:`) }`,
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            method: 'POST',
            body: `grant_type=${ encodeURIComponent('https://oauth.reddit.com/grants/installed_client') }&device_id=${ this.DEVICE_ID }`,
        }

        const response = await this.fetch<OAuthResponse>(APIClient.AUTH_URL, request);
        return response.access_token;
    }

    private async fetch<T>(url: string, request: RequestInit): Promise<T> {
        const response = await window.fetch(url, request);

        if (response.ok)
            return await response.json() as T;
        else {
            const authenticate = response.headers.get('www-authenticate')
            if (authenticate && authenticate.includes('invalid_token')) {
                this._token = await this.fetchToken();
                const headers = request.headers as Record<string, string>;
                headers['Authorization'] = `bearer ${ this._token }`;
                return await this.fetch<T>(url, request);
            }
            return Promise.reject(response.statusText);
        }
    }
}

export default new APIClient();
