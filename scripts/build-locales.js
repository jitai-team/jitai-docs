#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const rootDir = path.resolve(__dirname, "..");
const args = process.argv.slice(2);
const locales = ["en", "zh"];
const booleanArgs = new Set(["--help", "--low-cpu", "--no-clean", "--no-minify"]);
const valueArgs = new Set(["--locale", "--max-old-space-size"]);
const localeConfig = {
    en: {
        baseUrl: "/",
        outDir: "build",
    },
    zh: {
        baseUrl: "/zh/",
        outDir: "build/zh",
    },
};

function printHelp() {
    console.log(`Usage: node scripts/build-locales.js [options]

Options:
  --locale <en|zh>            Build one locale only. Defaults to all locales.
  --low-cpu                   Limit libuv thread pool and use lower Node heap.
  --no-minify                 Disable minification to reduce build memory usage.
  --max-old-space-size <MB>   Override Node heap size. Defaults to 2048, or 1536 with --low-cpu.
  --no-clean                  Keep existing output before building.
  --help                      Show this help message.

Examples:
  pnpm build
  pnpm build:low-cpu
  pnpm build:zh:low-cpu`);
}

function validateArgs() {
    for (let index = 0; index < args.length; index += 1) {
        const arg = args[index];
        const [name] = arg.split("=");

        if (booleanArgs.has(arg) || valueArgs.has(name)) {
            if (valueArgs.has(arg)) {
                const value = args[index + 1];
                if (!value || value.startsWith("--")) {
                    console.error(`Missing value for option: ${arg}`);
                    process.exit(1);
                }
                index += 1;
            }
            continue;
        }

        console.error(`Unknown option: ${arg}`);
        console.error("Run `node scripts/build-locales.js --help` for usage.");
        process.exit(1);
    }
}

function readArgValue(name) {
    const inline = args.find((arg) => arg.startsWith(`${name}=`));
    if (inline) {
        return inline.slice(name.length + 1);
    }

    const index = args.indexOf(name);
    if (index >= 0) {
        return args[index + 1];
    }

    return undefined;
}

function hasArg(name) {
    return args.includes(name);
}

function resolveLocales() {
    const locale = readArgValue("--locale");
    if (!locale) {
        return locales;
    }

    if (!locales.includes(locale)) {
        console.error(`Unsupported locale: ${locale}`);
        process.exit(1);
    }

    return [locale];
}

function rm(relativePath) {
    fs.rmSync(path.join(rootDir, relativePath), {
        recursive: true,
        force: true,
    });
}

function withMaxOldSpaceSize(nodeOptions, size) {
    const withoutExisting = (nodeOptions || "")
        .replace(/--max-old-space-size=\S+/g, "")
        .trim();

    return `${withoutExisting} --max-old-space-size=${size}`.trim();
}

function runBuild(locale, options) {
    const config = localeConfig[locale];
    const command = process.platform === "win32" ? "pnpm.cmd" : "pnpm";
    const commandArgs = [
        "docusaurus",
        "build",
        "--locale",
        locale,
        "--out-dir",
        config.outDir,
    ];

    if (options.noMinify) {
        commandArgs.push("--no-minify");
    }

    const env = {
        ...process.env,
        DOCUSAURUS_BASE_URL: config.baseUrl,
        NODE_OPTIONS: withMaxOldSpaceSize(
            process.env.NODE_OPTIONS,
            options.maxOldSpaceSize,
        ),
    };

    if (options.lowCpu) {
        env.UV_THREADPOOL_SIZE = process.env.UV_THREADPOOL_SIZE || "1";
    }

    console.log(
        `\nBuilding ${locale}: baseUrl=${config.baseUrl}, outDir=${config.outDir}`,
    );

    const result = spawnSync(command, commandArgs, {
        cwd: rootDir,
        env,
        stdio: "inherit",
    });

    if (result.status !== 0) {
        process.exit(result.status || 1);
    }
}

function runPostBuild() {
    const command = process.execPath;
    const result = spawnSync(command, ["scripts/fix-homepage-links.js"], {
        cwd: rootDir,
        stdio: "inherit",
    });

    if (result.status !== 0) {
        process.exit(result.status || 1);
    }
}

function main() {
    if (hasArg("--help")) {
        printHelp();
        return;
    }

    validateArgs();

    const selectedLocales = resolveLocales();
    const lowCpu = hasArg("--low-cpu");
    const noMinify = hasArg("--no-minify");
    const maxOldSpaceSize =
        readArgValue("--max-old-space-size") ||
        process.env.DOCUSAURUS_MAX_OLD_SPACE_SIZE ||
        (lowCpu ? "1536" : "2048");

    if (!hasArg("--no-clean")) {
        if (selectedLocales.length === locales.length) {
            rm("build");
        } else {
            rm(localeConfig[selectedLocales[0]].outDir);
        }
    }

    for (const locale of selectedLocales) {
        rm(".docusaurus");
        runBuild(locale, {
            lowCpu,
            noMinify,
            maxOldSpaceSize,
        });
    }

    runPostBuild();
}

main();
