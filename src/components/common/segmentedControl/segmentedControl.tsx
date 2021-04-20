
import React from 'react';

const segmentedControlImport = require('segmented-control');

import './_segmentedControl.scss';

interface IOptionProps<T> {
    label: string;
    value: T;
}

interface IProps<T> {
    segmentedControlName?: string;
    defaultSelectedOptionIndex?: number;
    options: Array<IOptionProps<T>>;
    onChange: (value: T) => void;
}

interface IState {
    selectedOptionIndex: number;
}

export class SegmentedControl<T> extends React.Component<IProps<T>, IState> {
    constructor(props: IProps<T>) {
        super(props);

        this.state = {
            selectedOptionIndex: props.defaultSelectedOptionIndex ?? 0,
        };
    }

    onChangeEvent = (newValue: T) => this.props.onChange?.(newValue);

    render() {
        return (
            <segmentedControlImport.SegmentedControl
                name={this.props.segmentedControlName ?? 'segmented-control'}
                setValue={this.onChangeEvent}
                options={
                    this.props.options.map((opt: IOptionProps<T>, index: number) => {
                        return {
                            label: opt.label,
                            value: opt.value ?? index,
                            default: index == this.state.selectedOptionIndex
                        };
                    })
                }
            />
        );
    }
}