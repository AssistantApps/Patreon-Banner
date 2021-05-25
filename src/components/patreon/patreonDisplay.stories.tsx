import React from 'react';
import { Story, Meta } from '@storybook/react';

import { testDataPatronsViewModel } from '../../util/mockPatreonViewModel';
import { PatreonDisplaySwitcher, IPatreonDisplaySwitcherProps } from './patreonDisplaySwitcher';
import { TestStreamWindow } from '../settings/testStreamWindow';
import { PatreonMarquee } from './patreonMarquee';

export default {
  title: 'Patreon/Display',
  component: PatreonDisplaySwitcher,
  argTypes: {},
} as Meta;

const Template: Story<IPatreonDisplaySwitcherProps> = (args) => (
  <div className="wrapper pt5">
    <div id="main" style={{ padding: '2em' }}>
      <TestStreamWindow>
        <PatreonMarquee {...args.patronVm} />
      </TestStreamWindow>
    </div>
  </div>
);

export const Config = Template.bind({});
const ConfigArgs: IPatreonDisplaySwitcherProps = {
  patronVm: testDataPatronsViewModel,
};
Config.args = ConfigArgs;


