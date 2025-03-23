# 什么是 Referer？Referer 的作用？空 Referer 是怎么回事？

## 目录

- [什么是 Referer？](#什么是Referer)
  - [这里有一个小问题要说明下。](#这里有一个小问题要说明下)
- [Referer 的作用？](#Referer的作用)
- [空 Referer 是怎么回事？什么情况下会出现 Referer?](#空Referer是怎么回事什么情况下会出现Referer)
  - [那么在防盗链设置中，允许空 Referer 和不允许空 Referer 有什么区别？](#那么在防盗链设置中允许空Referer和不允许空Referer有什么区别)

# 什么是 Referer？

[Referer](https://www.sojson.com/tag_referer.html "Referer") 是   [HTTP](https://www.sojson.com/tag_http.html "HTTP") 请求`header` 的一部分，当浏览器（或者模拟浏览器行为）向`web` 服务器发送请求的时候，头信息里有包含   [Referer](https://www.sojson.com/tag_referer.html "Referer") 。比如我在`www.sojson.com` 里有一个`www.baidu.com` 链接，那么点击这个`www.baidu.com` ，它的`header` 信息里就有：

Referer=<https://www.sojson.com>

由此可以看出来吧。它就是表示一个来源。看下图的一个请求的 [Referer](https://www.sojson.com/tag_referer.html "Referer") 信息。

![](//cdn.yinshua86.com/file/16-01-23-02-49-30/doc/6023914857.jpg)

### 这里有一个小问题要说明下。

[Referer](https://www.sojson.com/tag_referer.html "Referer") 的正确英语拼法是`referrer` 。由于早期 HTTP 规范的拼写错误，为了保持向后兼容就将错就错了。其它网络技术的规范企图修正此问题，使用正确拼法，所以目前拼法不统一。还有它第一个字母是大写。

# Referer 的作用？

1.防盗链。

刚刚前面有提到一个小 [Demo](https://www.sojson.com/tag_demo.html "Demo") 。

我在 www\.sojson.com 里有一个`www.baidu.com`链接，那么点击这个`www.baidu.com`，它的 header 信息里就有： &#x20;

> Referer=<https://www.sojson.com>
> Referer=<https://www.sojson.com>

> &#x20;Referer=<https://www.sojson.com>

# 空 Referer 是怎么回事？什么情况下会出现 Referer?

首先，我们对空 [Referer](https://www.sojson.com/tag_referer.html "Referer") 的定义为， [Referer](https://www.sojson.com/tag_referer.html "Referer") 头部的内容为空，或者，一个 [HTTP](https://www.sojson.com/tag_http.html "HTTP") 请求中根本不包含 [Referer](https://www.sojson.com/tag_referer.html "Referer") 头部。

那么什么时候 [HTTP](https://www.sojson.com/tag_http.html "HTTP") 请求会不包含 [Referer](https://www.sojson.com/tag_referer.html "Referer") 字段呢？根据 Referer 的定义，它的作用是指示一个请求是从哪里链接过来，那么当一个请求并不是由链接触发产生的，那么自然也就不需要指定这个请求的链接来源。

比如，直接在浏览器的地址栏中输入一个资源的 URL 地址，那么这种请求是不会包含 [Referer](https://www.sojson.com/tag_referer.html "Referer") 字段的，因为这是一个"凭空产生”的 [HTTP](https://www.sojson.com/tag_http.html "HTTP") 请求，并不是从一个地方链接过去的。 &#x20;

### 那么在防盗链设置中，允许空 Referer 和不允许空 Referer 有什么区别？

允许 [Referer](https://www.sojson.com/tag_referer.html "Referer") 为空，意味着你允许比如浏览器直接访问，就是空。

如下图：

![](//cdn.yinshua86.com/file/16-01-23-02-54-09/doc/6753290148.jpg)

这就是空的 [Referer](https://www.sojson.com/tag_referer.html "Referer") 。

拒绝空的 [Referer](https://www.sojson.com/tag_referer.html "Referer") 。比如我的`www.sojson.com`的静态资源都是拒绝空的`Referer` 的。如下图，我访问我的一个图片。 &#x20;

![](//cdn.yinshua86.com/file/16-01-23-02-57-10/doc/3910657428.jpg)

看到了吧，直接拒绝访问了，如果有同学在测试我网站的静态资源的时候，记住强制刷新`Ctrl + F5` ，因为浏览器有缓存，可能你开始还是可以访问的。

当然。这个你不能完全依赖 [Referer](https://www.sojson.com/tag_referer.html "Referer") 来做一些事情，因为这个最容易伪造来源。

每个语言，都可以，比如 [Java](https://www.sojson.com/tag_java.html "Java") 来模拟一个 [Httpclient](https://www.sojson.com/tag_httpclient.html "Httpclient") 请求。并且伪造来源。

```java
/**

* 从工信部获取验证码

* @param session

* @param response

*/

public static void getVCode(HttpSession session,HttpServletResponse response){

InputStream inputStream = null;

ServletOutputStream outStream = null;

try {

//获取登录框的隐含参数 type="hidden" name="_xsrf"

HttpClient client = new HttpClient();

client.getParams().setParameter(HttpMethodParams.HTTP_CONTENT_CHARSET,"UTF-8");

client.getParams().setCookiePolicy(CookiePolicy.BROWSER_COMPATIBILITY);

GetMethod method = new GetMethod("http://www.miitbeian.gov.cn/getVerifyCode");

method.setRequestHeader("Connection","close");

method.setRequestHeader("Host", "www.miitbeian.gov.cn");

method.setRequestHeader("Referer", "http://www.miitbeian.gov.cn/icp/publish/query/icpMemoInfo_showPage.action");

method.setRequestHeader("User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:42.0) Gecko/20100101 Firefox/42.0");

//    method.setRequestHeader("Cookie", (String)goon);

client.executeMethod(method);

Cookie[] cookies = client.getState().getCookies();

String sid = "",uid="",goon="__jsluid=%s; JSESSIONID=%s";

for (Cookie cookie : cookies) {

String name = cookie.getName();

String value = cookie.getValue();

if("JSESSIONID".equals(name)){

sid = value;

}

if("__jsluid".equals(name)){

uid = value;

}

}

goon = String.format(goon, uid,sid);

//存储工信部Session信息

session.setAttribute("goon", goon);

inputStream= method.getResponseBodyAsStream();

//得到图片的二进制数据，以二进制封装得到数据，具有通用性

byte[] data = CacheFindManager.readInputStream(inputStream);

outStream = response.getOutputStream();

outStream.write(data);

outStream.flush() ;

} catch (Exception e) {

LoggerUtils.error(BeianGovManager.class, "获取验证码出现异常。", e);

}finally{

try {

inputStream.close();

outStream.close();

} catch (IOException e) {

LoggerUtils.error(BeianGovManager.class, "获取验证码后，关闭流出现异常，请忽略！", e);

}

}

}
```
