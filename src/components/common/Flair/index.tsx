import { PropsWithChildren, ReactElement } from 'react';
import Pill from '../Pill';

type Props = { background: string, color?: 'light' | 'dark' }

export default function Flair(props: PropsWithChildren<Props>): ReactElement {
    function toPastel(color: string): string {
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
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    const style = {
        backgroundColor: toPastel(props.background),
        color: props.color === 'dark' ? '#263238' : '#ffffff'
    };

    return (
        <Pill style={style}> { props.children } </Pill>
    )
}
