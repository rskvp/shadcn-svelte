<script lang="ts">
	import { cn } from "$lib/utils";
	import { getContext } from "svelte";
	import type { MenuContext } from ".";

	let className: string | undefined | null = undefined;
	export { className as class };

	const { useMenu, menuAttrs } = getContext<MenuContext>("menuCtx");
</script>

<div
	class={cn(
		"z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1",
		className
	)}
	use:useMenu
	{...$menuAttrs}
	{...$$restProps}
>
	<slot />
</div>
