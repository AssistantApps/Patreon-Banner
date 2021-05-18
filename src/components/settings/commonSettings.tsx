import React from 'react';

import { DesignPalette } from '../../constants/designPalette';
import { PatreonViewModel } from '../../contracts/generated/ViewModel/patreonViewModel';

import { ColourPicker } from '../../components/common/colourPicker/colourPicker'
import { SpeedPicker } from '../../components/common/slider/speedPicker';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import classNames from 'classnames';
import { Lock } from '../common/svg/lock';

interface IProps {
    patronVm: PatreonViewModel;
    editSettings: <T extends unknown>(name: string) => (value: T) => void;
}

export const CommonSettings: React.FC<IProps> = (props: IProps) => {
    const patronVm = props.patronVm;
    const settings = patronVm.settings;
    return (
        <>
            <div className="col-6">
                <label>Text Colour</label>
                <ColourPicker
                    id="foregroundColour"
                    defaultValue={DesignPalette.foregroundDefault}
                    currentValue={settings.foregroundColour}
                    availableColours={DesignPalette.foregroundOptions}
                    onChange={props.editSettings('foregroundColour')}
                />
            </div>
            <div className="col-6">
                <label>Patron Background Colour</label>
                <ColourPicker
                    id="backgroundColour"
                    defaultValue={DesignPalette.backgroundDefault}
                    currentValue={settings.backgroundColour}
                    availableColours={DesignPalette.backgroundOptions}
                    onChange={props.editSettings('backgroundColour')}
                />
                <div className="mt1">
                    <label>Background Opacity</label>
                    <SpeedPicker
                        min={DesignPalette.backgroundOpacityMin}
                        max={DesignPalette.backgroundOpacityMax}
                        value={settings.backgroundOpacity}
                        onChange={(newValue: number) => props.editSettings('backgroundOpacity')(newValue.toString())}
                    />
                </div>
            </div>
        </>
    );
}


export const CommonSettingsFooter: React.FC<IProps> = (props: IProps) => {
    const patronVm = props.patronVm;
    const settings = patronVm.settings;
    const isUserPremium = (patronVm as any).isUserPremium ?? false;

    return (
        <div className="row mt2">
            <div className="col-12">
                <label>Profile picture settings</label>

                <FormControlLabel
                    label="Rounded profile pictures"
                    control={
                        <Checkbox
                            checked={settings.isProfilePicRounded}
                            onChange={(_: any) => props.editSettings<boolean>('isProfilePicRounded')(!settings.isProfilePicRounded)}
                            name="hasRoundedProfilePics"
                            color="primary"
                        />
                    }
                />
                {
                    settings.isProfilePicRounded &&
                    <>
                        <br />
                        <div className={classNames({ 'premium-locked': !patronVm.isPremium })} style={{ display: 'inline-flex' }}>
                            <input type="number"
                                min={0}
                                max={10000}
                                name="border-radius-input"
                                disabled={!patronVm.isPremium}
                                style={{ display: 'inline-block', width: 'unset' }}
                                value={settings.profilePicRoundedValue}
                                placeholder={'pickerCurrentValue'}
                                onChange={(event: any) => {
                                    event.persist();
                                    const value = event?.target?.value ?? DesignPalette.profilePicRoundedValue;
                                    props.editSettings<number>('profilePicRoundedValue')(value);
                                }}
                            />
                            <span className="noselect mt1" style={{ marginLeft: '5px' }}>px</span>
                            {
                                (isUserPremium == false) &&
                                <Lock classNames="ml1" />
                            }
                        </div>
                    </>
                }
            </div>
        </div>
    );
}
