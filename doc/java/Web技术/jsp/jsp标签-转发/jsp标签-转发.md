# jsp标签-转发

```html
<%--
    <jsp:forward page="路径" />
    作用跟
        request.getRequestDispatcher("/scope2.jsp")
        .forward(request,response);
    一样.
--%>

<jsp:forward page="/scope2.jsp" />
```
