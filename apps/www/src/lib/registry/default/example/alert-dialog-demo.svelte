<script lang="ts">
	import * as AlertDialog from "@/registry/default/ui/alert-dialog";
	import { Button } from "@/registry/default/ui/button";

	let open = false;
</script>

<AlertDialog.Root bind:open>
	<AlertDialog.Trigger asChild let:trigger>
		<Button builders={[trigger]} variant="outline">Show Dialog</Button>
	</AlertDialog.Trigger>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
			<AlertDialog.Description>
				This action cannot be undone. This will permanently delete your
				account and remove your data from our servers.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action>Continue</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
