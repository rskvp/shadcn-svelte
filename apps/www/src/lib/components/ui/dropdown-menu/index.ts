import type { Action } from "svelte/action";
import type { Readable, Writable } from "svelte/store";

export type TriggerContext = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	useTrigger: Action<HTMLElement, void, Record<never, any>>;
	triggerAttrs: Readable<Record<string, string | undefined>>;
};

export type MenuContext = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	useMenu: Action<HTMLElement, void, Record<never, any>>;
	menuAttrs: Readable<Record<string, string>>;
};

export type ItemContext = Readable<
	(
		params:
			| string
			| {
					id: string;
					label: string;
			  }
	) => Record<string, string>
>;

export type OpenContext = Writable<boolean>;

export type SeparatorContext = Readable<Record<string, string>>;
