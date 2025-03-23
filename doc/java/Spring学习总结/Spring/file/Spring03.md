# Spring-03

# 8、注解功能 (重点)

## 8.1、使用注解配置 Dao、Service、Controller 组件

实验 32：通过注解分别创建 Dao、Service、Controller★

Spring 配置 bean 的常用注解有

@Component 配置 Web 层,Servcie 层,DAO 层之外的 Bean 对象.使用@Component

@Controller 配置 Web 层的组件.

@Service 配置 Service 层的组件

@Repository 配置 DAO 组件

@Scope 配置 Bean 的作用域 (单例.多例)

@PostConstruct init-method

@PreDestory destory-method

@Value("abc") 给基本类型注入

@Configuraction 表明当前是一个配置文件类

@ComponentScan(basePackages={}) 扫描其它包下的注解

@Import 导入其它配置文件类

@Bean 将当前方法返回值放入容器内,bean 的 Id 是方法名

Bean 对象:

pojo

```java
/**
 * 相当于以下的配置:<bean class="com.atguigu.pojo.Person" id="Person" />
 * @Scope:
 *  prototype:多例
 *  singleton:单例 默认
 */
@Component
@Scope("prototype")
public class Person {

}
```

dao

```java
/**
 * @Repository 注解的作用相当于: <bean class="com.atguigu.dao.PersonDao" id="PersonDao" />
 */
@Repository
public class PersonDao {

}
```

service

```java
/**
 * @Service注解的作用相当于: <bean class="com.atguigu.service.PersonService" />
 */
@Service
public class PersonService {

}
```

controller

```java
/**
 * @Controller注解的作用是: <bean class="com.atguigu.controller.PersonController" id="PersonController" />
 */
@Controller
public class PersonController {

}
```

Spring 配置文件

```xml
<!--扫描其它注解的包-->
<context:component-scan base-package="com.atguigu"/>
```

测试代码:

```java
@Test
public void test1(){
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("applicationContext.xml");
    Person Person = (Person) applicationContext.getBean("Person");
    System.err.println(Person);
}
```

## 8.2、指定扫描包时的过滤内容

实验 33：使用 context:include-filter 指定扫描包时要包含的类

实验 34：使用 context:exclude-filter 指定扫描包时不包含的类

<context:include-filter /> 设置包含的内容

注意：通常需要与 use-default-filters 属性配合使用才能够达到"仅包含某些组件“这样的效果。

即：通过将 use-default-filters 属性设置为 false，

<context:exclude-filter /> 设置排除的内容

| 类别           | 示例                          | 说明                                                                                                                 |
| -------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **annotation** | **com.atguigu.XxxAnnotation** | **过滤所有标注了 XxxAnnotation 的类。这个规则根据目标组件是否标注了指定类型的注解进行过滤**                          |
| **assignable** | **com.atguigu.BaseXxx**       | **过滤所有 BaseXxx 类的子类。这个规则根据目标组件是否是指定类型的子类的方式进行过滤。**                              |
| aspectj        | com.atguigu.\*Service+        | 所有类名是以 Service 结束的，或这样的类的子类。这个规则根据 AspectJ 表达式进行过滤。                                 |
| regex          | com\.atguigu\.anno\.\*        | 所有 com.atguigu.anno 包下的类。这个规则根据正则表达式匹配到的类名进行过滤。                                         |
| custom         | com.atguigu.XxxTypeFilter     | 使用 XxxTypeFilter 类通过编码的方式自定义过滤规则。该类必须实现 org.springframework.core.type.filter.TypeFilter 接口 |

自定义排除示例:

```xml
<!--扫描其它注解的包-->
<context:component-scan base-package="com.atguigu">
    <!--
            context:exclude-filter:排除
            type:排除类型  annotation:排除注解,并且包含子注解
            expression:排除注解
        -->
    <context:exclude-filter type="annotation" expression="org.springframework.stereotype.Repository"/>
    <!--
            assignable:类型排除
            PersonService:排除的类,包含子类
        -->
    <context:exclude-filter type="assignable" expression="com.atguigu.service.PersonService"/>

</context:component-scan>
```

自定义包含示例:

```xml
<context:component-scan base-package="com.atguigu" use-default-filters="false">
    <!-- context:include-filter标签是自定义包含(必须要和use-default-filters="false"一起组合使用)
            type属性指定使用哪种算法过滤
            expression属性指定需要的表达式
			annotation:只加载注解,包含子注解
			assignable:只加载类,包含子类
        -->
    <context:include-filter type="annotation" expression="org.springframework.stereotype.Controller"/>
    <!--  assignable算法,也会包含子类 -->
    <context:include-filter type="assignable" expression="com.atguigu.service.PersonService"/>
</context:component-scan>
```

如下图

<!-- ![img](spring02.assets\wps2.jpg) -->

注:

1. @Controller @Service 和 @Repository 都继承了 @Component

2. 自定义排除和包含,一定要先写自定义包含否则会出错

<!-- ![img](spring02.assets\wps3.jpg) -->

<!-- ![image-20200724164945442](spring02.assets\image-20200724164945442.png) -->

```xml
<context:exclude-filter type="annotation" expression="org.springframework.stereotype.Component"/>
```

## 8.3、使用注解@Autowired 自动装配

实验 35：使用@Autowired 注解实现根据类型实现自动装配 ★

@Autowired 注解 会自动的根据标注的对象类型在 Spring 容器中查找相对应的类。如果找到，就自动装配。

使用@Autowired 注解，不需要 get/set 方法

```java
@Service
public class PersonService {

    /**
     * @Autowried:将容器中bean给变量赋值
     * 1:先根据类型找注入
     * 2:如果有多个类型则根据名称注入
     */
    @Autowired
    private PersonDao personDao;

    @Override
    public String toString() {
        return "PersonService{" +
            "PersonDao=" + personDao +
            '}';
    }
}
```

## 8.4、多个同类型的 bean 如何自动装配

实验 36：如果资源类型的 bean 不止一个，默认根据@Autowired 注解标记的成员变量名作为 id 查找 bean，进行装配 ★

```java
@Repository
public class PersonDaoExt extends PersonDao {}
```

```java
@Service
public class PersonService {

   /**
    * @Autowried:将容器中bean给变量赋值
    * 1:先根据类型找注入
    * 2:如果有多个类型则根据被注入的名称与beanId一致则注入
    */
   @Autowired
   private PersonDao PersonDaoExt;

   @Override
   public String toString() {
       return "PersonService{" +
           "PersonDao=" + PersonDaoExt +
           '}';
   }
}
```

## 8.5、使用@Qualifier 装配指定 id 的 bean 对象

实验 37：如果根据成员变量名作为 id 还是找不到 bean，可以使用@Qualifier 注解明确指定目标 bean 的 id★

```java
@Service
public class PersonService {

    /**
     * @Autowried:将容器中bean给变量赋值
     * 1:先根据类型找注入
     * 2:如果有多个类型则根据被注入的名称与beanId一致则注入
     * 3:类型有多个,但是名称都不一致?
     *      @Qualifier(value = "PersonDaoExt") 当前value的值要与bean id一致,组合注解优先使用@Qualifier
     * 4:@Resource(name="bean的id")根据当前bean的id去配置== @Autowired+@Qualifier(value = "PersonDaoExt")
     */
    @Autowired
    @Qualifier(value = "personDaoExt")
    private PersonDao personDaos;

    @Override
    public String toString() {
        return "PersonService{" +
            "PersonDao=" + PersonDaos +
            '}';
    }
}
```

## 8.6、@Autowired 注解的 required 属性作用

实验 39：@Autowired 注解的 required 属性指定某个属性允许不被设置

```java
@Service
public class PersonService {

    /**
     * @Autowried:将容器中bean给变量赋值
     * 1:先根据类型找注入
     * 2:如果有多个类型则根据被注入的名称与beanId一致则注入
     * 3:类型有多个,但是名称都不一致?
     *      @Qualifier(value = "PersonDaoExt") 当前value的值要与bean id一致,组合注解优先使用@Qualifier
     * 4:@Autowired(required = false) 当找不到bean时,则注入null
     */

    @Qualifier(value = "PersonDaos")
    @Autowired(required = false)
    private PersonDao PersonDaos;

    @Override
    public String toString() {
        return "PersonService{" +
            "PersonDao=" + PersonDaos +
            '}';
    }
}
```

## 8.7、@Autowired 和@Qualifier 在方法上的使用。

实验 38：在方法的形参位置使用@Qualifier 注解

```java
@Service
public class PersonService {

    public PersonService(){
        System.err.println("无参构造");
    }

    @Qualifier(value = "PersonDaoExt")
    @Autowired(required = false)
    private PersonDao PersonDao;

    /**
     * @Autowried:将容器中bean给变量赋值
     * 1:先根据类型找注入
     * 2:如果有多个类型则根据被注入的名称与beanId一致则注入
     * 3:类型有多个,但是名称都不一致?
     *      @Qualifier(value = "PersonDaoExt") 当前value的值要与bean id一致,组合注解优先使用@Qualifier
     * 4:@Autowired(required = false) 当找不到bean时,则注入null
     * 5:@Autowired 标记在方法上,则当前方法会在构造后执行
     * 6:方法内的参数会自动去容器中找bean,自动注入
     * 7:@Qualifier("PersonDaoExt") PersonDao PersonDaos 可以指定容器内bean 的id是PersonDaoExt 进行注入
     *     @Bean修饰在方法上,那么方法的参数会自动去容器中找也会进行自动注入
     */

    @Autowired
    public void show(@Qualifier("personDaoExt") PersonDao personDaos){
        System.err.println("@Autowried");
        System.err.println(PersonDaos+"=======================");
    }
}
```

## 8.8、Spring 的专有测试

Spring 整合 junit

@ContextConfiguration

@RunWith

Spring 为了让 Junit 测试变得更佳简单,写的测试代码更少.

专门为 Junit 做了一些扩展操作.

1. 自己实现一个 Junit4 的运行器类
2. 在扩展的 Junit4 的类中,有一个 Spring 容器,不再需要我们自己去实现这个容器.
3. 使用 Spring 提供的扩展的 Junit 测试 , 还可以使用 Spring 的依赖注入功能.

```java
/**
 * Spring扩展的Junit测试里有Spring容器<br/>
 */
// @ContextConfiguration注解的作用是指定Spring容器需要的配置文件路径
@ContextConfiguration(locations = "classpath:applicationContext.xml")
// @RunWith表示使用Spring扩展的Junit测试类来测试代码
@RunWith(SpringJUnit4ClassRunner.class)
public class SpringJunitTest {

    @Autowired
    PersonService PersonService;

    @Autowired
    UserService userService;

    @Test
    public void test() {
        PersonService.saveEntity(new Person());
        System.out.println("========================");
        userService.saveEntity(new User());
    }

}
```

## 8.9 纯注解

```java
/**
 * @Configuration就表明当前类是配置文件 == applicationContext.xml
 * SpringConfig:配置文件类
 * @ComponentScan:扫描其它注解所在的包 == context:component-scan
 * @Import== <import resource="classpath:applicationContext.xml"/>导入其它配置文件
 * @Import():将其他配置文件类的class对象放入
 *
 */
@Configuration
@ComponentScan(basePackages = {"com.atguigu"})
public class SpringConfig {

    /*
        <bean id="user" class="com.atguigu.pojo.User"/>
        @Bean =  <bean id="user" class="com.atguigu.pojo.User"/>
        @Bean("bean的Id"):将当前方法的返回值放入ioc容器中,如果没有beanId,当前方法名称是bean的id
    * */
    @Bean("user1")
    public User getUser(){
        return new User();
    }

}
```

测试:

```java
@Test
public void test1(){
    ApplicationContext applicationContext = new AnnotationConfigApplicationContext(SpringConfiguraction.class);
    PersonService PersonService = (PersonService) applicationContext.getBean("PersonService");
}

spring-junit
@ContextConfiguration(classes = {SpringConfig.class})
@RunWith(SpringJUnit4ClassRunner.class)
public class SpringTest {

    @Autowired
    private UserDao userDao;

    @Resource(name = "user1")
    private User user;

    @Test
    public void test(){
        System.err.println(userDao);
        System.err.println(user);
    }

}
```

# 9、AOP 切面编程

## 9.1、什么是 AOP

AOP 是面向切面编程。全称：Aspect Oriented Programming

面向切面编程指的是：程序是运行期间，动态地将某段代码插入到原来方法代码的某些位置中。这就叫面向切面编程。

## 9.2、一个简单计算数功能加日记

<!-- ![](spring02.assets\无标题.png) -->

计算器接口

```java
public interface CalculateEmpty {
   int add(int num1, int num2);

   int add(int num1, int num2, int num3);

   int div(int num1, int num2);
}
```

日记工具类:

```java
public class LogUtils {

    public static void logBefore(String method,Object ... args){
        System.out.println(" 当前运算是 " + method + "  , 参数是: " + Arrays.asList(args));
    }

    public static void logAfterReturning(String method,Object result){
        System.out.println(" 当前运算是 " + method + "  , 结果是: " + result);
    }

    public static void logAfterThrowing(String method,Exception e){
        System.out.println(" 当前运算是 " + method + "  , 抛的异常是: " + e);
    }

}
```

计算器实现类:

```java
public class Calculator implements CalculateEmpty {

    @Override
    public int add(int num1, int num2) {
        LogUtils.logBefore("加法", num1, num2);
        int result = 0;
        try {
            result = num1 + num2;
            LogUtils.logAfterReturning("加法", result);
        } catch (Exception e) {
            LogUtils.logAfterThrowing("加法", e);
            throw new RuntimeException(e);
        }
        return result;
    }

    @Override
    public int add(int num1, int num2, int num3) {
        LogUtils.logBefore("加法", num1, num2, num3);
        int result = 0;
        try {
            result = num1 + num2 + num3;
            LogUtils.logAfterReturning("加法", result);
        } catch (Exception e) {
            LogUtils.logAfterThrowing("加法", e);
            throw new RuntimeException(e);
        }
        return result;
    }

    @Override
    public int div(int num1, int num2) {
        LogUtils.logBefore("除法", num1, num2);
        int result = 0;
        try {
            result = num1 / num2;
            LogUtils.logAfterReturning("除法", result);
        } catch (Exception e) {
            LogUtils.logAfterThrowing("除法", e);
            throw new RuntimeException(e);
        }
        return result;
    }
}
```

计算器测试:

```java
public class CalculateTest {

    @Test
    public void test1() {

        Calculate calculate = new Calculator();
        /*
         * 需求 1: 要求在运算方法(add或div)计算之前记录一下当前方法的运算和运算数 <br/>
         * 需求 2: 要求修改日记的文本内容 <br/>
         * 需要 3: 要求在方法运算之后,记录一下当前方法和运算的结果 <br/>
         * 要求 4: 要求在方法运算过程中,记录下抛出的异常和方法名<br/>
         * 要求 5: 要求当前的项目中,有很多很多个这样的类(上千个).要求这些类的每个方法都做相同的处理
         */
        int add = calculate.add(100, 100);
        System.out.println(add);
        System.out.println("============================");
        int div = calculate.div(100, 0);
        System.out.println(div);

    }

}
```

## 9.3、使用代理实现日记

### 9.3.1、使用 jdk 动态代理统一日记

```java
public class Calculator implements CalculateEmpty {

    @Override
    public int add(int num1, int num2) {
        int result = 0;
        result = num1 + num2;
        return result;
    }

    @Override
    public int add(int num1, int num2, int num3) {
        int result = 0;
        result = num1 + num2 + num3;
        return result;
    }

    @Override
    public int div(int num1, int num2) {
        int result = 0;
        result = num1 / num2;
        return result;
    }
}
```

```java
public class CalculateProxy {

    /**
     * 创建jdk动态代理实现类
     	目的:1:不修改源码的情况下对方法增强,动态修改class字节码
     	功能:2:增强:前置增强,后置增强,异常增强,返回增强
     * @return
     */
    public static Object createJdkProxyInstance(Object target){
        return Proxy.newProxyInstance(
                target.getClass().getClassLoader(),
                target.getClass().getInterfaces(),
                new InvocationHandler() {
                    @Override
                    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                        LogUtils.logBefore(method.getName(), args);
                        Object result =  null;
                        try {
                            result = method.invoke( target , args );
                            System.out.println( " method.invoke() 方法的返回值 ===>>> " + result );
                            LogUtils.logAfterReturning(method.getName(), result);
                        } catch (Exception e) {
                            LogUtils.logAfterThrowing(method.getName(), e);// 异常增强
                            throw  new RuntimeException(e);
                        }

                        return result;
                    }
                });
    }

    public static void main(String[] args) {
        // 这是目标对象,jdk的动态代理需要接口,必须要接口
        CalculateEmpty target = new Calculator();
        // 使用createJdkProxyInstance()创建jdk动态代理对象实例
        Calculate jdkProxyInstance = (Calculate) createJdkProxyInstance(target);
        // 代理对象是接口的一个实现类
        // 通过代理调用方法
        int result = jdkProxyInstance.div(100,10);
        System.out.println( "结果是: " + result );
    }
}
```

优点：这种方式已经解决我们前面所有日记需要的问题。非常的灵活(将公用的业务逻辑抽去出来进行重用)。而且可以方便的在后期进行维护和升级。

缺点：当然使用 jdk 动态代理，需要有接口。如果没有接口。就无法使用 jdk 动态代理,cglib 代理。
