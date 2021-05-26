import React from 'react';
import { Story, Meta } from '@storybook/react';

import { testDataPatronsViewModel } from '../../util/mockPatreonViewModel';
import { PatreonDisplaySwitcher, IPatreonDisplaySwitcherProps } from './patreonDisplaySwitcher';
import { TestStreamWindow } from '../settings/testStreamWindow';
import { PatreonBannerDisplayType } from '../../contracts/generated/Enum/patreonBannerDisplayType';

export default {
  title: 'Patreon/Display',
  component: PatreonDisplaySwitcher,
  argTypes: {},
} as Meta;

const Template: Story<IPatreonDisplaySwitcherProps> = (args) => (
  <div id="main" style={{ padding: '2em' }}>
    <TestStreamWindow>
      <PatreonDisplaySwitcher {...args} />
    </TestStreamWindow>
  </div>
);

const changeDisplaySetting = (displayType: PatreonBannerDisplayType): IPatreonDisplaySwitcherProps => ({
  patronVm: {
    ...testDataPatronsViewModel,
    settings: {
      ...testDataPatronsViewModel.settings,
      displayType,
    }
  }
});

export const Marque = Template.bind({});
Marque.args = changeDisplaySetting(PatreonBannerDisplayType.marque);;

export const VerticalList = Template.bind({});
VerticalList.args = changeDisplaySetting(PatreonBannerDisplayType.verticalList);;

export const OneAtATime = Template.bind({});
OneAtATime.args = changeDisplaySetting(PatreonBannerDisplayType.oneAtATime);;
