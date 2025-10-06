# 绪论
## 什么是数据结构?
  
简而言之:数据结构是一门研究非数值计算的程序设计问题中计算机的操作对象以及它们之间的关系和操作等的学科.

重点:
* 使用计算机解决一个问题大致分为以下几步:
  1. 从具体问题中抽象出数学模型
  2. 设计一个解出问题的算法
  3. 编出程序
  4. 测试、调整直到得到结果

* 数据结构学习的内容:
  1. 离散结构,即表、树、图
  2. 数据的存储结构
  3. 文件管理

## 基本概念和术语


### 数据
  数据是所有能输入到计算机中并被计算机程序处理的符号总称.
### 数据元素
  数据元素是数据的基本单位.一个数据元素可由若干个数据项构成.
### 数据对象
  数据对象是性质相同的数据元素的集合,是数据的子集.
### 数据结构
  数据结构是相互之间存在一种或多种特定关系的数据元素的集合.
  通常有以下四种结构:

  1. 集合                 结构中的元素除了同属一个集合的关系外,无其他关系
  2. 线性结构             数据元素间存在一对一的关系
  3. 树形结构             数据元素间存在一对多的关系
  4. 图状结构或网状结构   数据元素间存在多对多的关系

  其中集合是数据元素之间关系极为松散的一种结构,可由其他结构表示它.

  <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg-blog.csdnimg.cn%2F20191104143625859.png%3Fx-oss-process%3Dimage%2Fwatermark%2Ctype_ZmFuZ3poZW5naGVpdGk%2Cshadow_10%2Ctext_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hpaGVsbA%3D%3D%2Csize_16%2Ccolor_FFFFFF%2Ct_70&refer=http%3A%2F%2Fimg-blog.csdnimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1660229180&t=2e9b454d0260803c44f0391890c5b667" alt="四种基本结构关系" />

  数据结构在计算机中的表示(又称映像)称为数据的物理结构,也叫做存储结构.其中存储结构在计算机存在两种不同的表示方法:
    
  1. 顺序映像(顺序存储结构)      借助元素在存储器中的相对位置表示数据间的逻辑关系
  2. 非顺序映像(链式存储结构)    借助指示元素的指针表示数据元素间的逻辑关系
### 数据类型
  数据类型是一个值的集合和定义在这个值集上的一组操作的总称.
  数据类型大体分为两类:

  1. 原子类型(基本数据类型)
  2. 结构类型(引用数据类型)

### 抽象数据类型
  抽象数据类型是指一个数学模型以及定义在该模型上的一组操作.

### 多形数据类型
  多形数据类型是指其值的成分不确定的数据类型.类似多态?

## 算法和算法分析
  
  算法是对特定问题求解步骤对一种描述,它是指令对有限序列,其中一条指令表示一个或多个操作.一个算法包括五条性质: 有穷性、确定性、可行性、输入、输出.
  
  评估一个算法最重要的是评估需要的时间和空间等资源量等问题.

  在谈论算法分析前我们可能需要回顾以下数学知识:
### 可能用到对数学知识

  1. 指数
      $$
        X^A X^B = X^{A+B}    \\
        \frac{X^A}{X^B} = X^{A-B} \\
        (X^A)^B = X^AB \\
        X^N + X^N = 2X^N \neq X^{2N} \\
        2^N + 2^N = 2^{N+1}
      $$
  2. 对数

      定义: 当且仅当 $log_ x B = A$,$X^A = B$.在本书中除特殊说明,所有对对数都以 2 为底.

      有定理:
      $$
        log_ A B = \frac{log_ C B}{log_ C A} ; C > 0 \\
        log AB = log A + log B \\
        log A/B = log A - log B \\
        log A^B = Blog A \\
        log X < X (对所有对X成立) \\
        log 1 = 0,log 2 = 1,log 2048 =10,log 1048576 = 20 
      $$
  3. 级数
      
      最容易记住的求和公式是 
      $$\begin{aligned} \sum_{i=0}^N2^i \end{aligned} = 2^{N+1} - 1 $$ 
      和 
      $$
        \begin{aligned} \sum_{i=0}^NA^i \end{aligned} = \frac{A^{N+1} - 1}{A-1} \\
        \begin{aligned} \sum_{i=0}^NA^i\end{aligned} \leq \frac{1}{1-A};0<A<1
      $$
      另一种是算数级数,求和公式为
      $$                                                                                                                               
        \begin{aligned} \sum_{i=1}^Ni \end{aligned} = \frac{N(N +1)}{2} \approx \frac {N^2}{2} \\
        \begin{aligned} \sum_{i=1}^Ni^2 \end{aligned} = \frac{N(N +1)(2N +1)}{6} \approx \frac {N^3}{3} \\
        \begin{aligned} \sum_{i=1}^Ni^k \end{aligned} \approx \frac {N^{k+1}}{\mid k+1 \mid};k \neq -1 \\
      $$
      其中第三个公式中 k 为 -1 时 有此公式
      $$H_N = \begin{aligned} \sum_{i=1}^N\frac{1}{i} \end{aligned} \approx log_e N$$

      自然数倒数和
      $$
        \begin{aligned} \sum_{i=1}^N\frac{1}{i} \end{aligned} = 1 + \frac{1}{2} +\frac{1}{3} + ... + \frac{1}{n} \equiv ln N + \gamma ,其中 \gamma 是一个常数
      $$
  4. 模运算

      定义:如果 N 整除 A 和 B,我们就说 A 与 B 模 N 同余,记为 $A \equiv B \pmod N$  
      有定义:
      $$
        A + C \equiv B + C \pmod N \\
        AD \equiv BD \pmod N
      $$
  5. 归纳法和反证法证明
      
      此处不详细展开,请从网上查询资料

#### 全书有以下定义
1. 如果存在正常数 c 和 $n_0$ 使得当 $N \geq n_0$ 时 $T(N) \leq cf(N)$,则记为 $T(N) = \Omicron(f(N))$.
2. 如果存在正常数 c 和 $n_0$ 使得当 $N \geq n_0$ 时 $T(N) \geq cf(N)$,则记为 $T(N) = \Omega(f(N))$.
3. 当且仅当 $T(N) = \Omicron(h(N))$ 且 $T(N) = \Omega(h(N))$ 时, $T(N) = \varTheta(h(N))$.
4. 如果 $T(N) = \Omicron(p(N))$ 且 $T(N) \neq \varTheta(p(N))$,则 $T(N) = \omicron(p(N))$.

文字解释:
1. 当 $T(N)$ 函数小于等于 $cf(N)$ 函数或者说 $T(N)$ 的增长率小于等于 $cf(N)$ 的增长率,将其记为$T(N) = \Omicron(f(N))$
2. $T(N)$ 的增长率大于等于 $cf(N)$ 的增长率,将其记为 $T(N) = \Omega(f(N))$
3. 表示增长率相同使用 $\varTheta$ 标记
4. $T(N)$ 的增长率小于 $cf(N)$ 的增长率,将其记为 $T(N) = \omicron(f(N))$ 

我们根据定义可以得到以下结论
1. 当 $T_1(N) = \Omicron(f(N))$ 且 $T_2(N) = \Omicron(g(N))$ 有  
    a. $T_1(N) + T_2(N) = max(\Omicron(f(N)),\Omicron(g(N)))$  
    b. $T_1(N) * T_2(N) = \Omicron(f(N) * g(N))$
2. 如果 $T(N)$ 是一个 k 次多项式,则 $T(N) = \varTheta(N^k)$
3. 对任意常数 k , $log^kN = \Omicron(N)$ ,对数增长缓慢
4. 如果 $M > N$,则 $M \bmod N < \frac {M}{2}$

增长率排名:

| 函数    | 名称       |
| ------- | ---------- |
| c       | 常数       |
| $logN$  | 对数级     |
| $log^2$ | 对数平方根 |
| $N$     | 线性级     |
| $NlogN$ |            |
| $N^2$   | 平方级     |
| $N^3$   | 立方级     |
| $2^N$   | 指数级     |

### 程序所耗时间
1. 声明不计时间
2. 对于 for 循环 `for(int i=0;i<N;i++)` 来说总共需要 2N + 2 步(声明 1 时间单元,判断 N + 1 时间单元;自增 N 时间单元); 简记 $\Omicron(N)$
3. 嵌套 for 循环 $\Omicron(N^2)$
4. 一个 if/else 语句不超过其中程序运行时间较长者
5. 递归 一般是某个规模为 N 的 fn(N) 函数,我们可以使用 $T(N)=\Omicron(fn(N))$ 来表示时间复杂度. 即算出 fn(N) 的范围.

#### 对数的出现
对数出现一般是在分治算法中,它会把需要计算量减少一般

#### 检验算法分析
1. 根据样本的扩大看是否满足 $\Omicron(f(N))$ 函数
2. 计算 $\frac {T(N)}{f(N)}$,如果收敛为常数则估计正常;趋于零,估计偏大;发散,估计偏小;

注意有时估计偏大,可能是平均运行时间显著小与最大运行时间.

