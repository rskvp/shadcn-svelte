<script lang="ts">
	import { cn } from "$lib/utils";
	import { getContext } from "svelte";
	import type { Action } from "svelte/action";
	import type { Writable } from "svelte/store";
	import type { MenuContext } from ".";

	let className: string | undefined | null = undefined;
	export { className as class };

	const submenuOpen = getContext<Writable<boolean>>("open");
	const { useMenu, menuAttrs } = getContext<MenuContext>("menuCtx");
</script>

<div
	class={cn(
		"z-[55] min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1",
		$submenuOpen === false && "hidden",
		className
	)}
	{...$$restProps}
	use:useMenu
	{...$menuAttrs}
>
	<slot />
</div>
