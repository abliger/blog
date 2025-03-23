# Log

## 目录

- [日志原理简述](#日志原理简述)
- [JUL](#JUL)
  - [Log4j](#Log4j)

### 日志原理简述

日志功能的实现基本靠一下几个组件来完成：

- Loggers：Logger负责捕捉事件并将其发送给合适的Appender
- Appenders：也称为Handlers，负责从Logger中取出日志消息，并使用Layout来格式化消息，然后将消息发送出去，比如发送到控制台、文件或其他日志收集系统。
- Layouts：也称为Formatters，负责对日志事件进中的数据进行转换和格式化。
- Filters：过滤器，根据需要定制哪些信息会被记录，哪些信息会被放过。

总结一下就是：用户使用Logger来进行日志记录，Logger持有若干个Handler，日志的输出操作是由Handler完成的。在Handler在输出日志前，会经过Filter的过滤，判断代码是否可以继续执行，Filter返回false，日志方法return，Handler不会处理；Filter返回true，则继续向下执行，Handler会将日志内容输出到指定位置（日志文件、控制台等）。Handler在输出日志时会使用Layout，将输出内容进行排版。

### JUL

JUL是JDK自带的一个日志实现,java.util.logging包下的各个类提供了原生的日志记录和输出支持。

[Log-JUL的使用](Log-JUL的使用/Log-JUL的使用.md "Log-JUL的使用")

#### Log4j

[Log4j的使用](Log4j的使用/Log4j的使用.md "Log4j的使用")
