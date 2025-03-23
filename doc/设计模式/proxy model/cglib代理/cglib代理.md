# cglib 代理

[com.springsource.net.sf.cglib-2.2.0.jar](file/com.springsource.net.sf.cglib-2.2.0_HSXw_OD9Go.jar " com.springsource.net.sf.cglib-2.2.0.jar")

Cglib 是一个功能强大、性能高效的代码生成库，他被广泛应用于各种基于代理的框架中，例如 AOP、Hibernate 等。与 jdk 动态代理相比，Cglib 更加灵活，因为它生成代理对象时不需要目标对象去实现一个公共的接口，可以直接实现对类的代理。Cglib 底层是通过 asm 字节码生成框架来生成代理类的字节码，并最终在 java 虚拟机生成代理对象的，对 cglib 感兴趣的同学可以自行查阅相关的资料，cglib 的实现不在本文的范围之内。

Cglib 中两个重要的接口和类是 MethodInterceptor 接口和 Enhancer 类，我们通过实现 MethodInterceptor 接口来定义增强代理对象的功能，通过 Enhancer 类来生成代理类的二进制字节码，并通过 Enhancer 内部的 Class.forName 方法加载二进制字节码生成 Class 对象，最终通过反射机制来构造并初始化代理对象。**Cglib 产生的代理对象是目标对象(增强)的子类**

下面我们以类似的代理手机店为例，首先我们需要引入 Cglib，在 maven 中添加如下的依赖

```xml
<dependency>
     <groupId>cglib</groupId>
     <artifactId>cglib</artifactId>
     <version>3.1</version>
</dependency>
```

然后定义一个没有实现接口的目标类小米官方商店 MiSeller

```java
public class MiSeller {
    public boolean sell(String phoneType, int price) {
        if(!phoneType.startsWith("Mi") && !phoneType.startsWith("RedMi")){
            System.out.println("对不起，本店没有您想要买的手机型号，请去隔壁华为或者OV专卖店购买");
            return false;
        }
        System.out.println("感谢您购买" + phoneType + "型号手机，一共收您" + price + "元！");
        return true;
    }
}
```

然后我们需要定义如何增强目标对象的方法，这需要我们去实现 MethodInterceptor 这个接口

```java
public class MiProxyInterceptor implements MethodInterceptor {

    @Override
    public Object intercept(Object o, Method method, Object[] objects, MethodProxy methodProxy) throws Throwable {
        System.out.println("店里响起了名曲：Are you ok?");
        boolean suc = (Boolean) methodProxy.invokeSuper(o,objects);
        if(suc){
            System.out.println("尊敬的消费者，手机已经帮您贴好膜了，欢迎多来店里体验体验其他产品");
            return true;
        }
        return false;
    }
}
```

有了目标类和增强目标类的拦截方法，我们就可以通过 Enhancer 来动态地生成代理对象了

```java
public class MiSellerMain {
    public static void main(String[] args){
        Enhancer enhancer = new Enhancer();
        enhancer.setSuperclass(MiSeller.class);
        enhancer.setCallback(new MiProxyInterceptor());
        MiSeller hzbjMiProxy = (MiSeller)enhancer.create();
        hzbjMiProxy.sell("Mi 9",2999);
    }
}
```

最后我们可以看一下执行结果，看是否可以实现和 jdk 动态代理类似的功能

```text
店里响起了名曲：Are you ok?
感谢您购买Mi 9型号手机，一共收您2999元！
尊敬的消费者，手机已经帮您贴好膜了，欢迎多来店里体验体验其他产品
```

Cglib 相比 jdk 动态代理可以实现直接对类的代理，不过它也有一些缺点，例如目标类的方法如果是 final 方法或者目标类是 final 类，则无法被代理（因为 Cglib 生成的代理对象的二进制字节码的反编译后的类，实际上是继承了目标对象，而 final 方法是无法被继承的）。

---

例二

```java
public class CglibProxyFactory {
    public static Object createCglibProxy(Object target){
        // 增强器 它负责产生一个Cglib代理对象实例
        Enhancer enhancer = new Enhancer();
        // 指定要修改哪个目标对象的字节码程序
        enhancer.setSuperclass(target.getClass());
        // 设置方法拦截器==跟InvocationHandler接口功能一样,是代理对象调用方法时就会执行的接口(专门对目标方法进行增强)
        enhancer.setCallback(new MethodInterceptor() {
            /**
             * 只要代理对象方法调用,就会执行intercept()方法
             * @param proxy         代理对象实例 <br/>
             * @param method        调用的方法的反射对象 <br/>
             * @param args          调用方法时传递的参数 <br/>
             * @param methodProxy   方法反射对象的代理对象<br/>
             * @return  返回值是代理对象调用方法的返回值
             * @throws Throwable
             */
            @Override
            public Object intercept(Object proxy, Method method, Object[] args, MethodProxy methodProxy) throws Throwable {
                LogUtils.logBefore(method.getName(), args);// 前置增强 (在目标方法前做的额外操作)
                Object result =  null;
                try {
                    /**
                     * method.invoke()通过反射调用方法<br/>
                     * 第一个参数是方法的实例对象 <br/>
                     * 第二个参数是方法调用时的参数 <br/>
                     * method.invoke() 返回值就是调用的方法的返回值<br/>
                     */
                        result = method.invoke( target , args );
                        System.out.println( " method.invoke() 方法的返回值 ===>>> " + result );
                        LogUtils.logAfterReturning(method.getName(), result); // 返回增强
                } catch (Exception e) {
                    LogUtils.logAfterThrowing(method.getName(), e);// 异常增强
                    throw  new RuntimeException(e);
                }
                return result;
            }
        });
        // 创建Cglib代理对象实例
        return enhancer.create();
    }
    public static void main(String[] args) {
        Calculator calculator = new Calculator();
        Calculator proxy = (Calculator) createCglibProxy(calculator);
        proxy.add(100, 100);
    }
}
```

优点：在没有接口的情况下，同样可以实现代理的效果。

缺点：同样需要自己编码实现代理全部过程。

但是为了更好的整合 Spring 框架使用。所以我们需要学习一下 Spring 的 AOP 功能。也就是学习 Spring 提供的 AOP 功能。

面试:cglib(有无接口都可,但是目标不能是 final 修饰),jdk 动态代理(必须有接口)
