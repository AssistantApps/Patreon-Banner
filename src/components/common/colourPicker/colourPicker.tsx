import classNames from 'classnames';
import React from 'react';

import { handleHex } from '../../../helper/colourHelper';
import { Premium } from '../svg/premium';
import { ColourPickerCircle } from './colourPickerCircle';

export interface IColourPickerProps {
    id?: string;
    defaultValue: string;
    currentValue?: string;
    isUserPremium?: boolean;
    availableColours: Array<string>;
    onChange?: (value: string) => void;
}

export const ColourPicker: React.FC<IColourPickerProps> = (props: IColourPickerProps) => {

    const isUserPremium = props.isUserPremium ?? false;
    const localCurrentValue = props.currentValue ?? '';
    const pickerCurrentValue = (props.currentValue == null || props.currentValue.length < 1)
        ? props.defaultValue
        : props.currentValue;

    const setColour = (newValue: string) => () => {
        const correctedHex = handleHex(newValue);
        props?.onChange?.(correctedHex);
    }

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="colour-picker-row ta-center mt-4">
                        {
                            (props.availableColours ?? []).map((hex: string) => {
                                return (
                                    <ColourPickerCircle
                                        key={hex}
                                        colourHex={hex}
                                        isActive={hex === pickerCurrentValue}
                                        onClick={setColour(hex)}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
                <div className={classNames('col-12 flex', { 'premium-locked': !isUserPremium })}>
                    <ColourPickerCircle
                        key={`customColour-${props.id}`}
                        colourHex={pickerCurrentValue}
                        isActive={false}
                    />
                    <input type="text"
                        disabled={!isUserPremium}
                        key={`colourPickerInput-${props.id}`}
                        name="ColourPickerInput"
                        style={{ display: 'inline-block', width: 'unset' }}
                        value={localCurrentValue}
                        placeholder={pickerCurrentValue}
                        onChange={(event: any) => {
                            event.persist();
                            const value = event?.target?.value ?? '';
                            setColour(value)();
                        }}
                    />
                    {
                        (isUserPremium == false) &&
                        <Premium classNames="ml1" />
                    }
                </div>
            </div>
        </>
    );
}