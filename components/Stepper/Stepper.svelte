<script lang="ts">
  let {
    value = $bindable(1),
    min = 1,
    max = Infinity,
    step = 1,
    theme = '',
    integer = false,
    disabled = false,
    disablePlus = false,
    disableMinus = false,
    disableInput = false,
    showPlus = true,
    showMinus = true,
    showInput = true,
    inputWidth = '32px',
    buttonSize = '28px',
    longPress = true,
    placeholder = '',
    decimalLength,
    onChange,
    class: className = '',
  }: {
    value?: number
    min?: number
    max?: number
    step?: number
    theme?: '' | 'round'
    integer?: boolean
    disabled?: boolean
    disablePlus?: boolean
    disableMinus?: boolean
    disableInput?: boolean
    showPlus?: boolean
    showMinus?: boolean
    showInput?: boolean
    inputWidth?: string
    buttonSize?: string
    longPress?: boolean
    placeholder?: string
    decimalLength?: number
    onChange?: (value: number) => void
    class?: string
  } = $props()

  const minusDisabled = $derived(disabled || disableMinus || value <= min)
  const plusDisabled = $derived(disabled || disablePlus || value >= max)

  function format(val: number) {
    val = Math.max(Math.min(val, max), min)
    if (integer) val = Math.round(val)
    if (decimalLength !== undefined) val = Number(val.toFixed(decimalLength))
    return val
  }

  function onMinus() {
    if (minusDisabled) return
    value = format(value - step)
    onChange?.(value)
  }

  function onPlus() {
    if (plusDisabled) return
    value = format(value + step)
    onChange?.(value)
  }

  function onInput(e: Event) {
    const v = (e.target as HTMLInputElement).value
    const num = Number(v)
    if (!isNaN(num)) {
      value = format(num)
      onChange?.(value)
    }
  }
</script>

<div class="smu-stepper {theme ? `smu-stepper--${theme}` : ''} {className}">
  {#if showMinus}
    <button
      class="smu-stepper__minus {minusDisabled ? 'smu-stepper__minus--disabled' : ''}"
      style="width: {buttonSize}; height: {buttonSize}"
      onclick={onMinus}
      disabled={minusDisabled}
      type="button"
    ></button>
  {/if}
  {#if showInput}
    <input
      class="smu-stepper__input"
      type={integer ? 'tel' : 'text'}
      role="spinbutton"
      value={value}
      disabled={disabled || disableInput}
      readonly={disableInput}
      inputmode={integer ? 'numeric' : 'decimal'}
      {placeholder}
      style="width: {inputWidth}; height: {buttonSize}"
      oninput={onInput}
    />
  {/if}
  {#if showPlus}
    <button
      class="smu-stepper__plus {plusDisabled ? 'smu-stepper__plus--disabled' : ''}"
      style="width: {buttonSize}; height: {buttonSize}"
      onclick={onPlus}
      disabled={plusDisabled}
      type="button"
    ></button>
  {/if}
</div>

<style lang="scss">
  .smu-stepper {
    display: inline-flex;
    user-select: none;

    &__minus,
    &__plus {
      position: relative;
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      color: var(--smu-text-color);
      vertical-align: middle;
      background: var(--smu-active-color);
      border: 0;
      cursor: pointer;

      &::before,
      &::after {
        position: absolute;
        top: 50%;
        left: 50%;
        background: var(--smu-text-color);
        transform: translate(-50%, -50%);
        content: '';
      }

      &::before {
        width: 50%;
        height: 1px;
      }

      &--disabled {
        cursor: not-allowed;
        opacity: var(--smu-disabled-opacity);
      }
    }

    &__plus::after {
      width: 1px;
      height: 50%;
    }

    &__minus {
      border-radius: var(--smu-radius-md) 0 0 var(--smu-radius-md);
    }

    &__plus {
      border-radius: 0 var(--smu-radius-md) var(--smu-radius-md) 0;
    }

    &__input {
      box-sizing: border-box;
      width: 32px;
      height: 28px;
      margin: 0 2px;
      padding: 0;
      color: var(--smu-text-color);
      font-size: var(--smu-font-size-md);
      text-align: center;
      vertical-align: middle;
      background: var(--smu-active-color);
      border: 0;
      border-radius: 0;
      -webkit-appearance: none;

      &:focus { outline: none; }
    }

    &--round {
      .smu-stepper__minus,
      .smu-stepper__plus {
        border-radius: 50%;
      }

      .smu-stepper__minus { border: 1px solid var(--smu-danger-color); background: var(--smu-white); color: var(--smu-danger-color);
        &::before, &::after { background: var(--smu-danger-color); }
      }
      .smu-stepper__plus { border: 1px solid var(--smu-primary-color); background: var(--smu-primary-color); color: var(--smu-white);
        &::before, &::after { background: var(--smu-white); }
      }
      .smu-stepper__input { background: transparent; }
    }
  }
</style>
