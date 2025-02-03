import { defineConfig } from "@tanstack/start/config";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  vite: {
    plugins: [
      // @ts-ignore
      tsConfigPaths({
        projects: ["./tsconfig.json"],
      }),
    ],
  },

  server: {
    // https://tanstack.com/router/latest/docs/framework/react/start/hosting#deployment
    // preset: "node-server",
  },
});
