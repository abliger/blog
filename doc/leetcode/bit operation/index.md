# 位运算

位运算就是直接操作二进制数的运算方式.

常见的位运算有以下三种：

- 一元 ~（按位求补）运算符
- 二进制 <<（向左移位）和 >>（向右移位）移位运算符
- 二进制 &（逻辑 AND）、|（逻辑 OR）和 ^（逻辑异或）运算符

假设有大小 1byte 的变量 ex ,变量 a 和变量 b 分别为 `0b11000011`、`0b00000000`、`0b11111111`.
用法操作变量ex第八位. 
 
| 运算符 | 解释                                              | 表达式                           | 结果                            | 用法                                         |
| ------ | ------------------------------------------------- | -------------------------------- | ------------------------------- | -------------------------------------------- |
| ~      | 每一位数字求反,把1变为0,把0变为1                  | ~ ex                             | `0b00111100`                    |                                              |
| >>     | 使1byte数据整体右移,移出的数字直接舍去,使用0补位  | ex >> 3                          | `0b00110000`                    | 相当于除以 2                                 |
| <<     | 使1byte数据整体左移,移出的数字直接舍去,使用0补位  | ex << 3                          | `0b00011000`                    | 相当于乘 2                                   |
| &      | 按位与,运算对象相应位都为1结果为1,否则为0         | ex & b  <br/> ex & `0b11110000`  | `0b11000011` <br/> `0b11000000` | 关闭位,关闭特定位置的bit; ex & `0b01111111`  |
| \|     | 按位或,运算对象相应位都为1结果为1,否则为假        | ex & b  <br/> ex \| `0b11110000` | `0b11111111` <br/> `0b11110011` | 打开位,打开特定位置的bit; ex \| `0b10000000` |
| ^      | 按位异或,运算对象响应位相同为0,不同为1;相差一相位 | ex & b  <br/> ex ^ `0b11110000`  | `0b00111100` <br/> `0b00110011` | 切换位,切换相位为一的bit; ex ^ any           |

## 奇技淫巧
* 检查位的值
  假如我们需要让变量a的第五位必须是 1(即 `0b00010000`),我们不能直接使用 `if(a === 0b00010000)`,而是这样做`if((a & 0b00010000) === 0b00010000)`
* 判断二进制数 1 或 0 数字个数
  ```c
  int num; // 数字
  int size; // 数字二进制表示最大位数
  int count = 0; // 个
  for(int i = 0;i < size;i++){
    count += (num >> i) & 1; // 1 的个数
    // count += (num >> i) & 1 ^ 1; // 0 的个数
  }
  return count;
  ```
* 判断奇偶数
  ```c
  num % 2 == 1 // true 奇数 模运算
  num & 1 == 1 // true 奇数 位运算
  ```
* 交换两个数
  ```c
  int a,b;
  // .. 赋值 a b 变量
  a ^= b;
  b ^= a;
  a ^= b;
  ```
  异或操作后的值和两个操作值能相互算出.
  不一定比使用中间量交换慢(优化使用寄存器),且如果 a b 都为引用类型且引用的相同变量,会让引用归零.
* 相反数
  由于相反数要要满足 `m + (-m<F4><F4>)=0` 如 m 为 1,二进制表示 `0b00000001` 最后得到 0 二进制表示 `0b00000000` 及 -m = 0 - m => `0b00000000` - `0b00000001` => `0b11111111`.他们二进制表示关系为 -m = ~m +1.及求 m 的相反数要 `~m + 1`.
* 求绝对值
  ```c
  int abs(int a) {
  int i = a >> 31; // 右移 31 位 得到符号位
  return i == 0 ? a : (~a + 1);
  }
  ```
  正数的绝对值就为本身.负数绝对值进行求反.
* 高低位交换
  ```c
  unsigned int a;
  a= (a >> 16) | (a << 16)
  ```
* 获得数字最低有效位
  使用表达式 `num & (-num)` 可以得到最后一个有效位.可以配合 ^ 异或运算对进行运算的数字进行区分.

## 题目

<leetcode>

### 461. [Hamming Distance](https://leetcode.cn/problems/hamming-distance/solution/by-abliger-h3pe/) (easy)

[Leetcode](https://leetcode.com/problems/hamming-distance/) / [力扣](https://leetcode.cn/problems/hamming-distance/)

考察判断两数的相位及二进制数字 0 和 1 的位数

考点:按位或、按位与


### 67. Add Binary

[Leetcode](https://leetcode.com/problems/add-binary/) / [力扣](https://leetcode.cn/problems/add-binary/)

考点:字符串操作,位运算加法

### 136. [Seingle Number](https://leetcode.cn/problems/single-number/solution/by-abliger-a33j/) (Easy)

[Leetcode](https://leetcode.com/problems/single-number/) /[力扣](https://leetcode.cn/problems/single-number/)

### 268. [Missing Number](https://leetcode.cn/problems/missing-number/solution/by-abliger-02we/) (Easy)

[Leetcode](https://leetcode.com/problems/missing-number/) /[力扣](https://leetcode.cn/problems/missing-number/)

考点:异或运算
上两道题都可以通过异或运算,算出来出现一次的数字.但是,第二道题绕了一个弯,我们只需要把所有数字再次添加到数组中就变为第一道题的情况.
第二题也可用Map表来完成,可以是使用数学运算(计算数组 0 ~ n 总大小 ,再挨个减去数组元素)即可得到结果.

### 260. [Single Number III]
[Leetcode](https://leetcode.com/problems/single-number-iii/) /[力扣](https://leetcode.cn/problems/single-number-iii/)

</leetcode>

考点:异或运算
## 引用

[位运算简介及实用技巧1：基础篇](./referance/位运算简介及实用技巧1：基础篇.html)

[位运算简介及实用技巧2：进阶篇(1)](./referance/位运算简介及实用技巧2：进阶篇(1).html)

[位运算简介及实用技巧3：进阶篇(2)](./referance/位运算简介及实用技巧3：进阶篇(2).html)

[位运算简介及实用技巧4：实战篇](./referance/位运算简介及实用技巧4：实战篇.html)

[趣题：用位运算生成下一个含有k个1的二进制数](./referance/趣题：用位运算生成下一个含有k个1的二进制数.html)

[位运算有什么奇技淫巧？](https://www.zhihu.com/question/38206659)

[Bit Twiddling Hacks](./referance/Bit%20Twiddling%20Hacks.html)
