<script lang="ts">
	import { cn } from "$lib/utils";
	import { Separator } from "$components/ui/separator";

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<Separator class={cn("-mx-1 my-1 h-px bg-muted", className)} {...$$restProps} />
