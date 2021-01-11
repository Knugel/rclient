import { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Data, IAbout, IPost, Listing } from '../../types';
import SubredditClient from '../../api/SubredditClient';
import './Subreddit.css';
import PostItem from './PostItem';

type UrlParams = { id: string };

export default function Subreddit(): ReactElement {
    const {id} = useParams<UrlParams>();

    const [after, setAfter] = useState<string>();
    const [about, setAbout] = useState<Data<IAbout>>();
    const [posts, setPosts] = useState<Listing<IPost>>();

    useEffect(() => {
        async function about() {
            const response = await SubredditClient.about(id);
            setAbout(response);
        }

        about();
    }, [id]);

    useEffect(() => {
        async function posts() {
            const response = await SubredditClient.posts(id, after);
            setPosts(response);
        }

        posts()
    }, [id, after]);

    return (
        <div className='container'>
            <div className='content'>
                { posts?.data.children.map((value, index) => {
                    return (
                        <PostItem key={ index } post={ value.data } id={ id }/>
                    )
                })}
            </div>
        </div>
    );
}
