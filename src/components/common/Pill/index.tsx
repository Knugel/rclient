import { CSSProperties, PropsWithChildren, ReactElement } from 'react';
import './Pill.scoped.scss';

type Props = { style?: CSSProperties };

export default function Pill(props: PropsWithChildren<Props>): ReactElement | null {
    const hasChildren = (props.children as any[]).every((x: any) => x);

    if(hasChildren) {
        return (
            <div style={ props.style } className='pill'> { props.children } </div>
        );
    }
    return null;
}
