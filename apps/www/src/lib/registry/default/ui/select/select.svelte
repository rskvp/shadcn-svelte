<script lang="ts">
	import { Select as SelectPrimitive } from "@huntabyte/primitives";

	type $$Props = SelectPrimitive.Props;
	export let value: $$Props["value"] = undefined;
	export let open: $$Props["open"] = undefined;
</script>

<SelectPrimitive.Root bind:value bind:open {...$$restProps}>
	<slot />
</SelectPrimitive.Root>
