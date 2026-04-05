# svelte-mobile-ui

A mobile UI component library built on **Svelte 5**, providing 80+ high-quality components.

[中文文档](./README.zh-CN.md)

## Features

- **80+ components** covering common mobile development scenarios
- **Svelte 5** — built on Svelte 5 Runes mode for excellent performance
- **On-demand import** — supports both full and tree-shakable imports
- **CDN support** — IIFE format available for direct CDN usage
- **Theme customization** — CSS variable-based theming
- **Mobile-first** — designed for mobile, touch-friendly

## Installation

```bash
npm install svelte-mobile-ui
```

## Quick Start

### ES Module

```ts
import { Button, Cell, Icon } from 'svelte-mobile-ui'
import 'svelte-mobile-ui/dist/styles.css'
```

### On-Demand Import

```ts
import { Button } from 'svelte-mobile-ui/components/Button'
```

### CDN

```html
<link rel="stylesheet" href="https://unpkg.com/svelte-mobile-ui/dist/styles.css" />
<script src="https://unpkg.com/svelte-mobile-ui/dist/svelte-mobile-ui.iife.js"></script>
<script>
  const { Button, Cell } = SvelteMobileUI
</script>
```

## Component List

### Basic Components
- `Button` — Button
- `Cell` / `CellGroup` — Cell
- `Icon` — Icon
- `ImageComp` — Image
- `Popup` — Popup
- `Overlay` — Overlay
- `Toast` — Toast
- `ConfigProvider` — Global Configuration

### Form Components
- `Calendar` — Calendar
- `Cascader` — Cascader
- `Checkbox` / `CheckboxGroup` — Checkbox
- `DatePicker` — Date Picker
- `Field` — Input Field
- `Form` — Form
- `NumberKeyboard` — Number Keyboard
- `PasswordInput` — Password Input
- `Picker` / `PickerGroup` — Picker
- `Radio` / `RadioGroup` — Radio
- `Rate` — Rate
- `Search` — Search
- `Slider` — Slider
- `Stepper` — Stepper
- `Switch` — Switch
- `TimePicker` — Time Picker
- `Uploader` — File Upload

### Feedback Components
- `ActionSheet` — Action Sheet
- `Dialog` — Dialog
- `Loading` — Loading
- `Notify` — Notification
- `Popover` — Popover
- `PullRefresh` — Pull to Refresh
- `ShareSheet` — Share Sheet
- `SwipeCell` — Swipe Cell
- `FloatingPanel` — Floating Panel
- `FloatingBubble` — Floating Bubble

### Display Components
- `Badge` — Badge
- `Circle` — Circle Progress
- `Collapse` / `CollapseItem` — Collapse
- `CountDown` — Countdown
- `Divider` — Divider
- `Empty` — Empty State
- `Highlight` — Text Highlight
- `ImagePreview` — Image Preview
- `NoticeBar` — Notice Bar
- `Progress` — Progress
- `Skeleton` — Skeleton
- `Steps` / `Step` — Steps
- `Swipe` / `SwipeItem` — Swipe
- `Tag` — Tag
- `TextEllipsis` — Text Ellipsis
- `Watermark` — Watermark
- `Barrage` — Barrage
- `RollingText` — Rolling Text
- `List` — List

### Navigation Components
- `ActionBar` — Action Bar
- `BackTop` — Back to Top
- `Grid` / `GridItem` — Grid
- `IndexBar` / `IndexAnchor` — Index Bar
- `NavBar` — Navigation Bar
- `Pagination` — Pagination
- `Sidebar` / `SidebarItem` — Sidebar
- `Sticky` — Sticky
- `Tabs` / `Tab` — Tabs
- `Tabbar` / `TabbarItem` — Tab Bar
- `TreeSelect` — Tree Select

### Layout Components
- `Col` — Column
- `Row` — Row
- `Space` — Space

### Business Components
- `AddressEdit` — Address Edit
- `AddressList` — Address List
- `Area` — Area Selector
- `Card` — Product Card
- `ContactCard` — Contact Card
- `ContactEdit` — Contact Edit
- `ContactList` — Contact List
- `Coupon` / `CouponCell` / `CouponList` — Coupon
- `Signature` — Signature
- `SubmitBar` — Submit Bar
- `DropdownMenu` / `DropdownItem` — Dropdown Menu

## Theme Customization

Customize the theme via CSS variables:

```css
:root {
  --smu-primary-color: #1989fa;
  --smu-success-color: #07c160;
  --smu-warning-color: #ff976a;
  --smu-danger-color: #ee0a24;
}
```

Or use the `ConfigProvider` component:

```svelte
<ConfigProvider theme={{ primaryColor: '#1989fa' }}>
  <Button type="primary">Themed Button</Button>
</ConfigProvider>
```

## Compatibility

| Format | File | Usage |
|--------|------|-------|
| ESM | `dist/svelte-mobile-ui.mjs` | `import` syntax |
| CJS | `dist/svelte-mobile-ui.cjs` | `require()` syntax |
| IIFE | `dist/svelte-mobile-ui.iife.js` | CDN / `<script>` tag |
| CSS | `dist/styles.css` | Global styles |
| Svelte Source | `index.ts` | Direct Svelte project import |

## License

MIT
