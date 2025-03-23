# MySQL操作语句

## 目录

- [表级操作DDL：](#表级操作DDL)
  - [创建包](#创建包)
  - [删除包](#删除包)
  - [查看有什么包](#查看有什么包)
  - [使用包](#使用包)
  - [创建表](#创建表)
  - [插入字段](#插入字段)
  - [删除字段](#删除字段)
  - [修改字段](#修改字段)
  - [修改表名称](#修改表名称)
  - [查看表结构](#查看表结构)
  - [查看使用的数据库中所有的表格](#查看使用的数据库中所有的表格)
  - [删除表](#删除表)
- [字段操作DML](#字段操作DML)
  - [增加数据](#增加数据)
  - [修改数据](#修改数据)
  - [删除数据](#删除数据)
  - [查询数据](#查询数据)

### 表级操作DDL：

#### 创建包

```sql
create database 包名;
```


#### 删除包

```sql
drop database 包名;
```


#### 查看有什么包

```sql
show databases;
```


#### 使用包

```sql
use 包名
```


#### 创建表

```sql
create table 表名 (
  字段名 字段类型 primary key;
    字段名 字段类型 unique key;
    字段名 字段类型 not null;
);
```


#### 插入字段

```sql
alter table 表名 add 新字段 新字段类型;
alter table 表名 add 新字段 新字段类型 first;
alter table 表名 add 新字段 新字段类型 after 另一个字段;
```


#### 删除字段

```sql
alter table 表名 drop 字段 字段类型;
```


#### 修改字段

```sql
alter table 表名 modify 字段 新字段类型;
alter table 表名 change 旧字段名 新字段 新字段类型;
alter table 表名 modify 字段 字段类型 first;
alter table 表名 modify 字段 字段类型 after 另一个字段;
```


#### 修改表名称

```sql
alter table 旧表名 rename 新表名;
rename 旧表名 to 新表名;
```


#### 查看表结构

```sql
desc 表名;
describe 表名;
```


#### 查看使用的数据库中所有的表格

```sql
show tables;
show table from 数据库名;
```


#### **删除表**

```sql
drop table 表名;
```


### 字段操作DML

#### 增加数据

```sql
insert into 表名 values(字段名 字段类型);
insert into 表名 values(字段名 字段类型),(字段名 字段类型),(字段名 字段类型);
insert into 表名(部分字段列表) values(字段名 字段类型),(字段名 字段类型),(字段名 字段类型);
```


#### **修改数据**

```sql
update 表名称 set 字段一=值，字段二=值 where 条件;
```


#### **删除数据**

```sql
delete from 表名 where 条件;
truncate 表名称;/*不能回滚*/
```


#### 查询数据

```sql
select 字段列表 from 表名称 where 条件;
```
