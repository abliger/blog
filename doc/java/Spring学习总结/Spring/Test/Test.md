# Test

## 目录

- [Spring的专有测试](#Spring的专有测试)

[spring-test-5.2.5.RELEASE.jar](file/spring-test-5.2.5.RELEASE_Ixr7iecIFo.jar " spring-test-5.2.5.RELEASE.jar")

[junit\_4.12.jar](file/junit_4.12_zCk6deUJRu.jar " junit_4.12.jar")

### Spring的专有测试

Spring整合junit

@ContextConfiguration

@RunWith

Spring为了让Junit测试变得更佳简单,写的测试代码更少.

专门为Junit做了一些扩展操作.

1. 自己实现一个Junit4 的运行器类
2. 在扩展的Junit4 的类中,有一个Spring容器,不再需要我们自己去实现这个容器.
3. 使用Spring提供的扩展的Junit测试 , 还可以使用 Spring的依赖注入功能.

```java
/**
 * Spring扩展的Junit测试里有Spring容器<br/>
 */
// @ContextConfiguration注解的作用是指定Spring容器需要的配置文件路径
@ContextConfiguration(locations = "classpath:applicationContext.xml")
// @RunWith表示使用Spring扩展的Junit测试类来测试代码
@RunWith(SpringJUnit4ClassRunner.class)
public class SpringJunitTest {
    @Autowired
    PersonService PersonService;
    @Autowired
    UserService userService;
    @Test
    public void test() {
        PersonService.saveEntity(new Person());
        System.out.println("========================");
        userService.saveEntity(new User());
    }
}
```
