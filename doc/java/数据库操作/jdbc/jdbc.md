# jdbc

## 目录

- [基本 JDBC 处理](#基本JDBC处理)
  - [操作或访问数据库](#操作或访问数据库)
  - [Statement](#Statement)
  - [ResultSet](#ResultSet)
- [使用 prepareStatement 不使用 Statement 的原因](#使用prepareStatement不使用Statement的原因)
  - [SQL 拼接](#SQL拼接)
  - [SQL 注入](#SQL注入)
  - [处理 Blob 类型的数据](#处理Blob类型的数据)
  - [PreparedStatement vs Statement](#PreparedStatement-vs-Statement)
- [后期处理](#后期处理)

[ DatabaseMetaData](DatabaseMetaData/DatabaseMetaData.md " DatabaseMetaData")

[JDBC 笔记.md](file/JDBC笔记_UzwG7LwhBd.md " JDBC笔记.md")

[mysql-connector-java-5.0.8-bin.jar](file/mysql-connector-java-5.0.8-bin_eCKZGbFSPS.jar " mysql-connector-java-5.0.8-bin.jar")

[尚硅谷-柴林燕-JDBC.docx](file/尚硅谷-柴林燕-JDBC_i7MLnlUFvr.docx " 尚硅谷-柴林燕-JDBC.docx")

### 基本 JDBC 处理

1. 注册驱动
2. 链接数据库，获得链接对象
3. 是否开启事务
4. 编写 sql 语句
5. 执行 sql 语句
6. 获得结果集
7. 获得元数据
8. 判断/遍历结果集
9. 是否使用批处理
10. 关闭资源、事务

#### 操作或访问数据库

数据库连接被用于向数据库服务器发送命令和 SQL 语句，并接受数据库服务器返回的结果。

其实一个数据库连接就是一个 Socket 连接。

在 java.sql 包中有 3 个接口分别定义了对数据库的调用的不同方式：

1. Statement：用于执行静态 SQL 语句并返回它所生成结果的对象。
2. PrepatedStatement：SQL 语句被预编译并存储在此对象中，然后可以使用此对象多次高效地执行该语句。
3. CallableStatement：用于执行 SQL 存储过程

#### Statement

通过调用 Connection 对象的 createStatement() 方法创建该对象

该对象用于执行静态的 SQL 语句，并且返回执行结果

Statement 接口中定义了下列方法用于执行 SQL 语句：

int excuteUpdate(String sql)：执行更新操作 INSERT、UPDATE、DELETE

ResultSet excuteQuery(String sql)：执行查询操作 SELECT

#### ResultSet

通过调用 Statement 对象的 excuteQuery() 方法创建该对象

ResultSet 对象以逻辑表格的形式封装了执行数据库操作的结果集，ResultSet 接口由数据库厂商实现

ResultSet 对象维护了一个指向当前数据行的**游标**，初始的时候，游标在第一行之前，可以通过 ResultSet 对象的 next() 方法移动到下一行

ResultSet 接口的常用方法：

1. boolean next()
2. getXxx(String columnLabel)：columnLabel 使用 SQL AS 子句指定的列标签。如果未指定 SQL AS 子句，则标签是列名称
3. getXxx(int index) :索引从 1 开始

- 代码

  ```java
  public class TestPreparedStatement {
    @Test
    public void add() throws Exception {
      Scanner input = new Scanner(System.in);
      System.out.println("请输入姓名：");
      String name = input.nextLine();

      System.out.println("请输入手机号码：");
      String tel = input.nextLine();

      System.out.println("请输入性别：");
      String gender = input.nextLine();

      System.out.println("请输入薪资：");
      double salary = input.nextDouble();

      System.out.println("请输入部门编号：");
      int did = input.nextInt();

      //1、连接数据库
      Class.forName("com.mysql.jdbc.Driver");

      String url = "jdbc:mysql://localhost:3306/test";
      String user = "root";
      String password = "123456";
      Connection conn = DriverManager.getConnection(url, user, password);

      //2、编写带？的SQL
      String sql = "INSERT INTO t_employee (ename,tel,gender,salary,did) VALUES(?,?,?,?,?)";

      // 3、准备一个PreparedStatement：预编译sql
      PreparedStatement pst = conn.prepareStatement(sql);// 对带？的sql进行预编译

      // 4、把?用具体的值进行代替
      pst.setString(1, name);
      pst.setString(2, tel);
      pst.setString(3, gender);
      pst.setDouble(4, salary);
      pst.setInt(5, did);

      // 5、执行sql
      int len = pst.executeUpdate();
      System.out.println(len>0?"添加成功":"添加失败");

      // 6、释放资源
      pst.close();
      conn.close();
    }

    @Test
    public void select() throws Exception {
      Scanner input = new Scanner(System.in);
      System.out.println("请输入姓名：");
      String name = input.nextLine();

      //1、连接数据库
      Class.forName("com.mysql.jdbc.Driver");

      String url = "jdbc:mysql://localhost:3306/test";
      String user = "root";
      String password = "123456";
      Connection conn = DriverManager.getConnection(url, user, password);

      //2、编写带?的sql
      //孙红雷  ' or '1' = '1
      String sql = "SELECT eid,ename,tel,gender,salary FROM t_employee WHERE ename = ?";

      // 3、把带？的sql语句进行预编译
      PreparedStatement pst = conn.prepareStatement(sql);

      // 4、把？用具体的变量的赋值
      pst.setString(1, name);

      // 5、执行sql
      ResultSet rs = pst.executeQuery();
      while (rs.next()) {
        int id = rs.getInt("eid");
        String ename = rs.getString("ename");
        String tel = rs.getString("tel");
        String gender = rs.getString("gender");
        double salary = rs.getDouble("salary");

        System.out.println(id + "\t" + ename + "\t" + tel + "\t" + gender + "\t" + salary);
      }

      // 6、释放资源
      rs.close();
      pst.close();
      conn.close();
    }

    @Test
    public void addBlob() throws Exception {
      Scanner input = new Scanner(System.in);
      System.out.println("请输入用户名：");
      String username = input.nextLine();

      System.out.println("请输入密码：");
      String pwd = input.nextLine();

      System.out.println("请指定照片的路径：");
      String photoPath = input.nextLine();

      //1、连接数据库
      Class.forName("com.mysql.jdbc.Driver");

      String url = "jdbc:mysql://localhost:3306/test";
      String user = "root";
      String password = "123456";
      Connection conn = DriverManager.getConnection(url, user, password);

      //2、 INSERT INTO `user` VALUES(NULL,用户名,密码,照片)
      String sql = "INSERT INTO `user` (username,`password`,head_picture)VALUES(?,?,?)";

      // 3、准备一个PreparedStatement：预编译sql
      PreparedStatement pst = conn.prepareStatement(sql);// 对带？的sql进行预编译

      // 4、对？进行设置
      pst.setString(1, username);
      pst.setString(2, pwd);
      pst.setBlob(3, new FileInputStream(photoPath));

      // 5、执行sql
      int len = pst.executeUpdate();
      System.out.println(len > 0 ? "添加成功" : "添加失败");

      // 6、释放资源
      pst.close();
      conn.close();
    }
  }

  ```

---

### 使用 prepareStatement 不使用 Statement 的原因

#### SQL 拼接

```java
    String sql = "insert into t_employee(ename,tel,gender,salary) values('" + ename + "','" + tel + "','" + gender + "'," + salary +")";
    Statement st = conn.createStatement();
    int len = st.executeUpdate(sql);
```

#### SQL 注入

SQL 注入是利用某些系统没有对用户输入的数据进行充分的检查，而在用户输入数据中注入非法的 SQL 语句段或命令，从而利用系统的 SQL 引擎完成恶意行为的做法。对于 Java 而言，要防范 SQL 注入，只要用 PreparedStatement 取代 Statement 就可以了。

```java
    String sql = "SELECT * FROM t_employee where ename='" + ename + "'";
    //如果我此时从键盘输入ename值的时候，输入：张三' or '1'= '1
    //结果会把所有数据都查询出来
    Statement st = conn.createStatement();
    ResultSet rs = st.executeQuery(sql);
```

#### 处理 Blob 类型的数据

BLOB (binary large object)，二进制大对象，BLOB 常常是数据库中用来存储二进制文件的字段类型。

插入 BLOB 类型的数据必须使用 PreparedStatement，因为 BLOB 类型的数据无法使用字符串拼接写的。

MySQL 的四种 BLOB 类型(除了在存储的最大信息量上不同外，他们是等同的)

#### PreparedStatement vs Statement

1. 代码的可读性和可维护性. Statement 的 sql 拼接是个难题。
2. PreparedStatement 可以防止 SQL 注入
3. PreparedStatement 可以处理 Blob 类型的数据
4. PreparedStatement 能最大可能提高性能：**（Oracle**和 PostgreSQL8**是这样，但是对于 MySQL**不一定比 Statement 高）
5. DBServer 会对预编译语句提供性能优化。因为预编译语句有可能被重复调用，所以语句在被 DBServer 的编译器编译后的执行代码被缓存下来，那么下次调用时只要是相同的预编译语句就不需要编译，只要将参数直接传入编译过的语句执行代码中就会得到执行。

### 后期处理

- 插入时获取自增长主键

  ```java
  /*
   * 我们通过JDBC往数据库的表格中添加一条记录，其中有一个字段是自增的，那么在JDBC这边怎么在添加之后直接获取到这个自增的值
   * PreparedStatement是Statement的子接口。
   * Statement接口中有一些常量值：
   * （1）Statement.RETURN_GENERATED_KEYS
   *
   * 要先添加后获取到自增的key值：
   * （1）PreparedStatement pst = conn.prepareStatement(sql,Statement.RETURN_GENERATED_KEYS);
   * （2）添加sql执行完成后,通过PreparedStatement的对象调用getGeneratedKeys()方法来获取自增长键值，遍历结果集
   *     ResultSet rs = pst.getGeneratedKeys();
   */
  public class TestAutoIncrement {
    public static void main(String[] args) throws Exception{
      //1、注册驱动
      Class.forName("com.mysql.jdbc.Driver");

      //2、获取连接
      Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/test", "root", "123456");

      //3、执行sql
      String sql = "insert into t_department values(null,?,?)";
      /*
       * 这里在创建PreparedStatement对象时，传入第二个参数的作用，就是告知服务器端
       * 当执行完sql后，把自增的key值返回来。
       */
      PreparedStatement pst = conn.prepareStatement(sql,Statement.RETURN_GENERATED_KEYS);

      //设置？的值
      pst.setObject(1, "测试部");
      pst.setObject(2, "测试项目数据");

      //执行sql
      int len = pst.executeUpdate();//返回影响的记录数
      if(len>0){
        //从pst中获取到服务器端返回的键值
        ResultSet rs = pst.getGeneratedKeys();
        //因为这里的key值可能多个，因为insert语句可以同时添加多行，所以用ResultSet封装
        //这里因为只添加一条，所以用if判断
        if(rs.next()){
          Object key = rs.getObject(1);
          System.out.println("自增的key值did =" + key);
        }
      }

      //4、关闭
      pst.close();
      conn.close();
    }
  }
  ```

- 事务操作

  ```java
  /*
   * mysql默认每一个连接是自动提交事务的。
   * 那么当我们在JDBC这段，如果有多条语句想要组成一个事务一起执行的话，那么在JDBC这边怎么设置手动提交事务呢？
   * (1)在执行之前，设置手动提交事务
   * Connection的对象.setAutoCommit(false)
   * (2)成功：
   * Connection的对象.commit();
   * 失败：
   * Connection的对象.rollback();
   *
   * 补充说明：
   * 为了大家养成要的习惯，在关闭Connection的对象之前，把连接对象设置回自动提交
   * (3)Connection的对象.setAutoCommit(true)
   *
   * 因为我们现在的连接是建立新的连接，那么如果没有还原为自动提交，没有影响。
   * 但是我们后面实际开发中，每次获取的连接，不一定是新的连接，而是从连接池中获取的旧的连接，而且你关闭也不是真关闭，而是还给连接池，供别人接着用。以防别人拿到后，以为是自动提交的，而没有commit，最终数据没有成功。
   */
  public class TestTransaction {
    public static void main(String[] args) throws Exception{
      /*
       * 一般涉及到事务处理的话，那么业务逻辑都会比较复杂。
       * 例如：购物车结算时：
       * （1）在订单表中添加一条记录
       * （2）在订单明细表中添加多条订单明细的记录（表示该订单买了什么东西）
       * （3）修改商品表的销量和库存量
       * ...
       * 那么我们今天为了大家关注事务的操作，而不会因为复杂的业务逻辑的影响导致我们的理解，那么我们这里故意
       * 用两条修改语句来模拟组成一个简单的事务。
       * update t_department set description = 'xx' where did = 2;
       * update t_department set description = 'yy' where did = 3;
       *
       * 我希望这两天语句要么一起成功，要么一起回滚
       * 为了制造失败，我故意把第二条语句写错
       * update t_department set description = 'yy' （少了where） did = 3;
       */

      //1、注册驱动
      Class.forName("com.mysql.jdbc.Driver");

      //2、获取连接
      Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/test", "root", "123456");

      //设置手动提交事务
      conn.setAutoCommit(false);

      //3、执行sql
      String sql1 = "update t_department set description = 'xx' where did = 2";
      String sql2 = "update t_department set description = 'yy' did = 3";//这是错的

      //使用prepareStatement的sql也可以不带?
      PreparedStatement pst = null;
      try {
        pst = conn.prepareStatement(sql1);
        int len = pst.executeUpdate();
        System.out.println("第一条：" + (len>0?"成功":"失败"));

        pst = conn.prepareStatement(sql2);
        len = pst.executeUpdate();
        System.out.println("第二条：" + (len>0?"成功":"失败"));

        //都成功了，就提交事务
        System.out.println("提交");
        conn.commit();
      } catch (Exception e) {
        System.out.println("回滚");
        //失败要回滚
        conn.rollback();
      }

      //4、关闭
      pst.close();
      conn.setAutoCommit(true);//还原为自动提交
      conn.close();
    }
  }
  ```

- 批处理

  当需要成批插入或者更新记录时。可以采用 Java 的批量更新机制，这一机制允许多条语句一次性提交给数据库批量处理。通常情况下比单独提交处理更有效率。

  JDBC 的批量处理语句包括下面两个方法：

  addBatch()：添加需要批量处理的 SQL 语句或参数

  executeBatch()：执行批量处理语句；

  通常我们会遇到两种批量执行 SQL 语句的情况：

  多条 SQL 语句的批量处理；

  一个 SQL 语句的批量传参；

  注意：

  **JDBC 连接 MySQL**时，如果要使用批处理功能，请再 url 中加参数?rewriteBatchedStatements=true

  **PreparedStatement 作批处理"插入“时使用 values**（使用 value 没有效果）

  ```java
  public class TestBatch {
    @Test
    public void noBatch()throws Exception{
      Class.forName("com.mysql.jdbc.Driver");

      String url = "jdbc:mysql://localhost:3306/test";
      String user = "root";
      String password = "123456";
      Connection conn = DriverManager.getConnection(url, user, password);


          String sql = "INSERT INTO t_department(dname,description) VALUES(?,?)";
          PreparedStatement st = conn.prepareStatement(sql);

          for(int i=0; i<1000; i++){
            st.setString(1, "测试部门" + i);
            st.setString(2, "测试部门描述"  + i);

            st.executeUpdate();
          }

      st.close();
      conn.close();
    }

    @Test
    public void useBatch()throws Exception{
      Class.forName("com.mysql.jdbc.Driver");

      String url = "jdbc:mysql://localhost:3306/test?rewriteBatchedStatements=true";
      String user = "root";
      String password = "123456";
      Connection conn = DriverManager.getConnection(url, user, password);


          String sql = "INSERT INTO t_department(dname,description) VALUES(?,?)";
          PreparedStatement st = conn.prepareStatement(sql);

          for(int i=0; i<1000; i++){
            st.setString(1, "测试部门" + i);
            st.setString(2, "测试部门描述"  + i);

            st.addBatch();
          }

          st.executeBatch();

      st.close();
      conn.close();
    }
  }

  ```

[使用数据库连接池](使用数据库连接池/使用数据库连接池.md "使用数据库连接池")

[Apache—DBUtils](Apache—DBUtils/Apache—DBUtils.md "Apache—DBUtils")
