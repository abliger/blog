# JQuery 中的 AJAX

### 请求

都是请求方法，响应函数是请求方法的回调函数。

AJAX 请求发送到的 servlet 程序

```java
protected void jQuerySerialize(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        System.out.println(" jQuerySerialize () 调用了 ");
        System.out.println("下拉单选 => " + request.getParameter("single"));
        System.out.println( "筛选 => " + Arrays.asList( request.getParameterValues("check")) );
        System.out.println("用户名=>" + request.getParameter("username"));
        System.out.println("密码=>" + request.getParameter("password"));


        Person person = new Person(1, "jQuerySerialize");
        Gson gson = new Gson();
        String s = gson.toJson(person);
        response.getWriter().write(s);
}
```

#### $.ajax 方法

ajax() 方法是 jQuery 中提供的专门用于**发起 Ajax 请求**的方法.我们只需要给这个方法传递请求时需要的信息即可!!!

`$.ajax` 方法的形参列表

url 请求的资源路径 `&#x20;`

type 请求的方式 GET 或 POST

data 发送给服务器的数据

一种数据格式是: `name=value&name=value`

另一种数据格式是: `{ key:value , key : value }`

success 成功的回调函数

dataType 响应的数据类型

text 纯文本

xml 返回是 xml 数据

json 返回是 json 对象

```javascript
// ajax请求
$("#ajaxBtn").click(function () {
  // 这是ajax() 的单击事件
  $.ajax({
    url: "http://localhost:8080/16_json_ajax_i18n/ajaxServlet",
    type: "GET",
    data: "action=jQueryAjax",
    success: function (data) {
      // success的函数要有一个参数.这个参数就是服务器返回的数据
      // alert(data);
      var jsonObj = JSON.parse(data);
      $("#msg").html("编号: " + jsonObj.id + " , 名称: " + jsonObj.name);
    },
    dataType: "text",
  });
});
```

#### .get 和.post 方法

.get()方法底层调用的是.ajax()方法,只是少似了一个参数.,就是 GET.

.post()方法底层调用的是.ajax()方法,只是少似了一个参数.,就是 POST.

url 请求的资源路径 `&#x20;`

data 发送给服务器的数据 `&#x20;`

格式有: `name=value\&name=value 或 { key:value,key:value}`

callback 成功的回调函数

type 返回的数据类型: text , xml , json

```javascript
// ajax--get请求
$("#getBtn").click(function () {
  $.get(
    "http://localhost:8080/16_json_ajax_i18n/ajaxServlet",
    { action: "jQueryGet" },
    function (data) {
      // alert(data);
      // var jsonObj = JSON.parse(data);
      // $("#msg").html("编号: " + jsonObj.id + " , 名称: " + jsonObj.name);
      $("#msg").html("编号: " + data.id + " , 名称: " + data.name);
    },
    "json"
  );
});

// ajax--post请求
$("#postBtn").click(function () {
  // post请求
  $.post(
    "http://localhost:8080/16_json_ajax_i18n/ajaxServlet",
    "action=jQueryPost",
    function (data) {
      $("#msg").html("编号: " + data.id + " , 名称: " + data.name);
    },
    "json"
  );
});
```

#### $.getJSON 方法

固定以 get 请求的方式发起 ajax 请求,返回的数据类型固定是 json 对象

url 请求的 url 地址

data 发送给服务器的数据

callback 成功的回调函数

```javascript
// ajax--getJson请求
$("#getJSONBtn").click(function () {
  // 调用
  $.getJSON(
    "http://localhost:8080/16_json_ajax_i18n/ajaxServlet",
    "action=jQueryGetJSON",
    function (data) {
      $("#msg").html("编号: " + data.id + " , 名称: " + data.name);
    }
  );
});
```

### 表单序列化 serialize()

它可以把表单中,所有表单项,都以 `name=value\&name=value` 的形式获取到它们的信息.

使用示例:

form 对象 .serialize()

```javascript
// ajax请求
$("#submit").click(function () {
  // 把参数序列化
  $.getJSON(
    "http://localhost:8080/16_json_ajax_i18n/ajaxServlet",
    "action=jQuerySerialize&" + $("#form01").serialize(),
    function (data) {
      $("#msg").html("编号: " + data.id + " , 名称: " + data.name);
    }
  );
});
```
