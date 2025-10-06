class TreeNode {
    ele: string
    left: TreeNode
    right: TreeNode
    constructor(ele: string, left: TreeNode, right: TreeNode) {
        this.ele = ele
        this.left = left
        this.right = right
    }

}
function print(node: TreeNode) {
    if (node) {
        this.print(node.left)
        this.print(node.right)
        console.log(node.ele)
    }
}