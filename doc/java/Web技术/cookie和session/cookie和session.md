# cookie和session

## 目录

- [cookie是什么？](#cookie是什么)
  - [Cookie的局限：](#Cookie的局限)
- [什么是Session会话?](#什么是Session会话)
  - [Session特点：](#Session特点)

### cookie是什么？

1. Cookie是服务器通知客户端保存键值对的一种技术.
2. 每个 Cookie的大小不能超过4kb
3. 每次请求的时候,只要客户端有Cookie,都会被发送给服务器.

[cookie](cookie/cookie.md "cookie")

[cookie program](<cookie program/cookie program.md> "cookie program")

#### Cookie的局限：

1）Cookie只能存字符串类型。不能保存对象

2）只能存非中文。

3）1个Cookie的容量不超过4KB。

如果要保存非字符串，超过4kb内容，只能使用session技术！！！

## 什么是Session会话?

1. Session是一个接口,类名是HttpSession.
2. session是一个域对象( 域对象是可以像map一样存取数据的对象,域是数据操作的有效范围 )
3. 我们经常会把用户登录之后的信息,保存到Session域中.
4. 一般情况下.一个会话对象表示一个客户端( 服务器会为每个客户端都创建一个Sessison会话对象 )
5. Session是用于维护客户端和服务器之间关联的一种技术.

#### Session特点：

会话数据保存在服务器端。（内存中）

[Session](Session/Session.md "Session")
