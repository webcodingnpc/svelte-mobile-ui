# svelte-mobile-ui

基于 Svelte 5 的移动端 UI 组件库，提供 80+ 高质量组件。

## 特性

- 🎯 **80+ 组件** — 覆盖移动端开发常用场景
- ⚡ **Svelte 5** — 基于 Svelte 5 Runes 模式，性能优异
- 📦 **按需引入** — 支持全量引入和按需引入
- 🌐 **CDN 支持** — 提供 IIFE 格式，可直接通过 CDN 使用
- 🎨 **主题定制** — 基于 CSS 变量，轻松定制主题
- 📱 **移动端优先** — 专为移动端设计，触控友好

## 安装

```bash
npm install svelte-mobile-ui
```

## 快速开始

### ES Module 引入

```ts
import { Button, Cell, Icon } from 'svelte-mobile-ui'
import 'svelte-mobile-ui/dist/styles.css'
```

### 按需引入

```ts
import { Button } from 'svelte-mobile-ui/components/Button'
```

### CDN 引入

```html
<link rel="stylesheet" href="https://unpkg.com/svelte-mobile-ui/dist/styles.css" />
<script src="https://unpkg.com/svelte-mobile-ui/dist/svelte-mobile-ui.iife.js"></script>
<script>
  const { Button, Cell } = SvelteMobileUI
</script>
```

## 组件列表

### 基础组件
- `Button` — 按钮
- `Cell` / `CellGroup` — 单元格
- `Icon` — 图标
- `ImageComp` — 图片
- `Popup` — 弹出层
- `Overlay` — 遮罩层
- `Toast` — 轻提示
- `ConfigProvider` — 全局配置

### 表单组件
- `Calendar` — 日历
- `Cascader` — 级联选择
- `Checkbox` / `CheckboxGroup` — 复选框
- `DatePicker` — 日期选择
- `Field` — 输入框
- `Form` — 表单
- `NumberKeyboard` — 数字键盘
- `PasswordInput` — 密码输入框
- `Picker` / `PickerGroup` — 选择器
- `Radio` / `RadioGroup` — 单选
- `Rate` — 评分
- `Search` — 搜索
- `Slider` — 滑块
- `Stepper` — 步进器
- `Switch` — 开关
- `TimePicker` — 时间选择
- `Uploader` — 文件上传

### 反馈组件
- `ActionSheet` — 动作面板
- `Dialog` — 弹出框
- `Loading` — 加载
- `Notify` — 消息提示
- `Popover` — 气泡弹出框
- `PullRefresh` — 下拉刷新
- `ShareSheet` — 分享面板
- `SwipeCell` — 滑动单元格
- `FloatingPanel` — 浮动面板
- `FloatingBubble` — 浮动气泡

### 展示组件
- `Badge` — 徽标
- `Circle` — 环形进度条
- `Collapse` / `CollapseItem` — 折叠面板
- `CountDown` — 倒计时
- `Divider` — 分割线
- `Empty` — 空状态
- `Highlight` — 高亮文本
- `ImagePreview` — 图片预览
- `NoticeBar` — 通知栏
- `Progress` — 进度条
- `Skeleton` — 骨架屏
- `Steps` / `Step` — 步骤条
- `Swipe` / `SwipeItem` — 轮播
- `Tag` — 标签
- `TextEllipsis` — 文本省略
- `Watermark` — 水印
- `Barrage` — 弹幕
- `RollingText` — 翻滚文本
- `List` — 列表

### 导航组件
- `ActionBar` — 动作栏
- `BackTop` — 回到顶部
- `Grid` / `GridItem` — 宫格
- `IndexBar` / `IndexAnchor` — 索引栏
- `NavBar` — 导航栏
- `Pagination` — 分页
- `Sidebar` / `SidebarItem` — 侧边导航
- `Sticky` — 粘性布局
- `Tabs` / `Tab` — 标签页
- `Tabbar` / `TabbarItem` — 标签栏
- `TreeSelect` — 分类选择

### 布局组件
- `Col` — 列
- `Row` — 行
- `Space` — 间距

### 业务组件
- `AddressEdit` — 地址编辑
- `AddressList` — 地址列表
- `Area` — 省市区选择
- `Card` — 商品卡片
- `ContactCard` — 联系人卡片
- `ContactEdit` — 联系人编辑
- `ContactList` — 联系人列表
- `Coupon` / `CouponCell` / `CouponList` — 优惠券
- `Signature` — 签名
- `SubmitBar` — 提交订单栏
- `DropdownMenu` / `DropdownItem` — 下拉菜单

## 主题定制

通过 CSS 变量定制主题：

```css
:root {
  --smu-primary-color: #1989fa;
  --smu-success-color: #07c160;
  --smu-warning-color: #ff976a;
  --smu-danger-color: #ee0a24;
}
```

或使用 `ConfigProvider` 组件：

```svelte
<ConfigProvider theme={{ primaryColor: '#1989fa' }}>
  <Button type="primary">主题按钮</Button>
</ConfigProvider>
```

## 兼容性

| 格式 | 文件 | 用途 |
|---|---|---|
| ESM | `dist/svelte-mobile-ui.mjs` | `import` 语法 |
| CJS | `dist/svelte-mobile-ui.cjs` | `require()` 语法 |
| IIFE | `dist/svelte-mobile-ui.iife.js` | CDN / `<script>` 标签 |
| CSS | `dist/styles.css` | 全局样式 |
| Svelte 源码 | `index.ts` | Svelte 项目直接引用 |

## License

MIT
