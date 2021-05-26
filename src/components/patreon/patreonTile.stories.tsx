import React from 'react';
import { Story, Meta } from '@storybook/react';

import { testDataPatronsViewModel } from '../../util/mockPatreonViewModel';
import { PatreonTile, IPatronTileProps } from './patreonTile';
import { DesignPalette } from '../../constants/designPalette';

export default {
  title: 'Patreon/Tile',
  component: PatreonTile,
  argTypes: {},
} as Meta;

const Template: Story<IPatronTileProps> = (args) => (
  <div className="wrapper pt5">
    <div className="pos-rel" style={{ padding: '2em', minHeight: '200px' }}>
      <div id="patreonOneAtATime">
        <PatreonTile {...args} />
      </div>
    </div>
  </div>
);

export const Basic = Template.bind({});
const BasicArgs: IPatronTileProps = {
  ...testDataPatronsViewModel.patrons[0],
  premiumLevel: 0,
  isProfilePicRounded: DesignPalette.isProfilePicRounded,
  profilePicRoundedValue: DesignPalette.profilePicRoundedValue,
};
Basic.args = BasicArgs;


