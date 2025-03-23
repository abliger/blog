# springboot配置文件

## 目录

- [yml语法](#yml语法)
- [springboot的配置学习如下：](#springboot的配置学习如下)
  - [spring.profiles.active=xxx ](#springprofilesactivexxx-)
  - [spring.datasource](#springdatasource)
  - [mybatis整合](#mybatis整合)
  - [SpringBoot](#SpringBoot)
- [Springboot-redis整合](#Springboot-redis整合)
  - [Springboot-thymeleaf整合](#Springboot-thymeleaf整合)
  - [SpringBoot注解的使用](#SpringBoot注解的使用)
    - [整合mybaitis](#整合mybaitis)
    - [声明事务](#声明事务)
    - [Springboot-web组件整合](#Springboot-web组件整合)

***

springboot是一个约定大于配置，配置大于编码思想开发的框架，我们通常使用application.properties对整个springboot项目（模块）进行全局配置，其外springboot提供了yml格式的配置文件，application.yml是springboot默认配置启动的配置文件。

注意：当application.yml和application.properties配置冲突，只会采用application.properties的配置

#### yml语法

属性和子属性之间换行后使用空格表示层级关系，推荐使用两个空格,所有的属性使用的空格数量必须一致

属性和属性之间需要一个: ， 属性和属性值之间也需要一个冒号，冒号后必须添加一个空格

属性会自动进行分组

一般情况下，配置的属性值可以直接写，但是如果需要描述特殊的字符串时需要使用引号

yml中可以用的数据类型可以有数字、字符串、对象、集合

如果properties和yml配置文件中有相同配置默认使用properties的，如果有不一样的配置都会起作用

### springboot的配置学习如下：

#### spring.profiles.active=xxx&#x20;

表示xxx.yml文件配置启用（此时application.yml不起作用），主要用于项目的开发、测试、发布等环境不同时方便改动

```yaml
server:
  port: 当前服务端口号
  servlet:
    context-path: 当前服务servlet上下文路径即以前再web.xml文件里配置的
```


#### spring.datasource

```yaml
spring:
  datasource:
    url: jdbc:mysql://ip:端口号/数据库名?useSSL=false&useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai
    username: 账号
    password: 密码
    driver-class-name: com.mysql.jdbc.Driver
    #type: com.alibaba.druid.pool.DruidDataSource 通常不使用，我们可以使用@SpringBootConfiguration注释的配置类里使用@Bean表示要注入到IOC容器中，使用@configurationProperties(prefig="xx.xx")表示为xx.xx的配置的方式，自己对象进行赋值
```


#### mybatis整合

```yaml
# 指定mapper接口绑定的mapper映射文件
mybatis:
  # mapper映射文件的路径
  mapper-locations: classpath:/mybatis/mapper/*.xml
  # mybatis全局配置文件的路径
  #config-location:
```


#### SpringBoot

```yaml
redis: 
  port: redis端口号
  host: redis所在服务器的ip地址 
```


使用时使用自动注入得到RedisTemplate或StringRedisTemplate

```java
@SpringBootTest
class SpringbootSsmXmlApplicationTests {
    //整合Redis之后，可以直接自动装配StringRedisTemplate或RedisTemplate模板类的对象操作redis
    //StringRedisTemplate用来操作redis中5大数据类型存储字符串值的操作
    @Autowired
    StringRedisTemplate stringRedisTemplate; //使用多
    //RedisTemplate用来操作对象序列化后存到redis中的操作
    @Autowired
    RedisTemplate<Object,Object> redisTemplate;

    @Test
    void contextLoads() {
        Set<String> keys = stringRedisTemplate.keys("*");
        System.out.println("keys = " + keys);
        Long test = redisTemplate.getExpire("test");
        // -1 代表永不过期，-2代表已过期
        System.out.println("test = " + test);
    }

    @Test
    public void testRedisTemplate(){
        TAdmin admin = new TAdmin(1, "aa", "123456", "adasd", "@12.com", "2020-1-1");
        //redis字符串类型：二进制安全，最大512m
        redisTemplate.opsForValue().set("admin:1" , admin);

        Object o = redisTemplate.opsForValue().get("admin:1");
        System.out.println("o = " + o);
    }
    
    @Test
    public void testStringRt(){
//        TAdmin admin = new TAdmin(1, "aa", "123456", "adasd", "@12.com", "2020-1-1");
//        //将一个对象存到redis中[必须将对象转为json字符串]
//        //opsForValue(): 以String类型存储数据
//        String adminStr = new Gson().toJson(admin);
//        stringRedisTemplate.opsForValue().set("admin:"+admin.getId() , adminStr , 10 , TimeUnit.HOURS);
//        //将redis中的对象读取回来
//        //获取过期时间
//        Long expire = stringRedisTemplate.getExpire("admin:" + admin.getId(), TimeUnit.MINUTES);
//
//        String adminJsonStr = stringRedisTemplate.opsForValue().get("admin:" + admin.getId());
//        //将json字符串转为java中的对象
//        TAdmin fromJson = new Gson().fromJson(adminJsonStr, TAdmin.class);
//        System.out.println("fromJson = " + fromJson);

        //删除redis中对象数据
        Boolean delete = stringRedisTemplate.delete("admin:" + 1);
        System.out.println(delete?"删除成功":"删除失败");

    }


}
```


## Springboot-redis整合

#### Springboot-thymeleaf整合

thymeleaf是一个可以对html进行局部解析的技术，比提高jsp对整个页面进行解析效率高，称之模板引擎

对于thymeleaf的整合主要是配置识图解析器

```yaml
# 如果项目引入了thymeleaf的场景启动器，由于自动配置类，springboot会自动创建thymeleaf
# 实现springmvc的视图解析器对象注入到容器中

# thymeleaf视图解析器前缀
spring.thymeleaf.prefix=classpath:/templates/
# 后缀
spring.thymeleaf.suffix=.html
# 缓存，开发关闭，生产环境启用
spring.thymeleaf.cache=false
```


模板引擎thymeleaf再html的使用：

```html
<!DOCTYPE html>
<!-- 声明本页面使用了thymeleaf的语法：不声明不会被解析  -->
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <!-- 获取requst域中中的属性
            thymeleaf的语法提供了大量的属性在标签内书写
            th:text 表示获取文本显示到所在的标签内部覆盖标签内部原有的内容
            th:属性  的表达式支持简单的运算
            th:prop  表示动态获取值设置给标签对应的属性
            th:attr   表示动态获取属性值设置给标签的自定义属性
         ${}: 获取域中的属性值
            ${username} ：获取request域中的username属性值
            ${session.admin.loginacct} : 获取session域中的admin对象的属性值
      ${application.appKey}:获取application域中的appKey属性值
    -->
    <h2>request域</h2>
    <h4 id="2" th:id="${age}" th:uname="xxx" th:text="${username}"></h4>
    <!-- 如果username1为null则_不覆盖标签内的内容，如果不为null则覆盖 -->
    <h4 th:text="${username}==null?_:${username}">游客</h4>
    <input type="text" th:value="${username}"/><br/>
    <h2>session域</h2>
    <div th:text="${session.admin.loginacct}">游客</div>
    <!-- 如果是数值型可以直接运算，如果是字符串需要用引号引起 -->
    <!-- 字符串拼接 -->
    <div th:text="'我的id是:' + (${session.admin.id}+100)"></div>
    <!-- 管道符内部thymeleaf会自动解析表达式和字符串的拼接 -->
    <div th:text="|我的id是:  ${session.admin.id} ,邮箱是: ${session.admin.email}|"></div>

    <h2>application域</h2>
    <div th:text="${application.appKey}"></div>
  <!-- 两对中括号内部可以直接使用thymeleaf的表达式 -->
    application域中的属性值：[[${application.appKey}]]
</body>
</html>
```


### SpringBoot注解的使用

#### 整合mybaitis

在主函数的类上添加`MapperScan(basePage="包名")//包名需要写道mapper接口所在包`

#### 声明事务

在主程序：application类名上添加  @EnableTransactionManagement 启用声明式事务
在需要控制事务的业务层方法或类名上使用@Transactional注解

#### Springboot-web组件整合

1. 创建web的三大组件的实现类并编写业务

   servlet类名上标注注解：@WebServlet("/映射地址")

   filter类名上标注注解：@WebFilter("/ \*")

   listener类名上标注注解：@WebListener
2. 在主程序类名上标注：@ServletComponentScan

   注解表示扫描项目中的web组件交给
