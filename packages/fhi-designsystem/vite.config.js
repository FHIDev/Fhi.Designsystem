import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const availableDeployTargets = ["cdn", "npm"];

  const env = loadEnv(mode, process.cwd(), "");

  if (!env?.DEPLOY_TARGET) {
    console.log("No DEPLOY_TARGET specified, defaulting to 'npm'");
    env.DEPLOY_TARGET = "npm";
  }

  switch (env.DEPLOY_TARGET) {
    case "cdn":
      return {
        build: {
          lib: {
            entry: "./src/entry.ts",
            name: "fhi-designsystem",
            fileName: "fhi-designsystem",
          },
          sourcemap: true,
          rollupOptions: {
            external: ["lit"],
            output: {
              globals: {
                lit: "lit",
              },
            },
          },
          outDir: "dist/cdn",
        },
      };
    case "npm":
      return {
        build: {
          lib: {
            entry: {
              /*
                If you create a new component you need to add a reference to it here, e.g:
                "new-component": "./src/components/new-component/new-component.ts",
            */
              index: "./src/entry.ts",
              "my-element": "./src/components/my-element/my-element.ts",
            },
          },
          sourcemap: true,
          rollupOptions: {
            external: ["lit"],
            output: {
              globals: {
                lit: "lit",
              },
            },
          },
          outDir: "dist/npm",
        },
      };
    default:
      throw Error(
        "Unknown DEPLOY_TARGET: " +
          env.DEPLOY_TARGET +
          ". DEPLOY_TARGET should be one of these: " +
          availableDeployTargets
      );
  }
});
