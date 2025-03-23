# Lua

## 目录

- [注释](#注释)
- [标识符](#标识符)
- [关键字](#关键字)
- [全局变量](#全局变量)

在idea使用lua

1. 下载lua客户端(菜鸟教程lua安装git版本)
2. 2.idea安装EmmyLua，并设置LuaSDK到客户端lua.exe&#x20;

#### 注释

```lua
--这是单行注释
--[[
这是多行注释
--]] 
```


#### 标识符

标识符以字母A-Za-z下划线开头后面加上0个或多个字母，下划线，数字（0到9）

Lua对大小写敏感

最好不要用下划线加大写字母的标示符，因为Lua的保留字也是这样的。

#### 关键字

![](<image/批注 2020-09-09 192132_dFrHtOD6QM.png>)

#### 全局变量

在默认情况下，变量总是认为是全局的。

全局变量不需要声明，给一个变量赋值后即创建了这个全局变量，访问一个没有初始化的全局变量也不会出错，只不过得到的结果是：nil。

```lua
> print(b)
nil
> b=10
> print(b)
10
```


如果你想删除一个全局变量，只需要将变量赋值为nil。

[Lua内置函数](Lua内置函数/Lua内置函数.md "Lua内置函数")

[数据类型](数据类型/数据类型.md "数据类型")

[Lua变量](Lua变量/Lua变量.md "Lua变量")

[Lua循环](Lua循环/Lua循环.md "Lua循环")

[Lua流程控制](Lua流程控制/Lua流程控制.md "Lua流程控制")

[Lua函数](Lua函数/Lua函数.md "Lua函数")

[Lua运算符](Lua运算符/Lua运算符.md "Lua运算符")

[Lua字符串](Lua字符串/Lua字符串.md "Lua字符串")

[Lua数组](Lua数组/Lua数组.md "Lua数组")

[Lua迭代器](Lua迭代器/Lua迭代器.md "Lua迭代器")

[Lua table表](<Lua table表/Lua table表.md> "Lua table表")

[Lua模块与包](Lua模块与包/Lua模块与包.md "Lua模块与包")

[Lua元表(Metatable)](Lua元表\(Metatable\)/Lua元表\(Metatable\).md "Lua元表(Metatable)")

[Lua 协同程序(coroutine)](<Lua 协同程序(coroutine)/Lua 协同程序(coroutine).md> "Lua 协同程序(coroutine)")

[Lua I/O](<Lua I-O/Lua I-O.md> "Lua I/O")

[Lua 垃圾回收](<Lua 垃圾回收/Lua 垃圾回收.md> "Lua 垃圾回收")

[Lua 面向对象](<Lua 面向对象/Lua 面向对象.md> "Lua 面向对象")

[Lua 数据库访问](<Lua 数据库访问/Lua 数据库访问.md> "Lua 数据库访问")
