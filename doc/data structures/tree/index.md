
## 规定树的接口

### 定义树的节点
对于任意树
```
class TreeNode{
    anyType element;
    TreeNode FirstChild
    TreeNode NextSibling
}
```
对于二叉树
```
class TreeNode{
    anyType element;
    TreeNode right;
    TreeNode left;
}
```

### 方法

```
TreeNode find(element)
append(element,TreeNode)
delete(element,TreeNode)
```