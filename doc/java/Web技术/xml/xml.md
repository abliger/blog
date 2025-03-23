# xml

## 目录

- [xml解析](#xml解析)
- [dom4j 编程步骤：](#dom4j-编程步骤)
  - [遍历 标签 获取所有标签中的内容](#遍历-标签-获取所有标签中的内容)

[05\_尚硅谷\_xml\_王振国 - 课堂笔记.doc](<file/05_尚硅谷_xml_王振国 - 课堂笔记_NoLhc-mRvY.doc> "/ 05_尚硅谷_xml_王振国 - 课堂笔记.doc")

注意：

1.文本区域（CDATA区）

使用方法===>>>  \<!\[CDATA\[文本]]>

### xml解析

[四种解析xml的技术](https://www.cnblogs.com/yaobolove/p/5568128.html "四种解析xml的技术")

> 如果XML文档较大且不考虑移植性问题建议采用DOM4J；如果XML文档较小则建议采用JDOM；如果需要及时处理而不需要保存数据则考虑SAX。但无论如何，还是那句话：适合自己的才是最好的，如果时间允许，建议大家讲这四种方法都尝试一遍然后选择一种适合自己的即可。

解析技术学习了dom4j技术，它是第三方发jar包，使用时需要依赖

## dom4j 编程步骤：

- 第一步：先加载xml文件创建Document对象
- 第二步：通过Document对象拿到根元素对象
- 第三步：通过根元素.elelemts(标签名); 可以返回一个集合，这个集合里放着。所有你指定的标签名的元素对象
- 第四步：找到你想要修改、删除的子元素，进行相应在的操作
- 第五步，保存到硬盘上

  需要解析的内容
  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <books>
    <book sn="SN12341232">
      <name>辟邪剑谱</name>
      <price>9.9</price>
      <author>班主任</author>
    </book>
    <book sn="SN12341231">
      <name>葵花宝典</name>
      <price>99.99</price>
      <author>班长</author>
    </book>
  </books>

  ```

  解析
  ```java
  @Test
    public void getDocument() throws DocumentException {
      // 要创建一个Document对象，需要我们先创建一个SAXReader对象
          SAXReader reader = new SAXReader();
          // 这个对象用于读取xml文件，然后返回一个Document。
          Document document = reader.read("src/books.xml");
          // 打印到控制台，看看是否创建成功
          System.out.println(document);
    }

  ```


#### 遍历 标签 获取所有标签中的内容

需要分四步操作:

第一步，通过创建SAXReader对象。来读取xml文件，获取Document对象

第二步，通过Document对象。拿到XML的根元素对象

第三步，通过根元素对象。获取所有的book 标签对象

第四小，遍历每个book标签对象。然后获取到book标签对象内的每一个元素，再通过getText() 方法拿到起始标签和结束标签之间的文本内容

```java
  /*
   * 读取xml文件中的内容
   */
  @Test
  public void readXML() throws DocumentException {
//    需要分四步操作:
//      第一步，通过创建SAXReader对象。来读取xml文件，获取Document对象
//      第二步，通过Document对象。拿到XML的根元素对象
//      第三步，通过根元素对象。获取所有的book 标签对象
//      第四小，遍历每个book标签对象。然后获取到book标签对象内的每一个元素，再通过getText() 方法拿到起始标签和结束标签之间的文本内容
    
//    第一步，通过创建SAXReader对象。来读取xml文件，获取Document对象
    SAXReader reader = new SAXReader();
    Document document = reader.read("src/books.xml");
    // 第二步，通过Document对象。拿到XML的根元素对象
    Element root = document.getRootElement();
    // 打印测试
    // Element.asXML() 它将当前元素转换成为String对象
    // System.out.println( root.asXML() );
//    第三步，通过根元素对象。获取所有的book 标签对象
    // Element.elements(标签名)它可以拿到当前元素下的指定的子元素的集合
    List<Element> books = root.elements("book"); 
//    第四小，遍历每个book标签对象。然后获取到book标签对象内的每一个元素，
    for (Element book : books) {
      // 测试
      // System.out.println(book.asXML());
      // 拿到book下面的name元素对象
      Element nameElement = book.element("name");
      // 拿到book下面的price元素对象
      Element priceElement = book.element("price");
      // 拿到book下面的author元素对象
      Element authorElement = book.element("author");
      // 再通过getText() 方法拿到起始标签和结束标签之间的文本内容
      System.out.println("书名" + nameElement.getText() + " , 价格:" 
          + priceElement.getText() + ", 作者：" + authorElement.getText());
    }
    }

```
