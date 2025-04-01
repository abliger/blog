## 想法

今天适逢 git 提交信息甚多,突然想起可以用 ai 来生成提交信息.结合了github 上的 [aicommit] 库,自己写了一个使用deepseek的 ai commit.

### 代码

<<< ./aicommit.ts

### 提示词

<<< ./git AiCommit 提交提示器.txt

### 使用

在你的 .profile 或者是zsh 的 .zprofile 文件添加下面一行即可使用 aicommit 来提交信息

```shell
alias aicommit="node --env-file=<private.env 全路径> <aicommit.ts 全路径>"
```

[aicommit]: https://github.com/search?q=aicommit&type=repositories