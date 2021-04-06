import React from 'react';
import { BasicImage } from '../../components/core/image';
import { PatreonViewModel } from '../../contracts/generated/ViewModel/patreonViewModel';

interface IPatronTileProps extends PatreonViewModel {

}

export const PatreonTile: React.FC<IPatronTileProps> = (props: IPatronTileProps) => {
    return (
        <div className="patron-container">
            <BasicImage
                key={props.imageUrl}
                imageUrl={props.imageUrl}
                imageName={props.name}
            />
            <h4>{props.name}</h4>
        </div>
    );
}