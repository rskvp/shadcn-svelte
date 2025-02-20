---
title: Button
description: Displays a button or a component that looks like a button.
featured: true
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/components/ui/button
---

<script>
  import { ComponentPreview, ManualInstall } from '$lib/components/docs';
</script>

<ComponentPreview name="button-demo">

<div />

</ComponentPreview>

## Installation

```bash
npx shadcn-svelte add button
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
  import { Button } from "$components/ui/button";
</script>
```

```svelte
<Button variant="outline">Button</Button>
```

### Link

You can convert the `<button>` into an `<a>` element by simply passing an `href` as a prop.

```svelte
<script lang="ts">
  import { Button } from "$components/ui/button";
</script>

<Button href="/dashboard">Dashboard</Button>
```

Alternatively, you can use the `buttonVariants` helper to create a link that looks like a button.

```svelte
<script lang="ts">
  import { buttonVariants } from "$components/ui/button";
</script>

<a href="/dashboard" class={buttonVariants({ variant: "outline" })}>
  Dashboard
</a>
```

## Examples

### Primary

<ComponentPreview name="button-demo">

<div />

</ComponentPreview>

---

### Secondary

<ComponentPreview name="button-secondary">

<div />

</ComponentPreview>

---

### Destructive

<ComponentPreview name="button-destructive">

<div />

</ComponentPreview>

---

### Outline

<ComponentPreview name="button-outline">

<div />

</ComponentPreview>

---

### Ghost

<ComponentPreview name="button-ghost">

<div />

</ComponentPreview>

---

### Link

<ComponentPreview name="button-link">

<div />

</ComponentPreview>

---

### With Icon

<ComponentPreview name="button-with-icon">

<div />

</ComponentPreview>

---

### Icon

<ComponentPreview name="button-icon">

<div />

</ComponentPreview>

---

### Loading

<ComponentPreview name="button-loading">

<div />

</ComponentPreview>
