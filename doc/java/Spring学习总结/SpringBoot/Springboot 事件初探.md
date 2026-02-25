# Springboot 事件初探

## 使用

### 定义事件

```java
public class MyEvent extends ApplicationEvent {
    private final String message;
    public MyEvent(Object source, String message) {
        super(source);
        this.message = message;
    }
    public String getMessage() {
        return message;
    }
}
```

### 监听事件

```java
@EventListener(classes = MyEvent.class)
public void handleMyEvent(MyEvent event) {
    System.out.println("处理事件: " + event);
}
```

### 发布事件

```java
@Autowired
private ApplicationEventPublisher eventPublisher;

// 发布事件
eventPublisher.publishEvent(new MyEvent(this, "这是一条事件消息"));
```

### 另一种监听方式

```java
@Component
public class MyEventListener implements ApplicationListener<MyEvent> {
    @Override
    public void onApplicationEvent(MyEvent event) {
        System.out.println("处理事件: " + event);
    }
}
```

### 事件监听顺序

- 方法上添加 `@Order` 注解
- 实现 `Ordered` 接口
- 使用 `@Priority` 注解 （Spring 5.0 引入）

### 条件执行

```java
    @EventListener(condition = "#event.amount > 1000")
    public void handleLargeOrder(OrderCreatedEvent event) {
        System.out.println("处理大额订单: " + event.getOrderId() + ", 金额: " + event.getAmount());
        // 执行大额订单处理逻辑，如发送VIP通知等
    }

    // 只有当订单ID以"ADMIN"开头时，才处理此事件
    @EventListener(condition = "#event.orderId.startsWith('ADMIN')")
    public void handleAdminOrder(OrderCreatedEvent event) {
        System.out.println("处理管理员订单: " + event.getOrderId());
        // 执行特殊处理逻辑
    }
```

## springboot 内置生命周期事件

- `ApplicationStartingEvent` Springboot 正在启动时但还未做任何处理之前时触发
- `ApplicationEnvironmentPreparedEvent` Springboot 环境准备完成时触发
- `ApplicationContextInitializedEvent` 上下文准备好但尚未刷新，bean的定义被加载之前时触发
- `ApplicationPreparedEvent` 上下文加载后但尚未刷新，所有的 bean 定义已加载，但还没有任何 bean 被创建时触发
- `ApplicationStartedEvent` 上下文已刷新，此时应用已启动但还未准备好接受请求时触发
- `ApplicationReadyEvent` 上下文已刷新，应用程序已启动且准备好接受请求时触发
- `ApplicationFailedEvent` Springboot 应用启动失败时触发

# java 事件监听

- 定义事件

```java
public class ButtonClickEvent extends EventObject {
    private String buttonName;

    public ButtonClickEvent(Object source, String buttonName) {
        super(source);
        this.buttonName = buttonName;
    }

    public String getButtonName() {
        return buttonName;
    }
}
```
- 准备监听器

```java
public interface ButtonClickListener extends EventListener {
    void onButtonClick(ButtonClickEvent event);
}
public class MyButtonClickListener implements ButtonClickListener {
    @Override
    public void onButtonClick(ButtonClickEvent event) {
        System.out.println("Button '" + event.getButtonName() + "' was clicked!");
    }
}
```
- 触发事件

```java
public class MyButton {
    private List<ButtonClickListener> listeners = new ArrayList<>();
    private String buttonName;

    public MyButton(String buttonName) {
        this.buttonName = buttonName;
    }

    public void addButtonClickListener(ButtonClickListener listener) {
        listeners.add(listener);
    }

    public void click() {
        ButtonClickEvent event = new ButtonClickEvent(this, buttonName);
        for (ButtonClickListener listener : listeners) {
            listener.onButtonClick(event);
        }
    }
}
```
- 使用事件监听器

```java
public class Application {
    public static void main(String[] args) {
        MyButton button = new MyButton("Submit");
        MyButtonClickListener listener = new MyButtonClickListener();
        button.addButtonClickListener(listener);
        button.click(); // This will trigger the listener's onButtonClick method.
    }
}
```