<script lang="ts">
	import * as Card from "@/registry/default/ui/card";
	import * as Select from "@/registry/default/ui/select";
	import { Button } from "@/registry/default/ui/button";
	import { Input } from "@/registry/default/ui/input";
	import { Label } from "@/registry/default/ui/label";
	import { Textarea } from "@/registry/default/ui/textarea";
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Report an issue</Card.Title>
		<Card.Description>
			What area are you having problems with?
		</Card.Description>
	</Card.Header>
	<Card.Content class="grid gap-6">
		<div class="grid grid-cols-2 gap-4">
			<div class="grid gap-2">
				<Label for="area">Area</Label>
				<Select.Root value="billing">
					<Select.Trigger id="area">
						<Select.Value placeholder="Select" />
					</Select.Trigger>
					<Select.Content>
						<Select.Item value="team">Team</Select.Item>
						<Select.Item value="billing">Billing</Select.Item>
						<Select.Item value="account">Account</Select.Item>
						<Select.Item value="deployments"
							>Deployments</Select.Item
						>
						<Select.Item value="support">Support</Select.Item>
					</Select.Content>
				</Select.Root>
			</div>
			<div class="grid gap-2">
				<Label for="security-level">Security Level</Label>
				<Select.Root value="2">
					<Select.Trigger id="security-level">
						<Select.Value placeholder="Select level" />
					</Select.Trigger>
					<Select.Content>
						<Select.Item value="1">Severity 1 (Highest)</Select.Item
						>
						<Select.Item value="2">Severity 2</Select.Item>
						<Select.Item value="3">Severity 3</Select.Item>
						<Select.Item value="4">Severity 4 (Lowest)</Select.Item>
					</Select.Content>
				</Select.Root>
			</div>
		</div>
		<div class="grid gap-2">
			<Label for="subject">Subject</Label>
			<Input id="subject" placeholder="I need help with..." />
		</div>
		<div class="grid gap-2">
			<Label for="description">Description</Label>
			<Textarea
				id="description"
				placeholder="Please include all information relevant to your issue."
			/>
		</div>
	</Card.Content>
	<Card.Footer class="justify-between space-x-2">
		<Button variant="ghost">Cancel</Button>
		<Button>Submit</Button>
	</Card.Footer>
</Card.Root>
