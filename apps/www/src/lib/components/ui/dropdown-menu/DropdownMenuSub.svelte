<script lang="ts">
	import { setContext } from "svelte";
	import type { Writable } from "svelte/store";
	import type { TriggerContext, MenuContext } from ".";
	import { createMenu } from "@grail-ui/svelte/menu";

	const { useMenu, menuAttrs, triggerAttrs, useTrigger, open } = createMenu({
		positioning: {
			placement: "right-start",
			strategy: "fixed"
		}
	});

	setContext<Writable<boolean>>("open", open);

	setContext<MenuContext>("menuCtx", {
		useMenu,
		menuAttrs
	});
	setContext<TriggerContext>("triggerCtx", {
		triggerAttrs,
		useTrigger
	});
</script>

<slot />
