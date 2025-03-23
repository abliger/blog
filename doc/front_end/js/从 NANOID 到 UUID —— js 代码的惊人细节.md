# 从 NANOID 到 UUID —— JS 的惊人细节

一个用于 JavaScript 的微小、安全、URL 友好、独特的字符串 ID 生成器。

## 一个用于浏览器到**普通**字符串生成器

```js
let urlAlphabet =
  "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";

export let nanoid = (size = 21) => {
  let id = "";
  let i = size | 0;
  while (i--) {
    id += urlAlphabet[(Math.random() * 64) | 0];
  }
  return id;
};
```

初看觉得这个方案可能认为平平无奇.但我们依次查看其中细节,就会叫绝.

---

### urlAphabet 的设计

`'useandom26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'`,
这个字符串拿过来,可能认为很杂乱,但仔细查看可以发现它包含了 a-zA-Z0-9\_-,且不重复.

#### 作者为什么这样写呢?

这里作者考虑了当浏览器下载时,使用了 gzip 和 brotli 压缩报文.
`-26T`, `1983`, `40px`, `75px`, `bush`, `jack`, `mind`, `very`, and `wolf` 是 brotli 在字典中的数据.
这样写可以提高压缩率.

---

### 查看函数内容

```js
export let nanoid = (size = 21) => {
  let id = "";
  // 替换 for (var i = 0; i < step; i++),提高压缩率. 但是 输入负数就会出错
  let i = size | 0; // 使用 二进制 或运算保留 size 整数部分,舍弃小数部分
  // 如: `3|4` -> `7` 使用二进制表示 `011 | 100 -> 111`
  while (i--) {
    id += urlAlphabet[(Math.random() * 64) | 0];
  }
  return id;
};
```

---

### 随机数加密

```js
export let nanoid = (size = 21) => {
  let id = "";
  // 生成长度为 size 的 0-255 的随机数组
  let bytes = crypto.getRandomValues(new Uint8Array((size |= 0)));
  while (size--) {
    // 使用位运算符 AND 获得随机数的低 6 位，这样我们就可以确保该值是 `scopedUrlAlphabet` 字符串的有效索引。
    // 这里为什么不使用 取余数 % ?
    // 如对于一个 0-9出现等概率的随机数. 有 random(0...9) % 3 结果中的概率不相等, 0 会更多一点
    id += scopedUrlAlphabet[bytes[size] & 63];
  }
  return id;
};
```

---

### 自定义字母表

示例代码:

```js
export let customRandom = (alphabet, defaultSize) => {
  // 向上获得 alphabet.length - 1 最接近的 2的n次方 数
  let mask = (2 << Math.log2(alphabet.length - 1)) - 1;
  // 生成随机数组大小
  let step = -~((1.6 * mask * defaultSize) / alphabet.length);

  return (size = defaultSize) => {
    let id = "";
    while (true) {
      let bytes = crypto.getRandomValues(new Uint8Array(step));
      let j = step | 0;
      while (j--) {
        // 如果 bytes[j] & mask 大于 alphabet.length,则跳过这个随机数,寻找下一个随机数来使用
        id += alphabet[bytes[j] & mask] || "";
        if (id.length >= size) return id;
      }
    }
  };
};
```

---

#### 自定义字母表 customRandom 函数的执行过程

1. 获得自定义字母表最接近的 2 的 n 次方的数 mark
2. 获得比生成字符串长的随机数组
3. 对随机数组进行遍历
   a. 如果生成字符串长度大于等于要求长度则返回该字符串
   b. 否则,对随机数取 mark 余数
   c. 如果余数大于自定义字母表长度,则跳过这个随机数,寻找下一个随机数来使用
   d. 否则,取出自定义字母表下表为余数的字母加入生成字符串中

#### 注意生成的随机数组要足够大

`crypto.getRandomValues` 是一个耗时操作,我们需要尽量保证它只使用一次.  
由于 mark 是大于等于 (自定义字母表长度 -1) 的. 对于 `bytes[j] & mask` 可能取到大于 自定义字母表长度 -1 且 小于 mark 长度.这时我们需要寻找下一个随机数来使用,所以生成的随机数组要大一点.

`let step = -~((1.6 * mask * defaultSize) / alphabet.length); ` 中 1.6 这个魔法数字,是作者一个经验数字.基本保证 `crypto.getRandom(step)` 只运行一次.

---

### 测试置信度

```js
let COUNT = 100 * 1000;
let LENGTH = 5;
let ALPHABET = "abcdefghijklmnopqrstuvwxyz";
let nanoid2 = customAlphabet(ALPHABET, LENGTH);

let chars = {};
for (let i = 0; i < COUNT; i++) {
  let id = nanoid2();
  for (let char of id) {
    if (!chars[char]) chars[char] = 0;
    chars[char] += 1;
  }
}

equal(Object.keys(chars).length, ALPHABET.length);

let max = 0;
let min = Number.MAX_SAFE_INTEGER;
for (let k in chars) {
  let distribution = (chars[k] * ALPHABET.length) / (COUNT * LENGTH);
  if (distribution > max) max = distribution;
  if (distribution < min) min = distribution;
}
ok(max - min <= 0.05);
```

---

测试中的 ALPHABET 是 26 个字母，那么生成的每个字符应该有相等的概率被选中。
如果随机数生成器是均匀的，那么实际分布应该接近理论值，方差应该随着样本量的增加而减小。
COUNT=100,000 次，LENGTH=5，总共有 500,000 个字符，每个字符的理论期望值是 500000/26≈19230 次。
标准差大概是 sqrt(np(1-p))，其中 p=1/26，所以标准差约为 sqrt(19230*(1/26)*(25/26))≈sqrt(717.5)≈26.78。
所以实际次数的波动大约在 ±3 个标准差内大概是 ±80 次左右，相对于理论值 19230 来说，波动幅度大约是 ±0.4%。所以 max-min 的差应该远小于 5%

---

# UUID 源码

对于同样生成随机字符串的 UUID,其中 v4 的生成 UUID 源码之一提炼如下:

```js
const rnds8 = new Uint8Array(16);
function rng() {
  return crypto.getRandomValues(rnds8);
}
function v4() {
  // 生成指定长度的随机数组
  const rnds = rng();
  //设置版本号
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  //设置变体
  rnds[8] = (rnds[8] & 0x3f) | 0x80;
  // 使用随机数组中的值为下标,拼接字符串.
  return unsafeStringify(rnds);
}
```

---

```js
function unsafeStringify(arr, offset = 0) {
  const byteToHex = [];
  for (let i = 0; i < 256; ++i) {
    byteToHex.push((i + 0x100).toString(16).slice(1));
  }
  return (
    byteToHex[arr[offset + 0]] +
    byteToHex[arr[offset + 1]] +
    byteToHex[arr[offset + 2]] +
    byteToHex[arr[offset + 3]] +
    "-" +
    byteToHex[arr[offset + 4]] +
    byteToHex[arr[offset + 5]] +
    "-" +
    byteToHex[arr[offset + 6]] +
    byteToHex[arr[offset + 7]] +
    "-" +
    byteToHex[arr[offset + 8]] +
    byteToHex[arr[offset + 9]] +
    "-" +
    byteToHex[arr[offset + 10]] +
    byteToHex[arr[offset + 11]] +
    byteToHex[arr[offset + 12]] +
    byteToHex[arr[offset + 13]] +
    byteToHex[arr[offset + 14]] +
    byteToHex[arr[offset + 15]]
  ).toLowerCase();
}
```

---

## 重复性

我们可以看到不管是 UUID 还是 NANOID 都是使用了安全的随机数来生成字符串,从生成原理上来说是可能重复的.
但是,如 NANOID 生成默认长度(21 位)的字符串来说,如果每个位置字母出现的概率相同即 $\frac{1}{64}$.
那么出现相同默认长度的字符串的概率就是 $(\frac{1}{64})^{21}$ ,基本不可能遇到.放心使用吧.
