# Spring-02

# 6、Spring 管理数据库连接池(重点)

## 6.1、Spring 配置管理数据库连接池对象(重点)

<!-- ![img](spring02.assets\wps1.jpg) -->

配置文件信息:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd">
     <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
        <property name="driverClassName" value="com.mysql.jdbc.Driver"/>
        <property name="url" value="jdbc:mysql://localhost:3306/Person?characterEncoding=UTF-8"/>
        <property name="username" value="root"/>
        <property name="password" value="root"/>
        <property name="initialSize" value="10"/>
        <property name="maxActive" value="10"/>
    </bean>

</beans>
```

测试代码:

```java
@Test
public void test1() throws SQLException {
    ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
    DruidDataSource dataSource = context.getBean("dataSource", DruidDataSource.class);
    System.err.println(dataSource.getConnection());
}
```

## 6.2、Spring 引入单独的 jdbc.properties 配置文件(重点)

jdbc.properties 属性配置文件:

```properties
user=root
password=root
url=jdbc:mysql://localhost:3306/Person?characterEncoding=UTF-8
driverClassName=com.mysql.jdbc.Driver
initialSize=5
maxActive=10
```

Spring 配置文件:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!--
        加载指定的配置文件读取到spring的配置文件中
     -->
    <bean class="org.springframework.beans.factory.config.PropertyPlaceholderConfigurer">
        <!--
            location:加载文件
            classpath*:jdbc.properties:类路径下jdbc.properties文件
        -->
        <property name="location" value="classpath:jdbc.properties"/>
    </bean>

    <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
        <property name="driverClassName" value="${driverClassName}"/>
        <property name="url" value="${url}"/>
        <property name="username" value="${user}"/>
        <property name="password" value="${password}"/>
        <property name="initialSize" value="${initialSize}"/>
        <property name="maxActive" value="${maxActive}"/>
    </bean>
</beans>
```

测试代码:

```java
@Test
public void test1() throws SQLException {
    ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
    DruidDataSource dataSource = context.getBean("dataSource", DruidDataSource.class);
    System.err.println(dataSource.getConnection());
}
```

## 6.3、使用 context 名称空间加载 jdbc.properties 配置文件(重点)

jdbc.properteis 属性配置文件:

```properties
user=root
password=root
url=jdbc:mysql://localhost:3306/Person?characterEncoding=UTF-8
driverClassName=com.mysql.jdbc.Driver
initialSize=5
maxActive=10
```

spring 配置文件:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">

    <!--
        加载指定的配置文件读取到spring的配置文件中
     -->
    <context:property-placeholder location="classpath:jdbc.properties"/>

    <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
        <property name="driverClassName" value="${driverClassName}"/>
        <property name="url" value="${url}"/>
        <property name="username" value="${user}"/>
        <property name="password" value="${password}"/>
        <property name="initialSize" value="${initialSize}"/>
        <property name="maxActive" value="${maxActive}"/>
    </bean>
</beans>
```

测试代码:

```java
@Test
public void test1() throws SQLException {
    ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
    DruidDataSource dataSource = context.getBean("dataSource", DruidDataSource.class);
    System.err.println(dataSource.getConnection());
}
```

# 7、Spring EL 表达式（了解内容）

Spring Expression Language，Spring 表达式语言，简称 SpEL。支持运行时查询并可以操作对象图。

和 JSP 页面上的 EL 表达式,SpEL 根据 JavaBean 风格的 getXxx()、setXxx()方法定义的属性访问对象图，完全符合我们熟悉的操作习惯。

## 1.2、基本语法

SpEL 使用**#{…}**作为定界符，所有在大框号中的字符都将被认为是 SpEL 表达式。

## 1.3、使用字面量

● 整数：<property name="count" value="#{5}"/>

● 小数：<property name="frequency" value="#{89.7}"/>

● 科学计数法：<property name="capacity" value="#{1e4}"/>

●String 类型的字面量可以使用单引号或者双引号作为字符串的定界符号

<property name="name" value="#{'Chuck'}"/>

<property name='name' value='#{"Chuck"}'/>

●Boolean：<property name="enabled" value="#{false}"/>

## 1.4、引用其他 bean

```xml
<bean id="emp04" class="com.atguigu.parent.bean.Employee">
	<property name="empId" value="1003"/>
	<property name="empName" value="Kate"/>
	<property name="age" value="21"/>
	<property name="dept" value="#{dept}"/>
</bean>
```

## 1.5、引用其他 bean 的属性值作为自己某个属性的值

```xml
<bean id="emp05" class="com.atguigu.parent.bean.Employee">
	<property name="empId" value="1003"/>
	<property name="empName" value="Kate"/>
	<property name="age" value="21"/>
	<property name="deptName" value="#{dept.deptName}"/>
</bean>
```

## 1.6、调用非静态方法

```xml
<!-- 创建一个对象，在SpEL表达式中调用这个对象的方法 -->
<bean id="salaryGenerator" class="com.atguigu.spel.bean.SalaryGenerator"/>

<bean id="employee" class="com.atguigu.spel.bean.Employee">
	<!-- 通过对象方法的返回值为属性赋值 -->
	<property name="salayOfYear" value="#{salaryGenerator.getSalaryOfYear(5000)}"/>
</bean>
```

## 1.7、调用静态方法

```xml
<bean id="employee" class="com.atguigu.spel.bean.Employee">
	<!-- 在SpEL表达式中调用类的静态方法 -->
	<property name="circle" value="#{T(java.lang.Math).PI*20}"/>
</bean>
```

## 1.8、运算符

① 算术运算符：+、-、\*、/、%、^

② 字符串连接：+

③ 比较运算符：<、>、==、<=、>=、lt、gt、eq、le、ge

④ 逻辑运算符：and, or, not, |

⑤ 三目运算符：判断条件?判断结果为 true 时的取值:判断结果为 false 时的取值

⑥ 正则表达式：matches

## 使用实例:

创建 java 实体 Bean 对象

```java
public class Person {
    private int id;
    private String name;
    private String phone;
    private double salary;
    private Car car;
}

public class Car {
    private String name;
    private String carNo;

    public String noStaticFun(){
        return "非静态方法";
    }

    public static String staticFun(){
        return "静态方法";
    }
}
```

实验 26：`[SpEL 测试 I]` 在 SpEL 中使用字面量

使用格式：`#{数值} #{"字符串” || ‘字符串’}`

```xml
<bean id="person" class="com.atguigu.pojo.Person">
    <property name="id" value="#{100}"/>
    <property name="name" value="#{'小明'}"/>
</bean>
```

实验 27：`[SpEL 测试 II]` 在 SpEL 中引用其他 bean

使用格式：`#{bean 的 id}`

```xml
<bean id="person" class="com.atguigu.pojo.Person">
    <property name="car" value="#{car}"/>
</bean>
```
