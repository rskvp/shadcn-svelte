<script lang="ts">
	import { cn } from "$lib/utils";
	import { Label } from "$components/ui/label";

	let className: string | undefined | null = undefined;
	export { className as class };
	export let inset = false;
</script>

<Label
	class={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
	{...$$restProps}
>
	<slot />
</Label>
