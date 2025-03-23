# Lua数组

## 目录

- [一维数组](#一维数组)
- [多维数组](#多维数组)

#### 一维数组

```lua
一维数组是最简单的数组，其逻辑结构是线性表。一维数组可以用for循环出数组中的元素，如下实例：
实例
array = {"Lua", "Tutorial"}

for i= 0, 2 do
   print(array[i])
end
```


#### 多维数组

多维数组即数组中包含数组或一维数组的索引键对应一个数组。

```lua
array = {}
for i=1,3 do
   array[i] = {}
      for j=1,3 do
         array[i][j] = i*j
      end
end

-- 访问数组
for i=1,3 do
   for j=1,3 do
      print(array[i][j])
   end
end
```


```lua
-- 初始化数组
array = {}
maxRows = 3
maxColumns = 3
for row=1,maxRows do
   for col=1,maxColumns do
      array[row*maxColumns +col] = row*col
   end
end

-- 访问数组
for row=1,maxRows do
   for col=1,maxColumns do
      print(array[row*maxColumns +col])
   end
end
```
