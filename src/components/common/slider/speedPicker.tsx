import React, { useState } from 'react';
import classNames from 'classnames';
import { Slider } from '@material-ui/core';

//https://material-ui.com/components/slider/

interface ITickProps {
    value: number;
    label: string;
}

export interface ISpeedPickerProps {
    id?: string;
    value?: number;
    availableTicks?: Array<ITickProps>;
    steps?: number;
    min?: number;
    max?: number;
    className?: string;
    valueLabelDisplay?: "on" | "off" | "auto";
    onChange?: (value: number) => void;
}

export const SpeedPicker: React.FC<ISpeedPickerProps> = (props: ISpeedPickerProps) => {

    const marks = props.availableTicks ?? [];
    const min = marks.reduce((min, m) => m.value < min ? m.value : min, marks?.[0]?.value);
    const max = marks.reduce((max, m) => m.value > max ? m.value : max, marks?.[0]?.value);

    const [defaultValue, _] = useState<number>(props.min ?? min ?? 0);
    const value: number = +(props.value ?? defaultValue);

    const setTick = (e: any, newValue: number | number[]) => {
        if (marks != null && marks.length > 0) {
            const selectedValue = marks.find(m => m.value === newValue);
            if (selectedValue == null) return;

            props?.onChange?.(selectedValue.value);
            return;
        }

        props?.onChange?.(newValue as number);
    }

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className={classNames('slider-picker-row ta-center mt-4', props.className)}>
                        <Slider
                            defaultValue={defaultValue}
                            aria-labelledby="discrete-slider-restrict"
                            step={props.steps ?? 1}
                            valueLabelDisplay={props.valueLabelDisplay ?? "auto"}
                            value={value}
                            marks={marks.length !== 0 ? marks : undefined}
                            min={props.min ?? min}
                            max={props.max ?? max}
                            onChange={setTick}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}