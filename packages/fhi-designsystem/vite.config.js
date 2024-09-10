import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {

    const availableModes = ["cdn", "npm"];

    if (!mode) {
        throw Error("You need to spesify mode. available modes: " + availableModes);
    }

    switch (mode) {
        case "cdn":
            return {
                build: {
                    lib: {
                        entry: "./src/entry.ts",
                        name: "fhi-designsystem",
                        fileName: "fhi-designsystem",
                    },
                    rollupOptions: {
                        external: ["lit"],
                        output: {
                            globals: {
                                lit: "lit",
                            },
                        },
                    },
                    outDir: "dist/cdn",
                }
            }
        case "npm":
            return {
                build: {
                    lib: {
                        entry: {
                            "index": "./src/entry.ts",
                            "my-element": "./src/components/my-element/my-element.ts",
                        },
                    },
                    rollupOptions: {
                        external: ["lit"],
                        output: {
                            globals: {
                                lit: "lit",
                            },
                        },
                    },
                    outDir: "dist/npm",
                }
            }
        default:
            throw Error("Unknown mode: " + mode + ". available modes: " + availableModes);
    }
});
