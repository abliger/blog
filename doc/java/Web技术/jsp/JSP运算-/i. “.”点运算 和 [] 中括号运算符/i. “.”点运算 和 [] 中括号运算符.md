# i. ".”点运算 和 \[] 中括号运算符

".”点运算 可以输出 bean 的属性值.也可以输出 map 集合中某个 key 的值.

\[] 中括号运算符 可以输出有序集合中指定元素的值. 还可以输出 map 中 key 里含有特殊字符的 key 的值.

```html
<%@ page import="java.util.Map" %>
<%@ page import="java.util.HashMap" %><%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2020/4/14
  Time: 9:32
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
    <%
        Map<String,Object> map = new HashMap<>();
        map.put("a.a.a", "aaaVAlue");
        map.put("b+b+b", "bbbVAlue");
        map.put("c-c-c", "cccVAlue");
        request.setAttribute("map", map);
    %>
    ${ map } <br>
    ${ map['a.a.a'] } <br>
    ${ map["b+b+b"] } <br>
    ${ map['c-c-c'] } <br>
</body>
</html>

```
