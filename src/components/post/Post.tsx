import { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SubredditClient from '../../api/SubredditClient';
import { Data, Listing, Post as IPost } from '../../types';
import DOMPurify from 'dompurify';
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

    const sanitize = (html?: string): string => {
        if(!html)
            return '';
        return DOMPurify.sanitize(html);
    }

    return (
        <div className='container'>
            <div className='content'>
                <div className='post'>
                    <h3> { post?.data.title } </h3>
                    <div dangerouslySetInnerHTML={{ __html: sanitize(post?.data.selftext_html)}}>
                    </div>
                </div>
                <div className='comments'>
                    {comments?.data.children.map((value, index) => {
                       return <div className='comment'>
                           <span>{ value.data.ups }</span>
                           <span> by u/{ value.data.author }</span>
                           <div className='comment-body' dangerouslySetInnerHTML={ {__html: sanitize(value.data.body_html)} }/>
                       </div>
                    }) }
                </div>
            </div>
        </div>
    );
}
