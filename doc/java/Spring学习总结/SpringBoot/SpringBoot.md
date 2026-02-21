SpringBoot

## 目录

- [SpringBoot](#SpringBoot)
- [特征](#特征)
- [优点](#优点)
- [SpringBoot 原理](#SpringBoot原理)
  - [1. SpringBoot 核心通过 Maven 继承依赖关系快速整合第三方框架](#1SpringBoot核心通过Maven继承依赖关系快速整合第三方框架)
  - [2. 基于 SpringMVC 无配置文件（纯 Java）完全注解化实现 SpringBoot 框架，Main 函数启动。](#2-基于SpringMVC无配置文件纯Java完全注解化实现SpringBoot框架Main函数启动)
- [启动流程](#启动流程)

SpringBoot 是什么？

它是 spring 开发团队对 java 项目依赖进行整合，使之快速开发，达到快速开发，运行，调试，部署

#### SpringBoot

SpringBoot 是由 Pivotal 团队提供的全新框架，其设计目的是用来简化新 Spring 应用的初始搭建以及开发过程。该框架使用了特定的方式来进行配置，从而使开发人员不再需要定义样板化的配置。通过这种方式，SpringBoot 致力于在蓬勃发展的快速应用开发领域(rapidapplicationdevelopment)成为领导者。

SpringBoot 是所有基于 Spring 开发的项目的起点。SpringBoot 的设计是为了让你尽可能快的跑起来 Spring 应用程序并且尽可能减少你的配置文件。简单来说就是 SpringBoot 其实不是什么新的框架，它默认配置了很多框架的使用方式，就像 maven 整合了所有的 jar 包，springboot 整合了所有的框架。

#### 特征

_Spring-Boot-Starter：他将常用的依赖分组进行了整合，将其合并到一个依赖中，这样就可以一次性添加到项目的 Maven 或 Gradle 构建中；_

_自动配置：SpringBoot 的自动配置特性利用了 Spring4 对条件化配置的支持，合理地推测应用所需的 bean 并自动化配置他们；_

命令行接口：（Command-line-interface,CLI）：SpringBoot 的 CLI 发挥了 Groovy 编程语言的优势，并结合自动配置进一步简化 Spring 应用的开发；

Actuatir：它为 SpringBoot 应用的所有特性构建一个小型的应用程序。但首先，我们快速了解每项特性，更好的体验他们如何简化 Spring 编程模型。

#### 优点

1，使编码变得简单，SpringBoot 采用 JavaConfig 的方式，对 Spring 进行配置，并且提供了大量的注解，极大的提高了工作效率。

2，使配置变得简单,SpringBoot 提供许多默认配置，当然也提供自定义配置，_但是所有的 SpringBoot 的项目都只有一个配置文件：application.properties/application.yml。_

3，使部署变得简单，SpringBoot 内置了三种 Servlet 容器，Tomcat，Jetty,undertow.我们只需要一个 Java 的运行环境就可以跑 SpringBoot 的项目了，SpringBoot 的项目可以打成一个 jar 包，然后通过 Java-jar xxx.jar 来运行（SpringBoot 项目的入口是一个 main 方法，运行该方法即可）。

_4，使监控变得简单，SpringBoot 提供了 actuator 包，可以使用它来对应用进行监控。_

springboot 并不是一个全新的框架，它不是 spring 解决方案的一个替代品，而是 spring 的一个封装。所以，你以前可以用 spring 做的事情，现在用 springboot 都可以做。现在流行微服务与分布式系统，springboot 就是一个非常好的微服务开发框架，你可以使用它快速的搭建起一个系统。同时，你也可以使用 springcloud（SpringCloud 是一个基于 SpringBoot 实现的云应用开发工具）来搭建一个分布式的网站。

---

### SpringBoot 原理

#### 1. SpringBoot 核心通过 Maven 继承依赖关系快速整合第三方框架

SpringBoot 本质是一个 maven 项目，通过对 SpringBoot 的场景启动器，前面带 Spring-boot-start 的依赖，实现对模块的快速依赖。诸如：[spring-boot-starter](http://www.51gjie.com/javaweb/1048.html "spring-boot-starter")（这是 Spring Boot 的核心启动器，包含了自动配置、日志和 YAML）；spring-boot-starter-test（支持常规的测试依赖，包括 JUnit、Hamcrest、Mockito 以及 spring-test 模块）；spring-boot-starter-web （支持全栈式 Web 开发，包括 Tomcat 和 spring-webmvc）等相关依赖。

#### 2. 基于 SpringMVC 无配置文件（纯 Java）完全注解化实现 SpringBoot 框架，Main 函数启动。

```java
@SpringBootApplication
public class Application {
    //方式一
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
    //方式二
    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(MySpringConfiguration.class);
        app.run(args);
    }
  //方式三
    public static void main(String[] args) {
        new SpringApplicationBuilder()
            .sources(Parent.class)
            .child(Application.class)
            .run(args);
    }
}
```

### 启动流程

springboot 中只需要有[@SpringBootApplication](http://www.51gjie.com/javaweb/1043.html "@SpringBootApplication")这个注解，有了它马上就能够让整个应用跑起来。实际上它只是一个组合注解，[@Configuration 配置类](http://www.51gjie.com/javaweb/1045.html "@Configuration配置类")，[@ComponentScan 类，包扫描](http://www.51gjie.com/javaweb/1044.html "@ComponentScan类，包扫描")，[@EnableAutoConfiguration 根据需求自动加载相关的 bean](http://www.51gjie.com/javaweb/1046.html "@EnableAutoConfiguration根据需求自动加载相关的bean")这三个注解。

启动流程如下：

1. 初始化监听器，以及添加到 SpringApplication 的自定义监听器。
2. 发布 ApplicationStartedEvent 事件，如果想监听 ApplicationStartedEvent 事件，你可以这样定义：public class ApplicationStartedListener implements ApplicationListener，然后通过 SpringApplication.addListener(..)添加进去即可。
3. 装配参数和环境，确定是 web 环境还是非 web 环境。
4. 装配完环境后，就触发 ApplicationEnvironmentPreparedEvent 事件。
5. 如果 SpringApplication 的 showBanner 属性被设置为 true，则打印启动的 Banner。
6. 创建 ApplicationContext，会根据是否是 web 环境，来决定创建什么类型的 ApplicationContext。
7. 装配 Context 的环境变量，注册 Initializers、beanNameGenerator 等。
8. 发布 ApplicationPreparedEvent 事件。
9. 注册 springApplicationArguments、springBootBanner，加载资源等
10. 遍历调用所有 SpringApplicationRunListener 的 contextLoaded()方法。
11. 调用 ApplicationContext 的 refresh()方法,装配 context beanfactory 等非常重要的核心组件。
12. 查找当前 ApplicationContext 中是否注册有 CommandLineRunner，如果有，则遍历执行它们。
13. 发布 ApplicationReadyEvent 事件，启动完毕，表示服务已经可以开始正常提供服务了。通常我们这里会监听这个事件来打印一些监控性质的日志，表示应用正常启动了。

---

[springboot 配置文件](springboot配置文件/springboot配置文件.md "springboot配置文件")

学习了

---

springboot 的错误

> [An error happened during template parsing (template: "class path resource \[templates/xxx.html\]")](https://blog.csdn.net/feng_xiaolin/article/details/107571657 "An error happened during template parsing (template: "class path resource \[templates/xxx.html]")")

1. 如果发现自动注入不了第一找类上的注解如@controller，二看该类是否被配置类扫描到
