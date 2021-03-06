import { IAbout, Data, Listing, IPost } from '../types';
import APIClient from './APIClient';

class SubredditClient {
    public async about(id: string): Promise<Data<IAbout>> {
        return await APIClient.get(`r/${id}/about`);
    }

    public async posts(id: string, after?: string): Promise<Listing<IPost>> {
        const params = new URLSearchParams({'raw_json': '1'});
        if(after)
            params.append('after', after);
        return await APIClient.get(`r/${id}`, params);
    }

    public async comments(id: string, post: string): Promise<Listing<any>[]> {
        return await APIClient.get(`r/${id}/comments/${post}`, new URLSearchParams({'raw_json': '1'}))
    }
}

var client = new SubredditClient();
export default client;
