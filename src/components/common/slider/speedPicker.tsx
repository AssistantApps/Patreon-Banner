import { Slider } from '@material-ui/core';
import React from 'react';

//https://material-ui.com/components/slider/

interface IProps {
    id?: string;
    value?: number;
    availableTicks: Array<number>;
    onChange?: (value: number) => void;
}

export const SpeedPicker: React.FC<IProps> = (props: IProps) => {
    const marks = props.availableTicks.map((tick: any) => ({
        value: tick,
        label: valuetext(tick),
    }));

    const setTick = (e: any, newValue: number | number[]) => () => {
        props?.onChange?.(newValue as number);
    }

    const valuetext = (value: number) => `${value} s`;
    const valueLabelFormat = (value: number) => marks.findIndex((mark) => mark.value === value) + 1;

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="slider-picker-row ta-center mt-4">
                        <Slider
                            defaultValue={props.value}
                            valueLabelFormat={valueLabelFormat}
                            getAriaValueText={valuetext}
                            aria-labelledby="discrete-slider-restrict"
                            step={null}
                            valueLabelDisplay="auto"
                            marks={marks}
                            onChange={setTick}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}