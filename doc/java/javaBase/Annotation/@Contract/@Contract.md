# @Contract

## 目录

- [@Contract](#Contract)
  - [@Contract 注释的语法](#Contract-注释的语法)
  - [@Contract 注释的属性](#Contract-注释的属性)

### @Contract

IntelliJ IDEA 中 @Contract 注释通过定义方法参数和返回值之间的依赖关系，为您的代码带来更多的安全性。该信息为源代码提供了更智能的控制流分析，并有助于避免可能出现的错误。

@Contract 注释是一个强大而灵活的工具，可以让你的 API 的安全。此外，它不仅可以用于注释自己的代码，还可以用于其他现有的库。

一旦为项目库配置了注释，IntelliJ IDEA 就会将注释的信息存储在简单的 XML 文件中，以便通过版本控制与团队共享。

若要启用项目中的注释，请通过项目结构对话框将 \<IntelliJ IDEA Home>/lib/annotations.jar 添加到类路径中。

@Contract 注释的使用可以通过以下示例来说明：

- @Contract(" \_, null -> null") ：如果方法的第二个参数是 null，方法返回 null。
- @Contract(" _, null -> null;_ , !null -> !null")：如果方法的第二个参数是 null，则方法返回 null，否则为 null。
- @Contract("true -> fail") ：一个典型的 assertFalse () 方法，如果将 true 传递给它，则抛出一个异常。

#### @Contract 注释的语法

该 @Contract 注释值的语法如下：

- contract ::= (clause ';')\* clause
- clause ::= args '->' effect
- args ::= ((arg ',')\* arg )?
- arg ::= value-constraint
- value-constraint ::= ' \_' | 'null' | '!null' | 'false' | 'true'
- effect ::= value-constraint | 'fail' | 'this' | 'new' | 'param\<N>'

这里的约束是：

- \_ ：任何价值
- null：空值
- !null： 一个静态证明为不是空值
- true：布尔值：真
- false：布尔值：假
- fail ：如果参数满足参数约束，该方法将抛出异常

The additional return values denote the following:

- fail - the method throws an exception, if the arguments satisfy argument constraints
- new - (supported in IntelliJ IDEA since version 2018.2) the method returns a non-null new object which is distinct from any other object existing in the heap prior to method execution. If method is also pure, then we can be sure that the new object is not stored to any field/array and will be lost if method return value is not used.
- this - (supported in IntelliJ IDEA since version 2018.2) the method returns its qualifier value (not applicable for static methods)
- param1, param2, ... - (supported in IntelliJ IDEA since version 2018.2) the method returns its first (second, ...) parameter value

#### @Contract 注释的属性

该 @Contract 注释有两个属性： value 和 pure。

value 属性包含描述调用参数和返回值之间的因果关系的 contract 子句。

pure 属性适用于不更改其对象状态的方法，但只返回一个新值。该属性可以用作"忽略方法调用的结果“检查的提示，以指示在调用时应该使用方法的返回值。它是假（false）（默认情况下），也可以为真（true）。
