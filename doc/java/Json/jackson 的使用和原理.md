# jackson 的使用和原理

## 简介

|组件|	作用|
|---|---|
|jackson-core	|核心底层模块，处理 JSON 字节流 / 字符流的解析（生成 JsonParser）和生成（生成 JsonGenerator），定义了 JSON 的基础语法规则（如键值对、数组、字符串等）|
|jackson-databind|数据绑定（Databind）包，实现了数据绑定（和对象序列化）支持，它依赖于Streaming和Annotations包。提供基于“对象绑定”解析的API（ObjectMapper）和"树模型"解析的API（JsonNode）；基于"对象绑定"解析的API和"树模型"解析的API依赖基于“流模式”解析的API|
|jackson-annotations	|注解模块，提供自定义转换规则的注解（如 @JsonProperty、@JsonIgnore、@JsonFormat），让开发者可以干预转换过程|

## 特性

查看 https://blog.csdn.net/u011939453/article/details/129917147 了解详细内容.

这里主要看一下这几个关闭的特性:
|特性|描述|
|---|---|
|ORDER_MAP_ENTRIES_BY_KEYS|当序列化 Map 时，是否按键排序。默认值为 false。|
|WRITE_ENUM_KEYS_USING_INDEX|当序列化枚举时，是否使用枚举的索引值作为 JSON 键。默认值为 false。|

## 原理
Jackson 核心工作原理（以序列化为例，反序列化反向即可）

### 序列化
- 步骤 1：初始化核心入口 ObjectMapper

    ObjectMapper 是 Jackson 的核心入口类，你调用 objectMapper.writeValueAsString(obj) 时，首先会初始化：
    加载默认的转换规则（如日期默认格式、空值是否序列化等）；
    加载自定义注解（如 @JsonProperty 重命名字段、@JsonIgnore 忽略字段）；
    初始化 JsonFactory（来自 jackson-core），用于创建 JsonGenerator（JSON 生成器）。
    ```java
    public ObjectMapper(JsonFactory jf,
            DefaultSerializerProvider sp, DefaultDeserializationContext dc)
    {
        // 02-Mar-2009, tatu: Important: we MUST default to using the mapping factory,
        //  otherwise tree serialization will have problems with POJONodes.
        if (jf == null) {
            _jsonFactory = new MappingJsonFactory(this);
        } else {
            _jsonFactory = jf;
            if (jf.getCodec() == null) { // as per [JACKSON-741]
                _jsonFactory.setCodec(this);
            }
        }
        _subtypeResolver = new StdSubtypeResolver(); // 子类型解析器，用于处理多态类型
        RootNameLookup rootNames = new RootNameLookup();
        // and default type factory is shared one
        _typeFactory = TypeFactory.defaultInstance();

        SimpleMixInResolver mixins = new SimpleMixInResolver(null);
        _mixIns = mixins;
        BaseSettings base = DEFAULT_BASE.withClassIntrospector(defaultClassIntrospector());
        _configOverrides = new ConfigOverrides();
        _coercionConfigs = new CoercionConfigs();
        _serializationConfig = new SerializationConfig(base,
                _subtypeResolver, mixins, rootNames, _configOverrides,
                DatatypeFeatures.defaultFeatures());
        _deserializationConfig = new DeserializationConfig(base,
                _subtypeResolver, mixins, rootNames, _configOverrides,
                _coercionConfigs,
                DatatypeFeatures.defaultFeatures());

        // Some overrides we may need
        final boolean needOrder = _jsonFactory.requiresPropertyOrdering();
        if (needOrder ^ _serializationConfig.isEnabled(MapperFeature.SORT_PROPERTIES_ALPHABETICALLY)) {
            configure(MapperFeature.SORT_PROPERTIES_ALPHABETICALLY, needOrder);
        }

        _serializerProvider = (sp == null) ? new DefaultSerializerProvider.Impl() : sp;
        _deserializationContext = (dc == null) ?
                new DefaultDeserializationContext.Impl(BeanDeserializerFactory.instance) : dc;

        // Default serializer factory is stateless, can just assign
        _serializerFactory = BeanSerializerFactory.instance;
    }
    ```

    ---

    #### 多态序列化 StdSubtypeResolver 来处理

    ```java
    @JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,      // 使用名称作为类型标识
        include = JsonTypeInfo.As.PROPERTY,  // 将类型信息作为属性
        property = "type"                // 属性名为 "type"
    )
    @JsonSubTypes({
        @JsonSubTypes.Type(value = Dog.class, name = "dog"),
        @JsonSubTypes.Type(value = Cat.class, name = "cat")
    })
    public abstract class Animal {
        public String name;
    }
    
    public class Dog extends Animal {
        public double barkVolume;
    }
    
    public class Cat extends Animal {
        public boolean likesCream;
    }
    ```
    ```json
    // 序列化 Dog 实例
    {
        "type": "dog",
        "name": "Buddy",
        "barkVolume": 95.5
    }

    // 序列化 Cat 实例  
    {
        "type": "cat",
        "name": "Whiskers",
        "likesCream": true
    }
    ```
- 步骤 2：解析 Java 对象结构（反射 + 注解）

ObjectMapper 会通过Java 反射机制解析目标对象的结构：
获取对象的类信息：包括类的字段（Field）、getter/setter 方法（Jackson 默认优先识别 getter 方法，如 getName() 对应 JSON 的 name 字段）；
结合注解修正字段规则：比如字段 private String userName; 加了 @JsonProperty("user_name")，则会将字段名修正为 user_name；如果加了 @JsonIgnore，则跳过该字段；
识别字段类型：区分基本类型（int、String）、复杂类型（List、Map、自定义对象）、特殊类型（Date、LocalDateTime），并匹配对应的「类型转换器（Serializer）」。

```java
    protected final void _writeValueAndClose(JsonGenerator g, Object value)
        throws IOException
    {
        SerializationConfig cfg = getSerializationConfig();
        if (cfg.isEnabled(SerializationFeature.CLOSE_CLOSEABLE) && (value instanceof Closeable)) {
            _writeCloseable(g, value, cfg);
            return;
        }
        try {
            _serializerProvider(cfg).serializeValue(g, value);
        } catch (Exception e) {
            ClassUtil.closeOnFailAndThrowAsIOE(g, e);
            return;
        }
        g.close();
    }

    public void serializeValue(JsonGenerator gen, Object value) throws IOException
    {
        _generator = gen;
        if (value == null) {
            _serializeNull(gen); // 空值处理
            return;
        }
        final Class<?> cls = value.getClass();
        // true, since we do want to cache root-level typed serializers (ditto for null property)
        final JsonSerializer<Object> ser = findTypedValueSerializer(cls, true, null);
        PropertyName rootName = _config.getFullRootName();
        if (rootName == null) { // not explicitly specified
            if (_config.isEnabled(SerializationFeature.WRAP_ROOT_VALUE)) {
                _serialize(gen, value, ser, _config.findRootName(cls));
                return;
            }
        } else if (!rootName.isEmpty()) {
            _serialize(gen, value, ser, rootName);
            return;
        }
        _serialize(gen, value, ser);
    }
```
- 步骤 3：生成 JSON 数据（基于 JsonGenerator）

ObjectMapper 通过 JsonFactory 创建 JsonGenerator（JSON 生成器）；
JsonGenerator 按照 JSON 语法规则，将解析后的 Java 对象数据逐字段转换为 JSON 格式：
基本类型：直接转换（如 int 123 → JSON 数字 123，String "abc" → JSON 字符串 "abc"）；
复杂类型：递归解析（如 `List<User>` → JSON 数组，数组内每个 User 对象再重复步骤 2-3）；
特殊类型：通过自定义 / 默认的 Serializer 转换（如 Date 类型默认转成时间戳，或通过 @JsonFormat 转成指定格式的字符串）；
JsonGenerator 将转换后的 JSON 数据写入字符流 / 字节流，最终拼接成完整的 JSON 字符串。

### 反序列化

ObjectMapper 创建 JsonParser（JSON 解析器），逐行解析 JSON 字符串，拆分成「JSON 令牌（Token）」（如 START_OBJECT（{）、FIELD_NAME（字段名）、VALUE_STRING（字符串值）、END_OBJECT（}）等）；
通过反射创建目标 Java 对象的实例（调用无参构造器，这也是为什么 Jackson 反序列化时默认要求类有无参构造）；
遍历 JSON 令牌，将对应字段值通过 setter 方法（或直接赋值字段）填充到 Java 对象中；
特殊类型（如 Date）通过「反序列化器（Deserializer）」转换为 Java 对应的类型。

---
关键优化：避免反射的性能问题

你可能会问：反射效率不高，Jackson 怎么解决？Jackson 提供了 jackson-module-parameter-names 和 databind 的「序列化 / 反序列化缓存」机制：
首次解析类结构时，会将类的字段、注解、转换器等信息缓存到 ClassIntrospector 中，后续转换同一类的对象时直接复用，避免重复反射；
进阶用法中，还可以通过 @JsonCreator + 有参构造器替代无参构造，或使用 Jackson-databind 的 SimpleModule 自定义序列化器，进一步提升性能。

## 使用 Jackson

```java
import com.fasterxml.jackson.databind.ObjectMapper;
public class Cat{
    private final String name;
    public Cat(String name) {
        this.name = name;
    }
    public String getName() {
        return name;
    }
}
public class JacksonExample {
    public static void main(String[] args) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        // 序列化
        String json = objectMapper.writeValueAsString(new Cat("Whiskers"));
        System.out.println(json);
        // 反序列化
        Cat cat = objectMapper.readValue(json, Cat.class);
        System.out.println(cat.getName());
    }
}
```

### 注解大全

@JsonProperty （也表示要包含该属性）用于指示外部属性名称，即数据格式（JSON 或其他受支持的数据格式）中使用的名称。
    @JsonProperty.value ：要使用的名称
    @JsonProperty.index ：如果数据格式（JSON 除外）是基于索引的，则指定要使用的物理索引。
    @JsonProperty.defaultValue ：定义为元数据的文本默认值。 注意 ：核心数据绑定不使用此值；它目前仅对扩展模块开放。
    注意：如果将 @JsonIgnore 与 @JsonProperty 一起使用，则 @JsonIgnore 的优先级更高，并且属性不会被包含（但请参阅关于 @JsonIgnore “拆分”属性的说明！）

@JsonAutoDetect ：用于重写属性自省定义的类注解。
    使用不同的属性设置不同类型的访问器：
    creatorVisibility 用于检测构造函数作为 Creator 方法（以及少量“众所周知”的静态工厂方法，例如 valueOf() ）。
    fieldVisibility 用于检测 Java 对象字段的 访问权限。
    getterVisibility 用于检测“getter”：返回名称以“get”开头的无参值方法。
    isGetterVisibility 用于检测名称以“is”前缀开头 Boolean boolean /无参方法。
    setterVisibility 用于检测“setter”：名称以“set”前缀开头的单参数方法。

    ```java
    @JsonAutoDetect(
        fieldVisibility = Visibility.ANY,       // 序列化直接读字段
        getterVisibility = Visibility.NONE,     // 不需要 getter
        setterVisibility = Visibility.NONE,     // 不需要 setter（不可变）
        creatorVisibility = Visibility.ANY      // 需要构造方法
    )
    @JsonCreator
    public record ImmutableUser(
        @JsonProperty String name,
        @JsonProperty int age
    ) {}
    ```

    | 值                      | 含义                                  | 示例场景               |
    | ---------------------- | ----------------------------------- | ------------------ |
    | `ANY`                  | 所有修饰符，包括 private                    | 完全开放               |
    | `NON_PRIVATE`          | 非 private（public/protected/package） | 排除私有               |
    | `PROTECTED_AND_PUBLIC` | protected 和 public                  | 标准封装               |
    | `PUBLIC_ONLY`          | 仅 public                            | 最严格                |
    | `NONE`                 | 不自动检测                               | 完全禁用，只用注解显式声明      |
    | `DEFAULT`              | 使用全局默认配置                            | 继承 ObjectMapper 设置 |


@JsonIgnore ：用于忽略指定属性的简单注解
@JsonIgnoreProperties ：用于列出要忽略的属性或指示要忽略任何未知属性的类注解

    ```java
    @JsonIgnoreProperties({
        "password",           // 忽略 password 属性
        "internalId",         // 忽略 internalId 属性
    })
    public class User {
        private String username;
        private String password;      // 被忽略
        private Long internalId;      // 被忽略
    }
    ```
@JsonIgnoreType ：用于类的注解，指示要忽略被注解类型的所有属性。
@JsonInclude ：用于定义在序列化时是否应排除某些“非值”（null 或空值）的注解；可以按属性使用，也可以作为类的默认值（用于类的所有属性）

    ```java
    public class User {
        private String username;

        @JsonInclude(JsonInclude.Include.NON_NULL)  // null 时不序列化
        private String nickname;

        @JsonInclude(JsonInclude.Include.NON_EMPTY)  // 空集合时不序列化
        private List<String> tags;
    }
    @JsonInclude(JsonInclude.Include.NON_NULL)  // 类中所有 null 属性都不序列化
    public class Product {
        private String name;      // null 时不输出
        private String description; // null 时不输出
        private BigDecimal price;   // null 时不输出
    }
    ```

| 值              | 含义                           | 示例场景               |
| -------------- | ---------------------------- | ------------------ |
| `ALWAYS`       | **始终包含**（默认）                 | 不忽略任何值             |
| `NON_NULL`     | 排除 **null**                  | 最常见的配置             |
| `NON_ABSENT`   | 排除 null 和 `Optional.empty()` | Java 8 Optional 支持 |
| `NON_EMPTY`    | 排除 null、空字符串、空集合/数组/Map      | 最严格的空值过滤           |
| `NON_DEFAULT`  | 排除默认值（0、false、空字符串等）         | 减少冗余数据             |
| `CUSTOM`       | 使用自定义过滤器                     | 复杂业务逻辑             |
| `USE_DEFAULTS` | 使用上级配置（类级→包级→全局）             | 配置继承               |

@JsonPropertyDescription （2.3 版本新增）：用于定义逻辑属性的人类可读描述的注解
@JsonFormat ：通用注解，具有针对特定类型的行为；例如，可用于指定序列化和反序列化日期/时间值时使用的格式。它还可以用于将非 String 类型的序列化方式更改为 JSON 字符串（例如，“字符串化数字”）。
@JsonUnwrapped ：属性注解，用于定义序列化时该值应该“解包”（反序列化时再次包装），从而导致数据结构扁平化，与 POJO 结构相比。

    ```java
    public class User {
        private String username;

        @JsonUnwrapped
        private Address address;  // Address 属性将被展平
    }

    public class Address {
        private String street;
        private String city;
        private String zipCode;
    }
    ```
    ```json
    {
        "username": "john",
        "street": "123 Main St",
        "city": "New York",
        "zipCode": "10001"
    }
    // 注意：没有 "address" 包装对象，属性直接出现在 User 层级
    ```

@JsonView ：属性注解，用于定义视图，其中属性将包含在序列化、反序列化中。

    ```java
    public class Views {
        public static class Public { }      // 公开视图
        public static class Internal extends Public { }  // 内部视图（继承公开）
        public static class Admin extends Internal { }   // 管理员视图（继承内部）
    }
    public class User {

        @JsonView(Views.Public.class)
        private String username;        // 所有人可见

        @JsonView(Views.Public.class)
        private String avatar;          // 所有人可见

        @JsonView(Views.Internal.class)
        private String email;           // 内部系统可见

        @JsonView(Views.Internal.class)
        private String phone;           // 内部系统可见

        @JsonView(Views.Admin.class)
        private String passwordHash;    // 仅管理员可见

        @JsonView(Views.Admin.class)
        private boolean accountLocked;  // 仅管理员可见
    }
    public static void main(String[] args) {
        ObjectMapper mapper = new ObjectMapper();

        User user = new User("john", "john@example.com", "hash123", false);

        // 公开视图输出
        mapper.writerWithView(Views.Public.class)
              .writeValueAsString(user);
        // {"username":"john","avatar":null}

        // 内部视图输出
        mapper.writerWithView(Views.Internal.class)
              .writeValueAsString(user);
        // {"username":"john","avatar":null,"email":"john@example.com","phone":null}

        // 管理员视图输出
        mapper.writerWithView(Views.Admin.class)
              .writeValueAsString(user);
        // 包含所有字段
    }
    @RestController
    @RequestMapping("/api/users")
    public class UserController {
    
        @GetMapping("/users/{id}")
        @JsonView(Views.Public.class)  // 对外公开
        public User getPublicUser(@PathVariable Long id) {
            return userService.findById(id);
        }

        @GetMapping("/admin/users/{id}")
        @JsonView(Views.Admin.class)  // 管理员查看
        public User getAdminUser(@PathVariable Long id) {
            return userService.findById(id);
        }
    }
    ```

@JacksonInject ：注解，表示该属性应该通过“注入”获取其值，而不是从数据（JSON）中获取。

    ```java
    public class ApiRequest<T> {
        private T data;

        @JacksonInject("traceId")
        private String traceId;      // 分布式追踪 ID

        @JacksonInject("timestamp")
        private long timestamp;      // 请求时间戳

        @JacksonInject("clientVersion")
        private String clientVersion; // 客户端版本
    }   

    // 拦截器中设置
    public class InjectFilter implements Filter {
        @Override
        public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) {
            HttpServletRequest req = (HttpServletRequest) request;

            InjectableValues inject = new InjectableValues.Std()
                .addValue("traceId", req.getHeader("X-Trace-Id"))
                .addValue("timestamp", System.currentTimeMillis())
                .addValue("clientVersion", req.getHeader("X-Client-Version"));

            // 绑定到当前线程的 ObjectMapper
            ObjectMapperContext.setInjectableValues(inject);

            chain.doFilter(request, response);
        }
    }
    ```
@JsonAnySetter ：用于将双参数方法定义为“任意设置器”的注解，用于反序列化原本未映射的 JSON 属性的值。
@JsonCreator ：用于指示在反序列化期间应使用构造函数或静态工厂方法来创建值实例的注解。

    ```java
    public class Point {
        private final int x;
        private final int y;

        // 告诉 Jackson 使用此构造方法
        @JsonCreator
        public Point(@JsonProperty("x") int x, @JsonProperty("y") int y) {
            this.x = x;
            this.y = y;
        }

        // getters...
    }
    public class DateRange {
        private final LocalDate start;
        private final LocalDate end;

        // 支持从 "2024-01-01/2024-12-31" 创建
        @JsonCreator
        public static DateRange fromString(String range) {
            String[] parts = range.split("/");
            return new DateRange(
                LocalDate.parse(parts[0]),
                LocalDate.parse(parts[1])
            );
        }

        // 也支持对象形式
        @JsonCreator
        public DateRange(
            @JsonProperty("start") LocalDate start,
            @JsonProperty("end") LocalDate end
        ) {
            this.start = start;
            this.end = end;
        }
    }
    ```
@JsonSetter ：是 @JsonProperty 的替代方案，用于标记指定的方法是“setter 方法”。
@JsonEnumDefaultValue （2.8 版本新增）：用于在反序列化未知枚举值时定义默认值的注解。需要启用配置项 READ_UNKNOWN_ENUM_VALUES_USING_DEFAULT_VALUE 。请参阅反序列化功能中的示例代码片段。

@JsonSubTypes ：用于指示被注解类型的子类型的类注解；当使用逻辑类型名称（而不是类名称）反序列化多态类型时是必需的。
@JsonTypeId ：属性注解，用于指示属性值应用作对象的 Type Id ，而不是使用类名或外部类型名。
@JsonTypeInfo ：类/属性注解，用于指示序列化中包含哪些类型信息以及如何包含这些类型信息的详细信息。
@JsonTypeName ：用于定义被注解类的逻辑类型名称的类注解；类型名称可用作 Type Id （取决于 @JsonTypeInfo 的设置）。