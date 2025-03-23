# position

语法形式:

```
position = static |relative |absolute | sticky | fixed
```

| 相关功能     | 相关属性                                 |
| ------------ | ---------------------------------------- |
| 元素定位     | top , left , right , bottom              |
| 元素裁剪     | overflow, overflow-x , overflow-y , clip |
| 元素堆叠顺序 | z-index                                  |

1. static
   这是 position 属性的默认值.元素按照正常的文档流进行排列,不会受到 top、right、bottom、left 属性的影响,始终保持在原本的位置.
2. relative
   相对定位的元素会在其在文档流中的正常位置进行偏移,但仍然保留原来的空间,不会影响其他元素的位置.可以使用 top、right、bottom、left 属性来指定偏移量.
3. absolute
   绝对定位的元素会脱离文档流,其位置取决于最近的非 static 定位的祖先元素.如果没有这样的祖先元素,则相对于浏览器窗口定位.绝对定位的元素不占据空间,可能会造成元素重叠.
4. fixed
   固定定位的元素同样脱离文档流,但总是相对于浏览器窗口定位.无论页面如何滚动,元素都会保持在屏幕上的同一位置.
5. sticky
   粘性定位是一种混合模式,元素在滚动范围内满足特定条件时表现为相对定位,在滚动超出这个范围时则转换为固定定位.这种定位模式需要指定 top、right、bottom、left 四个阈值之一才会生效.

# float
