import React from 'react';

import { DesignPalette } from '../../constants/designPalette';
import { PatreonViewModel } from '../../contracts/generated/ViewModel/patreonViewModel';

import { ColourPicker } from '../../components/common/colourPicker/colourPicker'
import { SpeedPicker } from '../../components/common/slider/speedPicker';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import classNames from 'classnames';
import { Premium } from '../common/svg/premium';
import { PatronLevel } from '../../constants/patreonLevel';

interface ICommonProps {
    patronVm: PatreonViewModel;
    editSettings: <T extends unknown>(name: string) => (value: T) => void;
}

interface ICommonSettingsProps extends ICommonProps {
    textColourProp: string;
    backgroundColourProp: string;
    backgroundOpacityProp: string;
}

export const CommonSettings: React.FC<ICommonSettingsProps> = (props: ICommonSettingsProps) => {
    const patronVm = props.patronVm;
    const settings = patronVm.settings;

    return (
        <>
            <div className="col-6">
                <label className="label">Text Colour</label>
                <ColourPicker
                    id={props.textColourProp}
                    defaultValue={DesignPalette.foregroundDefault}
                    currentValue={(settings as any)?.[props.textColourProp] ?? ''}
                    availableColours={DesignPalette.foregroundOptions}
                    onChange={props.editSettings(props.textColourProp)}
                />
            </div>
            <div className="col-6">
                <label className="label">Patron Background Colour</label>
                <ColourPicker
                    id={props.backgroundColourProp}
                    defaultValue={DesignPalette.backgroundDefault}
                    currentValue={(settings as any)?.[props.backgroundColourProp] ?? ''}
                    availableColours={DesignPalette.backgroundOptions}
                    onChange={props.editSettings(props.backgroundColourProp)}
                />
                <div className="mt1">
                    <label className="label">Background Opacity</label>
                    <SpeedPicker
                        id={props.backgroundOpacityProp}
                        min={DesignPalette.backgroundOpacityMin}
                        max={DesignPalette.backgroundOpacityMax}
                        value={(settings as any)?.[props.backgroundOpacityProp] ?? ''}
                        onChange={(newValue: number) => props.editSettings(props.backgroundOpacityProp)(newValue)}
                    />
                </div>
            </div>
        </>
    );
}


interface ICommonSettingsFooterProps extends ICommonProps {
    isProfilePicRoundedProp: string;
    profilePicRoundedValueProp: string;
}

export const CommonSettingsFooter: React.FC<ICommonSettingsFooterProps> = (props: ICommonSettingsFooterProps) => {
    const patronVm = props.patronVm;
    const premiumLocked = patronVm.premiumLevel < PatronLevel.level1.patreonLevelRequirement;

    const isProfilePicRounded = (patronVm.settings as any)?.[props.isProfilePicRoundedProp] ?? DesignPalette.isProfilePicRounded;
    const profilePicRoundedValue = (patronVm.settings as any)?.[props.profilePicRoundedValueProp] ?? DesignPalette.profilePicRoundedValue;

    return (
        <div className="row mt2">
            <div className="col-12">
                <label className="label">Profile picture settings</label>

                <FormControlLabel
                    label="Rounded profile pictures"
                    control={
                        <Checkbox
                            name={props.isProfilePicRoundedProp}
                            checked={isProfilePicRounded}
                            onChange={(_: any) => props.editSettings<boolean>(props.isProfilePicRoundedProp)(!isProfilePicRounded)}
                            color="primary"
                        />
                    }
                />
                {
                    isProfilePicRounded &&
                    <>
                        <br />
                        <div className={classNames('inline-flex', { 'premium-locked': premiumLocked })}>
                            <input type="number"
                                min={0}
                                max={10000}
                                name="border-radius-input"
                                disabled={premiumLocked}
                                style={{ display: 'inline-block', width: 'unset' }}
                                value={profilePicRoundedValue}
                                placeholder={'10'}
                                onChange={(event: any) => {
                                    event.persist();
                                    const value = event?.target?.value ?? DesignPalette.profilePicRoundedValue;
                                    props.editSettings<number>(props.profilePicRoundedValueProp)(value);
                                }}
                            />
                            <span className="noselect mt1" style={{ marginLeft: '5px' }}>px</span>
                            {
                                premiumLocked &&
                                <div className="ml1 premium-crown-container">
                                    <Premium classNames="full-height" />
                                </div>
                            }
                        </div>
                    </>
                }
            </div>
        </div>
    );
}
