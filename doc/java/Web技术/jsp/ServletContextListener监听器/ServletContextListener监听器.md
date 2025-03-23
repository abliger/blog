# ServletContextListener监听器

Listener监听器一共有8个.但是随个整个JavaEE技术体系的变革.监听器使用也慢慢减少了.

8个中使用比较多的,也就仅仅剩下ServletContextListener监听器.

ServletContextListener监听器它可以监听ServletContext域对象的创建和销毁.

在web工程启动的时候创建,在web工程停止的时候销毁.

如何使用ServletContextListener监听ServletContext对象的创建和销毁呢?

**使用步骤如下:**

1 **编写一个类去实现ServletContextListener接口.**

2 **实现监听器的回调方法**

3 **到web.xml中去配置,让它生效.**

示例代码:

```java
package com.atguigu.servlet;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class ServletContextListenerImpl implements ServletContextListener {

    /**
        - contextInitialized方法在ServletContext对象创建之后马上调用 <br>
        - @param sce
        */

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        // 可以做一些项目初始化工作
        System.out.println("ServletContext创建了");
    }

    /**
        - contextDestroyed方法在ServletContext对象销毁的时候调用
        - @param sce
        */

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        // 释放项目的一些资源 == 内存
        System.out.println("ServletContext销毁了");
    }

}
```


JavaEE3.0规范。使用注解配置Listener监听器
