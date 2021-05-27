
import classNames from 'classnames';
import React from 'react';

import { AppImage } from '../../../constants/appImage';
import { BasicImage } from '../../core/image';
import { BasicLink } from '../../core/link';

export const paymentOptions: Array<IPaymentBadge> = [
    {
        key: 'bitcoin',
        src: AppImage.donation.bitcoin,
        name: 'Bitcoin',
    },
    {
        key: 'bitcoinCash',
        src: AppImage.donation.bitcoinCash,
        name: 'Bitcoin Cash',
    },
    {
        key: 'dai',
        src: AppImage.donation.dai,
        name: 'Dai',
    },
    {
        key: 'ethereum',
        src: AppImage.donation.ethereum,
        name: 'Ethereum',
    },
    {
        key: 'liteCoin',
        src: AppImage.donation.liteCoin,
        name: 'LiteCoin',
    },
    {
        key: 'usdCoin',
        src: AppImage.donation.usdCoin,
        name: 'USD Coin',
    }
];

interface IPaymentBadge {
    key: string;
    src: string;
    name: string;
}

interface IPaymentBadgeProps extends IPaymentBadge {
    external?: string;
    onClick?: () => void;
}

export const PaymentBadge: React.FC<IPaymentBadgeProps> = (props: IPaymentBadgeProps) => {
    const displayAsLink = (props?.external != null);

    const child = (
        <>
            <BasicImage
                key={props.key}
                classNames={classNames('icon', { 'pointer': props.onClick != null })}
                imageUrl={props.src}
                imageName={props.key}
            />
            <h4 className="noselect">{props.name}</h4>
        </>
    );

    if (displayAsLink) {
        return (<BasicLink href={props.external ?? ''} additionalClassNames="payment-option pointer">{child}</BasicLink>);
    }

    return (<div className="payment-option">{child}</div>);
}