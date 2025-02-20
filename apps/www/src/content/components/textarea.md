---
title: Textarea
description: Displays a form textarea or a component that looks like a textarea.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/components/ui/textarea
---

<script>
  import { ComponentPreview, ManualInstall } from '$lib/components/docs';
</script>

<ComponentPreview name="textarea-demo">

<div />

</ComponentPreview>

## Installation

```bash
npx shadcn-svelte add textarea
```

<ManualInstall>

1. Copy and paste the component source files linked at the top of this page into your project.

</ManualInstall>

## Usage

```svelte
<script lang="ts">
  import { Textarea } from "$components/ui/textarea";
</script>
```

```svelte
<Textarea />
```

## Examples

### Default

<ComponentPreview name="textarea-demo">

<div />

</ComponentPreview>

---

### Disabled

<ComponentPreview name="textarea-disabled">

<div />

</ComponentPreview>

---

### With Label

<ComponentPreview name="textarea-with-label">

<div />

</ComponentPreview>

---

### With Text

<ComponentPreview name="textarea-with-text">

<div />

</ComponentPreview>

---

### With Button

<ComponentPreview name="textarea-with-button">

<div />

</ComponentPreview>
