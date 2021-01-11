import { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { About, Data, Listing, Post } from '../../types';
import { Link } from 'react-router-dom';
import SubredditClient from '../../api/SubredditClient';
import { FaArrowUp, FaComment } from 'react-icons/fa';
import { AiFillPushpin } from 'react-icons/ai';
import './Subreddit.css';

type UrlParams = { id: string };

export default function Subreddit(): ReactElement {
    const { id } = useParams<UrlParams>();

    const [after, setAfter] = useState<string>();
    const [about, setAbout] = useState<Data<About>>();
    const [posts, setPosts] = useState<Listing<Post>>();

    useEffect(() => {
        async function about() {
            const response = await SubredditClient.about(id);
            setAbout(response);
        }
        about();
    }, [ id ]);

    useEffect(() => {
        async function posts() {
            const response = await SubredditClient.posts(id, after);
            setPosts(response);
        }
        posts()
    }, [ id, after ]);

    return (
        <div className='container'>
            <div className='content'>
                {posts?.data.children.map((value, index) => {
                  return (
                      <Link to={`/r/${id}/comments/${value.data.id}`}>
                          <div className={'post ' + (value.data.stickied ? 'sticky' : '')} key={index}>
                              { value.data.stickied && <AiFillPushpin className={'sticky-pin'} /> }
                              <p className='title'>
                                  <b>{value.data.title}</b>
                              </p>
                              <div className='footer'>
                                  <div className='left'>
                                      {   value.data.link_flair_text &&
                                          <span className={'flair'} style={{backgroundColor: value.data.link_flair_background_color}}>
                                              { value.data.link_flair_text }
                                          </span>
                                      }
                                  </div>
                                  <div className='right'>
                                      <span className='upvotes'>
                                          <FaArrowUp />
                                          {value.data.ups}
                                      </span>
                                      <span className='comments'>
                                          <FaComment />
                                          <span>{value.data.num_comments}</span>
                                      </span>
                                      <span className='author'>
                                          by <span>u/{value.data.author}</span>
                                      </span>
                                  </div>
                              </div>
                          </div>
                      </Link>
                  )
                })}
            </div>
        </div>
    );
}
