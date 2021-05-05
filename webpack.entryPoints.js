module.exports = {
    nonTwitchEntryPoints: {
        Index: {
            path: './src/Index.tsx',
            outputHtml: 'index.html',
            template: 'template-non-twitch.html',
            build: true,
        }
    },
    twitchEntryPoints: {
        Config: {
            path: './src/Config.tsx',
            outputHtml: 'config.html',
            template: './template.html',
            build: true
        },
        Panel: {
            path: "./src/Panel.tsx",
            outputHtml: "panel.html",
            template: './template.html',
            build: true
        },
        Display: {
            path: './src/Display.tsx',
            outputHtml: 'display.html',
            template: './template.html',
            build: true,
        },
        // VideoComponent: {
        //   path: "./src/VideoComponent.js",
        //   outputHtml: "video_component.html",
        //   build: true
        // },
        // VideoOverlay: {
        //   path: "./src/VideoOverlay.js",
        //   outputHtml: "video_overlay.html",
        //   build: true
        // },
        // LiveConfig: {
        //   path: "./src/LiveConfig.js",
        //   outputHtml: "live_config.html",
        //   build: true
        // },
        // Mobile: {
        //   path: "./src/Mobile.js",
        //   outputHtml: "mobile.html",
        //   build: true
        // }
    }
}