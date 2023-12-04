"use strict";

/* eslint-env node */

import path from "path";
import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import svgo from "vite-plugin-svgo";

export default defineConfig({
  plugins: [
    createHtmlPlugin({
      entry: "/src/main.js",
      template: "public/index.html",
    }),
    svgo({
      multipass: true,
      plugins: [
        {
          name: "preset-default",
          params: {
            overrides: {
              convertShapeToPath: false,
              collapseGroups: false,
            },
          },
        },
        {
          name: "prefixIds",
          params: {
            prefixIds: false,
            prefixClassNames: true,
          },
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      "game-engine": path.resolve(__dirname, "src", "game-engine"),
    },
  },
  define: {
    ANALYTICS: JSON.stringify(process.env.ANALYTICS),
  },
});
