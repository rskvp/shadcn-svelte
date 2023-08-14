import { tmpdir } from "os";
import path from "path";
import type { SourceFile } from "ts-morph";
import fs from "fs-extra";
import { Project, ScriptKind } from "ts-morph";
import { z } from "zod";
import { Config } from "../get-config";
import { registryBaseColorSchema } from "../registry/schema";
import { transformImport } from "./transform-import";

export type TransformOpts = {
	filename: string;
	raw: string;
	config: Config;
	baseColor?: z.infer<typeof registryBaseColorSchema>;
};

export type Transformer<Output = string> = (
	opts: TransformOpts & { sourceCode: string }
) => Promise<Output>;

const project = new Project({
	compilerOptions: {}
});

export async function createTempSourceFile(filename: string) {
	const dir = await fs.mkdtemp(path.join(tmpdir(), "shadcn-"));
	return path.join(dir, filename);
}

export async function transform(opts: TransformOpts) {
	let transformedSource = await transformImport({
		sourceCode: opts.raw,
		...opts
	});

	return transformedSource;
}
