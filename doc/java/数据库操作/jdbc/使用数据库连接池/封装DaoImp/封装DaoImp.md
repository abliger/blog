# 封装DaoImp

```java
    //通用的增、删、改
    public int update(String sql, Object... args)throws SQLException {
        //获取连接
        Connection connection = JDBCToolsFinal.getConnection();

        //编写sql，因为在这里无法确定sql，所以通过传参的方式把sql传入
        PreparedStatement pst = connection.prepareStatement(sql);

        //设置？的值
        //在当前方法里面无法确定？的个数，也无法确定要设置的值的类型，可能是字符串，可能是int，可能是double...
        //通过可变参数处理，可变参数的类型使用Object,是希望可以接收各种数据类型
        //可变参数的数组的长度，决定了？的个数
        for (int i=0; i<args.length; i++){
            pst.setObject(i+1, args[i] ); //i+1，是因为?的下标是从1开始
        }

        //执行sql
        int len = pst.executeUpdate();

        //别忘了关闭连接
        pst.close();
//        JDBCToolsFinal.close();//不关连接，事务结束后关闭

        return len;
    }

    /*
    通用的查询方法：
    查询的情况很复杂：
    （1）多个Java对象
    （2）一个Java对象
    （3）单个值
    （4）多行多列的结果，但是又没有Java对象对应的，例如：每一个部门的平均工资
    ...

    通用的查询多个Java对象的方法：
    适用于：查询所有员工，查询所有部门
           查询薪资高于xx的员工
           查询在xx部门的员工
           ...
     */
    public <T> List<T> getList(Class<T> clazz, String sql, Object... args)throws Exception{
        //获取连接
        Connection connection = JDBCToolsFinal.getConnection();

        PreparedStatement pst = connection.prepareStatement(sql);

        //设置？的值
        for (int i=0; i<args.length; i++){
            pst.setObject(i+1, args[i] ); //i+1，是因为?的下标是从1开始
        }

        //执行sql
        ResultSet resultSet = pst.executeQuery();

        List<T> list = new ArrayList<>();

        /*
        通过结果集获取它的元数据对象ResultSetMetaData,目的是获取此 ResultSet 对象的列的编号、类型和属性
         */


        ResultSetMetaData metaData = resultSet.getMetaData();
        //从结果集的元数据对象ResultSetMetaData中，获取属性的个数
        int dataColumnCount = metaData.getColumnCount();

        //遍历结果集
        while(resultSet.next()){//while循环循环一次，代表一行，即代表一个Java对象
            /*
            (1)创建对象
            (2)把结果集中的每一行的每一个单元格中的值取出来给对象的某个属性赋值
            (3)加入到List集合中
             */
//            T t = new T();//无法通过编译，如何创建T 的对象呢
            /*
            创建对象的两种方式：
            （1）直接调用构造器new对象，要求必须在编译时（写代码）已知这个类型
            （2）反射
            要么调用Class对象newInstance()，要么通过Class对象获取构造器Constructor对象，再newInstance(..)

             需要T类型的Class对象，当前方法中无法直接获取Class对象，考虑使用形参传入
             */
            T t = clazz.newInstance(); //要求T类型必须有可访问无参构造

            //把结果集中的数据拿出来给t的属性赋值
            /*
            (1)不知道对象的属性的个数
            方式一：通过Class对象.getDeclaredFields()获取Field[]，数组的长度就是属性的个数
            方式二：使用结果集的元数据ResultSetMetaData
            (2)不知道对象的属性名
            方式一：遍历Field[]数组，可以调用Field对象.getName()获取属性
            方式二：使用结果集的元数据ResultSetMetaData

            方式一有点问题：
            Javabean的属性的个数可能与表格中的字段的个数，甚至可能和select后面的字段数量对不上。
            Javabean的属性的名称和表格中的字段的名字对不上。

            方式二：结果集ResultSet对象可以获取结果集的元数据对象：ResultSetMetaData
            ResultSetMetaData getMetaData()：获取此 ResultSet 对象的列的编号、类型和属性

             */
            //for循环循环一次，代表处理一个属性
            //for循环循环一轮是代表处理一个Java对象的所有属性
            for(int i=0; i<dataColumnCount; i++){
                //获取属性的名称
//                String fieldName = metaData.getColumnName(i+1);//数据库中列的下标从1开始  getColumnName是获取表中的列的名称
                String fieldName = metaData.getColumnLabel(i+1);//数据库中列的下标从1开始  getColumnLabel是可以获取字段的别名，没有别名获取原名称

                //通过反射获取Field对象
                Field field = clazz.getDeclaredField(fieldName);

                //因为属性往往是私有的
                field.setAccessible(true);
                
                //从结果集ResultSet中获取值
                Object value = resultSet.getObject(i + 1);

                //设置field对象的值
                field.set(t, value);
            }

            list.add(t);
        }

        //别忘了关闭连接
        resultSet.close();
        pst.close();
//        JDBCToolsFinal.close();
//不关连接，事务结束后关闭
        return list;
    }

    //通用的查询一个Java对象的方法
/*    public <T> Optional<T> getBean(Class<T> clazz, String sql, Object... args)throws Exception{
//        return getList(clazz,sql,args).get(0);//风险是下标越界
        List<T> list = getList(clazz, sql, args);
        if(list.size()>0){
            return Optional.of(getList(clazz,sql,args).get(0));
        }
        return Optional.empty();
    }*/
    public <T> T getBean(Class<T> clazz, String sql, Object... args)throws Exception{
//        return getList(clazz,sql,args).get(0);//风险是下标越界
        List<T> list = getList(clazz, sql, args);
        if(list.size()>0){
            return getList(clazz,sql,args).get(0);
        }
        return null;//注意，调用该方法的位置，要做非空判断
    }

    //通用的查询单个值的方法
    /*
    select count(*) from t_employee;
    select avg(salary) from t_employee;
    select tel from t_employeee where eid = ?;
     */
    public Object getValue(String sql, Object... args)throws SQLException{
        //获取连接
        Connection connection = JDBCToolsFinal.getConnection();

        PreparedStatement pst = connection.prepareStatement(sql);

        //设置？的值
        for (int i=0; i<args.length; i++){
            pst.setObject(i+1, args[i] ); //i+1，是因为?的下标是从1开始
        }

        //执行sql
        ResultSet resultSet = pst.executeQuery();

        Object value = null;
        if(resultSet.next()){//只有一个值，一行
            value =  resultSet.getObject(1);//一行一列
        }

        //别忘了关闭连接
        resultSet.close();
        pst.close();
//        JDBCToolsFinal.close();//不关连接，事务结束后关闭
        return value;
    }
    /*
    例如：
    select did,avg(salary) from t_employee group by did;
        多行多列，每一行又不是Javabean对象
        +------+----------------------+
        | did  | ROUND(AVG(salary),2) |
        +------+----------------------+
        | NULL |             12666.67 |
        |    1 |             19945.47 |
        |    2 |             11708.50 |
        |    3 |             70223.00 |
        |    4 |             12332.00 |
        |    5 |             11065.50 |
        +------+----------------------+
        6 rows in set (0.00 sec)

        每一行是一个Map，多行放到List中。
        每一行的Map的key是 标题， value是该标题对应的值
        例如：第一行：
                    +------+----------------------+
                    | did  | ROUND(AVG(salary),2) |
                    +------+----------------------+
                    | NULL |             12666.67 |

                    map：
                    ("did", null)
                    ("ROUND(AVG(salary)",2),  12666.67 )
             第二行：
                    +------+----------------------+
                    | did  | ROUND(AVG(salary),2) |
                    +------+----------------------+
                    |    1 |             19945.47 |

                    map：
                    ("did",1)
                    ("ROUND(AVG(salary),2)", 19945.47)
                    ...

    或者
    select did,avg(salary),max(salary),count(*) from t_employee group by did;
     */
    public List<Map<String,Object>> getMapList(String sql, Object... args)throws SQLException{
        //获取连接
        Connection connection = JDBCToolsFinal.getConnection();

        PreparedStatement pst = connection.prepareStatement(sql);

        //设置？的值
        for (int i=0; i<args.length; i++){
            pst.setObject(i+1, args[i] ); //i+1，是因为?的下标是从1开始
        }

        //执行sql
        ResultSet resultSet = pst.executeQuery();

        //获取结果集的元数据对象
        ResultSetMetaData metaData = resultSet.getMetaData();
        int columnCount = metaData.getColumnCount();

        List<Map<String,Object>> list = new ArrayList<>();

        while(resultSet.next()){
        //每一行是一个Map
            HashMap<String,Object> map = new HashMap<>();

            //取出标题和值
            for(int i=0; i<columnCount; i++){
                String title = metaData.getColumnLabel(i+1);
                Object value = resultSet.getObject(i+1);
                map.put(title, value);
            }

            list.add(map);//把map对象添加到list中
        }

        //别忘了关闭连接
        resultSet.close();
        pst.close();
//        JDBCToolsFinal.close();
//不关连接，事务结束后关闭
        return  list;
}

```
