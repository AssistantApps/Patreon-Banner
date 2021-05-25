import React from 'react';
import { Story, Meta } from '@storybook/react';

import { PatreonPanelPresenter, IProps } from './patreonPanelPresenter';
import { NetworkState } from '../../../constants/enum/networkState';
import { noPatronsViewModel, lowNumPatronsViewModel, testDataPatronsViewModel } from '../../../util/mockPatreonViewModel';

export default {
  title: 'Patreon/TwitchPanel',
  component: PatreonPanelPresenter,
  argTypes: {},
} as Meta;

const Template: Story<IProps> = (args) => (
  <div id="main" className="twitch" style={{ width: '320px', height: '300px', position: 'relative', border: '1px solid grey' }}>
    <PatreonPanelPresenter {...args} />
  </div>
);

export const TestNetworkState = Template.bind({});
const TestNetworkStateArgs: IProps = {
  patreonNetworkState: NetworkState.Loading,
  patronVm: noPatronsViewModel
};
TestNetworkState.args = TestNetworkStateArgs;

export const NoPatrons = Template.bind({});
const NoPatronsArgs: IProps = {
  patreonNetworkState: NetworkState.Success,
  patronVm: noPatronsViewModel
};
NoPatrons.args = NoPatronsArgs;

export const LowNumPatrons = Template.bind({});
const LowNumPatronsArgs: IProps = {
  patreonNetworkState: NetworkState.Success,
  patronVm: lowNumPatronsViewModel
};
LowNumPatrons.args = LowNumPatronsArgs;

export const TestDataPatronsNoCampaignUrl = Template.bind({});
const TestDataPatronsNoCampaignUrlArgs: IProps = {
  patreonNetworkState: NetworkState.Success,
  patronVm: { ...testDataPatronsViewModel, campaignUrl: '' }
};
TestDataPatronsNoCampaignUrl.args = TestDataPatronsNoCampaignUrlArgs;

export const TestDataPatrons = Template.bind({});
const TestDataPatronsArgs: IProps = {
  patreonNetworkState: NetworkState.Success,
  patronVm: testDataPatronsViewModel
};
TestDataPatrons.args = TestDataPatronsArgs;
