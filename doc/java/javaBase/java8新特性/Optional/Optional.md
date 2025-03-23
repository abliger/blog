# Optional

## 目录

- [Optional类](#Optional类)
  - [ API](#-API)
  - [2、如何从Optional容器中取出所包装的对象呢？](#2如何从Optional容器中取出所包装的对象呢)
  - [3、其他方法](#3其他方法)

## Optional类

到目前为止，臭名昭著的空指针异常是导致Java应用程序失败的最常见原因。以前，为了解决空指针异常，Google公司著名的Guava项目引入了Optional类，Guava通过使用检查空值的方式来防止代码污染，它鼓励程序员写更干净的代码。受到Google Guava的启发，Optional类已经成为Java 8类库的一部分。

Optional实际上是个容器：它可以保存类型T的值，或者仅仅保存null。Optional提供很多有用的方法，这样我们就不用显式进行空值检测。

#### &#x20;API

1、如何创建Optional对象？或者说如何用Optional来装值对象或null值

（1）static \<T> Optional\<T> empty() ：用来创建一个空的Optional

（2）static \<T> Optional\<T> of(T value) ：用来创建一个非空的Optional

（3）static \<T> Optional\<T> ofNullable(T value) ：用来创建一个可能是空，也可能非空的Optional

#### 2、如何从Optional容器中取出所包装的对象呢？

（1）T get() ：要求Optional容器必须非空

T get()与of(T value)使用是安全的

（2）T orElse(T other) ：

orElse(T other) 与ofNullable(T value)配合使用，

如果Optional容器中非空，就返回所包装值，如果为空，就用orElse(T other)other指定的默认值（备胎）代替

（3）T orElseGet(Supplier\<? extends T> other) ：

如果Optional容器中非空，就返回所包装值，如果为空，就用Supplier接口的Lambda表达式提供的值代替

（4）\<X extends Throwable> T orElseThrow(Supplier\<? extends X> exceptionSupplier)

如果Optional容器中非空，就返回所包装值，如果为空，就抛出你指定的异常类型代替原来的NoSuchElementException

#### 3、其他方法

（1）boolean isPresent() ：判断Optional容器中的值是否存在

（2）void ifPresent(Consumer\<? super T> consumer) ：

判断Optional容器中的值是否存在，如果存在，就对它进行Consumer指定的操作，如果不存在就不做

（3）\<U> Optional\<U> map(Function\<? super T,? extends U> mapper)

判断Optional容器中的值是否存在，如果存在，就对它进行Function接口指定的操作，如果不存在就不做
