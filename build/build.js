import { build } from "esbuild";

await build({
    entryPoints: ["src/index.ts"],
    outdir: "scripts",
    platform: "node",
    format: "esm",
    target: "es2022",
    bundle: true,
    sourcemap: false,
    minify: true,
    tsconfig: "tsconfig.json",
    outbase: "src",
    logLevel: "info",
});
