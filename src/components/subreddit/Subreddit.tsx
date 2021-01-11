import { ReactElement, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Data, IAbout, IPost, Listing } from '../../types';
import SubredditClient from '../../api/SubredditClient';
import { FaArrowUp, FaComment } from 'react-icons/fa';
import { AiFillPushpin } from 'react-icons/ai';
import './Subreddit.css';

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

    const isValidImg = (url: string): boolean => {
        return !!url && url !== 'self'
    }

    const toPastel = (color: string): string => {
        const result = hexToRgb(color);
        if(result) {
            return rgbToHex(Math.floor((result.r + 255) / 2), Math.floor((result.g + 255) / 2), Math.floor((result.b + 255) / 2));
        }
        return color;
    }

    function rgbToHex(r: number, g: number, b: number): string {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    function hexToRgb(hex: string): { r: number, g: number, b: number } | null {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    return (
        <div className='container'>
            <div className='content'>
                { posts?.data.children.map((value, index) => {
                    return (
                        <Link to={ `/r/${ id }/comments/${ value.data.id }` } key={index}>
                            <div className={ 'post ' + (value.data.stickied ? 'sticky' : '') }>
                                <div className='thumbnail-wrapper'>
                                    { isValidImg(value.data.thumbnail) &&
                                    <img alt='' className='thumbnail' src={ value.data.thumbnail } onClick={(event) => {
                                        window.open(value.data.url, '_blank');
                                        event.preventDefault();
                                    }}/> }
                                </div>
                                <div className='post-body'>
                                    <p className='title'>
                                        <b>{ value.data.title }</b>
                                    </p>
                                    <div className='footer'>
                                        <div className='left'>
                                            { value.data.link_flair_text &&
                                            <span className={ 'flair' }
                                                  style={ {backgroundColor: toPastel(value.data.link_flair_background_color)} }>
                                              { value.data.link_flair_text }
                                          </span>
                                            }
                                        </div>
                                        <div className='right'>
                                            <span className='upvotes'>
                                                <FaArrowUp/>
                                                { value.data.ups }
                                            </span>
                                            <span className='comments'>
                                                <FaComment/>
                                                <span>{ value.data.num_comments }</span>
                                            </span>
                                            <span className='author'>
                                                by <span>u/{ value.data.author }</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                { value.data.stickied && <AiFillPushpin className={ 'sticky-pin' }/> }
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    );
}
