import { resolve } from "path";
import preactCliLodash from "preact-cli-lodash";
import preactCliTypeScript from "preact-cli-plugin-typescript";

export default function (config, env, helpers) {
  // Use typescript
  config = preactCliLodash(config);
  config = preactCliTypeScript(config);

  // Start by looking at index.tsx
  config.resolve.alias["preact-cli-entrypoint"] = resolve(__dirname, "src", "index.tsx");

  return config;
}
