import { AppImage } from "./appImage";
import { DisplayType } from "./enum/displayType";

export const patreonApiUrl = 'https://www.patreon.com';
export const patreonApiOAuthUrl = `${patreonApiUrl}/oauth2/authorize`;

export const displayTypeCheckBoxes = [
    {
        imageUrl: `/${AppImage.displayTypeMarquee}`,
        displayType: DisplayType.Marquee,
    },
    {
        imageUrl: `/${AppImage.displayTypeVerticalList}`,
        displayType: DisplayType.VerticalList,
    },
    {
        imageUrl: `/${AppImage.displayTypeOneAtATime}`,
        displayType: DisplayType.OneAtATime,
    }
];