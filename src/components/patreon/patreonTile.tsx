import React from 'react';
import { BasicImage } from '../../components/core/image';
import { PatreonItemViewModel } from '../../contracts/generated/ViewModel/patreonItemViewModel';

interface IPatronTileProps extends PatreonItemViewModel {
    foregroundColour?: string;
}

export const PatreonTile: React.FC<IPatronTileProps> = (props: IPatronTileProps) => {
    return (
        <div className="patron-container">
            <BasicImage
                key={props.imageUrl}
                imageUrl={props.imageUrl}
                imageName={props.name}
            />
            <h4 className="noselect" style={{ color: props.foregroundColour }}>{props.name}</h4>
        </div>
    );
}