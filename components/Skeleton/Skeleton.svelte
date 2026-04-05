<script lang="ts">
  import type { Snippet } from 'svelte'

  let {
    children,
    class: className = '',
    ...restProps
  }: {
    children?: Snippet
    class?: string
    [key: string]: any
  } = $props()
</script>

<div class="smu-skeleton {className}">
  {#if children}{@render children()}{/if}
</div>

<style lang="scss">
  .smu-skeleton {
    position: relative;
  }
</style>