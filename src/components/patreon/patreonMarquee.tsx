import React from 'react';
import Marquee from "react-fast-marquee";

import { PatreonTile } from '../../components/patreon/patreonTile';
import { ResultWithValue } from '../../contracts/results/ResultWithValue';
import { PatreonViewModel } from '../../contracts/generated/ViewModel/patreonViewModel';
import { NetworkState } from '../../constants/enum/networkState';

import { withServices } from '../../integration/dependencyInjection';

import { dependencyInjectionToProps, IExpectedServices } from './patreonMarquee.dependencyInjection';

interface IWithoutExpectedServices {
}

interface IProps extends IExpectedServices, IWithoutExpectedServices { }

interface IState {
    patrons: Array<PatreonViewModel>;
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
        const patronsResult: ResultWithValue<Array<PatreonViewModel>> = await this.props.patreonService.getAll();
        if (!patronsResult.isSuccess) return;
        this.setState(() => {
            return {
                patrons: patronsResult.value,
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
                    patrons.map((item: PatreonViewModel) => (
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

