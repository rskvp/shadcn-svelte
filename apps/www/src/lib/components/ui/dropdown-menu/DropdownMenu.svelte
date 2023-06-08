<script>
	import { createMenu } from "@grail-ui/svelte";
	import DropdownMenuTrigger from "./DropdownMenuTrigger.svelte";
	import { Button, buttonVariants } from "$components/ui/button";
	import DropdownMenuSubContent from "./DropdownMenuSubContent.svelte";
	import DropdownMenuLabel from "./DropdownMenuLabel.svelte";
	import DropdownMenuSeparator from "./DropdownMenuSeparator.svelte";
	import DropdownMenuContent from "./DropdownMenuContent.svelte";
	import DropdownMenuItem from "./DropdownMenuItem.svelte";
	import {
		Cloud,
		CreditCard,
		Github,
		Keyboard,
		LifeBuoy,
		LogOut,
		Mail,
		MessageSquare,
		Plus,
		PlusCircle,
		Settings,
		User,
		UserPlus,
		Users
	} from "lucide-svelte";
	import DropdownMenuShortcut from "./DropdownMenuShortcut.svelte";
	import DropdownMenuSubTrigger from "./DropdownMenuSubTrigger.svelte";

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
			$open = false;
			console.log(id);
			alert(id);
		}
	});

	const {
		useTrigger: subTrigger,
		triggerAttrs: subTriggerAttrs,
		useMenu: subMenu,
		menuAttrs: subMenuAttrs,
		itemAttrs: subItemAttrs,
		open: subOpen,
		separatorAttrs: subSeparatorAttrs
	} = createMenu({
		onSelect: (id) => {
			$open = false;
			console.log(id);
			alert(id);
		},
		positioning: {
			placement: "right-start",
			strategy: "absolute",
			offset: {
				mainAxis: 50,
				crossAxis: 0
			},
			overlap: true
		},
		portal: document.body
	});
</script>

<button
	use:useTrigger
	class={buttonVariants({ variant: "outline" })}
	{...$triggerAttrs}>Actions</button
>
{#if $open}
	<DropdownMenuContent class="w-56" {useMenu} {...$menuAttrs}>
		<DropdownMenuLabel>My Account</DropdownMenuLabel>
		<DropdownMenuSeparator />
		<DropdownMenuItem {...$itemAttrs("profile")}>
			<User class="mr-2 h-4 w-4" />
			<span>Profile</span>
			<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
		</DropdownMenuItem>
		<DropdownMenuItem {...$itemAttrs("billing")}>
			<CreditCard class="mr-2 h-4 w-4" />
			<span>Billing</span>
			<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
		</DropdownMenuItem>
		<DropdownMenuItem {...$itemAttrs("settings")}>
			<Settings class="mr-2 h-4 w-4" />
			<span>Settings</span>
			<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
		</DropdownMenuItem>
		<DropdownMenuItem {...$itemAttrs("keyboardshortcuts")}>
			<Keyboard class="mr-2 h-4 w-4" />
			<span>Keyboard shortcuts</span>
			<DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
		</DropdownMenuItem>
		<DropdownMenuSeparator {...$separatorAttrs} />
		<DropdownMenuItem {...$itemAttrs("team")}>
			<Users class="mr-2 h-4 w-4" />
			<span>Team</span>
		</DropdownMenuItem>
		<DropdownMenuSubTrigger trigger={subTrigger}
			>Invite People</DropdownMenuSubTrigger
		>
		{#if $subOpen}
			<DropdownMenuSubContent>
				<DropdownMenuItem>Hello</DropdownMenuItem>
			</DropdownMenuSubContent>
		{/if}

		<DropdownMenuItem {...$itemAttrs("new-team")}>
			<Plus class="mr-2 h-4 w-4" />
			<span>New Team</span>
			<DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
		</DropdownMenuItem>
		<DropdownMenuSeparator />
		<DropdownMenuItem {...$itemAttrs("github")}>
			<Github class="mr-2 h-4 w-4" />
			<span>GitHub</span>
		</DropdownMenuItem>
		<DropdownMenuItem {...$itemAttrs("support")}>
			<LifeBuoy class="mr-2 h-4 w-4" />
			<span>Support</span>
		</DropdownMenuItem>
		<DropdownMenuItem {...$itemAttrs("api")} disabled>
			<Cloud class="mr-2 h-4 w-4" />
			<span>API</span>
		</DropdownMenuItem>
		<DropdownMenuSeparator />
		<DropdownMenuItem {...$itemAttrs("logout")}>
			<LogOut class="mr-2 h-4 w-4" />
			<span>Log out</span>
			<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
		</DropdownMenuItem>
	</DropdownMenuContent>
{/if}
