# ServletContext类

## 目录

- [什么是ServletContext?](#什么是ServletContext)
- [ServletContext类的四个常见作用](#ServletContext类的四个常见作用)

## 什么是ServletContext?

1 . ServletContext对象是一个接口

2 . ServletContext表示整个web工程的上下文( 可以通过上下文对象获取工程的信息 ).

3 . 一个web工程只会创建一个ServletContext对象实例.

4 . ServletContext对象是在web工程启动的时候创建,在web工程停止的时候销毁.

5 .ServletContext是一个域对象

域对象可以像Map一样存取数据的对象.域是指存取的数据的操作范围.

ServletContext域它的数据操作范围是整个web工程.

保存&#x20;

获取

&#x20;删除

map&#x20;

put()&#x20;

get()

&#x20;remove()

域对象&#x20;

setAttribute();&#x20;

getAttribute();&#x20;

removeAttribute();

## ServletContext类的四个常见作用

1 可以获取在web.xml中配置的上下文参数 context-param标签

2 获取web工程的工程路径

3 获取web部署到服务器上之后,在服务器硬盘上的绝对路径

4 可以像map一样存取数据

Servlet程序的代码:

```java
public class Servlet3 extends HttpServlet {

    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
        //        1 获取Servlet-name标签的值
        System.out.println("servlet-name => " + config.getServletName());
//        2 获取init-param初始化参数
        System.out.println("init username => " + config.getInitParameter("username"));
        System.out.println("init url => " + config.getInitParameter("url"));
//        3 获取ServletContext对象
        System.out.println(config.getServletContext());
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // 获取ServletContext对象
        ServletContext servletContext = getServletContext();

//        1 可以获取在web.xml中配置的上下文参数  context-param标签
        String username = servletContext.getInitParameter("username");
        String password = servletContext.getInitParameter("password");
        System.out.println("context-param username => " + username);
        System.out.println("context-param password => " + password);
//        2 获取web工程的工程路径
        String contextPath = servletContext.getContextPath();
        System.out.println(contextPath);
//        3 获取web部署到服务器上之后,在服务器硬盘上的绝对路径
        /**
         * getRealPath()获取它真实的路径 <br/>
         * 斜杠是根,在服务器上表示地址为http://ip:port/工程路径/ 映射  代码的web目录.
         */
        System.out.println( servletContext.getRealPath("/") );
        // 获取web/imgs/1.jpg部署到服务器硬盘上哪个位置
        System.out.println(servletContext.getRealPath("/imgs/1.jpg"));
        System.out.println( servletContext.getRealPath("/css") );
    }
}

```


web.xml中的配置:

```xml
<!--
    context-param上下文参数
    (init-param只能给它所在的Servlet程序获取使用)
    context-param可以让整个web工程都获取使用.
-->
<context-param>
    <param-name>username</param-name>
    <param-value>wzg168</param-value>
</context-param>
<context-param>
    <param-name>password</param-name>
    <param-value>666666</param-value>
</context-param>

```


像Map一样存取数据:

```java
@WebServlet(value = "/contextServlet1")
public class ContextServlet1 extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ServletContext servletContext = getServletContext();
        System.out.println(servletContext);
        // 从ServletContext域中获取数据
        Object abc = servletContext.getAttribute("abc");
        System.out.println("Contex1 保存之前获取 abc ==>> " + abc);
        // 保存数据到Servletcontext域中
        servletContext.setAttribute("abc","abcValue");
        abc = servletContext.getAttribute("abc");
        System.out.println("Contex1 保存之后获取 abc ==>> " + abc);
    }

}

@WebServlet(value = "/contextServlet2")
public class ContextServlet2 extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ServletContext servletContext = getServletContext();
        System.out.println(servletContext);
        Object abc = servletContext.getAttribute("abc");
        System.out.println("Contex2 保存之前获取 abc ==>> " + abc);
    }

}
 
```
