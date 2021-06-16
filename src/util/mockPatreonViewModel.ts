import { patreonTestData } from '../constants/testData/patreonTestData';
import { PatreonViewModel } from '../contracts/generated/ViewModel/patreonViewModel';

export const noPatronsViewModel: PatreonViewModel = {
    ...patreonTestData().value,
    patrons: [],
}

export const lowNumPatronsViewModel: PatreonViewModel = {
    ...patreonTestData().value,
    patrons: patreonTestData().value.patrons.slice(0, 4),
}

export const testDataPatronsViewModel: PatreonViewModel = {
    ...patreonTestData().value,
}

export const lrdalucardPatronsViewModel: PatreonViewModel = {
    userGuid: "48afb7d5-cc18-442e-a049-fa4e2b9b8e50",
    premiumLevel: 0, "hasTwitch": true, "campaignUrl": "",
    settings: {
        displayType: 1,
        foregroundColour: '',
        backgroundColour: "#D32F2F",
        backgroundOpacity: 50,
        marqueSpeed: 2,
        verticalListSpeed: 6,
        oneAtATimeSpeed: 0,
        isProfilePicRounded: false,
        profilePicRoundedValue: 0,
        panelForegroundColour: '',
        panelBackgroundColour: '',
        panelBackgroundOpacity: 0,
        panelVerticalListSpeed: 0,
        panelUseDefaultBackground: false,
        panelCustomBackgroundImageUrl: '',
        panelIsProfilePicRounded: false,
        panelProfilePicRoundedValue: 0,
        lastModifiedDate: new Date(),
    },
    patrons: [
        {
            name: "Zefoba",
            imageUrl: "https://c10.patreonusercontent.com/3/eyJ3IjoyMDB9/patreon-media/p/user/4390476/4ba0acd73acd4f7f94ccd40732506ec1/2.png?token-time=2145916800&token-hash=qJAut4e7mnXw20ANI85RJoVZVbtSlRiS4YU6qt4GWVc%3D",
            thumbnailUrl: "https://c10.patreonusercontent.com/3/eyJ3IjoyMDB9/patreon-media/p/user/4390476/4ba0acd73acd4f7f94ccd40732506ec1/2.png?token-time=2145916800&token-hash=qJAut4e7mnXw20ANI85RJoVZVbtSlRiS4YU6qt4GWVc%3D",
            url: "https://www.patreon.com/user?u=4390476",
            joinedDate: new Date("2021-05-25T11:18:52.025Z"),
        },
        {
            name: "Somnis ",
            imageUrl: "https://c8.patreon.com/2/200/370344",
            thumbnailUrl: "https://c8.patreon.com/2/200/370344",
            url: "https://www.patreon.com/user?u=370344",
            joinedDate: new Date("2021-05-21T10:34:15.3Z"),
        },
        {
            name: "Batnavinatid ",
            imageUrl: "https://c8.patreon.com/2/200/3879639",
            thumbnailUrl: "https://c8.patreon.com/2/200/3879639",
            url: "https://www.patreon.com/user?u=3879639",
            joinedDate: new Date("2021-02-15T04:15:45.612Z"),
        },
        {
            name: "Jesse Hill",
            imageUrl: "https://c10.patreonusercontent.com/3/eyJ3IjoyMDB9/patreon-media/p/user/6839731/6a52fa5d961f4faebf1cb1fbf8ace7cd/1.jpg?token-time=2145916800&token-hash=SebuW-d0AR4xtvG3jkxmcptE6pDOh18LKfVLdgBnPJE%3D",
            thumbnailUrl: "https://c10.patreonusercontent.com/3/eyJ3IjoyMDB9/patreon-media/p/user/6839731/6a52fa5d961f4faebf1cb1fbf8ace7cd/1.jpg?token-time=2145916800&token-hash=SebuW-d0AR4xtvG3jkxmcptE6pDOh18LKfVLdgBnPJE%3D",
            url: "https://www.patreon.com/user?u=6839731",
            joinedDate: new Date("2021-04-08T23:07:46.058Z"),
        },
        {
            name: "losdukes",
            imageUrl: "https://c8.patreon.com/2/200/39923317",
            thumbnailUrl: "https://c8.patreon.com/2/200/39923317",
            url: "https://www.patreon.com/losdukes",
            joinedDate: new Date("2021-03-17T01:36:03.305Z"),
        },
        {
            name: "first name last name",
            imageUrl: "https://c10.patreonusercontent.com/3/eyJ3IjoyMDB9/patreon-media/p/user/29307027/13e81c3eb717429a862df1f6c52edb28/1.png?token-time=2145916800&token-hash=jm-3fib4s4N-v6RxS1s6NRhZ_d5vgDMny0X8O1APuOU%3D",
            thumbnailUrl: "https://c10.patreonusercontent.com/3/eyJ3IjoyMDB9/patreon-media/p/user/29307027/13e81c3eb717429a862df1f6c52edb28/1.png?token-time=2145916800&token-hash=jm-3fib4s4N-v6RxS1s6NRhZ_d5vgDMny0X8O1APuOU%3D",
            url: "https://www.patreon.com/user?u=29307027",
            joinedDate: new Date("2021-06-11T08:02:40.002Z"),
        },
        {
            name: "StingrayNine",
            imageUrl: "https://c10.patreonusercontent.com/3/eyJ3IjoyMDB9/patreon-media/p/user/52316579/28ae25f451804eaa83ecef4ef5c5ca46/1.jpg?token-time=2145916800&token-hash=ArTqe8CdpftyBNdDKgh-FBMLQBdm6Zi9PXy_j1R3teE%3D",
            thumbnailUrl: "https://c10.patreonusercontent.com/3/eyJ3IjoyMDB9/patreon-media/p/user/52316579/28ae25f451804eaa83ecef4ef5c5ca46/1.jpg?token-time=2145916800&token-hash=ArTqe8CdpftyBNdDKgh-FBMLQBdm6Zi9PXy_j1R3teE%3D",
            url: "https://www.patreon.com/user?u=52316579",
            joinedDate: new Date("2021-03-15T22:01:48.114Z"),
        },
        {
            name: "Kiwwa Qween",
            imageUrl: "https://c10.patreonusercontent.com/3/eyJ3IjoyMDB9/patreon-media/p/user/38393994/5e78f6bea6854d6f870d2c8b880c787e/1.png?token-time=2145916800&token-hash=37tI-0rDq6NokrVR7Ki5myBVCrNOS5gwfBRuVpAXuiM%3D",
            thumbnailUrl: "https://c10.patreonusercontent.com/3/eyJ3IjoyMDB9/patreon-media/p/user/38393994/5e78f6bea6854d6f870d2c8b880c787e/1.png?token-time=2145916800&token-hash=37tI-0rDq6NokrVR7Ki5myBVCrNOS5gwfBRuVpAXuiM%3D",
            url: "https://www.patreon.com/user?u=38393994",
            joinedDate: new Date("2021-04-06T00:25:08.998Z"),
        },
        {
            name: "Gunslinger Jill",
            imageUrl: "https://c10.patreonusercontent.com/3/eyJ3IjoyMDB9/patreon-media/p/user/54059664/8e51ee4954ba4ae794293aa660561636/1.png?token-time=2145916800&token-hash=_VE2JfvN8ylKWLtaazthU2Pjwu3x2uqYGhk8ppgCZik%3D",
            thumbnailUrl: "https://c10.patreonusercontent.com/3/eyJ3IjoyMDB9/patreon-media/p/user/54059664/8e51ee4954ba4ae794293aa660561636/1.png?token-time=2145916800&token-hash=_VE2JfvN8ylKWLtaazthU2Pjwu3x2uqYGhk8ppgCZik%3D",
            url: "https://www.patreon.com/user?u=54059664",
            joinedDate: new Date("2021-04-16T21:22:53.53Z"),
        }
    ],
    tiers: [],
    saveDate: new Date("2021-06-12T21:05:11.379863Z"),

}