# Spring的数据访问

## 目录

- [Spring数据访问工程环境搭建](#Spring数据访问工程环境搭建)
- [Spring之JdbcTemplate使用](#Spring之JdbcTemplate使用)
- [实验2：将id=5的记录的salary字段更新为1300.00](#实验2将id5的记录的salary字段更新为130000)
- [实验3：批量插入](#实验3批量插入)
- [实验4：查询id=5的数据库记录，封装为一个Java对象返回](#实验4查询id5的数据库记录封装为一个Java对象返回)
- [实验5：查询salary>4000的数据库记录，封装为List集合返回](#实验5查询salary4000的数据库记录封装为List集合返回)
- [实验6：查询最大salary](#实验6查询最大salary)
- [实验7：使用带有具名参数的SQL语句插入一条员工记录，并以Map形式传入参数值](#实验7使用带有具名参数的SQL语句插入一条员工记录并以Map形式传入参数值)
- [实验8：重复实验7，以SqlParameterSource形式传入参数值](#实验8重复实验7以SqlParameterSource形式传入参数值)
- [实验9：创建Dao，自动装配JdbcTemplate对象](#实验9创建Dao自动装配JdbcTemplate对象)
- [实验10：通过继承JdbcDaoSupport创建JdbcTemplate的Dao](#实验10通过继承JdbcDaoSupport创建JdbcTemplate的Dao)
- [注解形式配置bean](#注解形式配置bean)

### Spring数据访问工程环境搭建

[spring-tx-5.2.5.RELEASE.jar](file/spring-tx-5.2.5.RELEASE_11PmEi8GyW.jar " spring-tx-5.2.5.RELEASE.jar")

[spring-jdbc-5.2.5.RELEASE.jar](file/spring-jdbc-5.2.5.RELEASE_xppAjfyyTh.jar " spring-jdbc-5.2.5.RELEASE.jar")

[spring-orm-5.2.5.RELEASE.jar](file/spring-orm-5.2.5.RELEASE_9Vjj9YYYgj.jar " spring-orm-5.2.5.RELEASE.jar")

### Spring之JdbcTemplate使用

在Spring中提供了对jdbc的封装类叫JdbcTemplate。

它可以很方便的帮我们执行sql语句，操作数据库。

先准备单表的数据库数据

```sql
CREATE DATABASE IF NOT EXISTS jdbctemplate DEFAULT CHARSET utf8;
use jdbctemplate;
CREATE TABLE `employee` (
`id` int(11) primary key AUTO_INCREMENT,
`name` varchar(100) DEFAULT NULL,
`salary` decimal(11,2) DEFAULT NULL
);
insert into `employee`(`id`,`name`,`salary`) 
values (1,'李三',5000.23),(2,'李四',4234.77),(3,'王五',9034.51),
(4,'赵六',8054.33),(5,'孔七',6039.11),(6,'曹八',7714.11);
select * from employee;
```


jdbc.properties

```sql
user=root
password=root
url=jdbc:mysql://localhost:3306/jdbctemplate?characterEncoding=UTF-8
driverClassName=com.mysql.jdbc.Driver
initialSize=5
maxActive=10
```


JdbcTemplate的使用需要在applicationContext.xml中进行配置

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">
    <!-- 加载配置文件 -->
    <context:property-placeholder location="classpath:jdbc.properties"/>
    <!-- 扫描注解 -->
    <context:component-scan base-package="com.atguigu"/>
    <!-- 连接池 -->
    <bean class="com.alibaba.druid.pool.DruidDataSource" id="dataSource">
        <property name="username" value="${user}"/>
        <property name="password" value="${password}"/>
        <property name="url" value="${url}"/>
        <property name="driverClassName" value="${driverClassName}"/>
        <property name="initialSize" value="${initialSize}"/>
        <property name="maxActive" value="${maxActive}"/>
    </bean>
    <!-- 配置Spring提供的JdbcTemplate工具类执行sql语句 -->
    <bean class="org.springframework.jdbc.core.JdbcTemplate" id="jdbcTemplate">
        <property name="dataSource" ref="dataSource" />
    </bean>
</beans>
```


### 实验2：将id=5的记录的salary字段更新为1300.00

```java
@Test
public void test2() {
    String sql = "update employee set salary = ? where id = ?";
    int update = jdbcTemplate.update(sql, new BigDecimal(1300), 5);
    System.err.println(update);
}
```


### 实验3：批量插入

```java
@Test
public void test3() {
    //一个sql语句的,它的参数是一维数组
    String sql = "insert into employee(`name`,`salary`) values(?,?)";
    /**
         * batchUpdate批量的执行insert,update,delete语句 <br/>
         *  第一个参数是 sql 语句 <br/>
         *  第二个参数是 所有sql语句的占位符的值<br/>
         */
    List<Object[]> batchArgs = new ArrayList<>();//有几个一维数组,就插入几条记录
    batchArgs.add(new Object[]{"111111",new BigDecimal(10000)});
    batchArgs.add(new Object[]{"222222",new BigDecimal(20000)});
    batchArgs.add(new Object[]{"333333",new BigDecimal(30000)});
    batchArgs.add(new Object[]{"444444",new BigDecimal(40000)});
    int[] result = jdbcTemplate.batchUpdate(sql, batchArgs);
    System.err.println(result);
}
```


### 实验4：查询id=5的数据库记录，封装为一个Java对象返回

```java
public class Employee {
    private  Integer id;
    private String name;
    private BigDecimal salary;
}
```


```java
@Test
    public void test3() {
        String sql = "select `id`,`name`,`salary` from employee where id = ?";
        /**
         *  查询使用queryForObject()方法查询返回一条记录 <br/>
         *  第一个参数是sql语句<br/>
         *  第二个参数是 RowMapper接口,负责把查询结果集中每一行记录转换为JavaBean对象<br/>
         *  第三个参数是占位符的值<br/>
         *  注意:如果没查询到数据抛异常
         *  BeanPropertyRowMapper它负责将结果集中的列和属性做对应操作(将一行记录转换为JavaBean)
         */
        Employee employee = jdbcTemplate.queryForObject(sql,
                new BeanPropertyRowMapper<Employee>(Employee.class), 25);
        System.err.println(employee);
    }
```


### 实验5：查询salary>4000的数据库记录，封装为List集合返回

```java
@Test
public void test4() {
    String sql = "select `id`,`name`,`salary` from employee where salary > ?";
    List<Employee> employeeList = jdbcTemplate.query(sql,
                                                     new BeanPropertyRowMapper<Employee>(Employee.class), new BigDecimal(4000));
    employeeList.forEach(employee -> {
        System.err.println(employee);
    });
}
```


JdbcTemplate小结 :

- JdbcTemplate.update() 执行insert,delete,update的sql语句\<br/>
- JdbcTemplate.queryForObject() 查询返回一行数据的方法\<br/>
- JdbcTemplate.query() 查询多行数据\<br/>
- JdbcTemplate中是使用BeanPropertyRowMapper将每笔记录转换为JavaBean\<br/>

### 实验6：查询最大salary

```java
@Test
public void test5() {
    String sql = "select max(salary) from employee";
    BigDecimal max = jdbcTemplate.queryForObject(sql, BigDecimal.class);
    System.out.println(max);
}
```


### 实验7：使用带有具名参数的SQL语句插入一条员工记录，并以Map形式传入参数值

配置内容

```xml
<!-- 配置可执行具名参数sql的工具类 -->
<bean class="org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate">
    <constructor-arg index="0" ref="dataSource" />
</bean>
```


测试代码:

```java
@Autowired
NamedParameterJdbcTemplate namedParameterJdbcTemplate;
@Test
public void test6(){
    // 具名参数的SQL
    String sql ="insert into employee(`name`,`salary`) values( :name , :salary )";
    Map<String,Object> paramMap = new HashMap<>();
    // map的key要和参数名相同
    paramMap.put("name","具名参数");
    paramMap.put("salary",new BigDecimal("9.9"));
    int update = namedParameterJdbcTemplate.update(sql, paramMap);
    System.err.println(update);
}
```


### 实验8：重复实验7，以SqlParameterSource形式传入参数值

```java
@Test
public void test8() {
    /**
         *  具名参数sql中的占位符格式如下 ==>> :参数名
         */
    String sql = "insert into employee(`name`,`salary`) values( :name , :salary )";// 具名参数的SQL
    Employee employee = new Employee(null, "SqlParameterSource", new BigDecimal(10));
    /**
         * BeanPropertySqlParameterSource
         */
    int update = namedParameterJdbcTemplate.update(sql, new BeanPropertySqlParameterSource(employee));
    System.err.println(update);
}
```


### 实验9：创建Dao，自动装配JdbcTemplate对象

```java
@Repository
public class EmployeeDao {
    @Autowired
    JdbcTemplate jdbcTemplate;
    public Employee selectEmployeeById(Integer id){
        String sql = "select `id`,`name`,`salary` from employee where id = ?";
        return jdbcTemplate.queryForObject(sql,new BeanPropertyRowMapper<Employee>(Employee.class),id);
    }
}
```


测试代码:

```java
@Autowired
EmployeeDao employeeDao;
//   实验9：创建Dao，自动装配JdbcTemplate对象
@Test
public void test9() {
    System.err.println(employeeDao.selectEmployeeById(1));
}
```


### 实验10：通过继承JdbcDaoSupport创建JdbcTemplate的Dao

```java
@Repository
public class EmployeeDao  extends JdbcDaoSupport {
    @Autowired
    public void setJdbcTemplate(DataSource dataSource){
        setDataSource(dataSource);
    }
    public Employee selectEmployeeById(Integer id){
        String sql = "select `id`,`name`,`salary` from employee where id = ?";
        return getJdbcTemplate().queryForObject(sql,new BeanPropertyRowMapper<Employee>(Employee.class),id);
    }
}
```


## 注解形式配置bean

```java
@ContextConfiguration
@ComponentScan(basePackages = {"com.atguigu"})
@PropertySource(value = {"classpath:jdbc.properties"}) //加载外置配置文件 
public class SpringConfig {
    //@Value:读取配置文件的key,得到value并给变量赋值
    @Value("${user}")
    private String username;
    @Value("${password}")
    private String password;
    @Value("${url}")
    private String url;
    @Value("${driverClassName}")
    private String driverClassName;
    @Value("${initialSize}")
    private Integer initialSize;
    @Value("${maxActive}")
    private Integer maxActive;
    //配置连接池
    @Bean
    public DataSource dataSource() {
        DruidDataSource dataSource = new DruidDataSource();
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        dataSource.setUrl(url);
        dataSource.setDriverClassName(driverClassName);
        dataSource.setInitialSize(initialSize);
        dataSource.setMaxActive(maxActive);
        return dataSource;
    }
    @Bean
    public JdbcTemplate jdbcTemplate(DataSource dataSource) {
        JdbcTemplate jdbcTemplate = new JdbcTemplate();
        jdbcTemplate.setDataSource(dataSource);
        return jdbcTemplate;
    }
    @Bean
    public NamedParameterJdbcTemplate namedParameterJdbcTemplate(DataSource dataSource) {
        return new NamedParameterJdbcTemplate(dataSource);
    }
}
```
