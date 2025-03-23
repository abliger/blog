# empty运算

empty运算可以判断某个数据是否为空.如果为空输出true.不空输出false.

以下几种情况下.会为空,也就是会输出true.

1. 值为null的情况.
2. 值为空串
3. 值是Object类型的数组,且长度为零
4. list集合,元素个数为零
5. map集合,元素个数为零

empty运算示例代码:

```html
<%@ page import="java.util.List" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.Map" %>
<%@ page import="java.util.HashMap" %><%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2020/4/14
  Time: 9:22
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
    <%
//        1 值为null的情况.
        request.setAttribute("emptyNull", null);
//        2 值为空串
        request.setAttribute("emptyStr", "");
//        3 值是Object类型的数组,且长度为零
        request.setAttribute("emptyArr", new Object[]{});
//        4 list集合,元素个数为零
        List<String> list = new ArrayList<>();
//        list.add("1234");
        request.setAttribute("emptyList", list);
//        5 map集合,元素个数为零
        Map<String,Object> map = new HashMap<>();
//        map.put("key", "keyValue");
        request.setAttribute("emptyMap", map);
    %>
    ${ empty emptyNull } <br>
    ${ empty emptyStr } <br>
    ${ empty emptyArr } <br>
    ${ empty emptyList } <br>
    ${ empty emptyMap } <br>
</body>
</html>

```
