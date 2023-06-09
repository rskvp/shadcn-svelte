<script lang="ts">
	import { createMenu } from "@grail-ui/svelte/menu";
	import { setContext } from "svelte";
	import type {
		SeparatorContext,
		ItemContext,
		MenuContext,
		TriggerContext
	} from ".";

	const {
		useTrigger,
		triggerAttrs,
		useMenu,
		menuAttrs,
		itemAttrs,
		open,
		separatorAttrs
	} = createMenu({
		onSelect: (id) => {
			console.log(id);
			alert(id);
		},
		positioning: {
			offset: {
				mainAxis: 2,
				crossAxis: -5
			},
			placement: "right-start"
		},
		portal: "#sub-menu"
	});

	setContext<TriggerContext>("triggerCtx", {
		useTrigger,
		triggerAttrs
	});

	setContext<MenuContext>("menuCtx", {
		useMenu,
		menuAttrs
	});

	setContext<ItemContext>("itemCtx", itemAttrs);

	setContext<SeparatorContext>("separatorCtx", separatorAttrs);
</script>

<slot subOpen={$open} />
