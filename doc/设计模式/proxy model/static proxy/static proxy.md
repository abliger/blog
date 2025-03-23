# static proxy

静态代理的一般模式是，代理对象和目标对象实现同一个接口，然后代理对象持有目标对象的引用，并在方法中对目标方法进行相应的增强操作。下面我们就通过玩具代码来看一下静态代理的实现，首先我们定义一个手机销售的接口 PhoneSeller，这个接口有一个方法 sell，其中有两个参数分别是手机款式和价格：

```java
public interface PhoneSeller {
    boolean sell(String phoneType,int price);
}
```

然后我们定义一个华为官方商店 HuaWeiSeller，这个对象简单检查一下消费者想要购买的手机款式有没有，然后核对一下价格就把手机卖给消费者：

```java
public class HuaWeiSeller implements PhoneSeller{
    @Override
    public boolean sell(String phoneType, int price) {
        if(!phoneType.startsWith("HuaWei") && !phoneType.startsWith("Honor")){
            System.out.println("对不起，本店没有您想要买的手机型号，请去隔壁小米或者OV专卖店购买");
            return false;
        }
        if(price <= 1000){
            System.out.println("对不起，本店不卖廉价手机");
            return false;
        }
        System.out.println("感谢您购买" + phoneType + "型号手机，一共收您" + price + "元！");
        return true;
    }
}
```

由于华为手机非常的畅销，利润也比较高，这个时候有人在杭州滨江区开了一家华为手机代理店 HZBJHuaWeiProxy，为了提供竞争力，区别于华为官方的手机店，代理店决定用更好的服务来吸引顾客，凡是来店里看手机的，不管买不买先给顾客上一杯茶，如果顾客购买了华为手机，不论型号均免费贴膜，送小米充电宝：

```java
public class HZBJHuaWeiProxy implements PhoneSeller{
    private HuaWeiSeller huaWeiSeller;
    public HZBJHuaWeiProxy(HuaWeiSeller huaWeiSeller) {
        this.huaWeiSeller = huaWeiSeller;
    }

    @Override
    public boolean sell(String phoneType, int price) {
        System.out.println("尊敬的消费者，请边喝茶边看手机，不买也没关系。");
        if(!huaWeiSeller.sell(phoneType,price)){
            return false;
        }
        System.out.println("尊敬的消费者，手机已经帮您贴好膜了，再送您一个小米充电宝，欢迎下次再来光临！");
        return true;
    }
}
```

最后我们来看下测试类：

```java
public class SellerMain {
    public static void main(String[] args){
        HZBJHuaWeiProxy hzbjHuaWeiProxy = new HZBJHuaWeiProxy(new HuaWeiSeller());
        hzbjHuaWeiProxy.sell("HuaWei Meta20 pro",5999);
    }
}
```

下面是购买的过程，看，是不是服务更加贴心了呢（笑：

```text
尊敬的消费者，请边喝茶边看手机，不买也没关系。
感谢您购买HuaWei Meta20 pro型号手机，一共收您5999元！
尊敬的消费者，手机已经帮您贴好膜了，再送您一个小米充电宝，欢迎下次再来光临！
```

静态代理优点：简单、清晰易理解

静态代理缺点：维护起来比较麻烦，如果目标对象中增加了新的方法，代理对象也要跟着一起维护，维护起来非常的麻烦。
