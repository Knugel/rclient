import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { IPost } from '../../../types';
import Flair from '../../common/Flair';
import './PostItem.scoped.scss';
import Pill from '../../common/Pill';
import { FaArrowUp, FaComment } from 'react-icons/all';

type Props = { id: string, post: IPost }

export default function PostItem(props: Props): ReactElement {
    const className = `post ${props.post.stickied ? 'sticky' : ''}`

    function isThumbnailHidden(url: string): boolean {
        return !url || url === 'self';
    }

    return (
        <Link to={`/r/${ props.id }/comments/${ props.post.id }`}>
            <div className={className}>
                <a className='thumbnail' href={props.post.url} target='_blank' hidden={isThumbnailHidden(props.post.thumbnail)}>
                    <img alt='' src={props.post.thumbnail} onClick={ (event) => event.stopPropagation() } />
                </a>
                <div className='body'>
                    <p className='title'>
                        <b>{ props.post.title }</b>
                    </p>
                    <div className='footer'>
                        <div className='left'>
                            <Flair background={ props.post.link_flair_background_color } color={ props.post.link_flair_text_color }>
                                { props.post.link_flair_text }
                            </Flair>
                        </div>
                        <div className='right'>
                            <Pill>
                                <FaArrowUp/>
                                <span>{ props.post.ups }</span>
                            </Pill>
                            <Pill>
                                <FaComment/>
                                <span>{ props.post.num_comments }</span>
                            </Pill>
                            <Pill>
                                by <span className='author'>u/{ props.post.author }</span>
                            </Pill>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
