import type { Action } from "svelte/action";
import type { Readable, Writable } from "svelte/store";
import { readable } from "svelte/store";
import {
	arrow,
	computePosition,
	autoUpdate,
	type Middleware,
	type Boundary,
	flip,
	offset,
	shift,
	size
} from "@floating-ui/dom";
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

export type PositioningOptions = {
	/**
	 * The strategy to use for positioning.
	 * @defaultValue `"absolute"`
	 */
	strategy?: "absolute" | "fixed";

	/**
	 * The initial placement of the floating element.
	 * @defaultValue `"top"`
	 */
	placement?:
		| "top"
		| "top-start"
		| "top-end"
		| "right"
		| "right-start"
		| "right-end"
		| "bottom"
		| "bottom-start"
		| "bottom-end"
		| "left"
		| "left-start"
		| "left-end";

	/**
	 * The offset of the floating element.
	 */
	offset?: { mainAxis?: number; crossAxis?: number };

	/**
	 * The main axis offset or gap between the reference and floating elements.
	 * @defaultValue `5`
	 */
	gutter?: number;

	/**
	 * The virtual padding around the viewport edges to check for overflow.
	 * @defaultValue `8`
	 */
	overflowPadding?: number;

	/**
	 * Whether to flip the placement.
	 * @defaultValue `true`
	 */
	flip?: boolean;

	/**
	 * Whether the floating element can overlap the reference element.
	 * @defaultValue `false`
	 */
	overlap?: boolean;

	/**
	 * Whether to make the floating element same width as the reference element.
	 * @defaultValue `false`
	 */
	sameWidth?: boolean;

	/**
	 * Whether the floating element should fit the viewport.
	 * @defaultValue `false`
	 */
	fitViewport?: boolean;

	/**
	 * The overflow boundary of the reference element.
	 */
	boundary?: Boundary;
};

const defaultOptions: PositioningOptions = {
	strategy: "absolute",
	placement: "top",
	gutter: 5,
	flip: true,
	sameWidth: false,
	overflowPadding: 8
};

const ARROW_TRANSFORM = {
	bottom: "rotate(45deg)",
	left: "rotate(135deg)",
	top: "rotate(225deg)",
	right: "rotate(315deg)"
};

export const arrowAttrs = (arrowSize = 8) =>
	readable({
		"data-arrow": "true",
		style: `position: absolute; width: var(--arrow-size, ${arrowSize}px); height: var(--arrow-size, ${arrowSize}px);`
	});

export function getPlacement(
	reference: HTMLElement | null,
	floating: HTMLElement | null,
	opts: PositioningOptions = {}
): () => void {
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	if (!floating || !reference) return () => void 0;

	const options = Object.assign({}, defaultOptions, opts);

	const arrowEl = floating.querySelector<HTMLElement>("[data-arrow=true]");
	const middleware: Middleware[] = [];

	if (options.flip) {
		middleware.push(
			flip({
				boundary: options.boundary,
				padding: options.overflowPadding
			})
		);
	}

	const arrowOffset = arrowEl ? arrowEl.offsetHeight / 2 : 0;
	if (options.gutter || options.offset) {
		const data = options.gutter
			? { mainAxis: options.gutter }
			: options.offset;
		if (data?.mainAxis != null) data.mainAxis += arrowOffset;
		middleware.push(offset(data));
	}

	middleware.push(
		shift({
			boundary: options.boundary,
			crossAxis: options.overlap,
			padding: options.overflowPadding
		})
	);

	if (arrowEl) {
		middleware.push(arrow({ element: arrowEl, padding: 8 }));
	}

	middleware.push(
		size({
			padding: options.overflowPadding,
			apply({ rects, availableHeight, availableWidth }) {
				if (options.sameWidth) {
					Object.assign(floating.style, {
						width: `${Math.round(rects.reference.width)}px`,
						minWidth: "unset"
					});
				}

				if (options.fitViewport) {
					Object.assign(floating.style, {
						maxWidth: `${availableWidth}px`,
						maxHeight: `${availableHeight}px`
					});
				}
			}
		})
	);

	function compute() {
		if (!reference || !floating) return;
		const { placement, strategy } = options;

		computePosition(reference, floating, {
			placement,
			middleware,
			strategy
		}).then((data) => {
			const x = Math.round(data.x);
			const y = Math.round(data.y);

			Object.assign(floating.style, {
				top: `${y}px`,
				left: `${x}px`
			});

			if (arrowEl && data.middlewareData.arrow) {
				const { x, y } = data.middlewareData.arrow;

				const dir = data.placement.split("-")[0] as
					| "top"
					| "bottom"
					| "left"
					| "right";

				Object.assign(arrowEl.style, {
					position: "absolute",
					left: x != null ? `${x}px` : "",
					top: y != null ? `${y}px` : "",
					[dir]: `calc(100% - ${arrowOffset}px)`,
					transform: ARROW_TRANSFORM[dir],
					backgroundColor: "inherit",
					zIndex: "inherit"
				});
			}

			return data;
		});
	}

	// Apply `position` to floating element prior to the computePosition() call.
	Object.assign(floating.style, {
		position: options.strategy
	});

	return autoUpdate(reference, floating, compute);
}

export function uuid() {
	try {
		return crypto.randomUUID();
	} catch {
		let result = "";
		const hexcodes = "0123456789abcdef".split("");

		for (let index = 0; index < 32; index++) {
			let value = Math.floor(Math.random() * 16);

			switch (index) {
				case 8:
					result += "-";
					break;
				case 12:
					value = 4;
					result += "-";
					break;
				case 16:
					value = (value & 3) | 8;
					result += "-";
					break;
				case 20:
					result += "-";
					break;
			}
			result += hexcodes[value];
		}
		return result;
	}
}
