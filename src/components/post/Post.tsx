import { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SubredditClient from '../../api/SubredditClient';
import { Data, Listing, IPost } from '../../types';
import Markdown from '../markdown/Markdown';

import './Post.css';

type UrlParams = { id: string, postId: string };

export default function Post(): ReactElement {
    const { id, postId } = useParams<UrlParams>();

    const [comments, setComments] = useState<Listing<any>>();
    const [post, setPost] = useState<Data<IPost>>();

    useEffect(() => {
        async function comments() {
            const response = await SubredditClient.comments(id, postId);
            setPost(response[0].data.children[0] as Data<IPost>);
            setComments(response[1]);
        }
        comments();
    }, [ id, postId ]);

    return (
        <div className='container'>
            <div className='content'>
                <div className='post'>
                    <h3> { post?.data.title } </h3>
                    <Markdown>{ post?.data.selftext }</Markdown>
                </div>
                <div className='comments'>
                    {comments?.data.children.map((value, index) => {
                        return <div className='comment' key={index}>
                            <span>{ value.data.ups }</span>
                            <span> by u/{ value.data.author }</span>
                            <Markdown>{ value.data.body }</Markdown>
                        </div>
                    })}
                </div>
            </div>
        </div>
    );
}
