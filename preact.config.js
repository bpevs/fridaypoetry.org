import { resolve } from "path";
import preactCliTypeScript from "preact-cli-plugin-typescript";

export default function (config, env, helpers) {
  // Use typescript
  config = preactCliTypeScript(config);
  config.resolve.alias["lodash"] = resolve(__dirname, "node_modules", "lodash-es");

  return config;
}
