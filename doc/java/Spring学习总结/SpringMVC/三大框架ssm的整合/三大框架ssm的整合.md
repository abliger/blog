# 三大框架 ssm 的整合

## 目录

- [18.1、测试数据库](#181测试数据库)
- [18.2、创建一个动态 Web 工程, 并 mybatis 逆向工程生成代码](#182创建一个动态Web工程-并mybatis逆向工程生成代码)
- [18.3、然后导入整合 Spring+SpringMVC+Mybatis 的所有 jar 包](#183然后导入整合SpringSpringMVCMybatis的所有jar包)
- [18.4、开始整合 Spring + Mybatis](#184开始整合Spring--Mybatis)
  - [18.4.1、jdbc.properties 属性配置文件 ](#1841jdbcproperties属性配置文件-)
  - [18.4.2、Mybatis 核心配置文件](#1842Mybatis核心配置文件)
  - [18.4.3、applicationContext.xml 配置文件：](#1843applicationContextxml配置文件)
  - [18.4.4、测试 Mybatis 和 Spring 整合成功 ](#1844测试Mybatis和Spring整合成功--)
- [18.5、Spring 添加事务管理](#185Spring添加事务管理)
  - [18.5.1、编写 BookService](#1851编写BookService)
  - [18.5.2、BookServiceImpl 实现类：](#1852BookServiceImpl实现类)
  - [18.5.3、在 applicationContext.xml 配置文件中添加事务管理：](#1853在applicationContextxml配置文件中添加事务管理)
  - [18.5.4、BookService 的测试：](#1854BookService的测试)
- [18.6、开始整合 Spring+SpringMVC 框架](#186开始整合SpringSpringMVC框架)
  - [18.6.1、创建 springmvc 的配置文件 SpringMVC.xml 配置文件，内容如下：](#1861创建springmvc的配置文件SpringMVCxml配置文件内容如下)
  - [18.6.2、修改 applicationContext.xml 中包扫描的配置：](#1862修改applicationContextxml中包扫描的配置)
  - [18.6.3、在 web.xml 中添加如下配置：](#1863在webxml中添加如下配置)
  - [18.6.4、编写 BookController 测试三大框架整合是否成功](#1864编写BookController测试三大框架整合是否成功)

1:Spring 如何整合第三方类库

2:复习 Spring+SpringMVC 整合===Root WebApplicationContext

1. 先使用 mybatis 逆向工程生成 mybatis 代码
2. 整合 Spring+Mybatis
3. 使用 Spring 给 service 方法添加事务
4. 拷贝 SpringMVC 的 jar 包
5. 添加 SpringMVC 的配置 springmvc.xml
6. 整合 Spring 到 web 中

## 18.1、测试数据库

```sql
CREATE DATABASE IF NOT EXISTS ssm DEFAULT CHARSET utf8;
use ssm;
##创建图书表
create table t_book(
      `id` int(11) primary key auto_increment,   ## 主键
      `name` varchar(50) not null,        ## 书名
      `author` varchar(50) not null,        ## 作者
      `price` decimal(11,2) not null,        ## 价格
      `sales` int(11) not null,          ## 销量
      `stock` int(11)                ## 库存
);
## 插入初始化测试数据
insert into t_book(`id` , `name` , `author` , `price` , `sales` , `stock`)
values(null , 'java从入门到放弃' , '国哥' , 80 , 9999 , 9 );
insert into t_book(`id` , `name` , `author` , `price` , `sales` , `stock`)
values(null , '数据结构与算法' , '严敏君' , 78.5 , 6 , 13 );
insert into t_book(`id` , `name` , `author` , `price` , `sales` , `stock`)
values(null , '怎样拐跑别人的媳妇' , '龙伍' , 68, 99999 , 52 );
insert into t_book(`id` , `name` , `author` , `price` , `sales` , `stock`)
values(null , '木虚肉盖饭' , '小胖' , 16, 1000 , 50 );
insert into t_book(`id` , `name` , `author` , `price` , `sales` , `stock`)
values(null , 'C++编程思想' , '刚哥' , 45.5 , 14 , 95 );
insert into t_book(`id` , `name` , `author` , `price` , `sales` , `stock`)
values(null , '蛋炒饭' , '周星星' , 9.9, 12 , 53 );
insert into t_book(`id` , `name` , `author` , `price` , `sales` , `stock`)
values(null , '赌神' , '龙伍' , 66.5, 125 , 535 );
insert into t_book(`id` , `name` , `author` , `price` , `sales` , `stock`)
values(null , 'Java编程思想' , '阳哥' , 99.5 , 47 , 36 );
insert into t_book(`id` , `name` , `author` , `price` , `sales` , `stock`)
values(null , 'JavaScript从入门到精通' , '婷姐' , 9.9 , 85 , 95 );
insert into t_book(`id` , `name` , `author` , `price` , `sales` , `stock`)
values(null , 'cocos2d-x游戏编程入门' , '国哥' , 49, 52 , 62 );
insert into t_book(`id` , `name` , `author` , `price` , `sales` , `stock`)
values(null , 'C语言程序设计' , '谭浩强' , 28 , 52 , 74 );
insert into t_book(`id` , `name` , `author` , `price` , `sales` , `stock`)
values(null , 'Lua语言程序设计' , '雷丰阳' , 51.5 , 48 , 82 );
insert into t_book(`id` , `name` , `author` , `price` , `sales` , `stock`)
values(null , '西游记' , '罗贯中' , 12, 19 , 9999 );
insert into t_book(`id` , `name` , `author` , `price` , `sales` , `stock`)
values(null , '水浒传' , '华仔' , 33.05 , 22 , 88 );
insert into t_book(`id` , `name` , `author` , `price` , `sales` , `stock`)
values(null , '操作系统原理' , '刘优' , 133.05 , 122 , 188 );
insert into t_book(`id` , `name` , `author` , `price` , `sales` , `stock`)
values(null , '数据结构 java版' , '封大神' , 173.15 , 21 , 81 );
insert into t_book(`id` , `name` , `author` , `price` , `sales` , `stock`)
values(null , 'UNIX高级环境编程' , '乐天' , 99.15 , 210 , 810 );
insert into t_book(`id` , `name` , `author` , `price` , `sales` , `stock`)
values(null , 'javaScript高级编程' , '国哥' , 69.15 , 210 , 810 );
insert into t_book(`id` , `name` , `author` , `price` , `sales` , `stock`)
values(null , '大话设计模式' , '国哥' , 89.15 , 20 , 10 );
insert into t_book(`id` , `name` , `author` , `price` , `sales` , `stock`)
values(null , '人月神话' , '刚哥' , 88.15 , 20 , 80 );
## 查看表内容
select id,name,author,price,sales,stock from t_book;
```

## 18.2、创建一个动态 Web 工程, 并 mybatis 逆向工程生成代码

根据以上的数据库表，使用 Mybatis 逆向工程生成 JavaBean 、 Mapper 接口 、 Mapper.xml 配置文件

直接生成到此 web 模块下， 并创建 jdbc.properties 属性配置文件 ， mybatis-config.xml 核心配置文件

![](image/wps23_AST9Pn6VZ5.jpg)

## 18.3、然后导入整合 Spring+SpringMVC+Mybatis 的所有 jar 包

```text
aop 切入点表达式jar包：
com.springsource.org.aspectj.weaver-1.6.8.RELEASE.jar
数据库连接池：
druid-1.1.9.jar
json的包：
jackson-annotations-2.10.3.jar
jackson-core-2.10.3.jar
jackson-databind-2.10.3.jar
原生Junit测试：
junit_4.12.jar
org.hamcrest.core_1.3.0.jar
Mybatis的包：
mybatis-3.5.1.jar
Mybatis到Spring的整合包：
mybatis-spring-2.0.4.jar
数据库驱动包：
mysql-connector-java-5.1.37-bin.jar
Spring切面包：
spring-aop-5.2.5.RELEASE.jar
spring-aspects-5.2.5.RELEASE.jar
Spring核心包：
spring-beans-5.2.5.RELEASE.jar
spring-context-5.2.5.RELEASE.jar
spring-core-5.2.5.RELEASE.jar
spring-expression-5.2.5.RELEASE.jar
spring-jcl-5.2.5.RELEASE.jar
Spring数据库访问包：
spring-jdbc-5.2.5.RELEASE.jar
spring-orm-5.2.5.RELEASE.jar
spring-tx-5.2.5.RELEASE.jar
Spring测试包：
spring-test-5.2.5.RELEASE.jar
SpringMVC需要的包：
spring-web-5.2.5.RELEASE.jar
spring-webmvc-5.2.5.RELEASE.jar
```

## 18.4、开始整合 Spring + Mybatis

### 18.4.1、jdbc.properties 属性配置文件&#x20;

```text
jdbc.user=root
jdbc.password=root
jdbc.url=jdbc:mysql://localhost:3306/ssm?characterEncoding=UTF-8
jdbc.driver=com.mysql.jdbc.Driver
jdbc.initialSize=5
jdbc.maxActive=10
```

### 18.4.2、Mybatis 核心配置文件

mybatis-config.xml 配置文件：

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <settings>
        <!-- 打开延迟加载的开关 -->
        <setting name="lazyLoadingEnabled" value="true" />
        <!-- 将积极加载改为消极加载 按需加载 -->
        <setting name="aggressiveLazyLoading" value="false" />
    </settings>
</configuration>
```

### 18.4.3、applicationContext.xml 配置文件：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mybatis="http://mybatis.org/schema/mybatis-spring"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd http://mybatis.org/schema/mybatis-spring http://mybatis.org/schema/mybatis-spring.xsd">
    <!-- 注解扫描 -->
    <context:component-scan base-package="com.atguigu"></context:component-scan>
    <!-- 外置配置文件 -->
    <context:property-placeholder location="classpath:jdbc.properties"></context:property-placeholder>
    <!--数据源-->
    <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
        <property name="username" value="${jdbc.user}"/>
        <property name="password" value="${jdbc.password}"/>
        <property name="url" value="${jdbc.url}"/>
        <property name="driverClassName" value="${jdbc.driver}"/>
        <property name="initialSize" value="${jdbc.initialSize}"/>
        <property name="maxActive" value="${jdbc.maxActive}"/>
    </bean>
    <!--开始整合Spring+Mybatis-->
    <bean id="sessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
        <!--使用Spring中的数据库连接池-->
        <property name="dataSource" ref="dataSource"/>
        <!--配置Mybatis的核心配置文件-->
        <property name="configLocation" value="classpath:mybatis-config.xml"/>
        <!--配置加载Mapper.xml配置文件-->
        <property name="mapperLocations" value="classpath:com/atguigu/mapper/*.xml"/>
    </bean>
    <!-- 是把Mybatis中的Mapper接口都扫描到Spring容器中,创建代理对象放入ioc容器中 -->
    <mybatis:scan base-package="com.atguigu.mapper"/>

</beans>
```

### 18.4.4、测试 Mybatis 和 Spring 整合成功 &#x20;

只要能成功注入 BookMapper 说明 Mybatis 中的 Mapper 接口已经注入到 Spring 容器中了。说明整合成功！！！

```java
package com.atguigu.test;
import com.atguigu.mapper.BookMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import javax.sql.DataSource;
import java.sql.SQLException;
@ContextConfiguration(locations = "classpath:applicationContext.xml")
@RunWith(SpringJUnit4ClassRunner.class)
public class SpringTest {
  @Autowired
  DataSource dataSource;
  @Autowired
  BookMapper bookMapper;
  @Test
  public void test1() throws SQLException {
    System.out.println(dataSource.getConnection());
    System.out.println( bookMapper );
  }
}
```

## 18.5、Spring 添加事务管理

### 18.5.1、编写 BookService

```java
public interface BookService {
    void saveBook(Book book);
    void updateBook(Book book);
    void deleteBookById(Integer id);
    Book queryBookById(Integer id);
    List<Book> queryBooks();
}
```

### 18.5.2、BookServiceImpl 实现类：

```java
@Service
public class BookServiceImpl implements BookService {
    @Autowired
    BookMapper bookMapper;
    @Override
    public void saveBook(Book book) {
        bookMapper.insertSelective(book);
        // 只是为了测试使用 测试完了之后。记得删除掉下面两行
        int i = 12 / 0;
        bookMapper.insertSelective(book);
    }
    @Override
    public void updateBook(Book book) {
        bookMapper.updateByPrimaryKeySelective(book);
    }
    @Override
    public void deleteBookById(Integer id) {
        bookMapper.deleteByPrimaryKey(id);
    }
    @Override
    public Book queryBookById(Integer id) {
        return bookMapper.selectByPrimaryKey(id);
    }
    @Override
    public List<Book> queryBooks() {
        return bookMapper.selectByExample(null);
    }
}
```

### 18.5.3、在 applicationContext.xml 配置文件中添加事务管理：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mybatis="http://mybatis.org/schema/mybatis-spring" xmlns:tx="http://www.springframework.org/schema/tx"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd http://mybatis.org/schema/mybatis-spring http://mybatis.org/schema/mybatis-spring.xsd http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx.xsd http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd">
    <!-- 注解扫描 -->
    <context:component-scan base-package="com.atguigu"></context:component-scan>
    <!-- 外置配置文件 -->
    <context:property-placeholder location="classpath:jdbc.properties"></context:property-placeholder>
    <!--数据源-->
    <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
        <property name="username" value="${jdbc.user}"/>
        <property name="password" value="${jdbc.password}"/>
        <property name="url" value="${jdbc.url}"/>
        <property name="driverClassName" value="${jdbc.driver}"/>
        <property name="initialSize" value="${jdbc.initialSize}"/>
        <property name="maxActive" value="${jdbc.maxActive}"/>
    </bean>
    <!--开始整合Spring+Mybatis-->
    <bean id="sessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
        <!--使用Spring中的数据库连接池-->
        <property name="dataSource" ref="dataSource"/>
        <!--配置Mybatis的核心配置文件-->
        <property name="configLocation" value="classpath:mybatis-config.xml"/>
        <!--配置加载Mapper.xml配置文件-->
        <property name="mapperLocations" value="classpath:com/atguigu/mapper/*.xml"/>
    </bean>
    <!-- 是把Mybatis中的Mapper接口都扫描到Spring容器中 -->
    <mybatis:scan base-package="com.atguigu.mapper"/>
    <!--配置事务管理器:TransactionManager接口===>>platformTransactionManager-->
    <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="dataSource"/>
    </bean>
    <!--事务属性:指定某些方法对事务控制-->
    <tx:advice id="tx_advice" transaction-manager="transactionManager">
        <tx:attributes>
            <tx:method name="save*" propagation="REQUIRED"/>
            <tx:method name="delete*" propagation="REQUIRED"/>
            <tx:method name="update*" propagation="REQUIRED"/>
            <tx:method name="insert*" propagation="REQUIRED"/>
            <tx:method name="*" read-only="true"/>
        </tx:attributes>
    </tx:advice>
    <!--切面-->
    <aop:config>
        <aop:pointcut id="txPoint" expression="execution(* com.atguigu.service.impl.*.*(..))"/>
        <aop:advisor advice-ref="tx_advice" pointcut-ref="txPoint"></aop:advisor>
    </aop:config>
</beans>
```

### 18.5.4、BookService 的测试：

```java
@ContextConfiguration(locations = "classpath:applicationContext.xml")
@RunWith(SpringJUnit4ClassRunner.class)
public class BookServiceTest {
    @Autowired
    BookService bookService;
    @Test
    public void saveBook() {
        bookService.saveBook(new Book(null, "扫噶",
                                      "xx", new BigDecimal(1000), 10000, 10000));
    }
    @Test
    public void updateBook() {
        bookService.updateBook(new Book(21, "嘻嘻",
                                        "xx", new BigDecimal(1000), 10000, 10000));
    }
    @Test
    public void deleteBookById() {
        bookService.deleteBookById(21);
    }
    @Test
    public void queryBookById() {
        Book book = bookService.queryBookById(1);
        System.out.println(book);
    }
    @Test
    public void queryBooks() {
        for (Book queryBook : bookService.queryBooks()) {
            System.out.println(queryBook);
        }
    }
}
```

## 18.6、开始整合 Spring+SpringMVC 框架

### 18.6.1、创建 springmvc 的配置文件 SpringMVC.xml 配置文件，内容如下：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:content="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd http://www.springframework.org/schema/mvc http://www.springframework.org/schema/mvc/spring-mvc.xsd">
    <!--包扫描-->
    <content:component-scan base-package="com" use-default-filters="false">
        <content:include-filter type="annotation" expression="org.springframework.stereotype.Controller"/>
        <content:include-filter type="annotation" expression="org.springframework.web.bind.annotation.ControllerAdvice"/>
         <context:include-filter type="annotation" expression="org.springframework.web.bind.annotation.RestController"/>
    </content:component-scan>
    <!--加载配置文件-->
    <mvc:default-servlet-handler/>
    <!--注解驱动-->
    <mvc:annotation-driven/>
</beans>
```

### 18.6.2、修改 applicationContext.xml 中包扫描的配置：

```xml
<!-- 注解扫描 -->
<context:component-scan base-package="com.atguigu">
    <context:exclude-filter type="annotation" expression="org.springframework.web.bind.annotation.ControllerAdvice"/>
    <context:exclude-filter type="annotation" expression="org.springframework.stereotype.Controller"/>
     <context:exclude-filter type="annotation" expression="org.springframework.web.bind.annotation.RestController"/>
</context:component-scan>
```

### 18.6.3、在 web.xml 中添加如下配置：

web.xml 中的配置：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
    <filter>
        <filter-name>characterEncodingFilter</filter-name>
        <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
        <init-param>
            <param-name>encoding</param-name>
            <param-value>UTF-8</param-value>
        </init-param>
        <init-param>
            <param-name>forceRequestEncoding</param-name>
            <param-value>true</param-value>
        </init-param>
        <init-param>
            <param-name>forceResponseEncoding</param-name>
            <param-value>true</param-value>
        </init-param>
    </filter>
    <filter-mapping>
        <filter-name>characterEncodingFilter</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>
    <filter>
        <filter-name>methodFilter</filter-name>
        <filter-class>org.springframework.web.filter.HiddenHttpMethodFilter</filter-class>
    </filter>
    <filter-mapping>
        <filter-name>methodFilter</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>
    <!--加载spring配置文件-->
    <context-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>classpath:applicationContext.xml</param-value>
    </context-param>
    <!--监听器-->
    <listener>
        <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
    </listener>
    <!--前端控制器-->
    <servlet>
        <servlet-name>dispatcherServlet</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:SpringMVC.xml</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>
    <servlet-mapping>
        <servlet-name>dispatcherServlet</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>
</web-app>
```

### 18.6.4、编写 BookController 测试三大框架整合是否成功

```java
@RequestMapping(value = "/book")
@Controller
public class BookController {
    @Autowired
    BookService bookService;
    @RequestMapping("/save")
    public String save(){
        bookService.saveBook(new Book(null,"\**国哥\**,\**拉出去糟蹋了\**",
                                      "SZ\**王灿侨\**", new BigDecimal(1000), 10000,10000));
        return "redirect:/index.jsp";
    }
}
```
