import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Premium, IPremiumProps } from './premium';

export default {
    title: 'Icons/SVG',
    component: Premium,
    decorators: [(Story) => <div style={{ height: '4em' }}><Story /></div>]
} as Meta;

export const PremiumIcon: Story<IPremiumProps> = (args) => (
    <Premium {...args} />
);


