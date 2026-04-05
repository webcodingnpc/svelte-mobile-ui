<script lang="ts">
  import type { Snippet } from 'svelte'

  let {
    value = $bindable([]),
    max = 0,
    disabled = false,
    direction = 'vertical',
    iconSize = '20px',
    checkedColor = '',
    onChange,
    children,
    class: className = '',
  }: {
    value?: any[]
    max?: number
    disabled?: boolean
    direction?: 'horizontal' | 'vertical'
    iconSize?: string
    checkedColor?: string
    onChange?: (value: any[]) => void
    children?: Snippet
    class?: string
  } = $props()
</script>

<div class="smu-checkbox-group smu-checkbox-group--{direction} {className}" role="group">
  {#if children}{@render children()}{/if}
</div>

<style lang="scss">
  .smu-checkbox-group {
    &--vertical > :global(*) { margin-bottom: 8px; }
    &--horizontal { display: flex; flex-wrap: wrap; gap: 8px 12px; }
  }
</style>
