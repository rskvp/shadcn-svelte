<script lang="ts">
	import { cn } from "$lib/utils";
	import type { HTMLAnchorAttributes } from "svelte/elements";

	let className: string | undefined | null = undefined;
	export { className as class };
	export let inset = false;
	export let href: HTMLAnchorAttributes["href"] = undefined;
	export let disabled: boolean | undefined = undefined;
</script>

<svelte:element
	this={href ? "a" : "button"}
	{href}
	class={cn(
		"relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full",
		inset && "pl-8",
		className
	)}
	{...$$restProps}
	data-disabled={disabled}
>
	<slot />
</svelte:element>
