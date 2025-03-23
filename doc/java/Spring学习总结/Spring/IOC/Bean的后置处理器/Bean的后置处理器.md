# Bean的后置处理器

## 目录

- [Bean的后置处理器BeanPostProcessor](#Bean的后置处理器BeanPostProcessor)
- [Bean的后置处理器BeanDefinitionRegistryPostProcessor和BeanFactoryPostProcessor](#Bean的后置处理器BeanDefinitionRegistryPostProcessor和BeanFactoryPostProcessor)
- [Bean的后置处理器 DestructionAwareBeanPostProcessor](#Bean的后置处理器-DestructionAwareBeanPostProcessor)

#### Bean的后置处理器BeanPostProcessor

1. 在构造之后执行,在init前后执行(每一个bean对象都会执行后置处理器)
2. Bean的后置处理器可以给bean对象初始化方法前后调用,做一些操作,
3. 使用步骤如下:

   2.1 编写一个类去实现BeanPostProcessor接口

   2.2 实现接口的两个方法

   2.3 到Spring的配置文件中去配置后置处理器

实验23：测试bean的后置处理器

后置处理器代码 :

```java
public class MyBeanPostProcessor implements BeanPostProcessor {

    /**
     * 在初始化方法(init-method)之前执行,做一些操作<br/>
     *
     * @param bean     当前初始化的对象实例
     * @param beanName 当前初始化对象的id值
     * @return 返回值是当前初始化对象(它会替代当前初始化对象)
     */
    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
        System.out.println(" 初始化之前 obj => " + bean + " , id =>" + beanName);
        //对bean对象进行统一操作
        if("person".equals(beanName)){
          Person person=(Person)bean;
          person.sername("小明");
        }
        return bean;
    }

    /**
     * 在初始化方法之后执行,做一些操作<br/>
     *
     * @param bean     当前初始化的对象实例
     * @param beanName 当前初始化对象的id值
     */
    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        System.out.println(" 初始化之后 obj => " + bean + " , id =>" + beanName);
        if ("person20".equals(beanName)) {
            Person person = (Person) bean;
            person.setCar(new Car("QQ卡丁车", "京西444444"));
        }
        return bean;
    }
} 
```


配置信息

```java
<bean class="com.atguigu.processor.MyBeanPostProcessor"/>
```


测试代码:

```java
@Test
public void test26(){
    ApplicationContext context =new ClassPathXmlApplicationContext("applicationContextDepends.xml");
    Person person = context.getBean("person20", Person.class);
    System.err.println(person);
} 
```


#### Bean的后置处理器BeanDefinitionRegistryPostProcessor和BeanFactoryPostProcessor

```java
//bean进入工厂之前执行postProcessBeanDefinitionRegistry 
public interface BeanDefinitionRegistryPostProcessor extends BeanFactoryPostProcessor {
    void postProcessBeanDefinitionRegistry(BeanDefinitionRegistry var1) throws BeansException;
}
 //bean进入工厂之后执行postProcessBeanFactory 
 @FunctionalInterface
public interface BeanFactoryPostProcessor {
    void postProcessBeanFactory(ConfigurableListableBeanFactory var1) throws BeansException;
} 
```


#### Bean的后置处理器 DestructionAwareBeanPostProcessor

```java
public interface DestructionAwareBeanPostProcessor extends BeanPostProcessor {
//bean销毁前调用->applicationcontext的父类.close()方法调用时调用，只能在单例的时候调用，原型的时候会交给JVM垃圾回收，不在bean工厂管理了
    void postProcessBeforeDestruction(Object var1, String var2) throws BeansException;
//默认销毁，为false销毁不调用postProcessBeforeDestruction
    default boolean requiresDestruction(Object bean) {
        return true;
    }
}
```
