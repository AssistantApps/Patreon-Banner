import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Lock } from '../common/svg/lock';
import { Premium } from '../common/svg/premium';

export default {
    title: 'Icons/SVG',
    decorators: [
        (Story) => <div id="main" style={{ minHeight: '200px', padding: '2em' }}>
            <div style={{ height: '4em' }}><Story /></div>
        </div>
    ]
} as Meta;

export const All: Story<any> = (args) => (
    <>
        <Premium {...args} />
        <Lock {...args} />
    </>
);


