# MyBatis的注解使用方式

## 目录

- [注解的使用示例:](#注解的使用示例)
- [mybatis-config.xml配置文件中导入](#mybatis-configxml配置文件中导入)

## 注解的使用示例:

```java
//读操作@Select  写@Update
public interface UserMapper {
    @Select("select id,last_name userName ,sex from t_user where id = #{id}")
    User selectUser(int id);
    @Select("select id,last_name userName ,sex from t_user")
    List<User> selectUserList();
    @Update("update t_user set last_name = #{lastName}, sex = #{sex} where id = #{id}")
    int updateUser(User user);
    @Delete("delete from t_user where id = #{id}")
    int deleteUserById(int id);
    /
     * @SelectKey注解相当于之前的selectKey标签 <br/>
     * statement属性是sql语句 <br/>
     * before属性设置是否先执行selectKey标签的sql语句 <br/>
     * keyProperty属性设置返回的主键值注入到JavaBean的哪个属性中<br/>
     * @param user
     * @return
     */
    @Insert("insert into t_user(`last_name`,`sex`) values(#{lastName},#{sex})")
    @SelectKey(before = false, keyProperty = "id", resultType = Integer.class, statement = { "select last_insert_id()" })
    int insertUser(User user);
}
查询一定使用select,写操作可以使用@Update进行通用
```


## mybatis-config.xml配置文件中导入

```xml
<mappers>
    <package name="com.atguigu.mapper"/>
</mappers>
```
