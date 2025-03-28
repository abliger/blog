# display

display 用于设置元素的显示类型,或者设置子元素的布局类型.

语法: `[ <display-outside> || <display-inside> ] | <display-listitem> | <display-internal> | <display-box> | <display-legacy>`
display-outside(外部表现): block、inline
display-inside(内部表现): flex、grid、table、flow、flow-root、ruby
display-listitem(列表元素类): list-item
display-internal(内部结构): table-row、table-cell、table-column、table-caption、 table-row-group、table-header-group、table-footer-group、table-column-group、ruby-base、ruby-text、ruby-base-container、ruby-text-container
display-box(元素显示): none、contents
display-legacy（预组合类）：inline-block、inline-table、inline-flex、inline-grid。

## display-outside(外部表现): block、inline

### block

该属性值用于设置元素的外显类型为块级元素，在页面布局中，占据一整行的空间，在元素前后进行换行。该类型的元素可以设置`width`、`height`、`padding`、`margin`等属性。

### inline

该属性值用于设置元素的外显类型为行内元素，在页面布局中，可与其他行内元素位于同一行。该类型的元素设置 width、height，以及竖直方向的
margin （top、bottom）属性无效，设置水平方向的 padding、margin （left、right）是有效的，设置竖直方向的 padding （top、bottom）时，在元素空间上是有效的，但这并不会影响与同一行的行内元素的对齐。

## display-inside(内部表现): flex、grid、table、flow、flow-root、ruby

### table

### list-item

用于模仿 ul li 标签,使用该元素后,内部会出现一个 ::marker 伪元素作为列表的 icon,使用（list-style-position、list-style-type、list-style-image）对该标记进行操作，这些属性同样也可以操作 ul ol li 等列表元素的 icon 标记。

#### list-style-position

list-style-position 属性控制列表项标记（例如项目符号或数字）的位置，相对于列表项的内容和边框。

它有两个主要值：outside 和 inside。它们的区别在于标记如何与列表项的内容框交互：

outside (默认值):

标记位于列表项内容框的外部。这意味着标记不占用内容框的空间，内容框会从标记的边缘开始。 视觉上，标记会略微缩进到左边，并在内容的左边线上对齐。

inside:

标记位于列表项内容框的内部。这意味着标记占据了内容框的一部分空间，内容会环绕标记。 视觉上，标记和第一行文本位于同一行，就像文本的一部分一样。

#### list-style-type

list-style-type 属性可以接受多个不同的值，每个值都会改变列表项的显示方式。以下是一些常用的值：

无序列表（`<ul>`）的常用值：

none：无标记。
disc：默认。实心圆点。
circle：空心圆点。
square：实心方块。

有序列表（`<ol>`）的常用值：

none：无标记。
decimal：默认。阿拉伯数字。
lower-roman：小写罗马数字。
upper-roman：大写罗马数字。
lower-alpha：小写英文字母。
upper-alpha：大写英文字母。

此外，还有一些其他不太常用的值，如 armenian、cjk-ideographic、georgian、hebrew、hiragana、katakana、hiragana-iroha、katakana-iroha 等，它们提供了更多样化的列表项标记样式。

:::demo src=frontEnd/css/examples/displayListItem.vue
:::

### ruby
