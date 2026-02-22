# Runner

org.springframework.boot.Runner 可以在 springboot 启动时添加自定义初始化任务.

可以在项目启动时初始化线程池，提前加载好加密证书等操作.而在 mybatis-plus 中它有一个 ddl 自动维护等功能就是使用 Runner 来完成的.

它有两个默认实现:

```java
@FunctionalInterface
public interface ApplicationRunner extends Runner {

	/**
	 * Callback used to run the bean.
	 * @param args incoming application arguments
	 * @throws Exception on error
	 */
	void run(ApplicationArguments args) throws Exception;

}

@FunctionalInterface
public interface CommandLineRunner extends Runner {

	/**
	 * Callback used to run the bean.
	 * @param args incoming main method arguments
	 * @throws Exception on error
	 */
	void run(String... args) throws Exception;

}

```

ApplicationRunner 和 CommandLineRunner 之间只有方法参数有区别.如果需要解析命令参数使用ApplicationRunner 会简单一点,但在实现上是统一进行调用.

## 源码

```java
	private void callRunner(Runner runner, ApplicationArguments args) {
		if (runner instanceof ApplicationRunner) {
			callRunner(ApplicationRunner.class, runner, (applicationRunner) -> applicationRunner.run(args));
		}
		if (runner instanceof CommandLineRunner) {
			callRunner(CommandLineRunner.class, runner,
					(commandLineRunner) -> commandLineRunner.run(args.getSourceArgs()));
		}
	}
	@SuppressWarnings("unchecked")
	private <R extends Runner> void callRunner(Class<R> type, Runner runner, ThrowingConsumer<R> call) {
		call.throwing(
				(message, ex) -> new IllegalStateException("Failed to execute " + ClassUtils.getShortName(type), ex))
		// 这里主要为了捕获异常,如果不捕获异常,如果 runner 运行时抛出异常,会导致 springboot 启动失败.
			.accept((R) runner);
	}
```

---

下面的方法会在所有的工作完毕后调用,所以 runner 运行时所有的 bean 一定全部注入完毕了.

```java
    private void callRunners(ConfigurableApplicationContext context, ApplicationArguments args) {
		ConfigurableListableBeanFactory beanFactory = context.getBeanFactory();
		String[] beanNames = beanFactory.getBeanNamesForType(Runner.class);
		Map<Runner, String> instancesToBeanNames = new IdentityHashMap<>();
		for (String beanName : beanNames) {
			instancesToBeanNames.put(beanFactory.getBean(beanName, Runner.class), beanName);
		}
		Comparator<Object> comparator = getOrderComparator(beanFactory)
			.withSourceProvider(new FactoryAwareOrderSourceProvider(beanFactory, instancesToBeanNames));
		instancesToBeanNames.keySet().stream().sorted(comparator).forEach((runner) -> callRunner(runner, args));
	}
	private OrderComparator getOrderComparator(ConfigurableListableBeanFactory beanFactory) {
		Comparator<?> dependencyComparator = (beanFactory instanceof DefaultListableBeanFactory defaultListableBeanFactory)
				? defaultListableBeanFactory.getDependencyComparator() : null;
		return (dependencyComparator instanceof OrderComparator orderComparator) ? orderComparator
				: AnnotationAwareOrderComparator.INSTANCE;
	}
```

最终走到 springboot 的入口方法

```java
	public ConfigurableApplicationContext run(String... args) {
		Startup startup = Startup.create();
		if (this.properties.isRegisterShutdownHook()) {
			SpringApplication.shutdownHook.enableShutdownHookAddition();
		}
		DefaultBootstrapContext bootstrapContext = createBootstrapContext();
		ConfigurableApplicationContext context = null;
		configureHeadlessProperty();
		SpringApplicationRunListeners listeners = getRunListeners(args);
		listeners.starting(bootstrapContext, this.mainApplicationClass);
		try {
			ApplicationArguments applicationArguments = new DefaultApplicationArguments(args);
			ConfigurableEnvironment environment = prepareEnvironment(listeners, bootstrapContext, applicationArguments);
			Banner printedBanner = printBanner(environment);
			context = createApplicationContext();
			context.setApplicationStartup(this.applicationStartup);
			prepareContext(bootstrapContext, context, environment, listeners, applicationArguments, printedBanner);
			refreshContext(context);
			afterRefresh(context, applicationArguments);
			Duration timeTakenToStarted = startup.started();
			if (this.properties.isLogStartupInfo()) {
				new StartupInfoLogger(this.mainApplicationClass, environment).logStarted(getApplicationLog(), startup);
			}
			listeners.started(context, timeTakenToStarted);
			callRunners(context, applicationArguments);
		}
		catch (Throwable ex) {
			throw handleRunFailure(context, ex, listeners);
		}
		try {
			if (context.isRunning()) {
				listeners.ready(context, startup.ready());
			}
		}
		catch (Throwable ex) {
			throw handleRunFailure(context, ex, null);
		}
		return context;
    }
```

## mybatis-plus

这是 DdlApplicationRunner,mybatis-plus 对于 ApplicationRunner 的实现.

```java
@Slf4j
public class DdlApplicationRunner implements ApplicationRunner {
    /**
     * 处理器列表
     */
    private final List<IDdl> ddlList;
    /**
     * 是否自动提交 (默认自动提交)
     *
     * @since 3.5.11
     */
    @Setter
    private boolean autoCommit = true;
    /**
     * 执行脚本错误处理器 (默认打印错误日志继续执行下一个文件)
     *
     * @since 3.5.11
     */
    @Setter
    private DdlScriptErrorHandler ddlScriptErrorHandler = DdlScriptErrorHandler.PrintlnLogErrorHandler.INSTANCE;
    /**
     * 自定义 ScriptRunner 函数
     *
     * @since 3.5.11
     */
    @Setter
    private Consumer<ScriptRunner> scriptRunnerConsumer;
    /**
     * 是否抛出异常
     * <p>注意这里是控制{@link #ddlList}循环处理时是否抛出异常</p>
     * <p>当设置为false时,会遍历处理完所有处理器</p>
     * <p>当设置为true时,在遍历处理时遇到异常会抛出异常中断下一个处理器处理</p>
     *
     * @since 3.5.11 保持兼容性,默认不抛出
     */
    @Setter
    private boolean throwException = false;
    public DdlApplicationRunner(List<IDdl> ddlList) {
        this.ddlList = ddlList;
    }
    @Override
    public void run(ApplicationArguments args) {
        if (CollectionUtils.isNotEmpty(ddlList)) {
            log.debug("  ...  DDL start create  ...  ");
            ddlList.forEach(ddl -> ddl.runScript(dataSource -> {
                String ddlClassName = AopUtils.getTargetClass(ddl).getName();
                if (CollectionUtils.isEmpty(ddl.getSqlFiles())) {
                    log.warn("{}, sql files is empty", ddlClassName);
                    return;
                }
                log.info("{}, run sql files {}", ddlClassName, ddl.getSqlFiles());
                try {
                    DdlHelper.runScript(ddl.getDdlGenerator(),
                        dataSource, ddl.getSqlFiles(), this.scriptRunnerConsumer, this.autoCommit, this.ddlScriptErrorHandler);
                } catch (Exception e) {
                    log.error("{}, run sql file error: ", ddlClassName, e);
                    if (throwException) {
                        throw new RuntimeException(e);
                    }
                }
            }));
            log.debug("  ...  DDL end create  ...  ");
        }
    }

}

```

首先查看 ddlList 的引入

```java
@ConditionalOnClass(IDdl.class)
@Configuration(proxyBeanMethods = false)
public class DdlAutoConfiguration {

    @Bean
    @Order
    @ConditionalOnBean({IDdl.class}) // 条件注入只有在实现了 IDdl 接口的才会实例化 DdlApplicationRunner
    @ConditionalOnMissingBean({DdlApplicationRunner.class})
    public DdlApplicationRunner ddlApplicationRunner(List<IDdl> ddlList) {
        return new DdlApplicationRunner(ddlList);
    }

}
```

我们通过实现 IDdl 来获得一个数据库配置

```java
@Component
public class DatabaseInitializer extends SimpleDdl{

    @Override
    public List<String> getSqlFiles() {
        return Arrays.asList(
                "db/Sqlite_table.sql"
        );
    }
}
```

之后就是 DdlHelper 来处理多 sql 文件, ScriptRunner 来处理具体文件的 sql 语句.

## 浅谈一下我的使用

在我的项目中需要使用 mqtt 服务器,在项目启动时,我需要在服务器建立与 mqtt 服务器的链接,并订阅 topic.监听心跳日志.当然我的用法肯定是不对的.
但想一下如果有十万台设备,按一分钟一次的频率,那么也是很高的频率了.而且设备是有百万台的潜力的,就不算心跳的问题,我们订阅这些 topic 都是问题.
当然了如果真有百万,甚至十万设备,就不提 mqtt 了,这个可以升级机器快速解决.数据库肯定是顶不住的.


