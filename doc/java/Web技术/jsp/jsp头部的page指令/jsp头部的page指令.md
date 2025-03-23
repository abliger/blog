# jsp头部的page指令

page指令可以修改或设置jsp页面的属性.这些属性决定了jsp页面的一些行为特点.

page指令示例如下:

<%@ page contentType="text/html;charset=UTF-8" language="java" %>

i.  language属性  jsp翻译过来是什么语言.它的值暂时固定是java.

ii.  contentType属性  表示jsp页面访问后,返回给客户端的数据类型,也就是response.setContentType()方法的参数值.

iii.  pageEncoding属性  表示当前jsp文件本身的字符集

iv.  import属性  给jsp页面导入需要的包或类

\================autoFlush和buffer属性是对out进行设置的====================

v.  autoFlush属性  设置当out输出流的缓冲区满了之后,是否自动刷新缓冲区中的数据,默认是true. &#x20;

vi.  buffer属性  设置out缓冲区的大小.默认是8kb

vii.  errorPage属性  设置当jsp页面运行时出错,自动跳转去的错误页面.

viii.  isErrorPage属性  设置当前jsp页面是否是错误页面.默认值是false.如果设置为true,就会启用Exception异常对象.

ix.  session 属性  设置访问jsp页面时是否自动创建HttpSession会话对象.默认值是true.

x.  extends 属性  设置jsp翻译之后继承哪个类.
