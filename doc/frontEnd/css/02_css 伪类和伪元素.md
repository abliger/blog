## [伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:active)

### 判断选择器

#### :where()

:where() 的优先级总是为 0

```css
:where(header, main, footer) p:hover {
  color: red;
  cursor: pointer;
}

/* 两者相同 */
header p:hover,
main p:hover,
footer p:hover {
  color: red;
  cursor: pointer;
}
```

#### :is()

:is() 的优先级是由它的选择器列表中优先级最高的选择器决定的.

注意: `:is()` 不能选择伪元素

```css
:is(ol, ul) :is(ol, ul) {
  color: red;
}
/* 两者相同 */
ol ul,
ol ol,
ul ol,
ul ul {
  color: red;
}
```

#### :has()

:::demo

```vue
<template>
  <section>
    <article>
      <h1>Morning Times</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </article>
    <article>
      <h1>Morning Times</h1>
      <h2>Delivering you news every morning</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </article>
  </section>
</template>
<style scoped>
h1,
h2 {
  color: blue;
  margin: 0 0;
}

h1:has(+ h2) {
  color: red;
}
</style>
```

:::

#### :not()

:not() 有很多注意事项,[详见](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:not#描述)

```css
/* 无效的规则，不会产生任何效果 */
p:not(.foo, :invalid-pseudo-class) {
  color: red;
  font-style: italic;
}

/* 选择所有的没有 .foo 类的 <p> 元素 */
p:not(:is(.foo, :invalid-pseudo-class)) {
  color: green;
  border-top: dotted thin currentcolor;
}

/* 选择所有没有 .foo 类或者 .bar 类的 <div> 元素 */
div:not(.foo, .bar) {
  color: red;
  font-style: italic;
}

/* 选择所有没有 .foo 或 .bar 类的 <div> 元素。 */
div:not(:is(.foo, .bar)) {
  border-bottom: dotted thin currentcolor;
}
```

### 判断动作伪

- :active
  激活元素 被用在 `<a>` 和 `<button>` 元素中
- :checked

  表示任何处于选中状态的 radio(`<input type="radio">`), checkbox (`<input type="checkbox">`) 或 ("select") 元素中的 option HTML 元素 ("option")

- :disabled 禁用元素 任何被禁用的元素
- :focus <br/>
  :focus-visible <br/>
  :focus-within <br/>
- :target <br/>
  :target-within
- :hover
- :visited
- :link

### 判断结构伪

- :root
  :scope

- :empty 选择不包含任何子元素的元素
- :host 选择 shadow DOM 宿主
- :first
  :first-child
  :first-of-type
- :nth-child() <br/>
  :nth-last-child <br/>
  :nth-last-of-type <br/>
  :nth-of-type
- :only-child
- :only-of-type
- :read-only 不可编辑的元素 <br/>
  :read-write 可编辑的元素

### 视频判断

- :seeking 表示一个可播放的元素，比如 `<audio>` 或 `<video>`
- :playing
- :paused

## 伪元素

### ::after <br/> ::before

::after 创建一个伪元素，作为所选元素的最后一个子元素
::before 创建一个伪元素，作为所选元素的第一个子元素

:::demo

```vue
<template>
  <div>
    <a href="https://en.wikipedia.org/wiki/Sailfish">
      You can read more about it here
    </a>
  </div>
</template>
<style scoped>
a::after {
  content: " (" attr(href) ")";
}
a::before {
  content: "🔗";
}
</style>
```

:::

### ::backdrop

创建 背景遮罩

:::demo

```vue
<template>
  <div>
    <button id="showDialogBtn" @click="favDialog.showModal()">
      Show a dialog
    </button>

    <dialog id="favDialog" ref="favDialog">
      <form method="dialog">
        <p>The background shown outside of this dialog is a backdrop.</p>
        <button id="confirmBtn">Close the dialog</button>
      </form>
    </dialog>
  </div>
</template>
<script lang="ts" setup>
import { useTemplateRef } from "vue";
const favDialog = useTemplateRef("favDialog");
</script>
<style scoped>
dialog::backdrop {
  background-color: salmon;
}
</style>
```

:::

### ::cue (:cue)

字幕

### ::details-content

### ::file-selector-button

代表 type="file" 的 `<input>` 的按钮。

### ::first-letter

应用于区块容器第一行的第一个字母，但仅当其前面没有其他内容（例如图像或行内表格）时才有效。

### ::first-line (:first-line)

    目前兼容性很差

### ::grammar-error

用于浏览器标识为语法错误的文本段

### ::highlight()

设置自定义高亮样式。

### ::marker

### ::part()

在阴影树中任何匹配 part 属性的元素。

### ::placeholder

表示 `<input>` 或 `<textarea>` 元素中的占位文本。

### ::selection

应用于文档中被用户高亮的部分（比如使用鼠标或其他选择设备选中的部分）。

### ::slotted()

用于选定那些被放在 HTML 模板中的元素（更多请查看使用模板和插槽）。

这个伪元素选择器仅仅适用于影子 DOM（shadow DOM）

### ::spelling-error

浏览器标记为不正确拼写的文本段。

### ::target-text

从 url 中匹配到页面的内容, [演示](https://mdn.github.io/css-examples/target-text/index.html#:~:text=From%20the%20foregoing%20remarks%20we%20may%20gather%20an%20idea%20of%20the%20importance)

### ::view-\* <br/> ::view-transition <br/>::view-transition-group <br/>::view-transition-image-pair <br/>::view-transition-new <br/>::view-transition-old <br/>

视图过渡叠加层 view-transition api 添加的伪元素.
原理是使用 api 创建 新旧页面快照,使用属性 view-transition-name 指定对应元素的页面过度效果.
