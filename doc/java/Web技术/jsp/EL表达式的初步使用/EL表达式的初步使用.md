# EL表达式的初步使用

EL的全称：Expression Language，就是表达式语言。可以输出表达式的值。

跟jsp的表达式脚本一样。计算表达式的值后输出。&#x20;

EL表达式出现的目的是为了使JSP写起来更加简单，让jsp的代码更佳简化。

我们先来看一下EL表达式的一个Hello world 程序，看看它是如何简化jsp代码。

```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "[http://www.w3.org/TR/html4/loose.dtd](http://www.w3.org/TR/html4/loose.dtd)">

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>

<body>
<%
    //首先我们需要在request域对象中设置一个属性
    request.setAttribute("hello", "这是内容");
%>
<%-- 获取请求域中的属性hello输出 --%>
jsp的输出：<%=request.getAttribute("hello") == null ? "" : request.getAttribute("hello")%><br/><br/>
<%-- 输出在域中查找输出hello的值 --%>
EL表达式的输出：${hello}<br/><br/>
</body>

</html>
```


从上面的程序，我们不难看出。我们要输出域中的属性，方便多了。

所以el表达式使得jsp页面的代码变得更加简洁。主要用于替换 jsp 中表达式脚本。

**EL表达式的最主要功能就是从域对象中获取数据，并且输出**
