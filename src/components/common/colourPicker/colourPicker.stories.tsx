import React from 'react';
import { Story, Meta } from '@storybook/react';

import { DesignPalette } from '../../../constants/designPalette';
import { ColourPicker, IColourPickerProps } from './colourPicker';

export default {
    title: 'Pickers/Colour',
    component: ColourPicker,
} as Meta;

const Template: Story<IColourPickerProps> = (args) => (
    <div id="main" style={{ minHeight: '200px', padding: '2em' }}>
        <ColourPicker {...args} />
    </div>
);

export const Default = Template.bind({});
Default.args = {};

export const Colour = Template.bind({});
const ColourArgs: IColourPickerProps = {
    availableColours: DesignPalette.backgroundOptions,
    defaultValue: "#D32F2F",
};
Colour.args = ColourArgs;


