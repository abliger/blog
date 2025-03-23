# Redis五大数据类型

## 目录

- [key](#key)
- [string](#string)
- [list](#list)
- [set](#set)
- [hash](#hash)
- [zset](#zset)

#### key

1. keys \*   查询所有的key
2. exists \<key> key是否存在
3. type \<key>
4. del \<key>
5. expire \<key> \<seconds> 设置key的过期时间 （-1 永不过期，-2 已过期）
6. ttl \<key> 查看key的过期时间
7. flushdb   清空一个库
8. flushall    清空所有的库

#### string

1. get \<key>  获得key的值
2. set \<key> \<values> 设置key的值
3. append \<key> \<value> 在key的值后追加value
4. setnx \<key> \<value> 判断key是否存在，存在不写入，不存在把键值对写入
5. strlen    判断key的value长度
6. incr  \<key>  调用对key的value自增
7. decr  \<key>  调用对key的value自减
8. incrby/decrby \<key> 步长   设置自增自减步长
9. mset   \<key>\<value>\<key2>\<value2>...
10. mget   \<key1>\<key2>\<key3>
11. getrange \<key> <起始位置><结束位置>     getrange k1 0 -1
12. setrange   \<key> <起始位置>\<value>
13. msetnx
14. setex    \<key> <过期时间> \<value>
15. getset      \<key>\<vlaue> 得到旧值设置新值

#### list

1. lpush/rpush 向左向右添加
2. lpop/rpop 向左向右取出，取完key销毁
3. llen list集合的长度
4. lrange 按照索引获得元素
5. lindex 按照下标获得元素
6. linsert \<key>before /after\<value>\<newvalue> 在key的value前后插入newvalue
7. lrem \<key> 个数a  \<value>    删除key的a个value

#### set

1. sadd \<key>\<value>\<value>\<value>   添加key  list集合
2. srem    \<key>\<value>\<value> 删除集合的元素
3. spop \<key> \<count>  随机取出一个元素，并在集合销毁该元素，取完key销毁;count 控制吐多个值
4. smembers \<key>取出key的所有元素，不销毁元素
5. sismembers \<key>\<value>判断集合的key键值对和指令的键值对是否一样，一样返回1，不一样返回0
6. scard \<key>返回集合元素个数
7. sunion \<key1>\<key2>  返回集合的并集
8. sinter\<key1>\<key2> 返回集合交集
9. sdiff\<key1>\<key2> 返回集合的差集

   key1 1 2 3 4 5&#x20;

   key2 a b c d 1

   sdiff key1 key2 返回 2345

#### hash

1. hset \<key> \<field> \<value>   给\<key>集合中的 \<field>键赋值\<value>
2. hget \<key1> \<field>   从\<key1>集合\<field> 取出 value
3. hmset \<key1> \<field1> \<value1> \<field2> \<value2>... 批量设置hash的值
4. hexists key \<field>  查看哈希表 key 中，给定域 field 是否存在。
5. hkeys \<key>   列出该hash集合的所有field
6. hvals \<key>   列出该hash集合的所有value
7. hincrby \<key> \<field> \<increment>为哈希表 key 中的域 field 的值加上增量 increment

#### zset

1. zadd \<key> \<score1> \<value1> \<score2> \<value2>...

   将一个或多个 member 元素及其 score 值加入到有序集 key 当中
2. zrange \<key> \<start> \<stop> \[WITHSCORES]&#x20;

   返回有序集 key 中，下标在\<start> \<stop>之间的元素

   带WITHSCORES，可以让分数一起和值返回到结果集。
3. zrangebyscore key min max \[withscores] \[limit offset count]

   返回有序集 key 中，所有 score 值介于 min 和 max 之间(包括等于 min 或 max )的成员。有序集成员按 score 值递增(从小到大)次序排列。
4. zrevrangebyscore key max min \[withscores] \[limit offset count]

   同上，改为从大到小排列。
5. zincrby \<key> \<increment> \<value>

   为元素的score加上增量
6. zrem \<key> \<value>&#x20;

   删除该集合下，指定值的元素
7. zcount \<key> \<min> \<max>

   统计该集合，分数区间内的元素个数
8. zrank \<key> \<value>

   返回该值在集合中的排名，从0开始。
