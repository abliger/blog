# jsp四大域对象

## 目录

- [jsp中的out输出和response.getWriter输出的区别](#jsp中的out输出和responsegetWriter输出的区别)

pageContext , reqeust , session , application 是四个域对象.

域对象是可以像Map一样存取数据的对象.

域指的是数据操作的有效范围.

不同的是四个域的操作范围不同.

变量名

pageContext  当前jsp页面

request  一次请求

session  一个会话对象( 打开浏览器访问服务器,会话就创建,浏览器一关闭,会话就失效 )

application  ServletContext类,web工程启动的时候创建,web工程停止的时候销毁.

四个域都可以用来存取数据,那么我们如何挑选进行使用.

四个域的使用优先顺序分别是: pageContext , reqeust , session , application

四个域,要从小到大去优先使用.

scope1.jsp页面

```java
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html>
<head>
    <title>Title</title>
</head>

<body>
    <h1>scope1.jsp页面</h1>
    <%
        // 往 四个域中保存数据
        pageContext.setAttribute("key","pageContext");
        request.setAttribute("key","request");
        session.setAttribute("key","session");
        application.setAttribute("key","application");
    %>
    pageContext域 : <%=pageContext.getAttribute("key")%> <br>
    request : <%=request.getAttribute("key")%> <br>
    session : <%=session.getAttribute("key")%> <br>
    application : <%=application.getAttribute("key")%> <br>
    <%
        request.getRequestDispatcher("/scope2.jsp")
            .forward(request,response);
    %>

</body>
</html>

scope2.jsp页面
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
    <h1>scope2.jsp页面</h1>
    pageContext域 : <%=pageContext.getAttribute("key")%> <br>
    request : <%=request.getAttribute("key")%> <br>
    session : <%=session.getAttribute("key")%> <br>
    application : <%=application.getAttribute("key")%> <br>
</body>

</html>
```


#### jsp中的out输出和response.getWriter输出的区别

在jsp页面中,统一使用out进行输出数据.

一句话总结: 在jsp页面中,可以统一使用out.print() 来输出页面中的数据

out.write() 用于输出字符串

out.print() 输出字符串之外的内容
