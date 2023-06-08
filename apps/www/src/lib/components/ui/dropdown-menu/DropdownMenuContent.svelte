<script lang="ts">
	import { cn } from "$lib/utils";

	let className: string | undefined | null = null;
	export { className as class };
	export let useMenu: any;
</script>

<div
	class={cn(
		"z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
		className
	)}
	{...$$restProps}
	use:useMenu
>
	<slot />
</div>
