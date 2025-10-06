# tmux 结合 zsh 遇到的问题

1. 输入命令时,命令提示直接和命令一样的深浅颜色显示出来,删除后依然占据位置

这个问题出现了很久,也从网上也找到和我有相同问题的人,但要不是就只有问题,要不是不起作用,最后导致一度弃用了 tmux 而使用了 zellij.但是 zellij 快捷键不方便,研究了以下,找到了问题.

情景复现:
        
只有 zsh,tmux. 设置了 zsh 主题 powerlevel10k,但没有运行 `p10k configure`.此时会出现 命令提示会出现如标题的问题.找了一个小时没有在tmux 和 zsh 的github issues 中找到同样的问题. 后想来是zsh 主题设置的问题.运行了 `p10k configure` ,发现此时虽然命令提示内容占据了命令行位置,但是在删除提示单词后会恢复正常.此时我基本确认了是powerlevel10k 的问题.最后在 issues 中 查找相应问题最后找到了解决办法.是主题默认终端设置的问题.

原帖解决方法如下:

1. 在 .zshrc 中添加 [[ -n $TMUX ]] && export TERM="xterm-256color"

2. 在 .tmux.conf 添加 set -g default-terminal "screen-256color" 

实际上我只在 .zshrc 文件中加入了以下代码,解决了问题: >

  [[ -n $TMUX ]] && export TERM="xterm-256color"
                                                            
详情见github 提问:
1. [p10k might be interfering with the ohmyzsh tmux plugin #1506](https://github.com/romkatv/powerlevel10k/issues/1506)
2. [Display error when using tmux #1814](https://github.com/romkatv/powerlevel10k/issues/1814)
