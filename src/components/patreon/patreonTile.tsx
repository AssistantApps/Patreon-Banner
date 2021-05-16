import React from 'react';
import { BasicImage } from '../../components/core/image';
import { DesignPalette } from '../../constants/designPalette';
import { PatreonItemViewModel } from '../../contracts/generated/ViewModel/patreonItemViewModel';

interface IPatronTileProps extends PatreonItemViewModel {
    foregroundColour?: string;
    isProfilePicRounded: boolean;
    profilePicRoundedValue: number;
}

export const PatreonTile: React.FC<IPatronTileProps> = (props: IPatronTileProps) => {
    return (
        <div className="patron-container">
            <PatreonTileImage {...props} />
            <h4 className="noselect" style={{ color: props.foregroundColour }}>{props.name}</h4>
        </div>
    );
}

interface IPatronTileImageProps extends PatreonItemViewModel {
    isProfilePicRounded: boolean;
    profilePicRoundedValue: number;
}

export const PatreonTileImage: React.FC<IPatronTileImageProps> = (props: IPatronTileImageProps) => {

    let profilePicRoundedValue = DesignPalette.profilePicRoundedValue;
    if (props.isProfilePicRounded) {
        profilePicRoundedValue = props.profilePicRoundedValue;
    } else {
        profilePicRoundedValue = 0;
    }

    return (
        <BasicImage
            key={props.imageUrl}
            imageUrl={props.imageUrl}
            imageName={props.name}
            style={{ borderRadius: `${profilePicRoundedValue}px` }}
        />
    );
}