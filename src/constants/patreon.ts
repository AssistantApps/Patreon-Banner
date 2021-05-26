import { AppImage } from "./appImage";
import { PatreonBannerDisplayType } from "../contracts/generated/Enum/patreonBannerDisplayType";

export const patreonApiUrl = 'https://www.patreon.com';
export const patreonApiOAuthUrl = `${patreonApiUrl}/oauth2/authorize`;

export const displayTypeCheckBoxes = [
    {
        imageUrl: AppImage.displayTypeMarquee,
        displayType: PatreonBannerDisplayType.marque,
    },
    {
        imageUrl: AppImage.displayTypeVerticalList,
        displayType: PatreonBannerDisplayType.verticalList,
    },
    {
        imageUrl: AppImage.displayTypeOneAtATime,
        displayType: PatreonBannerDisplayType.oneAtATime,
    }
];