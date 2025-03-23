# JSON

## 目录

- [什么是JSON?](#什么是JSON)
  - [JSON使用来做什么的？](#JSON使用来做什么的)
  - [JSON的特点：](#JSON的特点)
  - [JSON的用法：](#JSON的用法)

[Json官方文档](http://www.json.org/json-zh.html "Json官方文档")

[16\_尚硅谷\_JSON、Aajx\_王振国 - 课堂笔记.doc](<file/16_尚硅谷_JSON、Aajx_王振国 - 课堂笔记_slwaX74Ian.doc> " 16_尚硅谷_JSON、Aajx_王振国 - 课堂笔记.doc")

## 什么是JSON?

1. Json是一种[数据交换格式](https://blog.csdn.net/QingHe97/article/details/103826844 "数据交换格式")，易于人阅读和编写，易于机器的解析和生成。
2. Json是一个独立于语言的文本格式，现已被各种编程语言支持。

### JSON使用来做什么的？

用于跟服务器进行交换数据

[json应用场景](json应用场景/json应用场景.md "json应用场景")

RPC远程调用，提供给外部访问接口，规定数据交互格式。

### JSON的特点：

[JSON和XML的异同：](JSON和XML的异同：/JSON和XML的异同：.md "JSON和XML的异同：")

[为什么使用 JSON？](<为什么使用 JSON？/为什么使用 JSON？.md> "为什么使用 JSON？")

### JSON的用法：

JSON因为进行数据交换，需要在JSON对象和javaBean对象进行转换，现如今是以字符串类型的形式作为转换的桥梁。

1. 在js中调用stringify(JSON对象)方法返回一个字符串

   调用prase（JSON转换成的字符串）方法返回JSON对象

   [JSON在js的使用](JSON在js的使用/JSON在js的使用.md "JSON在js的使用")
2. 在java中使用谷歌Gson jar包进行JSON解析
   - javaBean对象==>字符串

     创建Gson对象，统一调用toJson（javaBean对象）转化为JSON字符串
   - 字符串==>javaBean对象

     普通对象

     创建Gson对象，调用fromJson（JSON字符串，待转换的类型的class类）转化为JSON字符串；待转换的类型可以是bean对象或数组对象。

     List和map对象

     创建Gson对象，调用fromJson（JSON字符串，new typeToken\<T>（）{}.getType()）转化为JSON字符串

     [JSON在java中的使用](JSON在java中的使用/JSON在java中的使用.md "JSON在java中的使用")
3. 在java中使用阿里FastJson包进行JSON解析

   [FastJson进行JSON解析](FastJson进行JSON解析/FastJson进行JSON解析.md "FastJson进行JSON解析")
