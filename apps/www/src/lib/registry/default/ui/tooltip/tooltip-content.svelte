<script lang="ts">
	import { Tooltip as TooltipPrimitive } from "@huntabyte/primitives";
	import { cn } from "$lib/utils";

	type $$Props = TooltipPrimitive.ContentProps;
	let className: string | undefined | null = undefined;
	export { className as class };
	export let sideOffset: $$Props["sideOffset"] = 4;
</script>

<TooltipPrimitive.Content
	{sideOffset}
	class={cn(
		"z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-50 data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1",
		className
	)}
	{...$$restProps}
>
	<slot />
</TooltipPrimitive.Content>
