import path from "path";
import chalk from "chalk";
import { Command } from "commander";
import { execa } from "execa";
import fs, { existsSync } from "fs-extra";
import template from "lodash.template";
import ora from "ora";
import prompts from "prompts";
import { z } from "zod";
import {
	Config,
	DEFAULT_COMPONENTS,
	DEFAULT_TAILWIND_CONFIG,
	DEFAULT_TAILWIND_CSS,
	DEFAULT_UTILS,
	getConfig
} from "../utils/get-config";
import { getPackageManager } from "../utils/get-package-manager";
import { logger } from "../utils/logger";
import {
	getRegistryBaseColor,
	getRegistryBaseColors,
	getRegistryStyles
} from "../utils/registry";
import * as templates from "../utils/templates";

const PROJECT_DEPENDENCIES = [
	"tailwindcss-animate",
	"tailwind-variants",
	"clsx",
	"tailwind-merge"
];

const initOptionsSchema = z.object({
	cwd: z.string(),
	yes: z.boolean()
});

export const init = new Command()
	.name("init")
	.description("initialize your project and install dependencies")
	.option("-y, --yes", "skip the confirmation prompt", false)
	.option(
		"-c, --cwd <cwd>",
		"the working directory. defaults to the current working directory.",
		process.cwd()
	)
	.action(async (opts) => {
		try {
			const options = initOptionsSchema.parse(opts);
			const cwd = path.resolve(options.cwd);

			if (!existsSync(cwd)) {
				logger.error(
					`The path ${cwd} does not exist. Please try again.`
				);
				process.exit(1);
			}

			// Read config
			const existingConfig = await getConfig(cwd);
			const config = await promptForConfig(
				cwd,
				existingConfig,
				options.yes
			);

			await runInit;
		} catch (error) {}
	});

export async function promptForConfig(
	cwd: string,
	defaultConfig: Config | null = null,
	skip = false
) {
	const highlight = (text: string) => chalk.cyan(text);

	const styles = await getRegistryStyles();
	const baseColors = await getRegistryBaseColors();

	const options = await prompts([
		{
			type: "select",
			name: "style",
			message: `Which ${highlight("style")} would you like to use?`,
			choices: styles.map((style) => ({
				title: style.label,
				value: style.name
			}))
		},
		{
			type: "select",
			name: "tailwindBaseColor",
			message: `Which color would you like to use as ${highlight(
				"base color"
			)}?`,
			choices: baseColors.map((color) => ({
				title: color.label,
				value: color.name
			}))
		},
		{
			type: "text",
			name: "tailwindCss",
			message: `Where is your ${highlight("global CSS")} file?`,
			initial: defaultConfig?.tailwind.css ?? DEFAULT_TAILWIND_CSS
		},
		{
			type: "toggle",
			name: "tailwindCssVariables",
			message: `Would you like to use ${highlight(
				"CSS variables"
			)} for colors?`,
			initial: defaultConfig?.tailwind.cssVariables ?? true,
			active: "yes",
			inactive: "no"
		},
		{
			type: "text",
			name: "tailwindConfig",
			message: `Where is your ${highlight(
				"tailwind.config.js"
			)} located?`,
			initial: defaultConfig?.tailwind.config ?? DEFAULT_TAILWIND_CONFIG
		},
		{
			type: "text",
			name: "components",
			message: `Configure the import alias for ${highlight(
				"components"
			)}:`,
			initial: defaultConfig?.aliases["components"] ?? DEFAULT_COMPONENTS
		},
		{
			type: "text",
			name: "utils",
			message: `Configure the import alias for ${highlight("utils")}:`,
			initial: defaultConfig?.aliases["utils"] ?? DEFAULT_UTILS
		}
	]);
}

export async function runInit(cwd: string, config: Config) {
	const spinner = ora(`Initializing project...`)?.start();

	// Ensure all resolved paths directories exist.
	for (const [key, resolvedPath] of Object.entries(config.resolvedPaths)) {
		// Determine if the path is a file or directory.
		// TODO: is there a better way to do this?
		let dirname = path.extname(resolvedPath)
			? path.dirname(resolvedPath)
			: resolvedPath;

		// If the utils alias is set to something like "@/lib/utils",
		// assume this is a file and remove the "utils" file name.
		// TODO: In future releases we should add support for individual utils.
		if (key === "utils" && resolvedPath.endsWith("/utils")) {
			// Remove /utils at the end.
			dirname = dirname.replace(/\/utils$/, "");
		}

		if (!existsSync(dirname)) {
			await fs.mkdir(dirname, { recursive: true });
		}
	}

	const extension = "ts";

	// Write tailwind config.
	await fs.writeFile(
		config.resolvedPaths.tailwindConfig,
		template(templates.TAILWIND_CONFIG)({ extension }),
		"utf8"
	);

	// Write css file.
	const baseColor = await getRegistryBaseColor(config.tailwind.baseColor);
	if (baseColor) {
		await fs.writeFile(
			config.resolvedPaths.tailwindCss,
			config.tailwind.cssVariables
				? baseColor.cssVarsTemplate
				: baseColor.inlineColorsTemplate,
			"utf8"
		);
	}

	// Write cn file.
	await fs.writeFile(
		`${config.resolvedPaths.utils}.${extension}`,
		templates.UTILS,
		"utf8"
	);

	spinner?.succeed();

	// Install dependencies.
	const dependenciesSpinner = ora(`Installing dependencies...`)?.start();
	const packageManager = await getPackageManager(cwd);

	// TODO: add support for other icon libraries.
	const deps = [
		...PROJECT_DEPENDENCIES,
		config.style === "new-york" ? "radix-icons-svelte" : "lucide-svelte"
	];

	await execa(
		packageManager,
		[packageManager === "npm" ? "install" : "add", ...deps],
		{
			cwd
		}
	);
	dependenciesSpinner?.succeed();
}
