import React from 'react';
import { Story, Meta } from '@storybook/react';

import { PatreonButton, IPatreonButtonProps } from './patreonButton';

export default {
  title: 'Patreon/Button',
  component: PatreonButton,
  argTypes: {},
} as Meta;

const Template: Story<IPatreonButtonProps> = (args) => (
  <div id="main" style={{ minHeight: '200px', padding: '2em' }}>
    <PatreonButton {...args} />
  </div>
);

export const Login = Template.bind({});
const LoginArgs: IPatreonButtonProps = {};
Login.args = LoginArgs;

export const CustomLink = Template.bind({});
const CustomLinkArgs: IPatreonButtonProps = {
  link: 'https://google.com'
};
CustomLink.args = CustomLinkArgs;

