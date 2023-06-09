<script lang="ts">
	import { cn } from "$lib/utils";
	import { ChevronRight } from "lucide-svelte";
	import { getContext } from "svelte";
	import type { Writable } from "svelte/store";

	let className: string | undefined | null = undefined;
	export { className as class };
	export let inset = false;

	const submenuOpen = getContext<Writable<boolean>>(`submenuOpen`);
	const id = getContext<string>("submenuTriggerId");
</script>

<button
	class={cn(
		"flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent hover:bg-accent w-full",
		inset && "pl-8",
		className
	)}
	{...$$restProps}
	on:click={() => ($submenuOpen = !$submenuOpen)}
	{id}
>
	<slot />
	<ChevronRight class="ml-auto h-4 w-4" />
</button>
