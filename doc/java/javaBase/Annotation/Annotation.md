# Annotation

[Java中Annotation用法](https://www.cnblogs.com/be-forward-to-help-others/p/6846821.html "Java中Annotation用法")    [注解的高级使用](https://blog.csdn.net/zhoudaxia/article/details/33731583 "注解的高级使用") [注解的高级使用2](https://blog.csdn.net/lixiaoxiong55/article/details/81435829 "注解的高级使用2") [自定义注解的使用](https://www.cnblogs.com/dongl961230/p/13554629.html "自定义注解的使用")

1. 注解的定义
   1. 注解可以支持的类型：

      1.所有基本数据类型（int,float,boolean,byte,double,char,long,short) &#x20;

      2.String类型 &#x20;

      3.Class类型 &#x20;

      4.enum类型 &#x20;

      5.Annotation类型 &#x20;

      6.以上所有类型的数组
   2. 成员变量的设置：

      第一,只能用public或默认(default)这两个访问权修饰.例如,String value();这里把方法设为defaul默认类型；

      第二,参数成员只能用基本类型byte,short,char,int,long,float,double,boolean八种基本数据类型和 String,Enum,Class,annotations等数据类型,以及这一些类型的数组.例如,String value();这里的参数成员就为String;　　 &#x20;

      第三,如果只有一个参数成员,最好把参数名称设为"value",后加小括号.例:下面的例子FruitName注解就只有一个参数成员。
      注解里定义成员变量，需要有（）
   ```java
   @Target(ElementType.FIELD)  
   @Retention(RetentionPolicy.RUNTIME)  
   @Documented  
   public @interface FruitName {  
     enum AA{BB,CC,DD}
     String value() default "";  
     AA FF() default AA.BB;
   }  

   ```

2. 注意事项：
   1. 注解元素必须有确定的值，要么在定义注解的默认值中指定，要么在使用注解时指定，非基本类型的注解元素的值不可为null。因此, 使用空字符串或0作为默认值是一种常用的做法。这个约束使得处理器很难表现一个元素的存在或缺失的状态，因为每个注解的声明中，所有元素都存在，并且都具有相应的值，为了绕开这个约束，我们只能定义一些特殊的值，例如空字符串或者负数，一次表示某个元素不存在，在定义注解时，这已经成为一个习惯用法
      ```java
      @Target(ElementType.FIELD)  
      @Retention(RetentionPolicy.RUNTIME)  
      @Documented  
      public @interface FruitProvider {  
          /** 
           * 供应商编号 
           * @return 
           */  
          public int id() default -1;  
            
          /** 
           * 供应商名称 
           * @return 
           */  
          public String name() default "";  
            
          /** 
           * 供应商地址 
           * @return 
           */  
          public String address() default "";  
      }  
      ```

   2. 定义了注解，并在需要的时候给相关类，类属性加上注解信息，如果没有响应的注解信息处理流程，注解可以说是没有实用价值。如何让注解真真的发挥作用，主要就在于注解处理方法，下一步我们将学习注解信息的获取和处理[Get annotation information by reflection](<../reflect/Get annotation information by /Get annotation information by reflection.md> "Get annotation information by reflection")
3. 元注解==>注解注解的注解
   1. @Target

      说明Annotation的修饰范围

      1.CONSTRUCTOR:用于描述构造器 &#x20;

      2.FIELD:用于描述域即类成员变量 &#x20;

      3.LOCAL\_VARIABLE:用于描述局部变量 &#x20;

      4.METHOD:用于描述方法 &#x20;

      5.PACKAGE:用于描述包 &#x20;

      6.PARAMETER:用于描述参数 &#x20;

      7.TYPE:用于描述类、接口(包括注解类型) 或enum声明
   2. @Retention

      说明Annotation保留时间的长短（限制生命周期）

      1.SOURCE:在源文件中有效（即源文件保留） &#x20;

      2.CLASS:在class文件中有效（即class保留） &#x20;

      3.RUNTIME:在运行时有效（即运行时保留）
   3. @Documented

      说明注解能否被javadoc生成文档，他没有成员
   4. @Inherited

      @Inherited 元注解是一个标记注解，@Inherited阐述了某个被标注的类型是被继承的。如果一个使用了@Inherited修饰的annotation类型被用于一个class，则这个annotation将被用于该class的子类。

      注意：@Inherited annotation类型是被标注过的class的子类所继承。类并不从它所实现的接口继承annotation，方法并不从它所重载的方法继承annotation。

      当@Inherited annotation类型标注的annotation的Retention是RetentionPolicy.RUNTIME，则反射API增强了这种继承性。如果我们使用java.lang.reflect去查询一个@Inherited annotation类型的annotation时，反射代码检查将展开工作：检查class和其父类，直到发现指定的annotation类型被发现，或者到达类继承结构的顶层.
   5. @Repeatable

      java 1.8 加入的，使用@Repeatable可以重复定义相同的注解
      ```java
      @FilterPath("/web/update")
      @FilterPath("/web/add")
      public class A {}


      ```


[@Contract](@Contract/@Contract.md "@Contract")

[Lombik](Lombik/Lombik.md "Lombik")
