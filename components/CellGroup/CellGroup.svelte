<script lang="ts">
  import type { Snippet } from 'svelte'

  let {
    title = '',
    inset = false,
    border = true,
    children,
    class: className = '',
  }: {
    title?: string
    inset?: boolean
    border?: boolean
    children?: Snippet
    class?: string
  } = $props()
</script>

{#if title}
  <div class="smu-cell-group__title {inset ? 'smu-cell-group__title--inset' : ''}">{title}</div>
{/if}
<div class="smu-cell-group {inset ? 'smu-cell-group--inset' : ''} {border ? 'smu-hairline--top-bottom' : ''} {className}">
  {#if children}{@render children()}{/if}
</div>

<style lang="scss">
  .smu-cell-group {
    background: var(--smu-background-2);

    &--inset {
      margin: 0 var(--smu-padding-md);
      border-radius: var(--smu-radius-lg);
      overflow: hidden;
    }

    &__title {
      padding: var(--smu-padding-md) var(--smu-padding-md) var(--smu-padding-xs);
      color: var(--smu-text-color-2);
      font-size: var(--smu-font-size-md);
      line-height: var(--smu-line-height-md);

      &--inset {
        padding-left: calc(var(--smu-padding-md) * 2);
      }
    }
  }
</style>
