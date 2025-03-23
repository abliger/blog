# jsp 中的常用脚本

i. 声明脚本

作用:声明脚本可以在 jsp 页面中定义自己需要的变量能让代码块,以及方法,甚至是内部类.

语法格式如下:

<%!声明代码%>

```text
<%@ page import="java.util.Map" %>
 <%@ page import="java.util.HashMap" %><%--
   Created by IntelliJ IDEA.
   User: Administrator
   Date: 2020/4/13
   Time: 9:10
   To change this template use File | Settings | File Templates.
 --%>
 <%@ page contentType="text/html;charset=UTF-8" language="java" %>
 <html>
 <head>
     <title>Title</title>
 </head>
 <body>
     <%!
         // 1 全局变量
         private Integer id;
         private static Map<String,Object>map;
     %>
     <%!
         //  2 static静态代码块
         static {
             map = new HashMap<String, Object>();
             map.put("aaa","aaaValue");
             map.put("bbb", "bbbValue");
         }
     %>
     <%!
         // 3 声明方法
        public int fun(){
            return 18;
        }
     %>
     <%!
         // 4 声明内部类
         public static class T {
             private Integer id;
             private String name;
         }
     %>
 </body>
 </html>
```

ii. 表达式脚本

作用:表达式脚本可以在 jsp 页面上输出数据.

表达式脚本的语法格式如下:

<%=表达式 %>

表达式脚本的特点:

1 表达式脚本都会被翻译到\_jspService()方法中

2 表达式脚本都会被翻译成为 out.print() 输出给客户端

3 表达式脚本中的表达式,不能以分号结尾.

4 在\_jspService 方法中有对象,表达式脚本都可以直接使用.

```javascript
<%=12 %> <br>
<%=12.12 %> <br>
<%="我是字符串,但是依然没有国哥帅!" %> <br>
<%=map%> <br>
```

iii. 代码脚本 作用: 代码脚本可以用于定义\_jspServcie() 方法中的语句.( 但凡是\_jspService()方法中能写的语句都可以写在代码脚本中 )&#x20;

代码脚本的语法格式如下:<%java 语句 %>&#x20;

代码脚本的特点:&#x20;

1. 代码脚本都会被翻译到 \_jspService() 方法中&#x20;
2. 由于代码脚本都会被翻译到 \_jspService() 方法中,所以在\_jspService() 方法中存在的对象都可以直接使用.&#x20;
3. 一个完整的 java 语句,可以由多个代码脚本组合完成 4 代码脚本还可以和表达式脚本组成完成复杂的输出

```java
<%@ page import="java.util.Map" %>
<%@ page import="java.util.HashMap" %>
<%--
    Created by IntelliJ IDEA.
    User: Administrator
    Date: 2020/4/13
    Time: 9:10
    To change this template use File | Settings | File Templates.
--%>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html>
<head>
    <title>Title</title>
</head>
<body>
```

```java
<%--练习:--%>
<%!
    // 1 全局变量
    private Integer id;
    private static Map<String,Object>map;
%>
<%!
    //  2 static静态代码块
    static {
        map = new HashMap<String, Object>();
        map.put("aaa","aaaValue");
        map.put("bbb", "bbbValue");
    }
%>

<%!
    // 3 声明方法
    public int fun(){
        return 18;
    }
%>

<%!
    // 4 声明内部类
    public static class T {
        private Integer id;
        private String name;
    }
%>

<%--练习:
1.输出整型
2.输出浮点型
3.输出字符串
4.输出对象--%>

    <%=12 %> <br>
    <%=12.12 %> <br>
    <%="我是字符串,但是依然没有国哥帅!" %> <br>
    <%=map%> <br>
    <%=12 == 12 ? "12等于12" : "12不等于12" %> <br>
    <%=request.getContextPath() %>
<%--

--%>

    <%
//        1.代码脚本----if 语句
    int i = 121;
    if (i == 12) {
        System.out.println("国哥是真的帅,没办法!");
    } else {
        System.out.println("国哥不帅,天理不容!");
    }
    %>

    <%
        // 2.代码脚本----for 循环语句
        for (int j = 1; j <= 10; j++) {
            System.out.println("j = " + j);
        }
    %>

    <%
        // 3.翻译后java文件中_jspService方法内的代码都可以写
        String username = request.getParameter("username");
        System.out.println("请求参数username的值是: " + username);
    %>

</body>

</html>
```
