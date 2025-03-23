# Spring EL 表达式

## 目录

- [1.2、基本语法](#12基本语法)
- [1.3、使用字面量](#13使用字面量)
- [1.4、引用其他 bean](#14引用其他bean)
- [1.5、引用其他 bean 的属性值作为自己某个属性的值](#15引用其他bean的属性值作为自己某个属性的值)
- [1.6、调用非静态方法](#16调用非静态方法)
- [1.7、调用静态方法](#17调用静态方法)
- [1.8、运算符](#18运算符)
- [使用实例:](#使用实例)

Spring Expression Language，Spring 表达式语言，简称 SpEL。支持运行时查询并可以操作对象图。

和 JSP 页面上的 EL 表达式,SpEL 根据 JavaBean 风格的**getXxx()、setXxx()方法定义的属性访问对象图**，完全符合我们熟悉的操作习惯。**必须有 set 和 get 方法**

## 1.2、基本语法

SpEL 使用#{…}作为定界符，所有在大框号中的字符都将被认为是 SpEL 表达式。

## 1.3、使用字面量

● 整数：\<property name="count" value="#{5}"/>

● 小数：\<property name="frequency" value="#{89.7}"/>

● 科学计数法：\<property name="capacity" value="#{1e4}"/>

●String 类型的字面量可以使用单引号或者双引号作为字符串的定界符号

\<property name="name" value="#{'Chuck'}"/>

\<property name='name' value='#{"Chuck"}'/>

●Boolean：\<property name="enabled" value="#{false}"/>

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

① 算术运算符：+、-、 \*、/、%、^

② 字符串连接：+

③ 比较运算符：<、>、==、<=、>=、lt、gt、eq、le、ge

④ 逻辑运算符：and, or, not, |

⑤ 三目运算符：判断条件?判断结果为 true 时的取值:判断结果为 false 时的取值

⑥ 正则表达式：matches

---

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
//省略get/set
```

\[SpEL 测试 I]在 SpEL 中使用字面量

使用格式：#{数值} #{"字符串“ || '字符串'}

```xml
<bean id="person" class="com.atguigu.pojo.Person">
    <property name="id" value="#{100}"/>
    <property name="name" value="#{'小明'}"/>
</bean>
```

\[SpEL 测试 II]在 SpEL 中引用其他 bean

使用格式：#{bean 的 id}

```xml
<bean id="person" class="com.atguigu.pojo.Person">
    <property name="car" value="#{car}"/>
</bean>
```

\[SpEL 测试 III]在 SpEL 中引用其他 bean 的某个属性值

使用格式： #{bean.属性名}

```xml
<bean id="person" class="com.atguigu.pojo.Person">
    <property name="phone" value="#{car.carNo}"/>
</bean>
```

\[SpEL 测试 IV]在 SpEL 中调用非静态方法

使用格式： #{bean.方法名(参数)}

```xml
<bean id="person" class="com.atguigu.pojo.Person">
   <property name="name" value="#{car.noStaticFun()}"/>
</bean>
```

\[SpEL 测试 V]在 SpEL 中调用静态方法

使用格式：#{T(全名类).方法名(参数)}

```xml
<bean id="person" class="com.atguigu.pojo.Person">
    <property name="name" value="#{T(com.atguigu.pojo.Car).StaticFun()}"/>
</bean>
```

\[SpEL 测试 VI]在 SpEL 中使用运算符

使用格式：#{表达式}

```xml
<bean id="person" class="com.atguigu.pojo.Person">
    <property name="salary" value="#{30000/12}"/>
</bean>
```

测试代码:

```java
@Test
public void test2(){
    ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
    Person person = context.getBean("person", Person.class);
    System.err.println(person);
}
```
