# IOC

## 目录

- [什么是 IOC](#什么是IOC)
- [容器概述](#容器概述)
  - [导入需要的 jar 包:](#导入需要的jar包)
- [实例化容器](#实例化容器)
  - [更方便的注入 bean](#更方便的注入bean)
- [其他知识点：](#其他知识点)

#### 什么是 IOC

**IOC 也称为"依赖注入“(DI)。** 这是一个过程，在此过程中，**对象仅通过构造函数参数，工厂方法的参数或在对象实例从工厂方法构造或返回后设置的属性来定义其依赖关系**，即与它们一起使用的其他对象。然后，**容器在创建 Bean 时"注入“那些依赖项。** 此过程从根本上来说是相反的，因此名称为控件反转(IoC)，它是通过使用类的直接构造或\* Service Locator\* 模式之类的机制来控制其依赖项的实例化或位置的。

**BeanFactory 根接口**

`org.springframework.beans` 和 org.springframework.context 软件包是 Spring Framework 的 IoC 容器的基础。 BeanFactory 接口提供了一种高级配置机制，能够 Management 任何类型的对象。 ApplicationContext 是 BeanFactory 的子接口。它使与 Spring 的 AOP 功能的集成更加容易。消息资源处理(用于国际化)，事件发布；以及特定于应用程序层的上下文，例如用于 Web 应用程序的 WebApplicationContext。\*\*简而言之，BeanFactory 提供了配置框架和基本功能，而 ApplicationContext 添加了更多企业特定的功能。 \*\*

**Bean 概述**

在 Spring 中，构成应用程序主干并由 Spring IoC 容器管理的对象称为 beans 。 **Bean 是由 Spring IoC 容器实例化，组装和以其他方式 Management 的对象。** 否则，bean 仅仅是应用程序中许多对象之一。**Bean 及其之间的"依赖关系“反映在容器使用的"配置元数据“中。**

### 容器概述

**接口**\*\*`org.springframework.context.ApplicationContext`代表 Spring IoC 容器，并负责实例化，配置和组装上述 bean。容器通过读取配置元数据来获取有关要实例化，配置和组装哪些对象的指令。配置元数据以 XML，Java 注解或 Java 代码表示。\*\*它使您能够表达组成应用程序的对象以及这些对象之间的丰富相互依赖关系。

Spring 提供了`ApplicationContext`接口的几种实现方式。在独立应用程序中，通常创建[ClassPathXmlApplicationContext](https://docs.spring.io/spring-framework/docs/4.3.21.RELEASE/javadoc-api/org/springframework/context/support/ClassPathXmlApplicationContext.html "ClassPathXmlApplicationContext")或[FileSystemXmlApplicationContext](https://docs.spring.io/spring-framework/docs/4.3.21.RELEASE/javadoc-api/org/springframework/context/support/FileSystemXmlApplicationContext.html "FileSystemXmlApplicationContext")的实例。尽管 XML 是定义配置元数据的传统格式，但是您可以通过提供少量 XML 配置来声明性地支持这些附加元数据格式，从而指示容器使用 JavaComments 或代码作为元数据格式。

在大多数应用场景中，不需要实例化用户代码即可实例化一个 Spring IoC 容器的一个或多个实例。例如，在 Web 应用程序场景中，应用程序`web.xml`文件中的简单八行(约)样板 WebDescriptorsXML 通常就足够了(请参见[第 7.15.4 节" Web 应用程序的便捷 ApplicationContext 实例化“](https://www.docs4dev.com/docs/zh/spring-framework/4.3.21.RELEASE/reference/beans.html#context-create "第 7.15.4 节" Web 应用程序的便捷 ApplicationContext 实例化“"))。如果您使用的是[Spring 工具套件](https://spring.io/tools/sts "Spring 工具套件") Eclipse 驱动的开发环境，则只需单击几下鼠标或击键即可轻松创建此样板配置。

下图是 Spring 工作方式的高级视图。您的应用程序类与配置元数据结合在一起，以便在创建和初始化`ApplicationContext`之后，您将具有完全配置且可执行的系统或应用程序。

![                            Spring IoC 容器](https://www.docs4dev.com/images/spring-framework/4.3.21.RELEASE/container-magic.png "                            Spring IoC 容器")

#### 导入需要的 jar 包:

- junit_4.12.jar
- org.hamcrest.core_1.3.0.jar

[spring-jcl-5.2.5.RELEASE.jar](file/spring-jcl-5.2.5.RELEASE_9aBS6DyB4v.jar " spring-jcl-5.2.5.RELEASE.jar")

- jcl Spring 日志分析

[spring-core-5.2.5.RELEASE.jar](file/spring-core-5.2.5.RELEASE_T0nPxjpKv0.jar " spring-core-5.2.5.RELEASE.jar")

[spring-beans-5.2.5.RELEASE.jar](file/spring-beans-5.2.5.RELEASE_1mbvUy6Df5.jar " spring-beans-5.2.5.RELEASE.jar")

[spring-context-5.2.5.RELEASE.jar](file/spring-context-5.2.5.RELEASE_QX0hG6z6uX.jar " spring-context-5.2.5.RELEASE.jar")

[spring-expression-5.2.5.RELEASE.jar](file/spring-expression-5.2.5.RELEASE_tl2A4qACtI.jar " spring-expression-5.2.5.RELEASE.jar")

### 实例化容器

[使用 xml 注入](使用xml注入/使用xml注入.md "使用xml注入")

[使用注解注入](使用注解注入/使用注解注入.md "使用注解注入")

#### 更方便的注入 bean

[Spring EL 表达式](<Spring EL表达式/Spring EL表达式.md> "Spring EL表达式")

### 其他知识点：

[Spring bean 的生命周期](<Spring bean的生命周期/Spring bean的生命周期.md> "Spring bean的生命周期")

[BeanFactory and FactoryBean](<BeanFactory and FactoryBean/BeanFactory and FactoryBean.md> "BeanFactory and FactoryBean")

[Bean 的后置处理器](Bean的后置处理器/Bean的后置处理器.md "Bean的后置处理器")

[循环依赖](循环依赖/循环依赖.md "循环依赖")

[例子：Spring 配置管理数据库连接池对象](例子：Spring配置管理数据库连接池对象/例子：Spring配置管理数据库连接池对象.md "例子：Spring配置管理数据库连接池对象")
