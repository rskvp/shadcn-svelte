<script lang="ts">
	import { Tabs as TabsPrimitive } from "@huntabyte/primitives";
	import { cn } from "$lib/utils";

	type $$Props = TabsPrimitive.ListProps;
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<TabsPrimitive.List
	class={cn(
		"inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
		className
	)}
	{...$$restProps}
>
	<slot />
</TabsPrimitive.List>
