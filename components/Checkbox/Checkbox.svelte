<script lang="ts">
  import Icon from "../Icon/Icon.svelte";
  import type { Snippet } from "svelte";

  let {
    checked = $bindable(false),
    disabled = false,
    shape = "round",
    iconSize = "20px",
    checkedColor = "",
    labelPosition = "right",
    labelDisabled = false,
    name = "",
    onChange,
    children,
    class: className = "",
  }: {
    checked?: boolean;
    disabled?: boolean;
    shape?: "round" | "square";
    iconSize?: string;
    checkedColor?: string;
    labelPosition?: "left" | "right";
    labelDisabled?: boolean;
    name?: string;
    onChange?: (checked: boolean) => void;
    children?: Snippet;
    class?: string;
  } = $props();

  function toggle() {
    if (disabled) return;
    checked = !checked;
    onChange?.(checked);
  }
</script>

<div
  class="smu-checkbox {disabled
    ? 'smu-checkbox--disabled'
    : ''} smu-checkbox--label-{labelPosition} {className}"
  onclick={toggle}
  role="checkbox"
  aria-checked={checked}
  tabindex="0"
>
  {#if labelPosition === "left" && children}
    <span
      class="smu-checkbox__label"
      onclick={(e) => {
        if (labelDisabled) e.stopPropagation();
      }}>{@render children()}</span
    >
  {/if}
  <div
    class="smu-checkbox__icon smu-checkbox__icon--{shape} {checked
      ? 'smu-checkbox__icon--checked'
      : ''}"
    style="font-size: {iconSize}; {checked && checkedColor
      ? `background: ${checkedColor}; border-color: ${checkedColor}`
      : ''}"
  >
    <Icon name="success" size="0.8em" />
  </div>
  {#if labelPosition === "right" && children}
    <span
      class="smu-checkbox__label"
      onclick={(e) => {
        if (labelDisabled) e.stopPropagation();
      }}>{@render children()}</span
    >
  {/if}
</div>

<style lang="scss">
  .smu-checkbox {
    display: flex;
    align-items: center;
    overflow: hidden;
    cursor: pointer;
    user-select: none;

    &--disabled {
      cursor: not-allowed;
      opacity: var(--smu-disabled-opacity);
    }
    &--label-left {
      flex-direction: row-reverse;
    }

    &__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      width: 1.25em;
      height: 1.25em;
      font-size: 20px;
      color: transparent;
      border: 1px solid var(--smu-gray-5);
      transition: all var(--smu-duration-fast);

      &--round {
        border-radius: 50%;
      }
      &--square {
        border-radius: var(--smu-radius-sm);
      }

      &--checked {
        color: var(--smu-white);
        background: var(--smu-primary-color);
        border-color: var(--smu-primary-color);
      }
    }

    &__label {
      margin-left: var(--smu-padding-xs);
      color: var(--smu-text-color);
      font-size: var(--smu-font-size-md);
      line-height: 20px;

      .smu-checkbox--label-left & {
        margin: 0 var(--smu-padding-xs) 0 0;
      }
    }
  }
</style>
