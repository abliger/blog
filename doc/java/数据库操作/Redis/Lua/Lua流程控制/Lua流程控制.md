# Lua流程控制

## 目录

- [if语句](#if语句)
- [if...else](#ifelse)
- [if...elseif...else 语句](#ifelseifelse-语句)

Lua 编程语言流程控制语句通过程序设定一个或多个条件语句来设定。在条件为 true 时执行指定程序代码，在条件为 false 时执行其他指定代码。

控制结构的条件表达式结果可以是任何值，Lua认为false和nil为假，true和非nil为真。要注意的是Lua中 0 为 true；

#### if语句

```lua
Lua if 语句语法格式如下：

if(布尔表达式)
then
   --[ 在布尔表达式为 true 时执行的语句 --]
end
```


在布尔表达式为 true 时会if中的代码块会被执行，在布尔表达式为 false 时，紧跟在 if 语句 end 之后的代码会被执行。

Lua认为false和nil为假，true 和非nil为真。要注意的是Lua中 0 为 true。

```lua
以下实例用于判断变量 a 的值是否小于 20：
实例
--[ 定义变量 --]
a = 10;

--[ 使用 if 语句 --]
if( a < 20 )
then
   --[ if 条件为 true 时打印以下信息 --]
   print("a 小于 20" );
end
print("a 的值为:", a);

以上代码执行结果如下：

a 小于 20
a 的值为:    10
```


#### if...else

```lua
Lua if...else 语句语法格式如下：

if(布尔表达式)
then
   --[ 布尔表达式为 true 时执行该语句块 --]
else
   --[ 布尔表达式为 false 时执行该语句块 --]
end
```


#### if...elseif...else 语句

```lua
Lua if...elseif...else 语句语法格式如下：

if( 布尔表达式 1)
then
   --[ 在布尔表达式 1 为 true 时执行该语句块 --]

elseif( 布尔表达式 2)
then
   --[ 在布尔表达式 2 为 true 时执行该语句块 --]

elseif( 布尔表达式 3)
then
   --[ 在布尔表达式 3 为 true 时执行该语句块 --]
else 
   --[ 如果以上布尔表达式都不为 true 则执行该语句块 --]
end
```
