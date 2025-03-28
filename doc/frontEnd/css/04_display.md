# display

display 用于设置元素的显示类型,或者设置子元素的布局类型.

语法: `[ <display-outside> || <display-inside> ] | <display-listitem> | <display-internal> | <display-box> | <display-legacy>`

- display-outside(外部表现): block、inline
- display-inside(内部表现): flex、grid、table、flow、flow-root、ruby
- display-listitem(列表元素类): list-item
- display-internal(内部结构): table-row、table-cell、table-column、table-caption、 table-row-group、table-header-group、table-footer-group、table-column-group、ruby-base、ruby-text、ruby-base-container、ruby-text-container
- display-box(元素显示): none、contents
- display-legacy（预组合类）:inline-block、inline-table、inline-flex、inline-grid。

## display-outside(外部表现): block、inline

### block

该属性值用于设置元素的外显类型为块级元素，在页面布局中，占据一整行的空间，在元素前后进行换行。该类型的元素可以设置`width`、`height`、`padding`、`margin`等属性。

### inline

该属性值用于设置元素的外显类型为行内元素，在页面布局中，可与其他行内元素位于同一行。该类型的元素设置 width、height，以及竖直方向的
margin （top、bottom）属性无效，设置水平方向的 padding、margin （left、right）是有效的，设置竖直方向的 padding （top、bottom）时，在元素空间上是有效的，但这并不会影响与同一行的行内元素的对齐。

## display-box

- none:
  使元素不再显示，其对布局不会有影响（文档渲染得好像这个元素并不存在）。所有的后代元素也不会再显示。为了使元素占据一个它通常占据的空间，但实际上没有渲染任何东西，应该使用 visibility 属性。

- contents:
  它让元素本身不生成任何盒模型（包括边框、边距、填充和滚动条等），仿佛该元素不存在一样，但其子元素会正常显示并参与布局。简而言之，它使得元素在布局上“透明”
  在列表（`<ul>`或`<ol>`）的`<li>`元素内部使用`display: contents`，可以移除列表项默认的内外边距，同时保持列表的语义完整性
  通过为某些 `<tr>` 或 `<td>` 设置 `display: contents`，可以实现更灵活的布局调整，比如合并单元格的效果

## display-inside(内部表现): flex、grid、table、flow、flow-root、ruby

### flex

弹性布局

- `flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]` 简写
- `flex-basis: <length> | auto` 在分配多余空间之前，项目占据的主轴空间
- `flex-direction: row | row-reverse | column | column-reverse` 决定主轴的方向，水平或者垂直
- `flex-flow <flex-direction> || <flex-wrap>` 简写
- `flex-grow:  <number>` 项目的放大比例
- `flex-shrink: <number>` 项目的缩小比例
- `flex-wrap : nowrap | wrap | wrap-reverse` 换行不换行以及换行的方向
- `justify-content: flex-start | flex-end | center | space-between | space-around` 在 x 轴上的对齐方式。
- `justify-self: auto | flex-start | flex-end | center | baseline | stretch` 单个项目有与其他项目不一样的对齐方式
- `align-content: flex-start | flex-end | center | space-between | space-around | stretch` 多根轴线的对齐方式
- `align-items: flex-start | flex-end | center | baseline | stretch` 项目在 y 轴上如何对齐。
- `align-self: auto | flex-start | flex-end | center | baseline | stretch` 单个项目有与其他项目不一样的对齐方式

:::demo src=frontEnd/css/examples/displayFlex.vue
:::

:::info todo

好像 justify-items 在 flex 不起作用

:::

:::demo src=frontEnd/css/examples/displayFlexCenterByJA.vue
:::

:::demo src=frontEnd/css/examples/displayFlexCenterByMargin.vue
:::

### grid

- grid
- `grid-area  <grid-row-start> <grid-column-start> <grid-row-end>  <grid-column-end>` 简写形式
- `grid-auto-columns` 隐式创建的网格纵向轨道（track）的宽度。
- `grid-auto-flow` 控制着自动布局算法怎样运作
- `grid-auto-rows` 隐式创建的行轨道大小
- `grid-column: <grid-column-start> <grid-column-end>` 简写形式
- `grid-column-end`
- `grid-column-start`
- `grid-row:  <grid-row-start>  <grid-row-end>` 简写形式
- `grid-row-end`
- `grid-row-start`
- `grid-gap <grid-column-gap> <grid-row-gap>` 简写形式
- `grid-column-gap` 列间距
- `column-gap` 列间距
- `grid-row-gap` 行间距
- `row-gap` 行间距
- `grid-template: <grid-template-columns> <grid-template-rows> <grid-template-areas>` 简写形式
- `grid-template-areas` 声明的区域名称
- `grid-template-columns` 定义网格布局中的列数
- `grid-template-rows` 定义网格布局中的行数

:::demo src=frontEnd/css/examples/displayGrid.vue
:::

[游戏学习 grid]

[最全 Grid 布局教程——十分钟教会你使用 Grid 布局]

### table

用于模仿 table 布局

- table-row-group 该元素的行为类似于 HTML 的 `<tbody>` 元素。
- table-header-group 该元素的行为类似于 HTML 的 `<thead>` 元素。
- table-footer-group 该元素的行为类似于 HTML 的 `<tfoot>` 元素。
- table-row 该元素的行为类似于 HTML 的 `<tr>` 元素。
- table-cell 该元素的行为类似于 HTML 的 `<td>` 元素。
- table-column-group 该元素的行为类似于 HTML 的 `<colgroup>` 元素。
- table-column 该元素的行为类似于 HTML `<col>` 元素。
- table-caption 该元素的行为类似于 HTML 的 `<caption>` 元素。

### list-item

用于模仿 ul li 标签,使用该元素后,内部会出现一个 ::marker 伪元素作为列表的 icon,使用（list-style-position、list-style-type、list-style-image,list-style）对该标记进行操作，这些属性同样也可以操作 ul ol li 等列表元素的 icon 标记。

list-style : `<'list-style-type'> || <'list-style-position'> || <'list-style-image'>`

#### list-style-position

list-style-position 属性控制列表项标记（例如项目符号或数字）的位置，相对于列表项的内容和边框。

它有两个主要值:outside 和 inside。它们的区别在于标记如何与列表项的内容框交互:

outside (默认值):

标记位于列表项内容框的外部。这意味着标记不占用内容框的空间，内容框会从标记的边缘开始。 视觉上，标记会略微缩进到左边，并在内容的左边线上对齐。

inside:

标记位于列表项内容框的内部。这意味着标记占据了内容框的一部分空间，内容会环绕标记。 视觉上，标记和第一行文本位于同一行，就像文本的一部分一样。

#### list-style-type

list-style-type 属性可以接受多个不同的值，每个值都会改变列表项的显示方式。以下是一些常用的值:

无序列表（`<ul>`）的常用值:

- none:无标记。
- disc:默认。实心圆点。
- circle:空心圆点。
- square:实心方块。

有序列表（`<ol>`）的常用值:

- none:无标记。
- decimal:默认。阿拉伯数字。
- lower-roman:小写罗马数字。
- upper-roman:大写罗马数字。
- lower-alpha:小写英文字母。
- upper-alpha:大写英文字母。

此外，还有一些其他不太常用的值，如 armenian、cjk-ideographic、georgian、hebrew、hiragana、katakana、hiragana-iroha、katakana-iroha 等，它们提供了更多样化的列表项标记样式。

:::demo src=frontEnd/css/examples/displayListItem.vue
:::

### ruby (实验)

用于模仿 ruby 标签,可以控制注音布局, 目前 safari 浏览器不支持

- ruby-base 类似于 rp 标签
- ruby-text 类似于 rt
- ruby-base-container 类似于 rbc (弃用)
- ruby-text-container 类似于 rtc (弃用)

:::demo src=frontEnd/css/examples/displayRuby.vue
:::

### flow (实验) 避免使用

### flow-root

flow-root 可以让元素块状化，同时包含格式化上下文 BFC，可以用来清除浮动，去除 margin 属性合并，配合浮动实现两栏自适应布局等。

[margin 属性合并]:

- margin 的合并（前提二个以上的 margin）是发生在纵向上的，也就是说，margin 的合并只会发生在垂直方向，水平方向设置的 margin 是不会发生合并的现象的。
- 当二个相邻元素都设置了 margin，且 margin 属性毗邻时，元素的 margin 会发生合并，且取二者中的最大值
- 当二个元素的 margin 值为一个正数一个负数时，二个元素间距最终值为相加所得结果
- 当二个元素的 margin 值都为负数时，二个元素间距最终值为二者中最小的
- 当二个元素为父与子关系的同时，设置了相同 margin 值(二个正数),margin 发生合并现象，且最终值为两者中的最大值
- 当二个元素为父与子关系的同时，设置了相同 margin 值(二个负数),margin 发生合并现象，且最终值为两者中最小值

:::demo src=frontEnd/css/examples/displayFlowRoot.vue
:::

## 预组合

- block = block flow
- inline = inline flow
- flow = block flow
- flow-root = block flow-root
- table = block table
- flex = block flex
- grid = block grid
- list-item = block flow list-item
- inline-block = inline flow-root
- inline-table = inline table
- inline-flex = inline flex
- inline-grid = inline grid

[margin 属性合并]: https://www.cnblogs.com/webpure/p/5481417.html
[最全 Grid 布局教程——十分钟教会你使用 Grid 布局]: https://juejin.cn/post/7436602754834087988
[游戏学习 grid]: https://cssgridgarden.com
