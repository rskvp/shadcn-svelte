<script lang="ts">
	import * as Collapsible from "@/registry/new-york/ui/collapsible";
	import { CaretSort } from "radix-icons-svelte";
	import { Button } from "@/registry/new-york/ui/button";
</script>

<Collapsible.Root class="w-[350px] space-y-2">
	<div class="flex items-center justify-between space-x-4 px-4">
		<h4 class="text-sm font-semibold">@peduarte starred 3 repositories</h4>
		<Collapsible.Trigger let:trigger asChild>
			<Button
				builders={[trigger]}
				variant="ghost"
				size="sm"
				class="w-9 p-0"
			>
				<CaretSort class="h-4 w-4" />
				<span class="sr-only">Toggle</span>
			</Button>
		</Collapsible.Trigger>
	</div>
	<div class="rounded-md border px-4 py-3 font-mono text-sm">
		@melt-ui/melt-ui
	</div>
	<Collapsible.Content class="space-y-2">
		<div class="rounded-md border px-4 py-3 font-mono text-sm">
			@huntabyte/primitives
		</div>
		<div class="rounded-md border px-4 py-3 font-mono text-sm">
			@radix-ui/primitives
		</div>
	</Collapsible.Content>
</Collapsible.Root>
