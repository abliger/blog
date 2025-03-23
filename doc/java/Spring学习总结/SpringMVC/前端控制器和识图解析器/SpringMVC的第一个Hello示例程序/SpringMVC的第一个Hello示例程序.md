# SpringMVC的第一个Hello示例程序

## 目录

- [SpringMVC——Hello world程序的步骤：](#SpringMVCHello-world程序的步骤)
- [SpringMVC的加载文件的另一种存放方式](#SpringMVC的加载文件的另一种存放方式)

## SpringMVC——Hello world程序的步骤：

创建一个web的模块

添加jar包:

- spring-aop-5.2.5.RELEASE.jar
- spring-beans-5.2.5.RELEASE.jar
- spring-context-5.2.5.RELEASE.jar
- spring-core-5.2.5.RELEASE.jar
- spring-expression-5.2.5.RELEASE.jar
- spring-jcl-5.2.5.RELEASE.jar
- spring-web-5.2.5.RELEASE.jar
- spring-webmvc-5.2.5.RELEASE.jar

web.xml中的配置:

```xml
<servlet>
    <servlet-name>dispatcherServlet</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <!-- SpringMVC也有一个Spring容器对象 -->
    <init-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>classpath:springmvc.xml</param-value>
    </init-param>
    <!-- 加载时机,1为容器启动就创建 dispatcherServlet实例-->
    <load-on-startup>1</load-on-startup>
</servlet>
<servlet-mapping>
    <servlet-name>dispatcherServlet</servlet-name>
    <!--
            /:放行jsp放行外其他全部拦截
            /*:全部拦截,包含jsp
        -->
    <url-pattern>/</url-pattern>
</servlet-mapping>
```


Springmvc.xml配置文件:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">
    <!-- 扫描注解 -->
    <context:component-scan base-package="com.atguigu"/>
</beans>
```


Controlller控制器的代码:

```java
@Controller
public class HelloController {
    /**     
     * @RequestMapping表示Hello方法的访问地址 <br/>
     * 404:将value的值不予方法名重名
     */
    @RequestMapping(value = "/hello")
    public String hello() {
        System.err.println("SpringMVC 第一个 小demo");
        /**
         * / ==>> 在web工程中表示路径为:http://ip:port/工程路径<br/>
         * 映射到代码的web目录 <br/>
         * 默认情况下,springmvc使用请求转发做为默认的页面跳转方式<br/>
         */
        return "/ok.jsp";
    }
}
```


index.jsp页面

```java
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
    <head>
        <title>$Title$</title>
    </head>
    <body>
        <a href="${pageContext.request.contextPath}/hello">springmvc的hello请求</a>
    </body>
</html>
```


## SpringMVC的加载文件的另一种存放方式

Springmvc配置文件加载有两种方式:

一种是在web.xml中配置前端控制器的时候使用初始化参数来进行配置加载

```xml
<init-param>
    <param-name>contextConfigLocation</param-name>
    <param-value>classpath:springmvc.xml</param-value>
</init-param>
```


另一种方式是,不使用init-param初始化参数.需要注意以下几个点:

1. 配置文件必须存放在WEB-INF目录下
2. 配置文件名 必须由 `<servlet-name>`标签值 +` (-servlet.xml)`

示意如下:

`<servlet-name>dispatcher</servlet-name>`

那么配置文件名就是: `dispatcher-servlet.xml`
