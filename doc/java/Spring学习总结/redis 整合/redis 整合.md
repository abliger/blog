# redis 整合

maven 仓库

```java
 <!-- spring boot redis缓存引入 -->
  <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-data-redis</artifactId>
  </dependency>
  <!-- lecttuce 缓存连接池-->
  <dependency>
      <groupId>org.apache.commons</groupId>
      <artifactId>commons-pool2</artifactId>
  </dependency>
```


redis bean 配置

```java
    @Bean
    public RedisTemplate<String, Serializable>  redisTemplate(LettuceConnectionFactory connectionFactory) {
        RedisTemplate<String, Serializable> redisTemplate = new RedisTemplate<>();
        redisTemplate.setKeySerializer(new StringRedisSerializer());//key序列化方式
        redisTemplate.setValueSerializer(new GenericJackson2JsonRedisSerializer());//value序列化
        redisTemplate.setConnectionFactory(connectionFactory);
        return redisTemplate;
    }

    @Bean
    public CacheManager cacheManager(LettuceConnectionFactory connectionFactory) {
        RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig()
        //过期时间600秒
                .entryTtl(Duration.ofSeconds(600))
        // 配置序列化
                .serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(new StringRedisSerializer()))
                .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(new GenericJackson2JsonRedisSerializer()))
                .disableCachingNullValues();
        RedisCacheManager cacheManager = RedisCacheManager.builder(connectionFactory)
                .cacheDefaults(config)
                .build();
        return cacheManager;
    }
```


即可使用@RedisTemplate 使用Redis

使用在配置类上加@EnableCaching 在方法上加@Cacheable(value = "index", key = "'selectByAdTypeId'")在这个注解中使用#root.methodName 获得方法名，#root.args\[0]获得第一个方法参数
