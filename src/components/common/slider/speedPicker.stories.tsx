import React from 'react';
import { Story, Meta } from '@storybook/react';

import { DesignPalette } from '../../../constants/designPalette';
import { SpeedPicker, ISpeedPickerProps } from './speedPicker';

export default {
    title: 'Pickers/Speed',
    component: SpeedPicker,
} as Meta;

const Template: Story<ISpeedPickerProps> = (args) => (
    <div id="main" style={{ minHeight: '200px', padding: '2em' }}>
        <SpeedPicker {...args} />
    </div>
);

export const Default = Template.bind({});
Default.args = {};

export const MarqueSpeed = Template.bind({});
const MarqueSpeedArgs: ISpeedPickerProps = {
    availableTicks: DesignPalette.marqueSpeedTicks,
    value: DesignPalette.marqueSpeedDefault
};
MarqueSpeed.args = MarqueSpeedArgs;

export const VerticalListSpeed = Template.bind({});
const VerticalListSpeedArgs: ISpeedPickerProps = {
    availableTicks: DesignPalette.verticalListSpeedTicks,
    value: DesignPalette.verticalListSpeedDefault
};
VerticalListSpeed.args = VerticalListSpeedArgs;

export const OneAtATimeSpeed = Template.bind({});
const OneAtATimeSpeedArgs: ISpeedPickerProps = {
    availableTicks: DesignPalette.oneAtATimeSpeedTicks,
    value: DesignPalette.oneAtATimeSpeedDefault
};
OneAtATimeSpeed.args = OneAtATimeSpeedArgs;


