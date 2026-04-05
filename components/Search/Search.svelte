<script lang="ts">
  import Field from '../Field/Field.svelte'
  import type { Snippet } from 'svelte'

  let {
    value = $bindable(''),
    label = '',
    shape = 'square',
    placeholder = '请输入搜索关键词',
    background = '',
    showAction = false,
    actionText = '取消',
    disabled = false,
    readonly = false,
    clearable = true,
    leftIcon = 'search',
    rightIcon = '',
    inputAlign = '',
    autofocus = false,
    onSearch,
    onCancel,
    onInput,
    onFocus,
    onBlur,
    actionSlot,
    class: className = '',
  }: {
    value?: string
    label?: string
    shape?: 'square' | 'round'
    placeholder?: string
    background?: string
    showAction?: boolean
    actionText?: string
    disabled?: boolean
    readonly?: boolean
    clearable?: boolean
    leftIcon?: string
    rightIcon?: string
    inputAlign?: string
    autofocus?: boolean
    onSearch?: (value: string) => void
    onCancel?: () => void
    onInput?: (value: string) => void
    onFocus?: (e: FocusEvent) => void
    onBlur?: (e: FocusEvent) => void
    actionSlot?: Snippet
    class?: string
  } = $props()

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault()
      onSearch?.(String(value))
    }
  }
</script>

<div class="smu-search {className}" style="{background ? `background: ${background}` : ''}">
  {#if label}
    <div class="smu-search__label">{label}</div>
  {/if}
  <div class="smu-search__content smu-search__content--{shape}">
    <Field
      bind:value
      type="search"
      border={false}
      {placeholder} {disabled} {readonly} {clearable} {inputAlign}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      onInput={onInput}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  </div>
  {#if showAction}
    <div class="smu-search__action" onclick={() => { onCancel?.() }} role="button" tabindex="0" onkeydown={handleKeydown}>
      {#if actionSlot}{@render actionSlot()}{:else}{actionText}{/if}
    </div>
  {/if}
</div>

<style lang="scss">
  .smu-search {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 10px var(--smu-padding-sm);
    background: var(--smu-background-2);

    &__label {
      padding: 0 5px;
      color: var(--smu-text-color);
      font-size: var(--smu-font-size-md);
      line-height: 34px;
    }

    &__content {
      display: flex;
      flex: 1;
      padding-left: 12px;
      background: var(--smu-gray-1);
      border-radius: var(--smu-radius-sm);

      &--round { border-radius: var(--smu-radius-max); }

      :global(.smu-field) {
        padding: 5px 8px 5px 0;
        background: transparent;
      }
    }

    &__action {
      padding: 0 var(--smu-padding-xs);
      color: var(--smu-primary-color);
      font-size: var(--smu-font-size-md);
      line-height: 34px;
      cursor: pointer;
      user-select: none;

      &:active { opacity: var(--smu-active-opacity); }
    }
  }
</style>
