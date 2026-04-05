<script lang="ts">
  import Icon from "../Icon/Icon.svelte";
  import type { Snippet } from "svelte";

  let {
    type = "default",
    size = "",
    color = "",
    plain = false,
    round = false,
    mark = false,
    textColor = "",
    closeable = false,
    show = true,
    children,
    onclose,
    class: className = "",
  }: {
    type?: "default" | "primary" | "success" | "danger" | "warning";
    size?: "" | "large" | "medium";
    color?: string;
    plain?: boolean;
    round?: boolean;
    mark?: boolean;
    textColor?: string;
    closeable?: boolean;
    show?: boolean;
    children?: Snippet;
    onclose?: () => void;
    class?: string;
  } = $props();

  const style = $derived(
    [
      color && !plain ? `background: ${color}; border-color: ${color}` : "",
      color && plain ? `color: ${color}; border-color: ${color}` : "",
      textColor ? `color: ${textColor}` : "",
    ]
      .filter(Boolean)
      .join("; "),
  );
</script>

{#if show}
  <span
    class="smu-tag smu-tag--{type} {size ? `smu-tag--${size}` : ''} {plain
      ? 'smu-tag--plain'
      : ''} {round ? 'smu-tag--round' : ''} {mark
      ? 'smu-tag--mark'
      : ''} {className}"
    {style}
  >
    {#if children}{@render children()}{/if}
    {#if closeable}
      <span
        class="smu-tag__close"
        onclick={(e) => {
          e.stopPropagation();
          onclose?.();
        }}
        role="button"
        tabindex="0"
      >
        <Icon name="cross" size="12" />
      </span>
    {/if}
  </span>
{/if}

<style lang="scss">
  .smu-tag {
    display: inline-flex;
    align-items: center;
    padding: 0 4px;
    color: var(--smu-white);
    font-size: var(--smu-font-size-xs);
    line-height: 16px;
    border-radius: var(--smu-radius-sm);
    border: 1px solid transparent;

    &--default {
      background: var(--smu-gray-6);
      border-color: var(--smu-gray-6);
    }
    &--primary {
      background: var(--smu-primary-color);
      border-color: var(--smu-primary-color);
    }
    &--success {
      background: var(--smu-success-color);
      border-color: var(--smu-success-color);
    }
    &--danger {
      background: var(--smu-danger-color);
      border-color: var(--smu-danger-color);
    }
    &--warning {
      background: var(--smu-warning-color);
      border-color: var(--smu-warning-color);
    }

    &--plain {
      background: var(--smu-white);
      &.smu-tag--default {
        color: var(--smu-gray-6);
      }
      &.smu-tag--primary {
        color: var(--smu-primary-color);
      }
      &.smu-tag--success {
        color: var(--smu-success-color);
      }
      &.smu-tag--danger {
        color: var(--smu-danger-color);
      }
      &.smu-tag--warning {
        color: var(--smu-warning-color);
      }
    }

    &--round {
      border-radius: var(--smu-radius-max);
      padding: 0 8px;
    }
    &--mark {
      border-radius: 0 var(--smu-radius-max) var(--smu-radius-max) 0;
    }

    &--medium {
      padding: 2px 6px;
      font-size: var(--smu-font-size-sm);
    }
    &--large {
      padding: 4px 8px;
      font-size: var(--smu-font-size-md);
      border-radius: var(--smu-radius-md);
    }

    &__close {
      margin-left: 2px;
      cursor: pointer;
    }
  }
</style>
