# ServletConfig类

## 目录

- [ServletConfig类的三大作用](#ServletConfig类的三大作用)
  - [在Spring中获取ServletConfig对象SpringMVC](#在Spring中获取ServletConfig对象SpringMVC)

ServletConfig类从类名上来看,它是Servlet程序的配置信息类.

我们可以从ServletConfig类中获取Servlet程序的信息.

## ServletConfig类的三大作用

1 获取Servlet-name标签的值

2 获取init-param初始化参数

3 获取ServletContext对象

ServletConfig类示例:

```java
    @Override
    public void init(ServletConfig config) throws ServletException {
        //        1 获取Servlet-name标签的值
        System.out.println("servlet-name => " + config.getServletName());
//        2 获取init-param初始化参数
        System.out.println("init username => " + config.getInitParameter("username"));
        System.out.println("init url => " + config.getInitParameter("url"));
//        3 获取ServletContext对象
        System.out.println(config.getServletContext());
    }

```


web.xml中的配置:

```xml
<servlet>
    <servlet-name>Servlet3</servlet-name>
    <servlet-class>com.atguigu.servlet.Servlet3</servlet-class>
    <!-- init-param初始化参数 -->
    <init-param>
        <!--参数名-->
        <param-name>username</param-name>
        <!--参数值-->
        <param-value>root</param-value>
    </init-param>

   <!-- init-param初始化参数 -->
    <init-param>
        <!--参数名-->
        <param-name>url</param-name>
        <!--参数值-->
        <param-value>jdbc:mysql:///test</param-value>
    </init-param>
</servlet>

```


#### 在Spring中获取ServletConfig对象[SpringMVC](https://www.wolai.com/uR1L4RmVxcxXzFnTJJbW8A "SpringMVC")

需要实现ServletConfigAware
