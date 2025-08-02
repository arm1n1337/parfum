import { context } from "esbuild";

const ctx = await context({
    entryPoints: ["src/index.ts"],
    outdir: "scripts",
    platform: "node",
    format: "esm",
    target: "es2022",
    bundle: true,
    sourcemap: false,
    tsconfig: "tsconfig.json",
    outbase: "src",
    logLevel: "info",
    write: true,
    minify: true,
});

await ctx.watch();

console.log("Watching for changes...");
