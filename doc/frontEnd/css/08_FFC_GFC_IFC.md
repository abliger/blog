## FFC

自适应格式上下文

1. FFC 产生条件

display: flex / inline-flex 的容器

2. 应用场景

1. 自动撑开页面高度，底栏总是出现在页面的底部

## GFC

网格布局格式化上下文

1. GFC 产生条件

display:gird / inline-grid 的容器

## [IFC](https://www.w3.org/TR/css-inline-3/#inline-formatting-context)

內联格式化上下文

1. 布局规则

- 盒是从包含块的顶部开始一个挨一个水平放置的
- 水平 padding、border、margin 都有效，垂直方向上不被计算。
- 在垂直方向上，子元素会以不同形式来对齐 vertical-align
- 能把在一行上的框都完全包含进去的一个矩形区域，被称为该行的行框（line box）。行框的宽度是由包含块（containing box）和与其中的浮动来决定。
- IFC 中的“line box”一般左右边贴紧其包含块，但 float 元素会优先排列。
- IFC 中的“line box”高度由 CSS 行高计算规则来确定，同个 IFC 下的多个 line box 高度可能会不同。
- 当 inline-level boxes 的总宽度少于包含它们的 line box 时，其水平渲染规则由 text-align 属性值来决定。
- 当一个“inline box”超过父元素的宽度时，它会被分割成多个 boxes，这些 boxes 分布在多个“line box”中。如果子元素未设置强制换行的情况下，“inline box”将不可被分割，将会溢出父元素。
