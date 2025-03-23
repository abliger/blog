# dynamic proxy

## 目录

- [JDK 动态代理为什么必须针对接口](#JDK动态代理为什么必须针对接口)
- [动态代理的使用](#动态代理的使用)

#### [JDK 动态代理为什么必须针对接口](https://blog.csdn.net/chuxi8272/article/details/100618495 "JDK动态代理为什么必须针对接口")

### 动态代理的使用

也叫 jdk 代理或接口代理

jdk 动态代理的核心是 InvocationHandler 接口：

```java
public interface InvocationHandler {
    public Object invoke(Object proxy, Method method, Object[] args)
        throws Throwable;
}
```

我们需要通过实现 InvocationHandler 接口来完成对代理对象方法的调用和增强。除了这个接口以外，还有一个重要的方法是：

```java
public static Object newProxyInstance(ClassLoader loader,Class<?>[] interfaces,InvocationHandler h)
```

通过这个方法可以创建目标对象的代理对象。这个方法是 Proxy 类中的静态方法，一共有三个参数，分别是：

- ClassLoader loader:目标对象实现接口的类加载器
- Class\<?>\[] interfaces:目标对象实现的接口类型
- InvocationHandler h:方法的改造处理器，目标对象的方法都会传入该处理器中进行增强调用

下面我们以一个小 demo 来展示一下如何实现 jdk 的动态代理，依旧是以华为代理商为例，PhoneSeller 和 HuaWeiSeller 同上不做改变，我们需要创建一个 InvocationHandler 的实现类：

```java
public class PhoneSellerHandler implements InvocationHandler {
    private PhoneSeller phoneSeller;
    public PhoneSellerHandler(PhoneSeller phoneSeller) {
        this.phoneSeller = phoneSeller;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        System.out.println("尊敬的消费者，请边喝茶边看手机，不买也没关系。");
        if(!(Boolean) method.invoke(phoneSeller,args)){
            return false;
        }
        System.out.println("尊敬的消费者，手机已经帮您贴好膜了，再送您一个小米充电宝，欢迎下次再来光临！");
        return true;
    }
}
```

从上面的代码中我们可以看出，作为构造函数参数被传入的是目标对象，在 invoke 中通过反射来调用目标函数中的方法，并在前后增加额外的服务。然后我们来看一下 jdk 动态代理对象的创建：

```java
public class SellerMain {

    public static void main(String[] args){
        PhoneSeller huaweiProxy = (PhoneSeller) Proxy.newProxyInstance(PhoneSeller.class.getClassLoader(),new Class[]{PhoneSeller.class},
                new PhoneSellerHandler(new HuaWeiSeller()));
        huaweiProxy.sell("HuaWei P30",3999);
    }
}
```

下面是动态对象的执行结果，我们可以看出动态代理是可以实现和静态代理一样的功能：

```text
尊敬的消费者，请边喝茶边看手机，不买也没关系。
感谢您购买HuaWei P30型号手机，一共收您3999元！
尊敬的消费者，手机已经帮您贴好膜了，再送您一个小米充电宝，欢迎下次再来光临！
```

jdk 动态代理是对接口的代理，要求被代理的目标对象必须实现一个接口，而如果要对一个完全没有实现接口的单独的对象进行代理，jdk 动态代理就无能为力了，不过我们还可以通过另一种方法来实现类的代理，即:Cglib 代理。

使用匿名内部类进行代理

```java
PhoneSeller huaWeiSeller = new HuaWeiSeller();
        PhoneSeller phoneSeller=(PhoneSeller)Proxy.newProxyInstance(PhoneSeller.class.getClassLoader(), huaWeiSeller.getClass().getInterfaces(),
                new InvocationHandler() {
                    @Override
                    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                        System.out.println("尊敬的消费者，请边喝茶边看手机，不买也没关系。");
                        Object invoke = method.invoke(huaWeiSeller,args);
                        System.out.println("尊敬的消费者，手机已经帮您贴好膜了，再送您一个小米充电宝，欢迎下次再来光临！");
                        return invoke;
                    }
                });
        phoneSeller.sell("HuaWei P30",3999);
```

[动态代理在 Mybatis 中的应用](动态代理在Mybatis中的应用/动态代理在Mybatis中的应用.md "动态代理在Mybatis中的应用")

[理解 dynamic proxy](<理解dynamic proxy/理解dynamic proxy.md> "理解dynamic proxy")
