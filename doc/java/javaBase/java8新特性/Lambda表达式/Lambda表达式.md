# Lambda 表达式

## 目录

- [函数式接口](#函数式接口)
  - [自定义函数式接口](#自定义函数式接口)
  - [消费型接口](#消费型接口)
  - [供给型接口](#供给型接口)
  - [判断型接口](#判断型接口)
  - [功能型接口](#功能型接口)
- [Lambda 表达式语法](#Lambda表达式语法)
- [方法引用与构造器引用](#方法引用与构造器引用)
  - [方法引用](#方法引用)
  - [构造器引用](#构造器引用)

### 函数式接口

#### 自定义函数式接口

只要确保接口中有且仅有一个抽象方法即可：

```java
修饰符 interface 接口名称 {
    public abstract 返回值类型 方法名称(可选参数信息);
    // 其他非抽象方法内容
}
```

> 接口当中抽象方法的 public abstract 是可以省略的

例如：声明一个计算器`Calculator`接口，内含抽象方法`calc`可以对两个 int 数字进行计算，并返回结果：

```java
public interface Calculator {
    int calc(int a, int b);
}
```

在测试类中，声明一个如下方法：

```java
public static void invokeCalc(int a, int b, Calculator calculator) {
        int result = calculator.calc(a, b);
        System.out.println("结果是：" + result);
    }
```

下面进行测试：

```java
public static void main(String[] args) {
    invokeCalc(1, 2, (int a,int b)-> {return a+b;});
    invokeCalc(1, 2, (int a,int b)-> {return a-b;});
    invokeCalc(1, 2, (int a,int b)-> {return a*b;});
    invokeCalc(1, 2, (int a,int b)-> {return a/b;});
    invokeCalc(1, 2, (int a,int b)-> {return a%b;});
    invokeCalc(1, 2, (int a,int b)-> {return a>b?a:b;});
  }
```

#### **消费型接口**

消费型接口的抽象方法特点：有形参，但是返回值类型是 void

接口名

抽象方法

描述

Consumer\<T>

void accept(T t)

接收一个对象用于完成功能

BiConsumer\<T,U>

void accept(T t, U u)

接收两个对象用于完成功能

DoubleConsumer

void accept(double value)

接收一个 double 值

IntConsumer

void accept(int value)

接收一个 int 值

LongConsumer

void accept(long value)

接收一个 long 值

ObjDoubleConsumer\<T>

void accept(T t, double value)

接收一个对象和一个 double 值

ObjIntConsumer\<T>

void accept(T t, int value)

接收一个对象和一个 int 值

ObjLongConsumer\<T>

void accept(T t, long value)

接收一个对象和一个 long 值

#### **供给型接口**

这类接口的抽象方法特点：无参，但是无返回值

接口名

抽象方法

描述

Supplier\<T>

T get()

返回一个对象

BooleanSupplier

boolean getAsBoolean()

返回一个 boolean 值

DoubleSupplier

double getAsDouble()

返回一个 double 值

IntSupplier

int getAsInt()

返回一个 int 值

LongSupplier

long getAsLong()

返回一个 long 值

#### **判断型接口**

这里接口的抽象方法特点：有参，但是返回值类型是 boolean 结果。

接口名

抽象方法

描述

Predicate\<T>

boolean test(T t)

接收一个对象

BiPredicate\<T,U>

boolean test(T t, U u)

接收两个对象

DoublePredicate

boolean test(double value)

接收一个 double 值

IntPredicate

boolean test(int value)

接收一个 int 值

LongPredicate

boolean test(long value)

接收一个 long 值

#### **功能型接口**

这类接口的抽象方法特点：既有参数又有返回值

接口名

抽象方法

描述

Function\<T,R>

R apply(T t)

接收一个 T 类型对象，返回一个 R 类型对象结果

UnaryOperator\<T>

T apply(T t)

接收一个 T 类型对象，返回一个 T 类型对象结果

DoubleFunction\<R>

R apply(double value)

接收一个 double 值，返回一个 R 类型对象

IntFunction\<R>

R apply(int value)

接收一个 int 值，返回一个 R 类型对象

LongFunction\<R>

R apply(long value)

接收一个 long 值，返回一个 R 类型对象

ToDoubleFunction\<T>

double applyAsDouble(T value)

接收一个 T 类型对象，返回一个 double

ToIntFunction\<T>

int applyAsInt(T value)

接收一个 T 类型对象，返回一个 int

ToLongFunction\<T>

long applyAsLong(T value)

接收一个 T 类型对象，返回一个 long

DoubleToIntFunction

int applyAsInt(double value)

接收一个 double 值，返回一个 int 结果

DoubleToLongFunction

long applyAsLong(double value)

接收一个 double 值，返回一个 long 结果

IntToDoubleFunction

double applyAsDouble(int value)

接收一个 int 值，返回一个 double 结果

IntToLongFunction

long applyAsLong(int value)

接收一个 int 值，返回一个 long 结果

LongToDoubleFunction

double applyAsDouble(long value)

接收一个 long 值，返回一个 double 结果

LongToIntFunction

int applyAsInt(long value)

接收一个 long 值，返回一个 int 结果

DoubleUnaryOperator

double applyAsDouble(double operand)

接收一个 double 值，返回一个 double

IntUnaryOperator

int applyAsInt(int operand)

接收一个 int 值，返回一个 int 结果

LongUnaryOperator

long applyAsLong(long operand)

接收一个 long 值，返回一个 long 结果

BiFunction\<T,U,R>

R apply(T t, U u)

接收一个 T 类型和一个 U 类型对象，返回一个 R 类型对象结果

BinaryOperator\<T>

T apply(T t, T u)

接收两个 T 类型对象，返回一个 T 类型对象结果

ToDoubleBiFunction\<T,U>

double applyAsDouble(T t, U u)

接收一个 T 类型和一个 U 类型对象，返回一个 double

ToIntBiFunction\<T,U>

int applyAsInt(T t, U u)

接收一个 T 类型和一个 U 类型对象，返回一个 int

ToLongBiFunction\<T,U>

long applyAsLong(T t, U u)

接收一个 T 类型和一个 U 类型对象，返回一个 long

DoubleBinaryOperator

double applyAsDouble(double left, double right)

接收两个 double 值，返回一个 double 结果

IntBinaryOperator

int applyAsInt(int left, int right)

接收两个 int 值，返回一个 int 结果

LongBinaryOperator

long applyAsLong(long left, long right)

接收两个 long 值，返回一个 long 结果

### Lambda 表达式语法

Lambda 表达式是用来给【函数式接口】的变量或形参赋值用的。

其实本质上，Lambda 表达式是用于实现【函数式接口】的"抽象方法”

Lambda 表达式语法格式

```java
(形参列表) -> {Lambda体}
```

说明：

- (形参列表)它就是你要赋值的函数式接口的抽象方法的(形参列表)，照抄
- {Lambda 体}就是实现这个抽象方法的方法体
- ->称为 Lambda 操作符（减号和大于号中间不能有空格，而且必须是英文状态下半角输入方式）

优化：Lambda 表达式可以精简

- 当{Lambda 体}中只有一句语句时，可以省略{}和{;}
- 当{Lambda 体}中只有一句语句时，并且这个语句还是一个 return 语句，那么 return 也可以省略，但是如果{;}没有省略的话，return 是不能省略的
- (形参列表)的类型可以省略
- 当(形参列表)的形参个数只有一个，那么可以把数据类型和()一起省略，但是形参名不能省略
- 当(形参列表)是空参时，()不能省略

### 方法引用与构造器引用

Lambda 表达式是可以简化函数式接口的变量与形参赋值的语法。而方法引用和构造器引用是为了简化 Lambda 表达式的。当 Lambda 表达式满足一些特殊的情况时，还可以再简化：

（1）Lambda 体只有一句语句，并且是通过调用一个对象的/类现有的方法来完成的

例如：System.out 对象，调用 println()方法来完成 Lambda 体

Math 类，调用 random()静态方法来完成 Lambda 体

（2）并且 Lambda 表达式的形参正好是给该方法的实参

例如：t->System.out.println(t)

() -> Math.random() 都是无参

#### 方法引用

方法引用的语法格式：

（1）实例对象名::实例方法

（2）类名::静态方法

（3）类名::实例方法

说明：

- ::称为方法引用操作符（两个:中间不能有空格，而且必须英文状态下半角输入）
- Lambda 表达式的形参列表，全部在 Lambda 体中使用上了，要么是作为调用方法的对象，要么是作为方法的实参。
- 在整个 Lambda 体中没有额外的数据。

#### 构造器引用

（1）当 Lambda 表达式是创建一个对象，并且满足 Lambda 表达式形参，正好是给创建这个对象的构造器的实参列表。

（2） 当 Lambda 表达式是创建一个数组对象，并且满足 Lambda 表达式形参，正好是给创建这个数组对象的长度

构造器引用的语法格式：

- 类名::new
- 数组类型名::new
