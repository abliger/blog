# [CSS 层叠样式表][]

层叠样式表（Cascading Style Sheets，缩写为 CSS）是一种样式表语言，用来描述 HTML 或 XML（包括如 SVG、MathML 或 XHTML 之类的 XML 分支语言）文档的呈现方式。CSS 描述了在屏幕、纸质、音频等其他媒体上的元素应该如何被渲染的问题。

## 选择器类型

- `&` 嵌套选择器

:::demo

```vue
<template>
  <div class="parentRule">
    <div class="childRule">childRule</div>
    <div class="test">childRule</div>
    <div>test</div>
  </div>
</template>
<style scoped>
.parentRule {
  & .childRule {
    color: red;
  }
}
</style>
```

:::

- 属性选择器

```css
/* 存在 title 属性的 <a> 元素 */
a[title] {
  color: purple;
}

/* 存在 href 属性并且属性值匹配"https://example.org"的 <a> 元素 */
a[href="https://example.org"]
{
  color: green;
}

/* 存在 href 属性并且属性值包含"example"的 <a> 元素 */
a[href*="example"] {
  font-size: 2em;
}

/* 存在 href 属性并且属性值结尾是".org"的 <a> 元素 */
a[href$=".org"] {
  font-style: italic;
}

/* 存在 class 属性并且属性值包含单词"logo"的<a>元素 */
a[class~="logo"] {
  padding: 2px;
}
```

- 类选择器

```css
/* 所有含有 class="spacious" 类的元素 */
.spacious {
  margin: 2em;
}

/* 所有含有 class="spacious" 类的 <li> 元素 */
li.spacious {
  margin: 2em;
}

/* 所有同时含有“spacious”和“elegant”类的 <li> 元素 */
/* 例如 class="elegant retro spacious" */
li.spacious.elegant {
  margin: 2em;
}
```

- `ID` 选择器
- 标签选择器
- 通配选择器
- `&` 嵌套选择器

:::demo

```vue
<template>
  <p class="warning">
    <span lang="en-us">A green span</span> in a red paragraph.
  </p>
  <p id="maincontent" lang="en-gb">
    <span class="warning">A red span</span> in a green paragraph.
  </p>
</template>
<style scoped>
*[lang^="en"] {
  color: green;
}
*.warning {
  color: red;
}
*#maincontent {
  border: 1px solid blue;
}
</style>
```

:::

## [选择器的优先级][]

1. 写在 `html` 标签上 `style` 属性中的样式
2. `ID` 选择器
3. 类选择器
4. 属性选择器
5. 标签选择器
6. 通配选择器

## 关系选择器

1. 子组合器

子组合器（>）被放在两个 CSS 选择器之间。它只匹配那些被第二个选择器匹配的元素，这些元素是被第一个选择器匹配的元素的直接子元素。

2. 后代选择器

后代组合器（通常用单个空格（" "）字符表示）组合了两个选择器

3. 接续兄弟组合器

接续兄弟选择器（+）介于两个选择器之间，当第二个元素紧跟在第一个元素之后，并且两个元素都是属于同一个父元素的子元素，则第二个元素将被选中。

```css
/* 图片后面紧跟着的段落将被选中 */
img + p {
  font-weight: bold;
}
```

4. 选择器列表

当对匹配不同条件的元素应用相同的样式时，将选择器编组进一个以逗号分隔的列表中可以在提高样式表的一致性的同时减小尺寸。

```css
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: helvetica;
}
```

5. 后续兄弟选择器

后续兄弟选择器（~）将两个选择器分开，并匹配第二个选择器的所有迭代元素，位置无须紧邻于第一个元素，只须有相同的父级元素。

:::demo

```vue
<template>
  <span>This is not red.</span>
  <p>Here is a paragraph.</p>
  <code>Here is some code.</code>
  <span>And here is a red span!</span>
  <span>And this is a red span!</span>
  <code>More code…</code>
  <div>How are you?</div>
  <p>Whatever it may be, keep smiling.</p>
  <div>
    <h1>Dream big</h1>
    <span>And yet again this is a red span!</span>
  </div>
</template>
<style scoped>
p ~ span {
  color: red;
}
</style>
```

:::

## @ 规则

### @charset

@charset CSS @规则指定样式表中使用的字符编码。它必须是样式表中的第一个元素，而前面不得有任何字符。因为它不是一个嵌套语句，所以不能在@规则条件组中使用。如果有多个 @charset @ 规则被声明，只有第一个会被使用，而且不能在 HTML 元素或 HTML 页面的字符集相关 `<style>` 元素内的样式属性内使用。

```css
@charset "UTF-8";
@charset "iso-8859-15";
@charset "utf-8"; /*大小写不敏感*/
```

```css
@charset 'iso-8859-15'; /* 无效的，使用了错误的引号 */
/*@charset  "UTF-8"; 无效的，多于一个空格 */
/* @charset "UTF-8"; 无效的，在 at-rule 之前多了一个空格 */
@charset UTF-8; /* 无效的，缺少单引号 ' 或双引号 "，charset 不是一个有效的 CSS <string> */
```

### @color-profile

‌CSS @color-profile 规则 ‌ 是一种用于定义颜色配置文件的规则，颜色配置文件包含了一系列的颜色空间和颜色描述，可以用于确保在不同设备上呈现一致的颜色。使用@color-profile 规则可以指定一个颜色配置文件并将其应用于整个文档或特定的元素。

```css
@color-profile myColorProfile {
  src: url(path/to/my/color/profile.icc);
  rendering-intent: relative-colorimetric;
}
h1 {
  color: orange;
  color-profile: myColorProfile;
}
```

### @container

它允许开发者对容器元素进行样式查询和条件应用，主要通过与 container-type 和 container-name 属性结合使用来实现 ‌

```css
@container myContainer(inline-size < 400px) {
  .element {
    background-color: red; /* 当容器宽度小于400px时应用 */
  }
}
@container myContainer(inline-size >= 400px) and (inline-size < 800px) {
  .element {
    background-color: green; /* 当容器宽度在400px至800px之间时应用 */
  }
}
```

### @counter-style

@counter-style 是一个 CSS at 规则让开发者可以自定义计数器的样式。

:::demo

```vue
<template>
  <ol class="items">
    <li>一</li>
    <li>二</li>
    <li>三</li>
    <li>四</li>
    <li>五</li>
  </ol>
  <p>...</p>
  <ol class="items" start="25">
    <li>二十五</li>
    <li>二十六</li>
    <li>二十七</li>
    <li>二十八</li>
  </ol>
</template>
<style scoped>
@counter-style circled-alpha {
  system: fixed;
  symbols: Ⓐ Ⓑ Ⓒ Ⓓ Ⓔ Ⓕ Ⓖ Ⓗ Ⓘ Ⓙ Ⓚ Ⓛ Ⓜ Ⓝ Ⓞ Ⓟ Ⓠ Ⓡ Ⓢ Ⓣ Ⓤ Ⓥ Ⓦ Ⓧ Ⓨ Ⓩ;
  suffix: " ";
}

.items {
  list-style: circled-alpha;
}
</style>
```

:::

### @font-face

@font-face CSS at-rule 指定一个用于显示文本的自定义字体；

:::demo

```vue
<template>
  <div class="f">This is Bitstream Vera Serif Bold.</div>
  <div>This is Bitstream Vera Serif Bold.</div>
</template>
<style scoped>
@font-face {
  font-family: "Bitstream Vera Serif Bold";
  src: url("https://mdn.github.io/css-examples/web-fonts/VeraSeBd.ttf");
}

.f {
  font-family: "Bitstream Vera Serif Bold", serif;
}
</style>
```

:::

### @font-feature-values

### @font-palette-values

### @import

@import CSS @ 规则用于从其他样式表导入样式规则

```css
@import url("fineprint.css") print;
@import url("bluish.css") projection, tv;
@import "custom.css";
@import url("chrome://communicator/skin/");
@import "common.css" screen, projection;
@import url("landscape.css") screen and (orientation: landscape);
```

### @keyframes

关键帧 @keyframes at 规则通过在动画序列中定义关键帧（或 waypoints）的样式来控制 CSS 动画序列中的中间步骤。和过渡 相比，关键帧 keyframes 可以控制动画序列的中间步骤。

```css
@keyframes slidein {
  0% {
    top: 0;
    left: 0;
  }
  30% {
    top: 50px;
  }
  68%,
  72% {
    left: 50px;
  }
  100% {
    top: 100px;
    left: 100%;
  }
}
```

### @layer

@layer，即级联层，允许开发者创建独立的层来组织和控制样式。 主要用来控制 css 的优先级.

```css
@layer utilities {
  .padding-sm {
    padding: 0.5rem;
  }

  .padding-lg {
    padding: 0.8rem;
  }
}
@import (utilities.css) layer(utilities);
@layer theme, layout, utilities;
/* 多个命名层也可以被同时定义 */
@layer framework {
  @layer layout {
  }
}
@layer framework.layout {
  p {
    margin-block: 1rem;
  }
}
@layer {
  /*  匿名层 */
  p {
    margin-block: 1rem;
  }
}
```

### @media

@media CSS at 规则可用于基于一个或多个媒体查询的结果来应用样式表的一部分。使用它，你可以指定一个媒体查询和一个 CSS 块，当且仅当该媒体查询与正在使用其内容的设备匹配时，该 CSS 块才能应用于该文档。

```css
@media print {
  body {
    font-size: 10pt;
  }
}

@media screen {
  body {
    font-size: 13px;
  }
}

@media screen, print {
  body {
    line-height: 1.2;
  }
}

@media only screen and (min-width: 320px) and (max-width: 480px) and (resolution: 150dpi) {
  body {
    line-height: 1.4;
  }
}
```

### @namespace

### @page

@page at 规则是一种 CSS 规则，用于修改打印页面的不同方面。它的目标是修改页面的尺寸、方向和页边距。@page at 规则可用于针对打印输出中的所有页面，也可使用其各种伪类来针对一个子集。

```css
/* 针对所有页面 */
@page {
  size: 8.5in 9in;
  margin-top: 4in;
}


/_ 针对所有偶数页面 _/
@page :left {
margin-top: 4in;
}

/_ 针对所有奇数页面 _/
@page :right {
size: 11in;
margin-top: 4in;
}

/_ 针对所有设置了 `page: wide;` 选择器的页面 _/
@page wide {
size: a4 landscape;
}

@page {
/_ 右上方的空白框显示页码 _/
@top-right {
content: "Page " counter(pageNumber);
}
}

```

### @position-try(实验性)

### @property

@property CSS at-rule 是 CSS Houdini API 的一部分，它允许开发者显式地定义他们的 CSS 自定义属性, 允许进行属性类型检查、设定默认值以及定义该自定义属性是否可以被继承。

```css
@property --my-color {
  syntax: "<color>";
  inherits: false;
  initial-value: #c0ffee;
}
```

### @scope

### @starting-style

### @supports

@supports CSS at 规则可以指定依赖于浏览器中的一个或多个特定的 CSS 功能的支持声明。这被称为特性查询。该规则可以放在代码的顶层，也可以嵌套在任何其他条件组规则中。

```css
@supports selector(A > B) {
}
@supports not (transform-origin: 10em 10em 10em) {
}
@supports (display: table-cell) and (display: list-item) {
}
@supports (transform-style: preserve) or (-moz-transform-style: preserve) {
}
```

- [@view-transition]
  选择当前文档和目标文档进行视图过渡。

##

---

[CSS 层叠样式表]: https://developer.mozilla.org/zh-CN/docs/Web/CSS
[选择器的优先级]: https://juejin.cn/post/7103863252697743396
[@view-transition]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/@view-transition
