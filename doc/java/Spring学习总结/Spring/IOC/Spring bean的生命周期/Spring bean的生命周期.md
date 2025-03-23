# Spring bean 的生命周期

Spring bean 是怎么产生的

通过反射 Class→beanDefintion（map）→object(bean)

即先扫描 → 解析 →validate

把扫描的文件字节码、类名、是否是单例或原型...调用扩展 beanFactory→ 创建对象

即如果改变 beanDefintion 中的字节码，最后得到的是改变后的字节码的 bean 对象

bean 对象（单例）的创建过程

1. 实例化 Spring 容器
2. 扫描类 →new 对象
3. 解析这个类
4. 实例化 beandefinition
5. 所有的 db 存到 map 中
6. 调用 bean 工厂的后置处理器
7. 验证
8. 推断构造方法 → 放到 spring 容器
9. new 对象-反射
10. 缓存 注解信息 合并
11. 提前暴露自己
12. 是否需要属性注入
13. 完成属性注入
14. 调用生命周期的回调方法
15. 调用所有的 awre
16. 完成代理—>aop
17. put 容器 → 完成的 bean 对象
18. 销毁这个对象

9-17 是从普通 java 对象到 bean 对象的过程

---

对于单例的 bean，生命周期有 11 个步骤：

```text
1.instantiate bean对象实例化，bean对象实例化，是在加载配置文件的时候实例的。即，我们启动spring容器的时候，加载配置文件，此时就实例化bean了。 

2.populate properties 封装属性 

3.如果Bean实现BeanNameAware， 执行 setBeanName 

4.如果Bean实现BeanFactoryAware 或者 ApplicationContextAware，设置工厂 setBeanFactory 或者上下文对象 setApplicationContext 

5.如果存在类实现 BeanPostProcessor（后处理Bean） ，执行postProcessBeforeInitialization（此点常常用来增强bean） 

6.如果Bean实现InitializingBean 执行 afterPropertiesSet 

7.调用<bean init-method="init"> 指定初始化方法 init 

8.如果存在类实现 BeanPostProcessor（后处理Bean） ，执行postProcessAfterInitialization（此点常常用来增强bean） 

9.执行业务处理 

10.如果Bean实现 DisposableBean 执行 destroy 

11.调用<bean destroy-method="customerDestroy"> 指定销毁方法
```
