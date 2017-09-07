import path from "path";

/**
 * Function that mutates original webpack config.
 * Supports asynchronous changes when promise is returned.
 *
 * @param {object} config - original webpack config.
 * @param {object} env - options passed to CLI.
 * @param {WebpackConfigHelpers} helpers - object with useful helpers when working with config.
 **/
export default function (config, env, helpers) {
  // Start by looking at index.tsx
  config.resolve.alias["preact-cli-entrypoint"] = path.join(__dirname, "src", "index.tsx");

  // Use typescript
  config.module.loaders = config.module.loaders.concat([
    {
      test: /\.tsx?$/,
      include: [ path.join(__dirname, "src") ],
      loader: "awesome-typescript-loader"
    },
    {
      enforce: "pre",
      test: /\.tsx?$/,
      loader: "source-map-loader"
    },
  ]);

  return config;
}
