import babel from "rollup-plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import resolve from "@rollup/plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";
import sass from "rollup-plugin-sass";

import packageJson from "./package.json";

export default {
  input: "./src/index.tsx",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: "inline",
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: "inline",
    },
  ],
  plugins: [
    peerDepsExternal(),
    sass({ insert: true }),
    postcss(),
    typescript(),
    babel({
      exclude: "node_modules/**",
    }),
    resolve(),
    commonjs(),
  ],
  external: ["react-feather"],
};
