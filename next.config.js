const withCSS = require("@zeit/next-css");
const NextWorkboxPlugin = require("next-workbox-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");

module.exports = withCSS({
  webpack(config, { isServer, buildId, dev }) {
    const workboxOptions = {
      clientsClaim: true,
      skipWaiting: true,
      globPatterns: [".next/static/*", ".next/static/commons/*"],
      modifyUrlPrefix: {
        ".next": "/_next"
      },
      runtimeCaching: [
        {
          urlPattern: "/",
          handler: "networkFirst",
          options: {
            cacheName: "html-cache"
          }
        },
        {
          urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif)/,
          handler: "cacheFirst",
          options: {
            cacheName: "image-cache",
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    };

    if (!isServer && !dev) {
      config.plugins.push(
        new NextWorkboxPlugin({
          buildId,
          ...workboxOptions
        }),
        new WebpackPwaManifest({
          filename: "static/manifest.json",
          name: "money-on-my-mind",
          short_name: "monm",
          description: "track how much money you make per second in realtime",
          background_color: "#ffffff",
          theme_color: "#5755d9",
          display: "standalone",
          orientation: "portrait",
          fingerprints: false,
          inject: false,
          start_url: "/",
          ios: {
            "apple-mobile-web-app-title": "MoneyMaker",
            "apple-mobile-web-app-status-bar-style": "#5755d9"
          },
          icons: [
            {
              src: path.resolve("static/favicon.ico"),
              sizes: [96, 128, 192, 256, 384, 512],
              destination: "/static"
            }
          ],
          includeDirectory: true,
          publicPath: ".."
        })
      );
    }

    return config;
  }
});
