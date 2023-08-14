import { Transformer } from "../../utils/transformers";

export const transformImport: Transformer = async ({ sourceCode, config }) => {
	const replacedSourceCode = sourceCode
		.replace(/^@\/registry\/[^/]+/, config.aliases.components)
		.replace(/^@\/utils/, config.aliases.utils);

	return replacedSourceCode;
};
