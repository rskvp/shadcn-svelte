<script lang="ts">
	import {
		FormDescription,
		FormField,
		FormLabel,
		FormMessage
	} from "$components/ui/form";
	import SuperDebug from "sveltekit-superforms/client/SuperDebug.svelte";
	import type { profileSchema } from "./schemas";
	import type { Validation } from "sveltekit-superforms/index";
	import { superForm } from "sveltekit-superforms/client";
	import { Button } from "$components/ui/button";
	import { cn } from "$lib/utils";
	import { Loader2 } from "lucide-svelte";
	import { Input } from "$components/ui/input";
	import { Textarea } from "$components/ui/textarea";

	export let data: Validation<typeof profileSchema>;

	const form = superForm(data, {
		taintedMessage: null
	});

	$: ({ form: superFrm, delayed, errors, tainted } = form);
</script>

<SuperDebug data={{ $superFrm, $errors, $tainted }} />
<form action="?/updateProfile" method="POST" class="space-y-8" use:form.enhance>
	<FormField {form} let:fieldWithListeners name="username">
		<FormLabel>Username</FormLabel>
		<Input type="text" {...fieldWithListeners()} />
		<FormDescription>
			This is your public display name. It can be your real name or a
			pseudonym. You can only change this once every 30 days.
		</FormDescription>
		<FormMessage />
	</FormField>
	<FormField {form} let:fieldWithListeners name="email">
		<FormLabel>Email</FormLabel>
		<Input type="text" {...fieldWithListeners()} />
		<FormDescription>
			You can manage verified email addresses in your email settings.
		</FormDescription>
		<FormMessage />
	</FormField>
	<FormField {form} let:fieldWithListeners name="bio">
		<FormLabel>Bio</FormLabel>
		<Textarea {...fieldWithListeners()} />
		<FormDescription>
			You can @mention other users and organizations to link to them.
		</FormDescription>
		<FormMessage />
	</FormField>
	<div class="space-y-2">
		{#each $superFrm.urls as url, index}
			<FormField {form} let:fieldWithListeners name={`urls[${index}]`}>
				<FormLabel class={cn(index !== 0 && "sr-only")}>URLs</FormLabel>
				<FormDescription class={cn(index !== 0 && "sr-only")}
					>Add links to your website, blog, or social media profiles</FormDescription
				>
				<Input type="text" {...fieldWithListeners()} />
				<FormMessage />
			</FormField>
		{/each}
		<Button
			type="button"
			variant="link"
			size="sm"
			class="mt-1"
			on:click={() => {
				$superFrm.urls = [...$superFrm.urls, ""];
			}}
		>
			Add URL
		</Button>
	</div>

	<Button type="submit" disabled={$delayed}>
		{#if $delayed}
			<Loader2 class="mr-2 h-4 w-4 animate-spin" />
			Registering...
		{:else}
			Register
		{/if}
	</Button>
</form>
