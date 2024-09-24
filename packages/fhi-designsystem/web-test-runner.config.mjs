import { esbuildPlugin } from "@web/dev-server-esbuild";

export default {
  files: ["**/*.test.ts"],
  plugins: [esbuildPlugin({ ts: true, tsconfig: "tsconfig.json" })],
};