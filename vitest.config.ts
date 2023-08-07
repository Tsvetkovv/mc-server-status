import * as path from "node:path";
import { fileURLToPath } from "node:url";
// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from "vitest/config";
import env from "dotenv";

env.config({ path: ".env.test" });
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export default defineConfig({
  test: {
    include: ["**/*.spec.ts"],
    globals: true,
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
    },
  },
});
