<script lang="ts">
	import { setContext } from "svelte";
	import { writable } from "svelte/store";
	import { uuid } from ".";

	let submenuOpen = writable(false);
	setContext("submenuOpen", submenuOpen);
	setContext("submenuTriggerId", uuid());
	setContext("submenuContentId", uuid());
</script>

<slot submenuOpen={$submenuOpen} />
