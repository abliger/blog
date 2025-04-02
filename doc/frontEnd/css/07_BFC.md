# BFC

BFC 全称：Block Formatting Context， 名为 "块级格式化上下文"。

> 官方解释：BFC 它决定了元素如何对其内容进行定位，以及与其它元素的关系和相互作用，当涉及到可视化布局时，Block Formatting Context 提供了一个环境，HTML 在这个环境中按照一定的规则进行布局。
> 通俗解释：BFC 是一个完全独立的空间（布局环境），让空间里的子元素不会影响到外面的布局。那么怎么使用 BFC 呢，BFC 可以看做是一个 CSS 元素属性。

## 可以触发 BFC 的 css 属性

0. 根元素（HTML）
1. 设置 float 属性
2. 设置 position 属性（属性值需要是 absolute 或 fixed）
3. 设置 overflow 属性（属性值不为 visible 即可）
4. 行内块元素（inline-block）
5. 设置 display 为 flow-root 的元素
6. 伸缩项目（flex 盒子内的 item）
7. 多列容器（设置 column-count）
8. 表格元素（table thead tbody tfoot tr th td caption）
9. column-span 为 all 的元素

## 常规流 块盒

1. 水平方向上，撑满整个包含块宽度，垂直方向上，依次摆放
2. 垂直方向上相邻的元素，margin 会合并
3. 父子关系的情况下，可能会产生 margin 坍塌
4. 父子关系的情况下，父元素无视浮动元素会产生高度坍塌
5. 兄弟关系的情况下，正常元素可能会被浮动元素覆盖（正常元素在浮动元素之后）

## 开启 BFC 能解决什么问题？

1. 开启 BFC，其子元素不会再产生 margin 塌陷问题（不会和他的子元素产生 margin 合并）
2. 开启 BFC，就算子元素浮动，自身高度也不会坍塌（高度计算不再无视浮动元素）
3. 开启 BFC，自己不会被其他浮动元素所覆盖（不会与浮动元素重叠，会避开浮动元素排布）
