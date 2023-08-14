import path from "path";
import * as z from "zod";

export const DEFAULT_STYLE = "default";
export const DEFAULT_COMPONENTS = "$components";
export const DEFAULT_UTILS = "$utils";
export const DEFAULT_TAILWIND_CSS = "src/app.postcss";
export const DEFAULT_TAILWIND_CONFIG = "tailwind.config.cjs";
export const DEFAULT_TAILWIND_BASE_COLOR = "slate";

const SVELTE_CONFIG_PATH = path.join(process.cwd(), "svelte.config.js");
const IMPORT_SVELTE_CONFIG_PATH = "file://" + SVELTE_CONFIG_PATH;

export const rawConfigSchema = z
	.object({
		$schema: z.string().optional(),
		style: z.string(),
		tailwind: z.object({
			config: z.string(),
			css: z.string(),
			baseColor: z.string(),
			cssVariables: z.boolean().default(true)
		}),
		aliases: z.object({
			components: z.string(),
			utils: z.string()
		})
	})
	.strict();

export type RawConfig = z.infer<typeof rawConfigSchema>;

export const configSchema = rawConfigSchema.extend({
	resolvedPaths: z.object({
		tailwindConfig: z.string(),
		tailwindCss: z.string(),
		utils: z.string(),
		components: z.string()
	})
});

export type Config = z.infer<typeof configSchema>;

export async function getRawConfig(): Promise<RawConfig | null> {
	const { default: svelteConfig } = await import(IMPORT_SVELTE_CONFIG_PATH);

	try {
		return rawConfigSchema.parse(svelteConfig.shadcn);
	} catch (e) {
		return null;
	}
}
