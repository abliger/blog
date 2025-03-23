# mybatis

## 目录

- [mybatis 简介](#mybatis简介)
- [mybatis 历史](#mybatis历史)
- [为什么要使用 mybatis。](#为什么要使用mybatis)
  - [遇到的问题](#遇到的问题)

[MyBatis 第一天.md](file/MyBatis第一天_kBUvY1ASI5.md " MyBatis第一天.md")

### mybatis 简介

MyBatis 是支持定制化 SQL、存储过程以及高级映射的优秀的持久层框架。

MyBatis 避免了几乎所有的 **JDBC 代码和手动设置参数以及获取结果集。**

MyBatis 可以使用简单的 XML 或注解用于配置和原始映射，

将接口和 Java 的 POJO（Plain Old Java Objects，普通的 Java 对象）映射成数据库中的记录.

orm 框架

对象 关系 映射

javaBean 数据库表 操作 javaBean 直接映射到数据库表

### mybatis 历史

原是 apache 的一个开源项目 iBatis, 2010 年 6 月这个项目由 apache software foundation 迁移到了 google code，随着开发团队转投 Google Code 旗下，ibatis3.x 正式更名为 Mybatis ，代码于 2013 年 11 月迁移到 Github。

iBATIS 一词来源于"internet”和"abatis”的组合，是一个基于 Java 的持久层框架。

iBATIS 提供的持久层框架包括 SQL Maps 和 Data Access Objects（DAO）

### 为什么要使用 mybatis。

MyBatis 是一个半自动化的持久化层 ORM 框架。

回顾 jdbc

```java
Connection con = null;
PreparedStatement psmt = null;
ResultSet set = null;
try {
    // 1.加载驱动
    Class.forName("com.mysql.jdbc.Driver");
    // 2.创建数据库的连接对象
    con = DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/test", "root", "root");
    // 3.定义sql语句 findUserById
    mybatis内置缓存:
    map:k(sql) v(结果)
    String sql = "select * from user where id = ?";
    // 4.创建statement对象
    psmt = con.prepareStatement(sql);
    // 5.设置参数
    psmt.setInt(1, 1);
    // 6.执行
    set = psmt.executeQuery();
    // 7.处理结果集
    while (set.next()) {
        System.out.println("用户Id：" + set.getInt("id") + ",用户名称：" + set.getString("username"));
    }
} catch (Exception e) {
    e.printStackTrace();
} finally {
    try {
        //8.释放资源
        if (set != null)set.close();
        if (psmt != null)psmt.close();
        if (con != null)con.close();
    } catch (Exception e) {
        e.printStackTrace();
    }
```

Hibernate 和 JPA

长难复杂 SQL，对于 Hibernate 而言处理也不容易

mybatis plus baomidou&#x20;

内部自动生产的 SQL，不容易做特殊优化。

sql 和 java 编码分开，功能边界清晰，一个专注业务、一个专注数据。

可以使用简单的 XML 或注解用于配置和原始映射，**将接口和 Java 的 POJO 映射成数据库中的记录**。成为业务代码+底层数据库的媒介

内置缓存

UserDao UserDaoImpl

UserMapper 代理实现类

[mybatis 配置](mybatis配置/mybatis配置.md "mybatis配置")

---

#### 遇到的问题

&#x20;2020.8.22 2:00 前

> [https://github.com/abliger/shangguigu.git](https://github.com/abliger/shangguigu.git "https://github.com/abliger/shangguigu.git") 版本编号 c1db02be4fd580d4ff68777afa40f09729b050e0

问题一：配置文件配置 entity User 别名 ，但是接口参数为 pojo 的类型，为什么类型不同框架可以映射上去？

答：MyBatis 使用 JSON 把对象转化为字符串处理，最后处理对象和实际的类型无关，和属性有关。

问题二：在使用 Map 集合的时候 Map 的 key 要和 sql 语句的占位符相同 todo 看源码 &#x20;

问题三：使用注释占位符匹配，注解的参数和 param 都能使用，arg\[0-N]不能使用

问题四：为什么此处\${}可以写 param1.name，不是只能使用 value 或@Param 注解参数的名称

问题五：进行模糊查询时，接口的形参不能是 String 类型，使用 User 类可以正确找到，错误内容：ReflectionException: There is no getter for property named 'param1' in 'class java.lang.String

xml 配置文件

```xml

<select id="queryUserByFuzzyMethod" resultType="User">
<!– 使用注释占位符匹配，注解的参数和param都能使用，arg[0-N]不能使用 –>
select id,last_name name,gender from mybatis where last_name like ${param1.name}</select>
```

接口方法

```java
List<User> queryUserByFuzzyMethod(String fuzzyName);
List<User> queryUserByFuzzyMethod(User fuzzyName);

```

测试类

```java
List<User> users = mapper.queryUserByFuzzyMethod(new User("'小%' or '1=1'",null));*/
```

[mybatis02.md](file/mybatis02_ODbjD0cQZM.md " mybatis02.md")

[mybatis03.md](file/mybatis03_cCK47ribas.md " mybatis03.md")

[MyBatis 的注解使用方式](MyBatis的注解使用方式/MyBatis的注解使用方式.md "MyBatis的注解使用方式")

[mybatis 的参数传递](mybatis的参数传递/mybatis的参数传递.md "mybatis的参数传递")

[自定义结果集](自定义结果集/自定义结果集.md "自定义结果集")

[基于注解的级联查询](基于注解的级联查询/基于注解的级联查询.md "基于注解的级联查询")

[Mybatis 逆向工程(了解)](<Mybatis 逆向工程(了解)/Mybatis 逆向工程(了解).md> "Mybatis 逆向工程(了解)")

[Mybatis-plus](Mybatis-plus/Mybatis-plus.md "Mybatis-plus")
