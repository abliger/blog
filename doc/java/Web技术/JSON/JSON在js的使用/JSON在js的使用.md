# JSON 在 js 的使用

1. JOSN 的 6 种数据类型

   上面两种 JSON 形式内部都是包含 value 的，那 JSON 的 value 到底有哪些类型，而且上期我们说 JSON 其实就是从 Js 数据格式中提取了一个子集，那具体有哪几种数据类型呢？

   1. string：字符串，必须要用双引号引起来。
   2. number：数值，与 JavaScript 的 number 一致，整数（不使用小数点或指数计数法）最多为 _15_ 位。小数的最大位数是 _17_。
   3. object：JavaScript 的对象形式，{ key:value }表示方式，可嵌套。
   4. array：数组，JavaScript 的 Array 表示方式\[ value ]，可嵌套。
   5. true/false：布尔类型，JavaScript 的 boolean 类型。
   6. null：空值，JavaScript 的 null。

2. JSON 写在大括号里面，以键值对 key：value 的形式进行存储，可以进行嵌套

   ```json twoslash
   {
     "key1":213,
     "key2":"value",
     "key3":ture,
     "key4":[1,"123",true],
     "employees": [
     { "firstName":"Bill" , "lastName":"Gates" },
     { "firstName":"George" , "lastName":"Bush" },
     { "firstName":"Thomas" , "lastName":"Carter" }]
   }
   ```

3. JSON 的调用,并赋值给 html 标签内容

   ```html
   <html>
     <body>
       <h2>在 JavaScript 中创建 JSON 对象</h2>

       <p>
         Name: <span id="jname"></span><br />
         Age: <span id="jage"></span><br />
         Address: <span id="jstreet"></span><br />
         Phone: <span id="jphone"></span><br />
       </p>

       <script type="text/javascript">
         var JSONObject = {
           name: "Bill Gates",
           street: "Fifth Avenue New York 666",
           age: 56,
           phone: "555 1234567",
         };
         document.getElementById("jname").innerHTML = JSONObject.name;
         document.getElementById("jage").innerHTML = JSONObject.age;
         document.getElementById("jstreet").innerHTML = JSONObject.street;
         document.getElementById("jphone").innerHTML = JSONObject.phone;
       </script>
     </body>
   </html>
   ```

4. JSON 实例 -转换来自字符串的对象

   创建包含 JSON 语法的 JavaScript 字符串：

   ```json
   var txt = '{ "employees" : [' +
   '{ "firstName":"Bill" , "lastName":"Gates" },' +
   '{ "firstName":"George" , "lastName":"Bush" },' +
   '{ "firstName":"Thomas" , "lastName":"Carter" } ]}';
   ```

   &#x20; 由于 JSON 语法是 JavaScript 语法的子集，JavaScript 函数 eval() 可用于将 JSON 文本转换为 JavaScript 对象。

   &#x20; eval() 函数使用的是 JavaScript 编译器，可解析 JSON 文本，然后生成 JavaScript 对象。必须把文本包围在括号中，这样才能避免语法错误：

   `var obj = eval ("(" + txt + ")");`

5. JSON 的两个常用方法

   我们常用说的 json 数据有两种格式.

   一种是 json 对象,一种是 json 字符串

   JSON.stringify() 可以把 json 对象转换为 json 字符串

   JSON.parse() 把 json 字符串转换为 json 对象

   ```js twoslash
   // 把json对象转换为json字符串
   var s = JSON.stringify(jsonObj);
   alert(s); // json字符串

   // 把json字符串转换为json对象
   var obj = JSON.parse(s);
   alert(obj);
   ```
