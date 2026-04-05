<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    columnNum = 4,
    iconSize = "28px",
    gutter = 0,
    border = true,
    center = true,
    square = false,
    clickable = false,
    direction = "vertical",
    reverse = false,
    children,
    class: className = "",
  }: {
    columnNum?: number | string;
    iconSize?: string | number;
    gutter?: number | string;
    border?: boolean;
    center?: boolean;
    square?: boolean;
    clickable?: boolean;
    direction?: "vertical" | "horizontal";
    reverse?: boolean;
    children?: Snippet;
    class?: string;
  } = $props();

  let cols = $derived(Number(columnNum));
  let gutterPx = $derived(Number(gutter));
</script>

<div
  class="smu-grid {border && !gutterPx ? 'smu-hairline--top' : ''} {className}"
  style="padding-left: {gutterPx ? gutterPx + 'px' : '0'}"
>
  {#if children}{@render children()}{/if}
</div>

<style lang="scss">
  .smu-grid {
    position: relative;
    display: flex;
    flex-wrap: wrap;
  }
</style>
