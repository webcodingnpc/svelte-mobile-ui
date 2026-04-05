<script lang="ts">
  import Icon from '../Icon/Icon.svelte'

  let {
    value = $bindable(0),
    count = 5,
    size = '20px',
    color = '#ee0a24',
    voidColor = '#c8c9cc',
    icon = 'star',
    voidIcon = 'star-o',
    allowHalf = false,
    disabled = false,
    readonly = false,
    disabledColor = '#c8c9cc',
    gutter = '4px',
    touchable = true,
    onChange,
    class: className = '',
  }: {
    value?: number
    count?: number
    size?: string
    color?: string
    voidColor?: string
    icon?: string
    voidIcon?: string
    allowHalf?: boolean
    disabled?: boolean
    readonly?: boolean
    disabledColor?: string
    gutter?: string
    touchable?: boolean
    onChange?: (value: number) => void
    class?: string
  } = $props()

  function select(index: number) {
    if (disabled || readonly) return
    value = index
    onChange?.(value)
  }
</script>

<div class="smu-rate {disabled ? 'smu-rate--disabled' : ''} {readonly ? 'smu-rate--readonly' : ''} {className}" role="radiogroup">
  {#each Array(count) as _, i}
    {@const score = i + 1}
    {@const isActive = value >= score}
    {@const isHalf = allowHalf && value > i && value < score}
    <div
      class="smu-rate__item"
      style="margin-right: {i < count - 1 ? gutter : '0'}"
      onclick={() => select(score)}
      role="radio"
      tabindex={disabled ? -1 : 0}
    >
      <Icon
        name={isActive || isHalf ? icon : voidIcon}
        {size}
        color={isActive ? (disabled ? disabledColor : color) : voidColor}
      />
      {#if isHalf}
        <div class="smu-rate__half" style="width: 50%; overflow: hidden; position: absolute; top: 0; left: 0">
          <Icon name={icon} {size} color={disabled ? disabledColor : color} />
        </div>
      {/if}
    </div>
  {/each}
</div>

<style lang="scss">
  .smu-rate {
    display: inline-flex;
    flex-wrap: nowrap;
    cursor: pointer;
    user-select: none;

    &--disabled,
    &--readonly {
      cursor: default;
    }

    &__item {
      position: relative;
    }
  }
</style>
