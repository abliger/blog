# Spring整合Web

## 目录

- [在web工程中添加Spring的jar包。](#在web工程中添加Spring的jar包)
- [使用官方推荐的整合包](#使用官方推荐的整合包)
- [在web.xml中配置(重点)](#在webxml中配置重点)
- [获取WebApplicationContext上下文对象的方法如下：](#获取WebApplicationContext上下文对象的方法如下)

Root WebapplicationContext

在web工程上使用Spring框架

**简而言之在web中拿到bean对象**

#### 在web工程中添加Spring的jar包。

Spring的核心包

- spring-beans-4.0.0.RELEASE.jar
- spring-context-4.0.0.RELEASE.jar
- spring-core-4.0.0.RELEASE.jar
- spring-expression-4.0.0.RELEASE.jar

aop包

- spring-aop-4.0.0.RELEASE.jar
- spring-aspects-4.0.0.RELEASE.jar
- com.springsource.org.aopalliance-1.0.0.jar
- com.springsource.org.aspectj.weaver-1.6.8.RELEASE.jar

JDBC-ORM包

- spring-jdbc-4.0.0.RELEASE.jar
- spring-orm-4.0.0.RELEASE.jar
- spring-tx-4.0.0.RELEASE.jar

Spring的web整合包

- spring-web-4.0.0.RELEASE.jar

Servlet

```java
@WebServlet("/springTestServlet")
public class SpringTestServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws javax.servlet.ServletException, IOException {
        doGet(request, response);
    }
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws javax.servlet.ServletException, IOException {
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("classpath:applicationContext.xml");
        TransactionService transactionService = applicationContext.getBean("transactionService", TransactionService.class);
        transactionService.multiUpdate();
    }
}
```


以上整合web不推荐，使用Spring给我们整合web的api

在web工程中使用Spring,需要做以下几点:

1. 需要自己创建Spring的容器对象
2. 需要我们自己管理Spring容器对象 ( Spring容器只有一个 )
3. 需要很好的对Spring容器的创建和销毁做管理

#### 使用官方推荐的整合包

整合Spring和Web容器分两个步骤：

1. 导入spring-web-4.0.0.RELEASE.jar
2. 在web.xml配置文件中配置org.springframework.web.context.ContextLoaderListener监听器监听ServletContext的初始化

   [ContextLoaderListener的作用](https://www.cnblogs.com/xunyi/p/10363290.html "ContextLoaderListener的作用")
3. 在web.xml配置文件中配置contextConfigLocation上下文参数。配置Spring配置文件的位置，以用于初始化Spring容器

#### 在web.xml中配置(重点)

```xml
<!-- 帮我们管理Spring容器创建和销毁 -->
<listener>
    <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
</listener>
<!-- 配置spring容器对象需要的路径 -->
<context-param>
    <param-name>contextConfigLocation</param-name>
    <param-value>classpath:applicationContext.xml</param-value>
</context-param>
```


#### 获取WebApplicationContext上下文对象的方法如下：

源码解析:

ServletContextListener:监听ServletContext创建及销毁

ServletContext:在web工程启动创建,停止时销毁

```java
public class ContextLoaderListener extends ContextLoader implements ServletContextListener {
  /**
   * Initialize the root web application context.
   */
  @Override
  public void contextInitialized(ServletContextEvent event) {
    initWebApplicationContext(event.getServletContext());
  }
  /**
   * Close the root web application context.
   */
  @Override
  public void contextDestroyed(ServletContextEvent event) {
    closeWebApplicationContext(event.getServletContext());
    ContextCleanupListener.cleanupAttributes(event.getServletContext());
  }
}
public class ContextLoader {
    public WebApplicationContext initWebApplicationContext(ServletContext servletContext) {
    if (servletContext.getAttribute(WebApplicationContext.ROOT_WEB_APPLICATION_CONTEXT_ATTRIBUTE) != null) {
      throw new IllegalStateException(
          "Cannot initialize context because there is already a root application context present - " +
          "check whether you have multiple ContextLoader* definitions in your web.xml!");
    }
    servletContext.log("Initializing Spring root WebApplicationContext");
    Log logger = LogFactory.getLog(ContextLoader.class);
    if (logger.isInfoEnabled()) {
      logger.info("Root WebApplicationContext: initialization started");
    }
    long startTime = System.currentTimeMillis();
    try {
      // Store context in local instance variable, to guarantee that
      // it is available on ServletContext shutdown.
      if (this.context == null) {
        this.context = createWebApplicationContext(servletContext);
      }
      if (this.context instanceof ConfigurableWebApplicationContext) {
        ConfigurableWebApplicationContext cwac = (ConfigurableWebApplicationContext) this.context;
        if (!cwac.isActive()) {
          // The context has not yet been refreshed -> provide services such as
          // setting the parent context, setting the application context id, etc
          if (cwac.getParent() == null) {
            // The context instance was injected without an explicit parent ->
            // determine parent for root web application context, if any.
            ApplicationContext parent = loadParentContext(servletContext);
            cwac.setParent(parent);
          }
          configureAndRefreshWebApplicationContext(cwac, servletContext);
        }
      }
      servletContext.setAttribute(WebApplicationContext.ROOT_WEB_APPLICATION_CONTEXT_ATTRIBUTE, this.context);
      ClassLoader ccl = Thread.currentThread().getContextClassLoader();
      if (ccl == ContextLoader.class.getClassLoader()) {
        currentContext = this.context;
      }
      else if (ccl != null) {
        currentContextPerThread.put(ccl, this.context);
      }
      if (logger.isInfoEnabled()) {
        long elapsedTime = System.currentTimeMillis() - startTime;
        logger.info("Root WebApplicationContext initialized in " + elapsedTime + " ms");
      }
      return this.context;
    }
    catch (RuntimeException | Error ex) {
      logger.error("Context initialization failed", ex);
      servletContext.setAttribute(WebApplicationContext.ROOT_WEB_APPLICATION_CONTEXT_ATTRIBUTE, ex);
      throw ex;
    }
  }
}
protected WebApplicationContext createWebApplicationContext(ServletContext sc) {
    Class<?> contextClass = determineContextClass(sc);
    if (!ConfigurableWebApplicationContext.class.isAssignableFrom(contextClass)) {
      throw new ApplicationContextException("Custom context class [" + contextClass.getName() +
          "] is not of type [" + ConfigurableWebApplicationContext.class.getName() + "]");
    }
    return (ConfigurableWebApplicationContext) BeanUtils.instantiateClass(contextClass);
  }
protected void configureAndRefreshWebApplicationContext(ConfigurableWebApplicationContext wac, ServletContext sc) {
    if (ObjectUtils.identityToString(wac).equals(wac.getId())) {
      // The application context id is still set to its original default value
      // -> assign a more useful id based on available information
      String idParam = sc.getInitParameter(CONTEXT_ID_PARAM);
      if (idParam != null) {
        wac.setId(idParam);
      }
      else {
        // Generate default id...
        wac.setId(ConfigurableWebApplicationContext.APPLICATION_CONTEXT_ID_PREFIX +
            ObjectUtils.getDisplayString(sc.getContextPath()));
      }
    }
    wac.setServletContext(sc);
      //public static final String CONFIG_LOCATION_PARAM = "contextConfigLocation";
    String configLocationParam = sc.getInitParameter(CONFIG_LOCATION_PARAM);
    if (configLocationParam != null) {
            //交给容器
      wac.setConfigLocation(configLocationParam);
    }
    // The wac environment's #initPropertySources will be called in any case when the context
    // is refreshed; do it eagerly here to ensure servlet property sources are in place for
    // use in any post-processing or initialization that occurs below prior to #refresh
    ConfigurableEnvironment env = wac.getEnvironment();
    if (env instanceof ConfigurableWebEnvironment) {
      ((ConfigurableWebEnvironment) env).initPropertySources(sc, null);
    }
    customizeContext(sc, wac);
    wac.refresh();
  }
public abstract class AbstractApplicationContext extends DefaultResourceLoader implements ConfigurableApplicationContext {
    public void refresh() throws BeansException, IllegalStateException {
        synchronized(this.startupShutdownMonitor) {
            this.prepareRefresh();
            ConfigurableListableBeanFactory beanFactory = this.obtainFreshBeanFactory();
            this.prepareBeanFactory(beanFactory);
            try {
                this.postProcessBeanFactory(beanFactory);
                this.invokeBeanFactoryPostProcessors(beanFactory);
                this.registerBeanPostProcessors(beanFactory);
                this.initMessageSource();
                this.initApplicationEventMulticaster();
                this.onRefresh();
                this.registerListeners();
                this.finishBeanFactoryInitialization(beanFactory);
                this.finishRefresh();
            } catch (BeansException var9) {
                if (this.logger.isWarnEnabled()) {
                    this.logger.warn("Exception encountered during context initialization - cancelling refresh attempt: " + var9);
                }
                this.destroyBeans();
                this.cancelRefresh(var9);
                throw var9;
            } finally {
                this.resetCommonCaches();
            }
        }
    }
}
```


方法一（不推荐）：

```java
protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    ApplicationContext applicationContext = (ApplicationContext) getServletContext().getAttribute(WebApplicationContext.ROOT_WEB_APPLICATION_CONTEXT_ATTRIBUTE);
    TransactionService transactionService = applicationContext.getBean("transactionService", TransactionService.class);
    transactionService.multiUpdate();
}
```


方法二（推荐）：

```java
protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    ApplicationContext applicationContext = WebApplicationContextUtils.getWebApplicationContext(getServletContext());
    TransactionService transactionService = applicationContext.getBean("transactionService", TransactionService.class);
    transactionService.multiUpdate();
}
```


利用工具类获取根容器，—>不怕根容器名发生改变，以致拿不出来

```java
public abstract class WebApplicationContextUtils {
public static WebApplicationContext getRequiredWebApplicationContext(ServletContext sc) throws IllegalStateException {
    WebApplicationContext wac = getWebApplicationContext(sc);
    if (wac == null) {
        throw new IllegalStateException("No WebApplicationContext found: no ContextLoaderListener registered?");
    }
    return wac;
}
@Nullable
public static WebApplicationContext getWebApplicationContext(ServletContext sc) {
    return getWebApplicationContext(sc, WebApplicationContext.ROOT_WEB_APPLICATION_CONTEXT_ATTRIBUTE);
}
}
```
