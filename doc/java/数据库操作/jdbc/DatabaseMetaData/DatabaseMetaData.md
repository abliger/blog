# &#x20;DatabaseMetaData

## 目录

- [一、数据库元数据](#一数据库元数据)
- [二、参数元数据](#二参数元数据)
- [三、结果集元数据](#三结果集元数据)

## **一、数据库元数据**

JDBC获取数据库元数据的相关API：

- DatabaseMetaData conn.getMetaData() —— 获取一个 **DatabaseMetaData** 对象，该对象包含关于此 **Connection** 对象所连接的数据库的元数据。
- String getDatabaseProductName() —— 获取此数据库产品的名称
- String getDatabaseProductVersion() —— 获取此数据库产品的版本号
- String getURL() —— 获取此DBMS的URL
- String getUserName() —— 获取此数据库的已知的用户名称

示例：

```json
// 参数：

// jdbc协议:postgresql子协议://主机地址:数据库端口号/要连接的数据库名

String url = "jdbc:postgresql://localhost:5432/test2";

// 数据库用户名

String user = "postgres";

// 数据库密码

String password = "123456";

// 1. 加载Driver类，Driver类对象将自动被注册到DriverManager类中

Class.forName("org.postgresql.Driver");

// 2. 连接数据库，返回连接对象

Connection conn = DriverManager.getConnection(url, user, password);

// 3. 获取数据库元数据，并打印

DatabaseMetaData metaData = conn.getMetaData();    // 获取DatabaseMetaData对象

System.out.println(metaData.getDatabaseProductName());  // 打印数据库产品的名称

System.out.println(metaData.getDatabaseProductVersion());  // 打印数据库版本号

System.out.println(metaData.getURL());      // 打印数据库的URL

System.out.println(metaData.getUserName());    // 打印数据库的用户名

// 4. 关闭与数据库的连接

conn.close();
```


控制台结果：

![](https://pic4.zhimg.com/80/v2-5d68c00fdc98b241fb5d67e62fa21e33_1440w.jpg)

## **二、参数元数据**

JDBC获取预编译SQL语句参数的相关API:

- ParameterMetaData pstmt.getParameterMetaData() —— 返回一个 **ParameterMetaData** 对象，它包含有关此 **PreparedStatement** 对象的每个参数标记的编号、类型和属性的信息
- int getParameterCount() —— 获取 PreparedStatement 对象中的参数的数量。

示例：

```json
// 省略参数代码...

// 1. 加载Driver类，Driver类对象将自动被注册到DriverManager类中

Class.forName("org.postgresql.Driver");

// 2. 连接数据库，返回连接对象

Connection conn = DriverManager.getConnection(url, user, password);

// 3. 预编译SQL语句

String sql = "INSERT INTO Student(Sno, Sname, Ssex, Sage, Sdept) VALUES(?, ?, ?, ?, ?);";

    PreparedStatement pstmt = conn.prepareStatement(sql);

    // 4. 获取预编译SQL语句的参数，并打印

    ParameterMetaData pMetaData = pstmt.getParameterMetaData();

    System.out.println(pMetaData.getParameterCount());    
    // 打印预编译SQL语句中参数的数量
    // 5. 关闭与数据库的连接
    conn.close();
```


## **三、结果集元数据**

JDBC获取结果集元数据的相关API:

- ResultSetMetaData getMetaData() —— 返回一个 **ResultSetMetaData** 对象，它包含查询结果集ResultSet对象的元数据。
- int getColumnCount() —— 返回此 ResultSet 对象中的列数。
- String getColumnName(int column) —— 获取指定列的名称。

示例：

```json
// 省略参数代码...

// 1. 加载Driver类，Driver类对象将自动被注册到DriverManager类中

Class.forName("org.postgresql.Driver");

// 2. 连接数据库，返回连接对象

Connection conn = DriverManager.getConnection(url, user, password);

// 3。 预编译SQL语句并执行

String sql = "SELECT * FROM Student;";

PreparedStatement pstmt = conn.prepareStatement(sql);

ResultSet rs = pstmt.executeQuery();

// 4. 获取查询结果集的元数据，并打印

ResultSetMetaData rMetaData = rs.getMetaData();

for(int i = 1; i <= rMetaData.getColumnCount(); i++) {

System.out.println(rMetaData.getColumnName(i));    // 打印各个列的列名

};

// 5. 关闭与数据库的连接

conn.close();
```


控制台结果：

![](https://picb.zhimg.com/80/v2-132508bcf3e25ea3391986ce9a5edf0c_1440w.jpg)
