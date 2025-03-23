# 例子：Spring配置管理数据库连接池对象

## 目录

- [Spring配置管理数据库连接池对象](#Spring配置管理数据库连接池对象)
- [Spring引入单独的jdbc.properties配置文件(重点)](#Spring引入单独的jdbcproperties配置文件重点)
- [使用context名称空间加载jdbc.properties配置文件](#使用context名称空间加载jdbcproperties配置文件)

[druid-1.1.9.jar](file/druid-1.1.9_INj32wp4Xb.jar " druid-1.1.9.jar")

[mysql-connector-java-5.1.7-bin.jar](file/mysql-connector-java-5.1.7-bin_GJvHCmnhli.jar " mysql-connector-java-5.1.7-bin.jar")

#### Spring配置管理数据库连接池对象

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


#### Spring引入单独的jdbc.properties配置文件(重点)

jdbc.properties属性配置文件:

```java
user=root
password=root
url=jdbc:mysql://localhost:3306/Person?characterEncoding=UTF-8
driverClassName=com.mysql.jdbc.Driver
initialSize=5
maxActive=10
```


Spring配置文件:

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


#### 使用context名称空间加载jdbc.properties配置文件

jdbc.properteis属性配置文件:

```xml
user=root
password=root
url=jdbc:mysql://localhost:3306/Person?characterEncoding=UTF-8
driverClassName=com.mysql.jdbc.Driver
initialSize=5
maxActive=10
```


spring配置文件:

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
