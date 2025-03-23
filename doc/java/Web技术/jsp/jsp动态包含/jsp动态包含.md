# jsp动态包含

动态包含

\<jsp:include page="路径">\</jsp:include>

page 属性设置被包含的jsp页面的路径.

动态包含的特点:

1 会翻译所有的jsp页面

2 动态包含是使用JspRuntimeLibrary.include() 调用被包含的jsp页面内容输出

3 动态包含还可以传递参数给包含的jsp页面

4 如果被包含的jsp页面中含有大量java动态,动态包含不会出现多次声明的错误

```html
<jsp:include page="/include/footer.jsp">
    <jsp:param name="username" value="wzg168" />
    <jsp:param name="password" value="123456" />
</jsp:include>
```


静态包含和动态包含都可以达到包含的效果.jsp随着整个JavaEE技术体系的变革,jsp页面的作用也慢慢被弱化.

现在的jsp只是用来输出html页面数据即可.所以静态包含和动态包含,慢慢的就只使用了静态包含( 静态包含会比动态包含性能强一点点 ).
