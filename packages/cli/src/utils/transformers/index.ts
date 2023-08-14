import { tmpdir } from "os";
import path from "path";
import type { SourceFile } from "ts-morph";
import fs from "fs-extra";
import { Project, ScriptKind } from "ts-morph";
import { z } from "zod";
import { Config } from "../get-config";
import { registryBaseColorSchema } from "../registry/schema";

export type TransformOpts = {
	filename: string;
	raw: string;
	config: Config;
	baseColor?: z.infer<typeof registryBaseColorSchema>;
};

export type Transformer<Output = SourceFile> = (
	opts: TransformOpts & { sourceFile: SourceFile }
) => Promise<Output>;

const project = new Project({
	compilerOptions: {}
});

export async function createTempSourceFile(filename: string) {
	const dir = await fs.mkdtemp(path.join(tmpdir(), "shadcn-"));
}
