# MySQL

## 目录

- [Mysql基础](#Mysql基础)
- [（1） 名词解释](#1-名词解释)
- [（2）Mysql的使用：](#2Mysql的使用)
- [（3）Mysql的数据类型](#3Mysql的数据类型)
- [（4）运算符](#4运算符)
- [（5） mysql语法规范](#5-mysql语法规范)

#### Mysql基础

#### （1） 名词解释

db：database 数据库

dbms：database management system

sql：structrue query language

#### （2）Mysql的使用：

net start mysql服务名

net stop mysql服务名

#### （3）Mysql的数据类型

- 数值类型
  - 整型 tinyint 、smallint、int、 bigint
  - 浮点型 float、double
  - 定点型 decimal
  - 位类型 bit
  - 从零填充 需要与unsigned zerofill一起使用
  - 浮点类型需要表示数据范围，不表示或超出范围会报错、整型默认M=11,超出M后不超出整型的范围即可
- 日期时间类型
  - date
  - year
  - time
  - datetime
  - timetamp
- 字符串类型
  - char
  - varchar 需要指定范围
  - text tinytext mediumtext longtext
  - tinyblob blob mediumblob longblob
  - binary varbinary
  - enum 类型 多选一
  - set 类型 多选多

#### （4）运算符

- 算数运算符 +- \*/%、div、mod
- 比较运算符 ><= 、>= <= != <=>
- 逻辑运算符 && || ! ^ and or not xor
- 范围运算符 between X and Y、not between X and Y

  in（）、not in （）
- 模糊查询、正则匹配 like ‘XXX’ 、regexp ‘正则’
- 位运算
- null处理 is null、not is null、<=>null

#### （5） mysql语法规范

- 不区分大小写
- 使用英文字母、数字和下划线
- 表名、字段名不要和关键字重复，如果重复使用飘号\`
- 表名、字段名不要包含空格
- 在相同的级别下不能重名

[MySQL操作语句](MySQL操作语句/MySQL操作语句.md "MySQL操作语句")

[约束和索引](约束和索引/约束和索引.md "约束和索引")

[函数](函数/函数.md "函数")

[事务](事务/事务.md "事务")
