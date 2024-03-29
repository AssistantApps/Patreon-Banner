import React from "react";

interface IProps {
    alt?: string;
    imageUrl: string;
    imageName?: string;
    classNames?: string;
    style?: any;
}
export const BasicImage: React.FC<IProps> = (props: IProps) => {
    return (
        <img
            src={props.imageUrl}
            className={props.classNames}
            style={props.style}
            alt={(props.alt ?? props.imageName) ?? 'Emote button'}
            draggable={false}
        />
    );
}