# ts 类型系统总结

## 必要的 shuoming

### 顶层类型和底层类型

- any
  any 类型表示没有任何限制，该类型的变量可以赋予任意类型的值,也可以把 any 类型变量赋给除 never 类型的变量。any 类型可以看成是所有其他类型的全集.

  ```ts twoslash
  const foo: any = "test";

  const bar: number = foo;
  // const gnm: never = foo; 报错
  ```

  总的来说 any 类型关闭了类型检查,把错误留到运行时.除非特殊情况不要使用该类型.

- unknown
  unknown 跟 any 的相似之处, 在于所有类型的值都可以分配给 unknown 类型.但有以下限制:

  1. unknown 类型的变量, 不能直接赋值给其他类型的变量.
  2. 不能直接调用 unknown 类型变量的方法和属性.
  3. unknown 类型变量能够进行的运算是有限的.只能进行比较运算（运算符 `==`、`===`、`!=`、`!==`、`||`、`&&`、`?`）、取反运算（运算符 `!`）、`typeof` 运算符和 `instanceof` 运算符这几种，其他运算都会报错.
  4. 只有进行类型缩小后才能使用其变量

  ```ts twoslash
  let s: unknown = "hello";

  if (typeof s === "string") {
    s.length; // 正确
  }
  ```

- never
  只有一下几种方式会出现 never 类型

  1. 手动创建 never 类型变量,如: `let x:never;`
  2. 不可能返回值的函数的返回值是 never 类型
  3. 联合类型类型缩小情况都判断完后是 never 类型
  4. 交叉类型 如 `number&string`

  never 类型的一个重要特点是，可以**赋值给任意其他类型**

### 其他类型

基础类型: `boolean` 类型,`string` 类型,`number` 类型,`bigint` 类型,`symbol` 类型,`object` 类型,`undefined` 类型,`null` 类型
包装对象类型: `Boolean` 类型,`String` 类型,`Number` 类型,`Bigint` 类型,`Symbol` 类型,`Object` 类型

- `object` 类型:
  `object` 类型包含了所有对象、数组和函数,不包括原始类型的值.

  ```ts twoslash
  const x: object = { foo: 123 };
  const y: object = [1, 2, 3];
  const z: object = (n: number) => n + 1;
  // const a: object = 123 报错
  ```

- `undefined` 类型:

  `undefined` 类型只包含一个值 `undefined`,表示未定义(即还未给出定义，以后可能会有定义)

- `null` 类型:

  `null` 类型也只包含一个值 `null`,表示为空(即此处没有值)

  **任何其他类型的变量都可以赋值为 `undefined` 或 `null`**

- `Object` 类型:

  大写的 `Object` 类型代表 JavaScript 语言里面的广义对象。所有可以转成对象的值，都是 `Object` 类型.
  **空对象 `{}` 是 `Object` 类型的简写形式**

## 基础变化

### 常用类型工具

- 取出 Promise 的返回值类型

```ts twoslash
type A = Awaited<Promise<string>>;
```

- 从联合类型 UnionType 里面，删除某些类型

```ts twoslash
type T1 = Exclude<"a" | "b" | "c", "a">;
type T2 = Exclude<"a" | "b" | "c", "a" | "b">;
type T3 = Exclude<string | (() => void), Function>;
type T4 = Exclude<string | string[], any[]>;
type T5 = Exclude<(() => void) | null, Function>;
type T6 = Exclude<200 | 400, 200 | 201>;
type T7 = Exclude<number, boolean>;
```

- 从联合类型 UnionType 之中，提取指定类型

```ts twoslash
type T1 = Extract<"a" | "b" | "c", "a">;
type T2 = Extract<"a" | "b" | "c", "a" | "b">;
```

- 从对象类型 A 里面删除指定属性，返回剩下的属性

```ts twoslash
interface A {
  x: number;
  y: number;
}

type T1 = Omit<A, "x">;
type T2 = Omit<A, "y">;
type T3 = Omit<A, "x" | "y">;
```

### 字符串处理

- 将字符串类型的每个字符转为大写

```ts twoslash
type A = "hello";

type B = Uppercase<A>;
```

- 将字符串的每个字符转为小写

```ts twoslash
type A = "HELLO";

type B = Lowercase<A>;
```

- 将字符串的第一个字符转为大写

```ts twoslash
type A = "hello";

type B = Capitalize<A>;
```

- 将字符串的第一个字符转为小写

```ts twoslash
type A = "HELLO";

type B = Uncapitalize<A>;
```

### 数组处理

- 取出 `Array<T>` 的泛型

```ts twoslash
type foo = Array<string>;

type bar = foo extends Array<infer T> ? T : never;
```

```ts twoslash
type foo = Array<string | number>;

type bar = foo extends Array<infer T> ? T : never;
```

- 把 `string|number` 变成 `(string|number)[]`

```ts twoslash
type foo = Array<string | number>;
```

- 把 `string|number` 变成 `string[]|number[]`

使用了 K extend any

```ts twoslash
type foo<K> = K extends any ? K[] : never;

type bar = foo<string | number>;
```

- 把 `string[]|number[]` 变成 `(string|number)[]`

```ts twoslash
type foo<K> = (K extends Array<infer T> ? T : never)[];

type bar = foo<string[] | number[]>;
```

### 对象处理

- 取出对象所有的 key

```ts twoslash
type MyObj = {
  foo: number;
  bar: string;
};

type Keys3 = keyof MyObj;
type Keys1 = keyof MyObj & string; // & string 是为了显示具体的类型,否则显示keyof MyObj

type Expand<T> = T extends infer U ? U : never;

type Keys2 = Expand<keyof MyObj>;
```

- 取出对象所有的 value

```ts twoslash
type MyObj = {
  foo: number;
  bar: string;
};

type Keys = MyObj[keyof MyObj];
```

- 联合类型变为交叉类型

```ts twoslash
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

type c = UnionToIntersection<string | number>;
```

- 把对象的 k-v 对 提取成属性

使用了 K extend any

```ts twoslash
type UnionFromIntersection<T> = T extends { [key in infer K]: infer U }
  ? K extends any
    ? { [k in K]: T[K] }
    : never
  : never;
type Person = { name: string; age: number };
type PersonUnion = UnionFromIntersection<Person>;
```

### 递归对象

如要获取文件夹中的所有文件名,并且对象结构和文件结构相同

```ts twoslash
type Files = { [x: string]: string | Files };

const foo: Files = {
  "index.md": "index.md",
  "readme.md": "readme.md",
  code: {
    "index.md": "index.md",
    "readme.md": "readme.md",
  },
};
```

```ts twoslash
type Files = Array<string | { [k in string]: Files }>;

const foo: Files = ["index.md", { code: [] }, { project: ["readme.md"] }];
```

## other

### 参数扩大

有下面函数

```ts
declare function c(a: string | number): any;
declare function d(a: string, b: number): any;
```

#### 如何根据函数 c 自动推导成函数 d?

```ts twoslash
declare function c(a: string | number): any;
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

type UnionToTuple<U> = UnionToIntersection<
  U extends any ? () => U : never
> extends () => infer R
  ? [R, ...UnionToTuple<Exclude<U, R>>]
  : [];

type funD = UnionToTuple<
  Parameters<typeof c> extends [any: infer T] ? T : never
> extends infer U
  ? (...args: U extends any[] ? U : never) => any
  : never;
```

#### 函数 d 推到 函数 c

```ts twoslash
declare function d(a: string, b: number): any;
type bar<T extends (...args: any) => any> = (
  a: Parameters<T> extends (infer U)[] ? U : never
) => any;

type funC = bar<typeof d>;
```

#### 从数组类型变为联合类型

```ts twoslash
type DC<T extends any[]> = T extends [infer U, ...infer H]
  ? H extends any[]
    ? DC<H> | U
    : never
  : never;

type temp = DC<[string, number]>;
```

### 函数参数类型推导示例

对于以下函数 `typeImpl(a, b, c,...z, (a, b, c,...,z) => {})`，其参数的前 n-1 项是第 n 项函数的参数。以下是一个示例代码片段，展示了如何编写其参数：

```ts twoslash
declare function typeImpl<T extends any[]>(
  ...args1: [...a: T, (...args2: T) => any]
): void;

typeImpl("123", 123, true, (a, b, c) => {});
```

对于以下函数 `typeImpl('string', 'number', 'boolean',...z, (a, b, c,...,z) => {})`，其参数的前 n-1 项是第 n 项函数的参数的类型。以下是一个示例代码片段，展示了如何编写其参数：

```ts twoslash
type argsTypes = {
  string: string;
  number: number;
  boolean: boolean;
};

type inferType<T extends (keyof argsTypes)[]> = {
  [P in keyof T]: argsTypes[T[P]];
};

declare function typeImpl<T extends (keyof argsTypes)[]>(
  ...args1: [...a: T, (...args2: inferType<T>) => any]
): void;

typeImpl("boolean", "number", (a, b) => {});
```
