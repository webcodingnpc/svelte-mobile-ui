<script lang="ts">
  import Cell from '../Cell/Cell.svelte'
  import Icon from '../Icon/Icon.svelte'
  import type { Snippet } from 'svelte'

  let {
    value = $bindable(''),
    type = 'text',
    label = '',
    name = '',
    placeholder = '',
    disabled = false,
    readonly = false,
    required = false,
    clearable = false,
    clearIcon = 'clear',
    clearTrigger = 'focus',
    maxlength = -1,
    showWordLimit = false,
    error = false,
    errorMessage = '',
    errorMessageAlign = 'left',
    labelWidth = '6.2em',
    labelAlign = 'left',
    inputAlign = '',
    autosize = false,
    leftIcon = '',
    rightIcon = '',
    rows = 0,
    border = true,
    size = '',
    center = false,
    colon = false,
    formatter,
    onInput,
    onFocus,
    onBlur,
    onclick,
    onclickInput,
    onclickLeftIcon,
    onclickRightIcon,
    children,
    buttonSlot,
    class: className = '',
  }: {
    value?: string | number
    type?: 'text' | 'tel' | 'url' | 'email' | 'number' | 'password' | 'textarea' | 'digit'
    label?: string
    name?: string
    placeholder?: string
    disabled?: boolean
    readonly?: boolean
    required?: boolean
    clearable?: boolean
    clearIcon?: string
    clearTrigger?: 'focus' | 'always'
    maxlength?: number
    showWordLimit?: boolean
    error?: boolean
    errorMessage?: string
    errorMessageAlign?: 'left' | 'center' | 'right'
    labelWidth?: string
    labelAlign?: 'left' | 'center' | 'right' | 'top'
    inputAlign?: string
    autosize?: boolean | { maxHeight?: number; minHeight?: number }
    leftIcon?: string
    rightIcon?: string
    rows?: number
    border?: boolean
    size?: '' | 'large'
    center?: boolean
    colon?: boolean
    formatter?: (value: string) => string
    onInput?: (value: string) => void
    onFocus?: (e: FocusEvent) => void
    onBlur?: (e: FocusEvent) => void
    onclick?: (e: MouseEvent) => void
    onclickInput?: (e: MouseEvent) => void
    onclickLeftIcon?: (e: MouseEvent) => void
    onclickRightIcon?: (e: MouseEvent) => void
    children?: Snippet
    buttonSlot?: Snippet
    class?: string
  } = $props()

  let focused = $state(false)
  const showClear = $derived(clearable && !!value && !readonly && !disabled && (clearTrigger === 'always' || focused))

  function handleInput(e: Event) {
    let v = (e.target as HTMLInputElement).value
    if (type === 'digit') v = v.replace(/[^\d]/g, '')
    if (formatter) v = formatter(v)
    if (maxlength > 0 && v.length > maxlength) v = v.slice(0, maxlength)
    value = v
    onInput?.(v)
  }

  function handleClear() { value = ''; onInput?.('') }
</script>

<div class="smu-field {error ? 'smu-field--error' : ''} {disabled ? 'smu-field--disabled' : ''} {labelAlign === 'top' ? 'smu-field--label-top' : ''} {size ? `smu-cell--${size}` : ''} {border ? 'smu-cell--border' : ''} {className}" onclick={onclick}>
  {#if label || required}
    <div class="smu-field__label" style="width: {labelWidth}; text-align: {labelAlign === 'top' ? 'left' : labelAlign}">
      {#if required}<span class="smu-field__required">*</span>{/if}
      {label}{#if colon}：{/if}
    </div>
  {/if}
  <div class="smu-field__value" style="{inputAlign ? `text-align: ${inputAlign}` : ''}">
    <div class="smu-field__body">
      {#if leftIcon}
        <Icon name={leftIcon} class="smu-field__left-icon" onclick={onclickLeftIcon} />
      {/if}
      {#if type === 'textarea'}
        <textarea
          class="smu-field__control"
          {name} {placeholder} {disabled} {readonly}
          rows={rows || 1}
          maxlength={maxlength > 0 ? maxlength : undefined}
          value={String(value)}
          oninput={handleInput}
          onfocus={(e) => { focused = true; onFocus?.(e) }}
          onblur={(e) => { focused = false; onBlur?.(e) }}
          onclick={onclickInput}
        ></textarea>
      {:else}
        <input
          class="smu-field__control"
          {type} {name} {placeholder} {disabled} {readonly}
          maxlength={maxlength > 0 ? maxlength : undefined}
          value={String(value)}
          oninput={handleInput}
          onfocus={(e) => { focused = true; onFocus?.(e) }}
          onblur={(e) => { focused = false; onBlur?.(e) }}
          onclick={onclickInput}
        />
      {/if}
      {#if showClear}
        <Icon name={clearIcon} class="smu-field__clear" onclick={handleClear} />
      {/if}
      {#if rightIcon}
        <Icon name={rightIcon} class="smu-field__right-icon" onclick={onclickRightIcon} />
      {/if}
      {#if buttonSlot}
        <div class="smu-field__button">{@render buttonSlot()}</div>
      {/if}
    </div>
    {#if showWordLimit && maxlength > 0}
      <div class="smu-field__word-limit">
        <span class="smu-field__word-num">{String(value).length}</span>/{maxlength}
      </div>
    {/if}
    {#if errorMessage}
      <div class="smu-field__error-message" style="text-align: {errorMessageAlign}">{errorMessage}</div>
    {/if}
  </div>
</div>

<style lang="scss">
  .smu-field {
    display: flex;
    padding: 10px 16px;
    overflow: hidden;
    background: var(--smu-background-2);
    position: relative;

    &--label-top {
      flex-direction: column;
      .smu-field__label { width: auto !important; margin-bottom: 8px; }
    }

    &--error {
      .smu-field__control { color: var(--smu-danger-color); }
    }

    &--disabled {
      .smu-field__control { color: var(--smu-gray-5); cursor: not-allowed; }
    }

    &__label {
      flex-shrink: 0;
      color: var(--smu-text-color);
      font-size: var(--smu-font-size-md);
      line-height: 24px;
    }

    &__required {
      color: var(--smu-danger-color);
      margin-right: 2px;
    }

    &__value {
      flex: 1;
      overflow: visible;
    }

    &__body {
      display: flex;
      align-items: center;
    }

    &__control {
      display: block;
      box-sizing: border-box;
      width: 100%;
      min-width: 0;
      margin: 0;
      padding: 0;
      border: 0;
      color: var(--smu-text-color);
      font-size: var(--smu-font-size-md);
      line-height: 24px;
      background: transparent;
      resize: none;
      user-select: auto;
      -webkit-appearance: none;

      &::placeholder { color: var(--smu-text-color-3); }
      &:focus { outline: none; }
    }

    textarea.smu-field__control {
      min-height: 24px;
    }

    &__left-icon,
    &__right-icon {
      min-width: 18px;
      font-size: 18px;
      line-height: 24px;
      color: var(--smu-gray-6);
    }

    &__left-icon { margin-right: 6px; }
    &__right-icon { margin-left: 6px; padding: 0 4px; }

    &__clear { color: var(--smu-gray-5); font-size: 18px; cursor: pointer; margin-left: 6px; }

    &__button { margin-left: var(--smu-padding-xs); flex-shrink: 0; }

    &__word-limit {
      margin-top: 4px;
      color: var(--smu-gray-7);
      font-size: var(--smu-font-size-sm);
      line-height: 16px;
      text-align: right;
    }

    &__error-message {
      color: var(--smu-danger-color);
      font-size: var(--smu-font-size-sm);
      line-height: 16px;
      margin-top: 4px;
    }
  }

  .smu-cell--border + .smu-field,
  .smu-field.smu-cell--border {
    &::after {
      position: absolute;
      box-sizing: border-box;
      content: '';
      pointer-events: none;
      right: 16px;
      bottom: 0;
      left: 16px;
      border-bottom: 1px solid var(--smu-border-color);
      transform: scaleY(0.5);
    }
  }
</style>
