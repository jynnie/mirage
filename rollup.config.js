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
      sourcemap: true,
      strict: false,
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: true,
    },
  ],
  // TODO: Do I need all these? I really was just fiddling to get something to work...
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs({
      include: "node_modules/**",
    }),
    sass({ insert: true }),
    postcss(),
    typescript({ lib: ["es5", "es6", "dom"], target: "es5" }),
    babel({
      exclude: "node_modules/**",
    }),
  ],
  external: ["react", "react-feather"],
};
