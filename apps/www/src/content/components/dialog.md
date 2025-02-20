---
title: Dialog
description: A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.
component: true
featured: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/components/ui/dialog
radix: https://www.radix-svelte.com/docs/dialog
external:
  project: Radix Svelte
  url: https://www.radix-svelte.com/docs/dialog
---

<script>
  import { ComponentPreview, ManualInstall } from '$lib/components/docs';
</script>

<ComponentPreview name="dialog-demo">

<div />

</ComponentPreview>

## Installation

```bash
npx shadcn-svelte add dialog
```

<ManualInstall>

1. Install `@huntabyte/primitives`:

```bash
npm install @huntabyte/primitives
```

2. Copy and paste the component source files linked at the top of this page into your project.

</ManualInstall>

## Usage

```svelte
<script lang="ts">
  import * as Dialog from "$components/ui/dialog";
</script>

<Dialog.Root>
  <Dialog.Trigger>Open</Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
      <Dialog.Description>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </Dialog.Description>
    </Dialog.Header>
  </Dialog.Content>
</Dialog.Root>
```
