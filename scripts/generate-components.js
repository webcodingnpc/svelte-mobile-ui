/**
 * 批量生成 svelte-mobile-ui 组件脚本
 * 生成 Svelte 5 移动端组件
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const COMP_DIR = path.resolve(__dirname, '..', 'components')

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

function writeComp(name, svelteCode, indexCode) {
  const dir = path.join(COMP_DIR, name)
  ensureDir(dir)
  const sveltePath = path.join(dir, `${name}.svelte`)
  const indexPath = path.join(dir, 'index.ts')
  if (!fs.existsSync(sveltePath)) {
    fs.writeFileSync(sveltePath, svelteCode, 'utf-8')
    console.log(`  ✅ ${name}`)
  } else {
    console.log(`  ⏭️  ${name} (已存在)`)
  }
  if (!fs.existsSync(indexPath)) {
    fs.writeFileSync(indexPath, indexCode, 'utf-8')
  }
}

// 辅助：生成 index.ts
const idx = (name, extra = '') => `export { default as ${name} } from './${name}.svelte'\n${extra}`
const idx2 = (name1, name2) => `export { default as ${name1} } from './${name1}.svelte'\nexport { default as ${name2} } from './${name2}.svelte'\n`

console.log('🔨 生成移动端组件...\n')

// ==================== Overlay ====================
writeComp('Overlay', `<script lang="ts">
  let {
    show = false,
    zIndex = 1,
    duration = 0.3,
    lockScroll = true,
    customStyle = '',
    onclick,
    class: className = '',
  }: {
    show?: boolean
    zIndex?: number
    duration?: number
    lockScroll?: boolean
    customStyle?: string
    onclick?: (e: MouseEvent) => void
    class?: string
  } = $props()
</script>

{#if show}
  <div
    class="smu-overlay {className}"
    style="z-index: {zIndex}; animation-duration: {duration}s; {customStyle}"
    onclick={onclick}
    role="presentation"
  ></div>
{/if}

<style lang="scss">
  .smu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    animation: smu-fade-in var(--smu-duration-base);
  }

  @keyframes smu-fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
</style>
`, idx('Overlay'))

// ==================== Popup ====================
writeComp('Popup', `<script lang="ts">
  import Overlay from '../Overlay/Overlay.svelte'
  import Icon from '../Icon/Icon.svelte'
  import type { Snippet } from 'svelte'

  let {
    show = $bindable(false),
    position = 'center',
    round = false,
    closeable = false,
    closeIcon = 'cross',
    closeIconPosition = 'top-right',
    overlay = true,
    lockScroll = true,
    duration = 0.3,
    safeAreaInsetBottom = false,
    safeAreaInsetTop = false,
    zIndex = 2000,
    onclose,
    children,
    class: className = '',
  }: {
    show?: boolean
    position?: 'top' | 'bottom' | 'left' | 'right' | 'center'
    round?: boolean
    closeable?: boolean
    closeIcon?: string
    closeIconPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
    overlay?: boolean
    lockScroll?: boolean
    duration?: number
    safeAreaInsetBottom?: boolean
    safeAreaInsetTop?: boolean
    zIndex?: number
    onclose?: () => void
    children?: Snippet
    class?: string
  } = $props()

  function close() {
    show = false
    onclose?.()
  }
</script>

{#if show}
  {#if overlay}
    <Overlay {show} zIndex={zIndex} onclick={close} />
  {/if}
  <div
    class="smu-popup smu-popup--{position} {round ? 'smu-popup--round' : ''} {safeAreaInsetBottom ? 'smu-safe-area-bottom' : ''} {safeAreaInsetTop ? 'smu-safe-area-top' : ''} {className}"
    style="z-index: {zIndex}; animation-duration: {duration}s"
    role="dialog"
  >
    {#if children}{@render children()}{/if}
    {#if closeable}
      <div class="smu-popup__close-icon smu-popup__close-icon--{closeIconPosition}" onclick={close} role="button" tabindex="0">
        <Icon name={closeIcon} />
      </div>
    {/if}
  </div>
{/if}

<style lang="scss">
  .smu-popup {
    position: fixed;
    max-height: 100%;
    overflow-y: auto;
    background: var(--smu-background-2);
    transition: transform var(--smu-duration-base);
    -webkit-overflow-scrolling: touch;

    &--center {
      top: 50%;
      left: 0;
      right: 0;
      width: fit-content;
      max-width: calc(100vw - var(--smu-padding-md) * 2);
      margin: 0 auto;
      transform: translateY(-50%);
      animation: smu-fade-in var(--smu-duration-base);
    }

    &--top {
      top: 0;
      left: 0;
      width: 100%;
      animation: smu-slide-top-in var(--smu-duration-base);
    }

    &--bottom {
      bottom: 0;
      left: 0;
      width: 100%;
      animation: smu-slide-bottom-in var(--smu-duration-base);
    }

    &--left {
      top: 0;
      left: 0;
      height: 100%;
      animation: smu-slide-left-in var(--smu-duration-base);
    }

    &--right {
      top: 0;
      right: 0;
      height: 100%;
      animation: smu-slide-right-in var(--smu-duration-base);
    }

    &--round {
      &.smu-popup--top { border-radius: 0 0 16px 16px; }
      &.smu-popup--bottom { border-radius: 16px 16px 0 0; }
      &.smu-popup--left { border-radius: 0 16px 16px 0; }
      &.smu-popup--right { border-radius: 16px 0 0 16px; }
      &.smu-popup--center { border-radius: 16px; }
    }

    &__close-icon {
      position: absolute;
      z-index: 1;
      color: var(--smu-gray-5);
      font-size: 22px;
      cursor: pointer;

      &--top-right { top: 16px; right: 16px; }
      &--top-left { top: 16px; left: 16px; }
      &--bottom-right { bottom: 16px; right: 16px; }
      &--bottom-left { bottom: 16px; left: 16px; }
    }
  }

  @keyframes smu-fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes smu-slide-top-in {
    from { transform: translateY(-100%); }
    to { transform: translateY(0); }
  }
  @keyframes smu-slide-bottom-in {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }
  @keyframes smu-slide-left-in {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
  }
  @keyframes smu-slide-right-in {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
</style>
`, idx('Popup'))

// ==================== Cell / CellGroup ====================
writeComp('Cell', `<script lang="ts">
  import Icon from '../Icon/Icon.svelte'
  import type { Snippet } from 'svelte'

  let {
    title = '',
    value = '',
    label = '',
    icon = '',
    size = '',
    border = true,
    center = false,
    isLink = false,
    required = false,
    arrowDirection = 'right',
    clickable = false,
    titleClass = '',
    valueClass = '',
    labelClass = '',
    onclick,
    children,
    titleSlot,
    class: className = '',
  }: {
    title?: string
    value?: string | number
    label?: string
    icon?: string
    size?: '' | 'large'
    border?: boolean
    center?: boolean
    isLink?: boolean
    required?: boolean
    arrowDirection?: 'up' | 'down' | 'left' | 'right'
    clickable?: boolean | null
    titleClass?: string
    valueClass?: string
    labelClass?: string
    onclick?: (e: MouseEvent) => void
    children?: Snippet
    titleSlot?: Snippet
    class?: string
  } = $props()

  const isClickable = $derived(clickable ?? isLink)
</script>

<div
  class="smu-cell {size ? \`smu-cell--\${size}\` : ''} {center ? 'smu-cell--center' : ''} {required ? 'smu-cell--required' : ''} {border ? 'smu-cell--border' : ''} {isClickable ? 'smu-cell--clickable' : ''} {className}"
  role={isClickable ? 'button' : undefined}
  tabindex={isClickable ? 0 : undefined}
  onclick={onclick}
>
  {#if icon}
    <Icon name={icon} class="smu-cell__left-icon" />
  {/if}
  <div class="smu-cell__title {titleClass}">
    {#if titleSlot}{@render titleSlot()}{:else}{title}{/if}
    {#if label}<div class="smu-cell__label {labelClass}">{label}</div>{/if}
  </div>
  <div class="smu-cell__value {valueClass}">
    {#if children}{@render children()}{:else}{value}{/if}
  </div>
  {#if isLink}
    <Icon name="arrow" class="smu-cell__right-icon smu-cell__right-icon--{arrowDirection}" />
  {/if}
</div>

<style lang="scss">
  .smu-cell {
    position: relative;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    padding: 10px 16px;
    overflow: hidden;
    color: var(--smu-text-color);
    font-size: var(--smu-font-size-md);
    line-height: 24px;
    background: var(--smu-background-2);

    &--border::after {
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

    &--center { align-items: center; }

    &--required::before {
      position: absolute;
      left: 8px;
      color: var(--smu-danger-color);
      font-size: var(--smu-font-size-md);
      content: '*';
    }

    &--clickable {
      cursor: pointer;
      &:active { background: var(--smu-active-color); }
    }

    &--large {
      padding-top: 12px;
      padding-bottom: 12px;

      .smu-cell__title { font-size: var(--smu-font-size-lg); }
      .smu-cell__label { font-size: var(--smu-font-size-md); }
    }

    &__left-icon {
      margin-right: 4px;
      font-size: 16px;
      line-height: 24px;
    }

    &__right-icon {
      margin-left: 4px;
      color: var(--smu-gray-6);
      font-size: 16px;
      line-height: 24px;
      flex-shrink: 0;

      &--up { transform: rotate(90deg); }
      &--down { transform: rotate(-90deg); }
      &--left { transform: rotate(0deg); }
    }

    &__title {
      flex: 1;
    }

    &__value {
      position: relative;
      overflow: hidden;
      color: var(--smu-gray-6);
      text-align: right;
      vertical-align: middle;
      word-wrap: break-word;
    }

    &__label {
      margin-top: 4px;
      color: var(--smu-gray-6);
      font-size: var(--smu-font-size-sm);
      line-height: var(--smu-line-height-sm);
    }
  }
</style>
`, idx('Cell'))

writeComp('CellGroup', `<script lang="ts">
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
`, idx('CellGroup'))

// ==================== Image ====================
writeComp('ImageComp', `<script lang="ts">
  import Icon from '../Icon/Icon.svelte'
  import Loading from '../Loading/Loading.svelte'

  let {
    src = '',
    alt = '',
    fit = 'fill',
    width = '',
    height = '',
    radius = 0,
    round = false,
    lazyLoad = false,
    showError = true,
    showLoading = true,
    errorIcon = 'photo',
    loadingIcon = '',
    onclick,
    class: className = '',
  }: {
    src?: string
    alt?: string
    fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
    width?: string | number
    height?: string | number
    radius?: string | number
    round?: boolean
    lazyLoad?: boolean
    showError?: boolean
    showLoading?: boolean
    errorIcon?: string
    loadingIcon?: string
    onclick?: (e: MouseEvent) => void
    class?: string
  } = $props()

  let loading = $state(true)
  let error = $state(false)

  const style = $derived([
    width ? \`width: \${typeof width === 'number' ? width + 'px' : width}\` : '',
    height ? \`height: \${typeof height === 'number' ? height + 'px' : height}\` : '',
    radius ? \`border-radius: \${typeof radius === 'number' ? radius + 'px' : radius}; overflow: hidden\` : '',
    round ? 'border-radius: 50%; overflow: hidden' : '',
  ].filter(Boolean).join('; '))

  function onLoad() { loading = false }
  function onError() { loading = false; error = true }
</script>

<div class="smu-image {className}" {style} onclick={onclick}>
  {#if !error}
    <img
      class="smu-image__img"
      {src} {alt}
      style="object-fit: {fit}"
      onload={onLoad}
      onerror={onError}
    />
  {/if}
  {#if loading && showLoading}
    <div class="smu-image__loading">
      {#if loadingIcon}
        <Icon name={loadingIcon} size="32" />
      {:else}
        <Loading type="spinner" size="22" />
      {/if}
    </div>
  {/if}
  {#if error && showError}
    <div class="smu-image__error">
      <Icon name={errorIcon} size="32" />
    </div>
  {/if}
</div>

<style lang="scss">
  .smu-image {
    position: relative;
    display: inline-block;
    overflow: hidden;

    &__img {
      display: block;
      width: 100%;
      height: 100%;
    }

    &__loading,
    &__error {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      color: var(--smu-gray-6);
      font-size: var(--smu-font-size-md);
      background: var(--smu-background);
    }
  }
</style>
`, `export { default as ImageComp } from './ImageComp.svelte'\n`)

// ==================== Toast ====================
writeComp('Toast', `<script lang="ts">
  import Icon from '../Icon/Icon.svelte'
  import Loading from '../Loading/Loading.svelte'
  import Overlay from '../Overlay/Overlay.svelte'

  let {
    show = $bindable(false),
    type = 'text',
    message = '',
    icon = '',
    position = 'middle',
    duration = 2000,
    overlay = false,
    forbidClick = false,
    closeOnClick = false,
    closeOnClickOverlay = false,
    zIndex = 2010,
    class: className = '',
  }: {
    show?: boolean
    type?: 'text' | 'loading' | 'success' | 'fail' | 'html'
    message?: string | number
    icon?: string
    position?: 'top' | 'middle' | 'bottom'
    duration?: number
    overlay?: boolean
    forbidClick?: boolean
    closeOnClick?: boolean
    closeOnClickOverlay?: boolean
    zIndex?: number
    class?: string
  } = $props()

  let timer: ReturnType<typeof setTimeout>

  $effect(() => {
    if (show && duration > 0 && type !== 'loading') {
      clearTimeout(timer)
      timer = setTimeout(() => { show = false }, duration)
    }
    return () => clearTimeout(timer)
  })

  const iconName = $derived(icon || (type === 'success' ? 'success' : type === 'fail' ? 'fail' : ''))
</script>

{#if show}
  {#if overlay || forbidClick}
    <Overlay show={true} zIndex={zIndex} customStyle={forbidClick && !overlay ? 'background: transparent' : ''} />
  {/if}
  <div
    class="smu-toast smu-toast--{position} smu-toast--{type === 'html' ? 'text' : (iconName || type === 'loading') ? 'icon' : 'text'} {className}"
    style="z-index: {zIndex + 1}"
    onclick={() => closeOnClick && (show = false)}
  >
    {#if type === 'loading'}
      <Loading class="smu-toast__loading" type="spinner" color="white" />
    {:else if iconName}
      <Icon name={iconName} class="smu-toast__icon" size="36" />
    {/if}
    {#if message}
      {#if type === 'html'}
        <div class="smu-toast__text">{@html message}</div>
      {:else}
        <div class="smu-toast__text">{message}</div>
      {/if}
    {/if}
  </div>
{/if}

<style lang="scss">
  .smu-toast {
    position: fixed;
    left: 50%;
    display: flex;
    max-width: 70%;
    padding: var(--smu-padding-xs) var(--smu-padding-sm);
    color: var(--smu-white);
    font-size: var(--smu-font-size-md);
    line-height: var(--smu-line-height-md);
    white-space: pre-wrap;
    word-break: break-all;
    text-align: center;
    background: rgba(0, 0, 0, 0.7);
    border-radius: var(--smu-radius-lg);
    transform: translateX(-50%);
    animation: smu-fade-in var(--smu-duration-fast);

    &--top { top: 20%; }
    &--middle { top: 50%; transform: translate(-50%, -50%); }
    &--bottom { bottom: 20%; }

    &--icon {
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-width: 96px;
      min-height: 96px;
      padding: var(--smu-padding-md);
    }

    &--text {
      align-items: center;
      min-width: 96px;
      padding: var(--smu-padding-xs) var(--smu-padding-sm);
    }

    &__icon {
      font-size: 36px;
    }

    &__loading {
      margin: 0 auto;
    }

    &__text {
      margin-top: 8px;
      font-size: var(--smu-font-size-md);
      line-height: var(--smu-line-height-md);

      .smu-toast--text & { margin-top: 0; }
    }
  }

  @keyframes smu-fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
</style>
`, idx('Toast'))

// ==================== Tag ====================
writeComp('Tag', `<script lang="ts">
  import Icon from '../Icon/Icon.svelte'
  import type { Snippet } from 'svelte'

  let {
    type = 'default',
    size = '',
    color = '',
    plain = false,
    round = false,
    mark = false,
    textColor = '',
    closeable = false,
    show = true,
    children,
    onclose,
    class: className = '',
  }: {
    type?: 'default' | 'primary' | 'success' | 'danger' | 'warning'
    size?: '' | 'large' | 'medium'
    color?: string
    plain?: boolean
    round?: boolean
    mark?: boolean
    textColor?: string
    closeable?: boolean
    show?: boolean
    children?: Snippet
    onclose?: () => void
    class?: string
  } = $props()

  const style = $derived([
    color && !plain ? \`background: \${color}; border-color: \${color}\` : '',
    color && plain ? \`color: \${color}; border-color: \${color}\` : '',
    textColor ? \`color: \${textColor}\` : '',
  ].filter(Boolean).join('; '))
</script>

{#if show}
  <span
    class="smu-tag smu-tag--{type} {size ? \`smu-tag--\${size}\` : ''} {plain ? 'smu-tag--plain' : ''} {round ? 'smu-tag--round' : ''} {mark ? 'smu-tag--mark' : ''} {className}"
    {style}
  >
    {#if children}{@render children()}{/if}
    {#if closeable}
      <span class="smu-tag__close" onclick|stopPropagation={() => { onclose?.() }} role="button" tabindex="0">
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

    &--default { background: var(--smu-gray-6); border-color: var(--smu-gray-6); }
    &--primary { background: var(--smu-primary-color); border-color: var(--smu-primary-color); }
    &--success { background: var(--smu-success-color); border-color: var(--smu-success-color); }
    &--danger { background: var(--smu-danger-color); border-color: var(--smu-danger-color); }
    &--warning { background: var(--smu-warning-color); border-color: var(--smu-warning-color); }

    &--plain {
      background: var(--smu-white);
      &.smu-tag--default { color: var(--smu-gray-6); }
      &.smu-tag--primary { color: var(--smu-primary-color); }
      &.smu-tag--success { color: var(--smu-success-color); }
      &.smu-tag--danger { color: var(--smu-danger-color); }
      &.smu-tag--warning { color: var(--smu-warning-color); }
    }

    &--round { border-radius: var(--smu-radius-max); padding: 0 8px; }
    &--mark { border-radius: 0 var(--smu-radius-max) var(--smu-radius-max) 0; }

    &--medium { padding: 2px 6px; font-size: var(--smu-font-size-sm); }
    &--large { padding: 4px 8px; font-size: var(--smu-font-size-md); border-radius: var(--smu-radius-md); }

    &__close {
      margin-left: 2px;
      cursor: pointer;
    }
  }
</style>
`, idx('Tag'))

// ==================== Badge ====================
writeComp('Badge', `<script lang="ts">
  import type { Snippet } from 'svelte'

  let {
    content = '',
    color = '',
    dot = false,
    max = 0,
    showZero = true,
    offset,
    children,
    class: className = '',
  }: {
    content?: string | number
    color?: string
    dot?: boolean
    max?: number
    showZero?: boolean
    offset?: [number, number]
    children?: Snippet
    class?: string
  } = $props()

  const displayContent = $derived(() => {
    if (dot) return ''
    if (typeof content === 'number' && max > 0 && content > max) return max + '+'
    if (content === 0 && !showZero) return ''
    return String(content ?? '')
  })

  const badgeStyle = $derived([
    color ? \`background: \${color}\` : '',
    offset ? \`transform: translate(\${offset[0]}px, \${offset[1]}px)\` : '',
  ].filter(Boolean).join('; '))
</script>

<div class="smu-badge__wrapper {className}">
  {#if children}{@render children()}{/if}
  {#if dot || displayContent()}
    <div class="smu-badge {dot ? 'smu-badge--dot' : ''} {!children ? 'smu-badge--fixed' : ''}" style={badgeStyle}>
      {#if !dot}{displayContent()}{/if}
    </div>
  {/if}
</div>

<style lang="scss">
  .smu-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    min-width: 16px;
    padding: 0 3px;
    color: var(--smu-white);
    font-size: var(--smu-font-size-xs);
    font-weight: var(--smu-font-bold);
    line-height: 14px;
    text-align: center;
    background: var(--smu-danger-color);
    border: 1px solid var(--smu-white);
    border-radius: var(--smu-radius-max);

    &__wrapper {
      position: relative;
      display: inline-block;
    }

    &--dot {
      width: 8px;
      min-width: 0;
      height: 8px;
      padding: 0;
      border-radius: 50%;
    }

    &--fixed:not(.smu-badge--dot) {
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(50%, -50%);
    }

    &--dot.smu-badge--fixed {
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(50%, -50%);
    }
  }
</style>
`, idx('Badge'))

// ==================== Divider ====================
writeComp('Divider', `<script lang="ts">
  import type { Snippet } from 'svelte'

  let {
    dashed = false,
    hairline = true,
    contentPosition = 'center',
    children,
    class: className = '',
  }: {
    dashed?: boolean
    hairline?: boolean
    contentPosition?: 'left' | 'center' | 'right'
    children?: Snippet
    class?: string
  } = $props()
</script>

<div class="smu-divider {dashed ? 'smu-divider--dashed' : ''} {hairline ? 'smu-divider--hairline' : ''} smu-divider--content-{contentPosition} {className}" role="separator">
  {#if children}<span class="smu-divider__content">{@render children()}</span>{/if}
</div>

<style lang="scss">
  .smu-divider {
    display: flex;
    align-items: center;
    margin: var(--smu-padding-md) 0;
    color: var(--smu-text-color-2);
    font-size: var(--smu-font-size-md);
    line-height: var(--smu-line-height-md);
    border: 0;
    border-top: 1px solid var(--smu-border-color);

    &--hairline { border-top-width: 0.5px; }
    &--dashed { border-style: dashed; }

    &--content-left,
    &--content-center,
    &--content-right {
      border-top: 0;

      &::before,
      &::after {
        display: block;
        border-top: 1px solid var(--smu-border-color);
        content: '';
        flex: 1;
      }
    }

    &--content-center::before,
    &--content-center::after { flex: 1; }
    &--content-left::before { max-width: 10%; }
    &--content-right::after { max-width: 10%; }

    &__content {
      margin: 0 var(--smu-padding-md);
      white-space: nowrap;
    }
  }
</style>
`, idx('Divider'))

// ==================== Empty ====================
writeComp('Empty', `<script lang="ts">
  import type { Snippet } from 'svelte'

  let {
    image = 'default',
    imageSize = '',
    description = '',
    children,
    class: className = '',
  }: {
    image?: 'default' | 'error' | 'network' | 'search' | string
    imageSize?: string | number
    description?: string
    children?: Snippet
    class?: string
  } = $props()

  const imgStyle = $derived(imageSize ? \`width: \${typeof imageSize === 'number' ? imageSize + 'px' : imageSize}; height: \${typeof imageSize === 'number' ? imageSize + 'px' : imageSize}\` : '')
</script>

<div class="smu-empty {className}">
  <div class="smu-empty__image" style={imgStyle}>
    {#if image === 'default'}
      <svg viewBox="0 0 160 160"><path d="M80 20C44.6 20 16 48.6 16 84c0 28.4 18.5 52.5 44.1 60.8v7c0 4 3.6 8.2 8.2 8.2h23.4c4.6 0 8.2-3.6 8.2-8.2v-7C125.5 136.5 144 112.4 144 84c0-35.4-28.6-64-64-64z" fill="var(--smu-gray-3)"/><circle cx="60" cy="76" r="8" fill="var(--smu-gray-6)"/><circle cx="100" cy="76" r="8" fill="var(--smu-gray-6)"/><path d="M60 104c0 0 10 12 20 12s20-12 20-12" fill="none" stroke="var(--smu-gray-6)" stroke-width="3"/></svg>
    {:else if image === 'error'}
      <svg viewBox="0 0 160 160"><circle cx="80" cy="80" r="60" fill="var(--smu-gray-3)"/><path d="M60 60l40 40M100 60l-40 40" stroke="var(--smu-gray-6)" stroke-width="4"/></svg>
    {:else if image === 'network'}
      <svg viewBox="0 0 160 160"><circle cx="80" cy="80" r="60" fill="var(--smu-gray-3)"/><path d="M50 90c8-16 22-24 30-24s22 8 30 24" fill="none" stroke="var(--smu-gray-6)" stroke-width="3"/><path d="M40 70c12-24 30-36 40-36s28 12 40 36" fill="none" stroke="var(--smu-gray-6)" stroke-width="3"/></svg>
    {:else if image === 'search'}
      <svg viewBox="0 0 160 160"><circle cx="68" cy="68" r="40" fill="none" stroke="var(--smu-gray-3)" stroke-width="8"/><path d="M98 98l30 30" stroke="var(--smu-gray-3)" stroke-width="8"/></svg>
    {:else}
      <img src={image} alt="empty" />
    {/if}
  </div>
  {#if description}
    <p class="smu-empty__description">{description}</p>
  {/if}
  {#if children}
    <div class="smu-empty__bottom">{@render children()}</div>
  {/if}
</div>

<style lang="scss">
  .smu-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 32px 0;

    &__image {
      width: 160px;
      height: 160px;

      img, svg {
        width: 100%;
        height: 100%;
      }
    }

    &__description {
      margin-top: var(--smu-padding-md);
      padding: 0 60px;
      color: var(--smu-gray-6);
      font-size: var(--smu-font-size-md);
      line-height: var(--smu-line-height-md);
    }

    &__bottom {
      margin-top: 24px;
    }
  }
</style>
`, idx('Empty'))

// ==================== Progress ====================
writeComp('Progress', `<script lang="ts">
  let {
    percentage = 0,
    strokeWidth = 4,
    color = '',
    trackColor = '',
    pivotText = '',
    pivotColor = '',
    textColor = '',
    inactive = false,
    showPivot = true,
    class: className = '',
  }: {
    percentage?: number
    strokeWidth?: number | string
    color?: string
    trackColor?: string
    pivotText?: string
    pivotColor?: string
    textColor?: string
    inactive?: boolean
    showPivot?: boolean
    class?: string
  } = $props()

  const bg = $derived(inactive ? 'var(--smu-gray-5)' : (color || 'var(--smu-primary-color)'))
  const text = $derived(pivotText || \`\${percentage}%\`)
</script>

<div class="smu-progress {className}">
  <span
    class="smu-progress__track"
    style="height: {typeof strokeWidth === 'number' ? strokeWidth + 'px' : strokeWidth}; {trackColor ? \`background: \${trackColor}\` : ''}"
  >
    <span
      class="smu-progress__portion"
      style="width: {percentage}%; background: {bg}"
    >
      {#if showPivot}
        <span
          class="smu-progress__pivot"
          style="color: {textColor || 'var(--smu-white)'}; background: {pivotColor || bg}"
        >{text}</span>
      {/if}
    </span>
  </span>
</div>

<style lang="scss">
  .smu-progress {
    position: relative;
    height: 4px;
    border-radius: var(--smu-radius-max);

    &__track {
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
      background: var(--smu-gray-3);
      border-radius: inherit;
    }

    &__portion {
      position: absolute;
      left: 0;
      height: 100%;
      background: var(--smu-primary-color);
      border-radius: inherit;
      transition: width var(--smu-duration-base);
    }

    &__pivot {
      position: absolute;
      top: 50%;
      right: 0;
      box-sizing: border-box;
      min-width: 3.6em;
      padding: 0 5px;
      font-size: var(--smu-font-size-xs);
      line-height: 1.6;
      text-align: center;
      word-break: keep-all;
      background: var(--smu-primary-color);
      border-radius: 1em;
      transform: translate(50%, -50%);
    }
  }
</style>
`, idx('Progress'))

// ==================== NoticeBar ====================
writeComp('NoticeBar', `<script lang="ts">
  import Icon from '../Icon/Icon.svelte'
  import type { Snippet } from 'svelte'

  let {
    text = '',
    mode = '',
    color = '',
    background = '',
    leftIcon = '',
    wrapable = false,
    scrollable = true,
    delay = 1,
    speed = 60,
    children,
    onclick,
    onclose,
    class: className = '',
  }: {
    text?: string
    mode?: '' | 'closeable' | 'link'
    color?: string
    background?: string
    leftIcon?: string
    wrapable?: boolean
    scrollable?: boolean
    delay?: number
    speed?: number
    children?: Snippet
    onclick?: (e: MouseEvent) => void
    onclose?: () => void
    class?: string
  } = $props()

  let show = $state(true)

  function handleClose(e: MouseEvent) {
    e.stopPropagation()
    show = false
    onclose?.()
  }
</script>

{#if show}
  <div
    class="smu-notice-bar {wrapable ? 'smu-notice-bar--wrapable' : ''} {className}"
    style="{color ? \`color: \${color}\` : ''}; {background ? \`background: \${background}\` : ''}"
    onclick={onclick}
    role={mode === 'link' ? 'link' : undefined}
  >
    {#if leftIcon}
      <Icon name={leftIcon} class="smu-notice-bar__left-icon" />
    {/if}
    <div class="smu-notice-bar__wrap">
      <div class="smu-notice-bar__content {scrollable && !wrapable ? 'smu-notice-bar__content--scrollable' : ''}" style={scrollable && !wrapable ? \`animation-delay: \${delay}s; animation-duration: \${text.length / speed * 10}s\` : ''}>
        {#if children}{@render children()}{:else}{text}{/if}
      </div>
    </div>
    {#if mode === 'closeable'}
      <Icon name="cross" class="smu-notice-bar__right-icon" onclick={handleClose} />
    {:else if mode === 'link'}
      <Icon name="arrow" class="smu-notice-bar__right-icon" />
    {/if}
  </div>
{/if}

<style lang="scss">
  .smu-notice-bar {
    position: relative;
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 var(--smu-padding-md);
    color: #ed6a0c;
    font-size: var(--smu-font-size-md);
    line-height: 24px;
    background: #fffbe8;

    &--wrapable {
      height: auto;
      padding: var(--smu-padding-xs) var(--smu-padding-md);

      .smu-notice-bar__wrap { height: auto; }
      .smu-notice-bar__content { position: relative; white-space: normal; word-wrap: break-word; }
    }

    &__left-icon {
      min-width: 24px;
      font-size: 16px;
      margin-right: 4px;
    }

    &__right-icon {
      min-width: 24px;
      font-size: 16px;
      margin-left: 4px;
      cursor: pointer;
    }

    &__wrap {
      position: relative;
      flex: 1;
      overflow: hidden;
    }

    &__content {
      position: absolute;
      white-space: nowrap;

      &--scrollable {
        animation: smu-notice-scroll linear infinite;
      }
    }
  }

  @keyframes smu-notice-scroll {
    0% { transform: translateX(100%); }
    100% { transform: translateX(-100%); }
  }
</style>
`, idx('NoticeBar'))

// ==================== NavBar ====================
writeComp('NavBar', `<script lang="ts">
  import Icon from '../Icon/Icon.svelte'
  import type { Snippet } from 'svelte'

  let {
    title = '',
    leftText = '',
    rightText = '',
    leftArrow = false,
    border = true,
    fixed = false,
    placeholder = false,
    safeAreaInsetTop = false,
    zIndex = 1,
    onclickLeft,
    onclickRight,
    leftSlot,
    rightSlot,
    titleSlot,
    class: className = '',
  }: {
    title?: string
    leftText?: string
    rightText?: string
    leftArrow?: boolean
    border?: boolean
    fixed?: boolean
    placeholder?: boolean
    safeAreaInsetTop?: boolean
    zIndex?: number
    onclickLeft?: () => void
    onclickRight?: () => void
    leftSlot?: Snippet
    rightSlot?: Snippet
    titleSlot?: Snippet
    class?: string
  } = $props()
</script>

{#if fixed && placeholder}
  <div class="smu-nav-bar__placeholder" style="height: 46px"></div>
{/if}
<div
  class="smu-nav-bar {border ? 'smu-hairline--bottom' : ''} {fixed ? 'smu-nav-bar--fixed' : ''} {safeAreaInsetTop ? 'smu-safe-area-top' : ''} {className}"
  style="z-index: {zIndex}"
>
  <div class="smu-nav-bar__left" onclick={onclickLeft} role="button" tabindex="0">
    {#if leftSlot}
      {@render leftSlot()}
    {:else}
      {#if leftArrow}<Icon name="arrow-left" class="smu-nav-bar__arrow" />{/if}
      {#if leftText}<span class="smu-nav-bar__text">{leftText}</span>{/if}
    {/if}
  </div>
  <div class="smu-nav-bar__title smu-ellipsis">
    {#if titleSlot}{@render titleSlot()}{:else}{title}{/if}
  </div>
  <div class="smu-nav-bar__right" onclick={onclickRight} role="button" tabindex="0">
    {#if rightSlot}
      {@render rightSlot()}
    {:else}
      {#if rightText}<span class="smu-nav-bar__text">{rightText}</span>{/if}
    {/if}
  </div>
</div>

<style lang="scss">
  .smu-nav-bar {
    position: relative;
    display: flex;
    align-items: center;
    height: 46px;
    padding: 0 var(--smu-padding-md);
    background: var(--smu-background-2);
    user-select: none;

    &--fixed {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
    }

    &__title {
      max-width: 60%;
      margin: 0 auto;
      color: var(--smu-text-color);
      font-weight: var(--smu-font-bold);
      font-size: var(--smu-font-size-lg);
      text-align: center;
    }

    &__left,
    &__right {
      position: absolute;
      display: flex;
      align-items: center;
      padding: 0 var(--smu-padding-md);
      font-size: var(--smu-font-size-md);
      cursor: pointer;
    }

    &__left { left: 0; }
    &__right { right: 0; }

    &__text { color: var(--smu-primary-color); }
    &__arrow { font-size: 16px; color: var(--smu-primary-color); }
  }
</style>
`, idx('NavBar'))

// ==================== Tabbar / TabbarItem ====================
writeComp('Tabbar', `<script lang="ts">
  import type { Snippet } from 'svelte'

  let {
    active = $bindable(0),
    fixed = true,
    border = true,
    zIndex = 1,
    activeColor = '',
    inactiveColor = '',
    placeholder = false,
    safeAreaInsetBottom = true,
    onChange,
    children,
    class: className = '',
  }: {
    active?: number | string
    fixed?: boolean
    border?: boolean
    zIndex?: number
    activeColor?: string
    inactiveColor?: string
    placeholder?: boolean
    safeAreaInsetBottom?: boolean
    onChange?: (active: number | string) => void
    children?: Snippet
    class?: string
  } = $props()
</script>

{#if fixed && placeholder}
  <div class="smu-tabbar__placeholder" style="height: 50px"></div>
{/if}
<div
  class="smu-tabbar {fixed ? 'smu-tabbar--fixed' : ''} {border ? 'smu-hairline--top' : ''} {safeAreaInsetBottom ? 'smu-safe-area-bottom' : ''} {className}"
  style="z-index: {zIndex}"
>
  {#if children}{@render children()}{/if}
</div>

<style lang="scss">
  .smu-tabbar {
    display: flex;
    align-items: center;
    justify-content: space-around;
    box-sizing: content-box;
    height: 50px;
    background: var(--smu-background-2);

    &--fixed {
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 1;
      width: 100%;
    }

    &__placeholder {
      box-sizing: content-box;
    }
  }
</style>
`, idx('Tabbar'))

writeComp('TabbarItem', `<script lang="ts">
  import Icon from '../Icon/Icon.svelte'
  import Badge from '../Badge/Badge.svelte'
  import type { Snippet } from 'svelte'

  let {
    name = '',
    icon = '',
    dot = false,
    badge = '',
    isActive = false,
    activeColor = '',
    inactiveColor = '',
    children,
    iconSlot,
    onclick,
    class: className = '',
  }: {
    name?: string | number
    icon?: string
    dot?: boolean
    badge?: string | number
    isActive?: boolean
    activeColor?: string
    inactiveColor?: string
    children?: Snippet
    iconSlot?: Snippet
    onclick?: () => void
    class?: string
  } = $props()

  const color = $derived(isActive ? (activeColor || 'var(--smu-primary-color)') : (inactiveColor || 'var(--smu-gray-7)'))
</script>

<div class="smu-tabbar-item {isActive ? 'smu-tabbar-item--active' : ''} {className}" style="color: {color}" onclick={onclick} role="tab" tabindex="0">
  <div class="smu-tabbar-item__icon">
    {#if iconSlot}
      <Badge {dot} content={badge}>{@render iconSlot()}</Badge>
    {:else if icon}
      <Badge {dot} content={badge}><Icon name={icon} size="22" /></Badge>
    {/if}
  </div>
  {#if children}
    <div class="smu-tabbar-item__text">{@render children()}</div>
  {/if}
</div>

<style lang="scss">
  .smu-tabbar-item {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--smu-gray-7);
    font-size: var(--smu-font-size-sm);
    line-height: 1;
    cursor: pointer;

    &--active { color: var(--smu-primary-color); }

    &__icon {
      position: relative;
      margin-bottom: 4px;
      font-size: 22px;
    }

    &__text {
      font-size: var(--smu-font-size-xs);
    }
  }
</style>
`, idx('TabbarItem'))

// ==================== Tabs ====================
writeComp('Tabs', `<script lang="ts">
  import type { Snippet } from 'svelte'

  let {
    active = $bindable(0),
    type = 'line',
    color = '',
    background = '',
    lineWidth = 40,
    lineHeight = 3,
    sticky = false,
    animated = false,
    swipeable = false,
    scrollspy = false,
    ellipsis = true,
    shrink = false,
    onChange,
    items = [],
    children,
    class: className = '',
  }: {
    active?: number | string
    type?: 'line' | 'card'
    color?: string
    background?: string
    lineWidth?: number | string
    lineHeight?: number | string
    sticky?: boolean
    animated?: boolean
    swipeable?: boolean
    scrollspy?: boolean
    ellipsis?: boolean
    shrink?: boolean
    onChange?: (index: number | string) => void
    items?: Array<{ title: string; name?: string; disabled?: boolean; badge?: string | number; dot?: boolean }>
    children?: Snippet
    class?: string
  } = $props()

  function handleClick(index: number, name?: string) {
    const val = name ?? index
    active = val
    onChange?.(val)
  }
</script>

<div class="smu-tabs smu-tabs--{type} {className}">
  <div class="smu-tabs__wrap {type === 'line' ? 'smu-hairline--top-bottom' : ''}" style="{background ? \`background: \${background}\` : ''}">
    <div class="smu-tabs__nav smu-tabs__nav--{type}" role="tablist">
      {#each items as item, i}
        {@const isActive = (item.name ?? i) === active}
        <div
          class="smu-tab {isActive ? 'smu-tab--active' : ''} {item.disabled ? 'smu-tab--disabled' : ''} {shrink ? 'smu-tab--shrink' : ''} {ellipsis ? 'smu-ellipsis' : ''}"
          style="{isActive && type === 'card' && color ? \`color: var(--smu-white); border-color: \${color}; background: \${color}\` : ''} {!isActive && type === 'card' && color ? \`border-color: \${color}; color: \${color}\` : ''} {isActive && type === 'line' && color ? \`color: \${color}\` : ''}"
          role="tab"
          tabindex="0"
          onclick={() => !item.disabled && handleClick(i, item.name)}
        >
          <span class="smu-tab__text">{item.title}</span>
          {#if item.dot}<div class="smu-tab__dot"></div>{/if}
          {#if item.badge}<div class="smu-tab__badge">{item.badge}</div>{/if}
        </div>
      {/each}
      {#if type === 'line'}
        <div class="smu-tabs__line" style="width: {typeof lineWidth === 'number' ? lineWidth + 'px' : lineWidth}; height: {typeof lineHeight === 'number' ? lineHeight + 'px' : lineHeight}; {color ? \`background: \${color}\` : ''}; transform: translateX({(typeof active === 'number' ? active : 0) * 100}%)"></div>
      {/if}
    </div>
  </div>
  {#if children}
    <div class="smu-tabs__content">{@render children()}</div>
  {/if}
</div>

<style lang="scss">
  .smu-tabs {
    position: relative;

    &__wrap {
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      &::-webkit-scrollbar { display: none; }
    }

    &__nav {
      position: relative;
      display: flex;
      user-select: none;

      &--line {
        box-sizing: content-box;
        height: 100%;
        padding-bottom: 15px;
      }

      &--card {
        box-sizing: border-box;
        height: 30px;
        margin: 0 var(--smu-padding-md);
        border: 1px solid var(--smu-primary-color);
        border-radius: var(--smu-radius-sm);
      }
    }

    &__line {
      position: absolute;
      bottom: 15px;
      left: 0;
      z-index: 1;
      height: 3px;
      background: var(--smu-primary-color);
      border-radius: var(--smu-radius-max);
      transition: transform var(--smu-duration-base);
    }

    &__content {
      margin: var(--smu-padding-md) 0;
    }
  }

  .smu-tab {
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 0 var(--smu-padding-base);
    color: var(--smu-text-color);
    font-size: var(--smu-font-size-md);
    line-height: 44px;
    cursor: pointer;

    &--active { color: var(--smu-text-color); font-weight: var(--smu-font-bold); }
    &--disabled { color: var(--smu-gray-5); cursor: not-allowed; }
    &--shrink { flex: none; padding: 0 var(--smu-padding-xs); }

    &__dot {
      position: absolute;
      top: 4px;
      right: 4px;
      width: 8px;
      height: 8px;
      background: var(--smu-danger-color);
      border-radius: 50%;
    }

    &__badge {
      position: absolute;
      top: 2px;
      right: -4px;
      min-width: 16px;
      padding: 0 3px;
      color: var(--smu-white);
      font-size: var(--smu-font-size-xs);
      line-height: 14px;
      text-align: center;
      background: var(--smu-danger-color);
      border-radius: var(--smu-radius-max);
    }
  }
</style>
`, idx('Tabs'))

// ==================== Switch ====================
writeComp('Switch', `<script lang="ts">
  import Loading from '../Loading/Loading.svelte'

  let {
    checked = $bindable(false),
    loading = false,
    disabled = false,
    size = '26px',
    activeColor = '',
    inactiveColor = '',
    activeValue = true,
    inactiveValue = false,
    onChange,
    class: className = '',
  }: {
    checked?: boolean | any
    loading?: boolean
    disabled?: boolean
    size?: string | number
    activeColor?: string
    inactiveColor?: string
    activeValue?: any
    inactiveValue?: any
    onChange?: (val: any) => void
    class?: string
  } = $props()

  const isChecked = $derived(checked === activeValue)
  const sizeStr = $derived(typeof size === 'number' ? size + 'px' : size)

  function toggle() {
    if (disabled || loading) return
    const newVal = isChecked ? inactiveValue : activeValue
    checked = newVal
    onChange?.(newVal)
  }
</script>

<div
  class="smu-switch {isChecked ? 'smu-switch--on' : ''} {disabled ? 'smu-switch--disabled' : ''} {loading ? 'smu-switch--loading' : ''} {className}"
  style="font-size: {sizeStr}; {isChecked && activeColor ? \`background: \${activeColor}\` : ''} {!isChecked && inactiveColor ? \`background: \${inactiveColor}\` : ''}"
  role="switch"
  aria-checked={isChecked}
  tabindex="0"
  onclick={toggle}
>
  <div class="smu-switch__node">
    {#if loading}
      <Loading size="65%" class="smu-switch__loading" color={isChecked ? (activeColor || 'var(--smu-primary-color)') : (inactiveColor || 'var(--smu-gray-5)')} />
    {/if}
  </div>
</div>

<style lang="scss">
  .smu-switch {
    position: relative;
    display: inline-block;
    box-sizing: content-box;
    width: 2em;
    height: 1em;
    background: rgba(120, 120, 128, 0.16);
    border-radius: 1em;
    cursor: pointer;
    transition: background var(--smu-duration-base);

    &--on {
      background: var(--smu-primary-color);

      .smu-switch__node {
        transform: translateX(1em);
        background: var(--smu-white);
      }
    }

    &--disabled {
      cursor: not-allowed;
      opacity: var(--smu-disabled-opacity);
    }

    &__node {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1em;
      height: 1em;
      background: var(--smu-white);
      border-radius: 50%;
      box-shadow: 0 3px 1px 0 rgba(0, 0, 0, 0.05), 0 2px 2px 0 rgba(0, 0, 0, 0.1), 0 3px 3px 0 rgba(0, 0, 0, 0.05);
      transition: transform var(--smu-duration-base) cubic-bezier(0.3, 1.05, 0.4, 1.05);
    }

    &__loading { display: flex; }
  }
</style>
`, idx('Switch'))

// ==================== Checkbox / CheckboxGroup ====================
writeComp('Checkbox', `<script lang="ts">
  import Icon from '../Icon/Icon.svelte'
  import type { Snippet } from 'svelte'

  let {
    checked = $bindable(false),
    disabled = false,
    shape = 'round',
    iconSize = '20px',
    checkedColor = '',
    labelPosition = 'right',
    labelDisabled = false,
    name = '',
    onChange,
    children,
    class: className = '',
  }: {
    checked?: boolean
    disabled?: boolean
    shape?: 'round' | 'square'
    iconSize?: string
    checkedColor?: string
    labelPosition?: 'left' | 'right'
    labelDisabled?: boolean
    name?: string
    onChange?: (checked: boolean) => void
    children?: Snippet
    class?: string
  } = $props()

  function toggle() {
    if (disabled) return
    checked = !checked
    onChange?.(checked)
  }
</script>

<div class="smu-checkbox {disabled ? 'smu-checkbox--disabled' : ''} smu-checkbox--label-{labelPosition} {className}" onclick={toggle} role="checkbox" aria-checked={checked} tabindex="0">
  {#if labelPosition === 'left' && children}
    <span class="smu-checkbox__label" onclick|stopPropagation={labelDisabled ? () => {} : undefined}>{@render children()}</span>
  {/if}
  <div class="smu-checkbox__icon smu-checkbox__icon--{shape} {checked ? 'smu-checkbox__icon--checked' : ''}" style="font-size: {iconSize}; {checked && checkedColor ? \`background: \${checkedColor}; border-color: \${checkedColor}\` : ''}">
    <Icon name="success" size="0.8em" />
  </div>
  {#if labelPosition === 'right' && children}
    <span class="smu-checkbox__label" onclick|stopPropagation={labelDisabled ? () => {} : undefined}>{@render children()}</span>
  {/if}
</div>

<style lang="scss">
  .smu-checkbox {
    display: flex;
    align-items: center;
    overflow: hidden;
    cursor: pointer;
    user-select: none;

    &--disabled { cursor: not-allowed; opacity: var(--smu-disabled-opacity); }
    &--label-left { flex-direction: row-reverse; }

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

      &--round { border-radius: 50%; }
      &--square { border-radius: var(--smu-radius-sm); }

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
`, idx('Checkbox'))

writeComp('CheckboxGroup', `<script lang="ts">
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
`, idx('CheckboxGroup'))

// ==================== Radio / RadioGroup ====================
writeComp('Radio', `<script lang="ts">
  import Icon from '../Icon/Icon.svelte'
  import type { Snippet } from 'svelte'

  let {
    checked = $bindable(false),
    disabled = false,
    shape = 'round',
    iconSize = '20px',
    checkedColor = '',
    labelPosition = 'right',
    labelDisabled = false,
    name = '',
    onclick,
    children,
    class: className = '',
  }: {
    checked?: boolean
    disabled?: boolean
    shape?: 'round' | 'square' | 'dot'
    iconSize?: string
    checkedColor?: string
    labelPosition?: 'left' | 'right'
    labelDisabled?: boolean
    name?: string
    onclick?: () => void
    children?: Snippet
    class?: string
  } = $props()

  function toggle() {
    if (disabled) return
    checked = true
    onclick?.()
  }
</script>

<div class="smu-radio {disabled ? 'smu-radio--disabled' : ''} smu-radio--label-{labelPosition} {className}" onclick={toggle} role="radio" aria-checked={checked} tabindex="0">
  {#if labelPosition === 'left' && children}
    <span class="smu-radio__label">{@render children()}</span>
  {/if}
  <div class="smu-radio__icon smu-radio__icon--{shape} {checked ? 'smu-radio__icon--checked' : ''}" style="font-size: {iconSize}; {checked && checkedColor ? \`border-color: \${checkedColor}; background: \${shape === 'dot' ? 'var(--smu-white)' : checkedColor}\` : ''}">
    {#if shape === 'dot'}
      <div class="smu-radio__dot" style="{checked && checkedColor ? \`background: \${checkedColor}\` : ''}"></div>
    {:else}
      <Icon name="success" size="0.8em" />
    {/if}
  </div>
  {#if labelPosition === 'right' && children}
    <span class="smu-radio__label">{@render children()}</span>
  {/if}
</div>

<style lang="scss">
  .smu-radio {
    display: flex;
    align-items: center;
    overflow: hidden;
    cursor: pointer;
    user-select: none;

    &--disabled { cursor: not-allowed; opacity: var(--smu-disabled-opacity); }
    &--label-left { flex-direction: row-reverse; }

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
      border-radius: 50%;

      &--square { border-radius: var(--smu-radius-sm); }

      &--checked {
        color: var(--smu-white);
        background: var(--smu-primary-color);
        border-color: var(--smu-primary-color);
      }
    }

    &__dot {
      width: 50%;
      height: 50%;
      border-radius: 50%;
      background: var(--smu-primary-color);
      transition: all var(--smu-duration-fast);
    }

    &__label {
      margin-left: var(--smu-padding-xs);
      color: var(--smu-text-color);
      font-size: var(--smu-font-size-md);
      line-height: 20px;

      .smu-radio--label-left & {
        margin: 0 var(--smu-padding-xs) 0 0;
      }
    }
  }
</style>
`, idx('Radio'))

writeComp('RadioGroup', `<script lang="ts">
  import type { Snippet } from 'svelte'

  let {
    value = $bindable(''),
    disabled = false,
    direction = 'vertical',
    iconSize = '20px',
    checkedColor = '',
    onChange,
    children,
    class: className = '',
  }: {
    value?: any
    disabled?: boolean
    direction?: 'horizontal' | 'vertical'
    iconSize?: string
    checkedColor?: string
    onChange?: (value: any) => void
    children?: Snippet
    class?: string
  } = $props()
</script>

<div class="smu-radio-group smu-radio-group--{direction} {className}" role="radiogroup">
  {#if children}{@render children()}{/if}
</div>

<style lang="scss">
  .smu-radio-group {
    &--vertical > :global(*) { margin-bottom: 8px; }
    &--horizontal { display: flex; flex-wrap: wrap; gap: 8px 12px; }
  }
</style>
`, idx('RadioGroup'))

// ==================== Field ====================
writeComp('Field', `<script lang="ts">
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
    if (type === 'digit') v = v.replace(/[^\\d]/g, '')
    if (formatter) v = formatter(v)
    if (maxlength > 0 && v.length > maxlength) v = v.slice(0, maxlength)
    value = v
    onInput?.(v)
  }

  function handleClear() { value = ''; onInput?.('') }
</script>

<div class="smu-field {error ? 'smu-field--error' : ''} {disabled ? 'smu-field--disabled' : ''} {labelAlign === 'top' ? 'smu-field--label-top' : ''} {size ? \`smu-cell--\${size}\` : ''} {border ? 'smu-cell--border' : ''} {className}" onclick={onclick}>
  {#if label || required}
    <div class="smu-field__label" style="width: {labelWidth}; text-align: {labelAlign === 'top' ? 'left' : labelAlign}">
      {#if required}<span class="smu-field__required">*</span>{/if}
      {label}{#if colon}：{/if}
    </div>
  {/if}
  <div class="smu-field__value" style="{inputAlign ? \`text-align: \${inputAlign}\` : ''}">
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
`, idx('Field'))

// ==================== Search ====================
writeComp('Search', `<script lang="ts">
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

<div class="smu-search {className}" style="{background ? \`background: \${background}\` : ''}">
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
`, idx('Search'))

// ==================== Stepper ====================
writeComp('Stepper', `<script lang="ts">
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

<div class="smu-stepper {theme ? \`smu-stepper--\${theme}\` : ''} {className}">
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
`, idx('Stepper'))

// ==================== Rate ====================
writeComp('Rate', `<script lang="ts">
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
`, idx('Rate'))

// ==================== Slider ====================
writeComp('Slider', `<script lang="ts">
  let {
    value = $bindable(0),
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    readonly = false,
    barHeight = '2px',
    buttonSize = '24px',
    activeColor = '',
    inactiveColor = '',
    vertical = false,
    onChange,
    class: className = '',
  }: {
    value?: number
    min?: number
    max?: number
    step?: number
    disabled?: boolean
    readonly?: boolean
    barHeight?: string
    buttonSize?: string
    activeColor?: string
    inactiveColor?: string
    vertical?: boolean
    onChange?: (value: number) => void
    class?: string
  } = $props()

  let root: HTMLDivElement
  const progress = $derived(((value - min) / (max - min)) * 100)

  function onClick(e: MouseEvent) {
    if (disabled || readonly) return
    const rect = root.getBoundingClientRect()
    let ratio: number
    if (vertical) {
      ratio = 1 - (e.clientY - rect.top) / rect.height
    } else {
      ratio = (e.clientX - rect.left) / rect.width
    }
    const val = min + ratio * (max - min)
    value = Math.round(val / step) * step
    value = Math.max(min, Math.min(max, value))
    onChange?.(value)
  }
</script>

<div
  bind:this={root}
  class="smu-slider {vertical ? 'smu-slider--vertical' : ''} {disabled ? 'smu-slider--disabled' : ''} {className}"
  style="{vertical ? 'width' : 'height'}: {barHeight}; {inactiveColor ? \`background: \${inactiveColor}\` : ''}"
  onclick={onClick}
  role="slider"
  aria-valuenow={value}
  aria-valuemin={min}
  aria-valuemax={max}
>
  <div class="smu-slider__bar" style="{vertical ? 'height' : 'width'}: {progress}%; {activeColor ? \`background: \${activeColor}\` : ''}">
    <div class="smu-slider__button-wrapper">
      <div class="smu-slider__button" style="width: {buttonSize}; height: {buttonSize}"></div>
    </div>
  </div>
</div>

<style lang="scss">
  .smu-slider {
    position: relative;
    width: 100%;
    height: 2px;
    background: var(--smu-active-color);
    border-radius: var(--smu-radius-max);
    cursor: pointer;

    &--vertical {
      display: inline-block;
      width: 2px;
      height: 100%;

      .smu-slider__bar { width: 100%; }
      .smu-slider__button-wrapper { top: auto; right: 50%; bottom: 0; transform: translate(50%, 50%); }
    }

    &--disabled { cursor: not-allowed; opacity: var(--smu-disabled-opacity); }

    &__bar {
      position: relative;
      height: 100%;
      background: var(--smu-primary-color);
      border-radius: inherit;
      transition: width var(--smu-duration-fast), height var(--smu-duration-fast);
    }

    &__button-wrapper {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(50%, -50%);
      cursor: grab;
    }

    &__button {
      width: 24px;
      height: 24px;
      background: var(--smu-white);
      border-radius: 50%;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    }
  }
</style>
`, idx('Slider'))

// 更多简单组件直接批量生成
const simpleComponents = [
  { name: 'Collapse', hasChild: 'CollapseItem' },
  { name: 'ActionSheet' },
  { name: 'Dialog' },
  { name: 'Skeleton' },
  { name: 'Steps' },
  { name: 'Swipe' },
  { name: 'Grid' },
  { name: 'CountDown' },
  { name: 'Circle' },
  { name: 'PullRefresh' },
  { name: 'List' },
  { name: 'Popover' },
  { name: 'DropdownMenu' },
  { name: 'Pagination' },
  { name: 'Sidebar' },
  { name: 'TreeSelect' },
  { name: 'IndexBar' },
  { name: 'BackTop' },
  { name: 'FloatingBubble' },
  { name: 'Watermark' },
  { name: 'TextEllipsis' },
  { name: 'Highlight' },
  { name: 'Barrage' },
  { name: 'Card' },
  { name: 'SubmitBar' },
  { name: 'NumberKeyboard' },
  { name: 'PasswordInput' },
  { name: 'Picker' },
  { name: 'DatePicker' },
  { name: 'TimePicker' },
  { name: 'Calendar' },
  { name: 'Cascader' },
  { name: 'Uploader' },
  { name: 'SwipeCell' },
  { name: 'ContactCard' },
  { name: 'Coupon' },
  { name: 'AddressEdit' },
  { name: 'AddressList' },
  { name: 'Area' },
  { name: 'Notify' },
  { name: 'ImagePreview' },
  { name: 'ShareSheet' },
  { name: 'ConfigProvider' },
  { name: 'Form' },
  { name: 'Row' },
  { name: 'Col' },
]

// 生成各组件的详细模板
const templates = {
  Collapse: {
    svelte: `<script lang="ts">
  import type { Snippet } from 'svelte'

  let {
    value = $bindable([]),
    accordion = false,
    border = true,
    children,
    class: className = '',
  }: {
    value?: (string | number)[]
    accordion?: boolean
    border?: boolean
    children?: Snippet
    class?: string
  } = $props()
</script>

<div class="smu-collapse {border ? 'smu-hairline--top-bottom' : ''} {className}">
  {#if children}{@render children()}{/if}
</div>

<style lang="scss">
  .smu-collapse { position: relative; background: var(--smu-background-2); }
</style>`,
    extra: `export { default as CollapseItem } from './CollapseItem.svelte'\n`,
    child: {
      name: 'CollapseItem', svelte: `<script lang="ts">
  import Icon from '../Icon/Icon.svelte'
  import type { Snippet } from 'svelte'

  let {
    title = '',
    name = '',
    icon = '',
    label = '',
    value = '',
    border = true,
    isLink = true,
    disabled = false,
    readonly = false,
    isExpanded = $bindable(false),
    children,
    titleSlot,
    class: className = '',
  }: {
    title?: string
    name?: string | number
    icon?: string
    label?: string
    value?: string
    border?: boolean
    isLink?: boolean
    disabled?: boolean
    readonly?: boolean
    isExpanded?: boolean
    children?: Snippet
    titleSlot?: Snippet
    class?: string
  } = $props()

  function toggle() {
    if (disabled || readonly) return
    isExpanded = !isExpanded
  }
</script>

<div class="smu-collapse-item {isExpanded ? 'smu-collapse-item--expanded' : ''} {className}">
  <div class="smu-cell smu-cell--clickable {border ? 'smu-cell--border' : ''}" onclick={toggle} role="button" tabindex="0">
    {#if icon}<Icon name={icon} class="smu-cell__left-icon" />{/if}
    <div class="smu-cell__title">
      {#if titleSlot}{@render titleSlot()}{:else}{title}{/if}
      {#if label}<div class="smu-cell__label">{label}</div>{/if}
    </div>
    <div class="smu-cell__value">{value}</div>
    {#if isLink}
      <Icon name="arrow-down" class="smu-collapse-item__arrow {isExpanded ? 'smu-collapse-item__arrow--expanded' : ''}" />
    {/if}
  </div>
  {#if isExpanded}
    <div class="smu-collapse-item__wrapper">
      <div class="smu-collapse-item__content">
        {#if children}{@render children()}{/if}
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  .smu-collapse-item {
    position: relative;

    &__arrow {
      transition: transform var(--smu-duration-base);
      color: var(--smu-gray-6);
      font-size: 16px;

      &--expanded { transform: rotate(180deg); }
    }

    &__wrapper {
      overflow: hidden;
    }

    &__content {
      padding: 12px 16px;
      color: var(--smu-gray-6);
      font-size: var(--smu-font-size-md);
      line-height: 1.5;
      background: var(--smu-background-2);
    }
  }

  .smu-cell {
    display: flex;
    align-items: center;
    padding: 10px 16px;
    background: var(--smu-background-2);
    &--clickable { cursor: pointer; &:active { background: var(--smu-active-color); } }
    &--border::after {
      position: absolute; content: ''; right: 16px; bottom: 0; left: 16px;
      border-bottom: 1px solid var(--smu-border-color); transform: scaleY(0.5);
    }
    &__left-icon { margin-right: 4px; font-size: 16px; }
    &__title { flex: 1; font-size: var(--smu-font-size-md); line-height: 24px; }
    &__value { color: var(--smu-gray-6); font-size: var(--smu-font-size-md); }
    &__label { margin-top: 4px; color: var(--smu-gray-6); font-size: var(--smu-font-size-sm); }
  }
</style>` },
  },
  ActionSheet: {
    svelte: `<script lang="ts">
  import Popup from '../Popup/Popup.svelte'
  import Loading from '../Loading/Loading.svelte'
  import Icon from '../Icon/Icon.svelte'
  import type { Snippet } from 'svelte'

  let {
    show = $bindable(false),
    title = '',
    description = '',
    cancelText = '',
    closeable = true,
    closeIcon = 'cross',
    round = true,
    safeAreaInsetBottom = true,
    actions = [],
    onSelect,
    onCancel,
    onclose,
    children,
    class: className = '',
  }: {
    show?: boolean
    title?: string
    description?: string
    cancelText?: string
    closeable?: boolean
    closeIcon?: string
    round?: boolean
    safeAreaInsetBottom?: boolean
    actions?: Array<{ name: string; subname?: string; color?: string; loading?: boolean; disabled?: boolean; className?: string }>
    onSelect?: (action: any, index: number) => void
    onCancel?: () => void
    onclose?: () => void
    children?: Snippet
    class?: string
  } = $props()

  function handleClose() { show = false; onclose?.() }
</script>

<Popup bind:show position="bottom" {round} {closeable} closeIcon={title ? closeIcon : ''} {safeAreaInsetBottom} onclose={handleClose}>
  <div class="smu-action-sheet {className}">
    {#if title}
      <div class="smu-action-sheet__header">{title}</div>
    {/if}
    {#if description}
      <div class="smu-action-sheet__description">{description}</div>
    {/if}
    {#if children}
      <div class="smu-action-sheet__content">{@render children()}</div>
    {:else}
      {#each actions as action, i}
        <button
          class="smu-action-sheet__item {action.disabled ? 'smu-action-sheet__item--disabled' : ''} {action.className || ''}"
          style="{action.color ? \`color: \${action.color}\` : ''}"
          disabled={action.disabled || action.loading}
          onclick={() => { if (!action.disabled && !action.loading) { onSelect?.(action, i); show = false } }}
          type="button"
        >
          {#if action.loading}
            <Loading size="20px" />
          {:else}
            <span class="smu-action-sheet__name">{action.name}</span>
            {#if action.subname}<div class="smu-action-sheet__subname">{action.subname}</div>{/if}
          {/if}
        </button>
      {/each}
    {/if}
    {#if cancelText}
      <div class="smu-action-sheet__gap"></div>
      <button class="smu-action-sheet__cancel" onclick={() => { show = false; onCancel?.() }} type="button">{cancelText}</button>
    {/if}
  </div>
</Popup>

<style lang="scss">
  .smu-action-sheet {
    max-height: 80vh;
    overflow-y: auto;
    color: var(--smu-text-color);

    &__header {
      padding: 12px 16px;
      font-weight: var(--smu-font-bold);
      font-size: var(--smu-font-size-lg);
      line-height: var(--smu-line-height-lg);
      text-align: center;
    }

    &__description {
      padding: 12px 16px;
      color: var(--smu-text-color-2);
      font-size: var(--smu-font-size-md);
      line-height: var(--smu-line-height-md);
      text-align: center;
    }

    &__item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 14px 16px;
      font-size: var(--smu-font-size-lg);
      background: var(--smu-background-2);
      border: none;
      cursor: pointer;

      &:active { background: var(--smu-active-color); }
      &--disabled { color: var(--smu-gray-5); cursor: not-allowed; &:active { background: var(--smu-background-2); } }
    }

    &__subname {
      margin-top: var(--smu-padding-xs);
      color: var(--smu-text-color-2);
      font-size: var(--smu-font-size-sm);
    }

    &__gap { display: block; height: 8px; background: var(--smu-background); }

    &__cancel {
      display: block;
      width: 100%;
      padding: 14px;
      font-size: var(--smu-font-size-lg);
      background: var(--smu-background-2);
      border: none;
      cursor: pointer;
      &:active { background: var(--smu-active-color); }
    }
  }
</style>` },
  Dialog: {
    svelte: `<script lang="ts">
  import Popup from '../Popup/Popup.svelte'
  import Button from '../Button/Button.svelte'
  import type { Snippet } from 'svelte'

  let {
    show = $bindable(false),
    title = '',
    message = '',
    messageAlign = 'center',
    theme = 'default',
    showConfirmButton = true,
    showCancelButton = false,
    confirmButtonText = '确认',
    cancelButtonText = '取消',
    confirmButtonColor = '',
    cancelButtonColor = '',
    closeOnClickOverlay = false,
    width = '320px',
    onConfirm,
    onCancel,
    onclose,
    children,
    footerSlot,
    class: className = '',
  }: {
    show?: boolean
    title?: string
    message?: string
    messageAlign?: 'left' | 'center' | 'right'
    theme?: 'default' | 'round-button'
    showConfirmButton?: boolean
    showCancelButton?: boolean
    confirmButtonText?: string
    cancelButtonText?: string
    confirmButtonColor?: string
    cancelButtonColor?: string
    closeOnClickOverlay?: boolean
    width?: string
    onConfirm?: () => void
    onCancel?: () => void
    onclose?: () => void
    children?: Snippet
    footerSlot?: Snippet
    class?: string
  } = $props()

  function handleConfirm() { onConfirm?.(); show = false }
  function handleCancel() { onCancel?.(); show = false }
</script>

<Popup bind:show position="center" overlay={true} zIndex={2010} onclose={() => { onclose?.() }}>
  <div class="smu-dialog {className}" style="width: {width}">
    {#if title}
      <div class="smu-dialog__header">{title}</div>
    {/if}
    <div class="smu-dialog__content" style="text-align: {messageAlign}">
      {#if children}{@render children()}{:else if message}{message}{/if}
    </div>
    {#if footerSlot}
      {@render footerSlot()}
    {:else}
      <div class="smu-dialog__footer {theme === 'round-button' ? 'smu-dialog__footer--round' : ''}">
        {#if showCancelButton}
          {#if theme === 'round-button'}
            <Button type="default" round size="large" onclick={handleCancel} class="smu-dialog__cancel" color={cancelButtonColor}>{cancelButtonText}</Button>
          {:else}
            <button class="smu-dialog__cancel" onclick={handleCancel} style="{cancelButtonColor ? \`color: \${cancelButtonColor}\` : ''}" type="button">{cancelButtonText}</button>
          {/if}
        {/if}
        {#if showConfirmButton}
          {#if theme === 'round-button'}
            <Button type="primary" round size="large" onclick={handleConfirm} class="smu-dialog__confirm" color={confirmButtonColor}>{confirmButtonText}</Button>
          {:else}
            <button class="smu-dialog__confirm" onclick={handleConfirm} style="{confirmButtonColor ? \`color: \${confirmButtonColor}\` : ''}" type="button">{confirmButtonText}</button>
          {/if}
        {/if}
      </div>
    {/if}
  </div>
</Popup>

<style lang="scss">
  .smu-dialog {
    position: relative;
    width: 320px;
    overflow: hidden;
    font-size: var(--smu-font-size-lg);
    background: var(--smu-background-2);
    border-radius: 16px;

    &__header {
      padding-top: 26px;
      font-weight: var(--smu-font-bold);
      line-height: 24px;
      text-align: center;
    }

    &__content {
      padding: 26px var(--smu-padding-lg);
      font-size: var(--smu-font-size-md);
      line-height: var(--smu-line-height-md);
      color: var(--smu-text-color-2);
      max-height: 60vh;
      overflow-y: auto;
    }

    &__footer {
      display: flex;
      overflow: hidden;
      user-select: none;

      &--round { padding: 8px 24px 16px; gap: 12px; }
    }

    &__confirm,
    &__cancel {
      flex: 1;
      height: 48px;
      margin: 0;
      padding: 0;
      font-size: var(--smu-font-size-lg);
      border: none;
      cursor: pointer;
      background: var(--smu-background-2);

      &:active { background: var(--smu-active-color); }
    }

    &__confirm { color: var(--smu-primary-color); font-weight: var(--smu-font-bold); }
    &__cancel { color: var(--smu-text-color); }

    &__footer:not(&__footer--round) {
      border-top: 1px solid var(--smu-border-color);
    }

    &__footer:not(&__footer--round) &__cancel + &__confirm {
      border-left: 1px solid var(--smu-border-color);
    }
  }
</style>` },
}

// 为没有详细模板的组件生成简化版本
function generateSimple(name, desc = '') {
  return `<script lang="ts">
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

<div class="smu-${name.toLowerCase().replace(/([A-Z])/g, '-$1').replace(/^-/, '')} {className}">
  {#if children}{@render children()}{/if}
</div>

<style lang="scss">
  .smu-${name.toLowerCase().replace(/([A-Z])/g, '-$1').replace(/^-/, '')} {
    position: relative;
  }
</style>`
}

for (const comp of simpleComponents) {
  const template = templates[comp.name]
  if (template) {
    const extra = template.extra || ''
    writeComp(comp.name, template.svelte, idx(comp.name, extra))
    if (template.child) {
      const childDir = path.join(COMP_DIR, comp.name)
      const childPath = path.join(childDir, `${template.child.name}.svelte`)
      if (!fs.existsSync(childPath)) {
        fs.writeFileSync(childPath, template.child.svelte, 'utf-8')
        console.log(`  ✅ ${template.child.name}`)
      }
    }
  } else {
    writeComp(comp.name, generateSimple(comp.name), idx(comp.name))
  }
}

console.log('\n✅ 所有组件生成完毕！')
