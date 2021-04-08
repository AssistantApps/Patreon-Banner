import React from 'react';
import Marquee from "react-fast-marquee";

import { PatreonTile } from '../../components/patreon/patreonTile';
import { ResultWithValue } from '../../contracts/results/ResultWithValue';
import { PatreonViewModel } from '../../contracts/generated/ViewModel/patreonViewModel';
import { NetworkState } from '../../constants/enum/networkState';

import { withServices } from '../../integration/dependencyInjection';

import { dependencyInjectionToProps, IExpectedServices } from './patreonMarquee.dependencyInjection';
import { PatreonItemViewModel } from '../../contracts/generated/ViewModel/patreonItemViewModel';

interface IWithoutExpectedServices {
}

interface IProps extends IExpectedServices, IWithoutExpectedServices { }

interface IState {
    patrons: Array<PatreonItemViewModel>;
    networkState: NetworkState;
}

export class PatreonMarqueeUnconnected extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            patrons: [],
            networkState: NetworkState.Loading,
        };
    }

    componentDidMount() {
        this.getPatrons();
    }

    getPatrons = async () => {
        const patronsResult: ResultWithValue<PatreonViewModel> = await this.props.patreonService.getFromGuid('');//TODO
        if (!patronsResult.isSuccess) return;
        this.setState(() => {
            return {
                patrons: patronsResult.value.patrons,
                networkState: NetworkState.Success,
            }
        });
    }

    render() {
        const { patrons, networkState } = this.state;
        if (networkState === NetworkState.Loading) return <span></span>

        return (
            <Marquee gradient={false} className="patreon-container">
                {
                    patrons != null &&
                    patrons.map((item: PatreonItemViewModel) => (
                        <PatreonTile key={item.name} {...item} />
                    ))
                }
            </Marquee>
        );
    }
}


export const PatreonMarquee = withServices<IWithoutExpectedServices, IExpectedServices>(
    PatreonMarqueeUnconnected,
    dependencyInjectionToProps
);

