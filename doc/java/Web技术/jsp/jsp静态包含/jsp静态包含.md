# jsp静态包含

```html
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>

    顶部信息 <br>
    页面主体信息 <br/
    <%--
        静态包含格式如下:
            <%@ include file="路径"%>
                file 属性设置被包含的jsp页面的路径.
                这个路径以斜杠打头,表示地址为:[http://ip](http://ip):port/工程路径/  映射到代码的web目录

        静态包含的特点:
            1 被包含的jsp页面不会被翻译为java文件.
            2 静态包含是把被包含的jsp页面的内容拷贝到包含的位置执行输出.
    --%>
    <%@ include file="/include/footer.jsp"%>

</body>

</html>
```
