# lsd 命令

[lsd](https://github.com/Peltoche/lsd) 是对 GUN ls 使用 rust 重写的版本. 使用它之前请现设置显示字体为 nerd-font. 

lsd 是一个可配置命令,它遵循 [XDG 基本目录规范](https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html),配置文件放在 `~/.config/lsd/config.yaml`.

## lsd 基本命令参数
由于选项基本可以通过配置文件设置,且说明比较完整,笔者直接在第二部分附上配置内容.
使用:
    lsd [参数] [选项] [--] [路径]...

参数:
    -a, --all                        不忽略以 . 开头的条目
    -A, --almost-all                 不列出隐藏的 . 和 ..
        --classic
            开启经典模式 (显示趋近于 ls)

    -Z, --context
            打印每个文件的安全上下文(标签)

    -L, --dereference
            当显示符号链接的文件信息时，应显示链接引用的文件的信息，而不是链接本身的信息
    -d, --directory-only
            显示目录本身，而不是目录的内容 (跟随 --tree)
    -X, --extensionsort              根据文件类型排序
        --group-directories-first
            在文件之前对顶部的目录进行分组. 如 --group-dirs=first
        --help                       打印帮助信息
        --header                     显示标题
    -h, --human-readable
            仅用于ls兼容性目的，当前默认设置

        --ignore-config              忽略配置文件
    -F, --classify
            在文件名的末尾追加指示符(*/=>@|之一)

    -i, --inode                      Display the index number of each file
    -l, --long                       将扩展文件元数据显示为一个表
    -U, --no-sort
            不排序。按目录顺序列出条目

        --no-symlink                 不显示符号链接目标
    -1, --oneline                    每行显示一个条目
    -R, --recursive                  递归的目录
    -r, --reverse                    颠倒排序的顺序
    -S, --sizesort                   根据大小排序
    -t, --timesort                   根据修改时间排序
        --total-size                 显示目录大小
        --tree
            递归到目录中，并以树的形式表示结果

    -V, --version                    打印版本信息
    -v, --versionsort
            文本中的(版本)数字的自然排序
 
## 配置项

```yaml
# == Classic ==
# This is a shorthand to override some of the options to be backwards compatible
# with `ls`. It affects the "color"->"when", "sorting"->"dir-grouping", "date"
# and "icons"->"when" options.
# Possible values: false, true
classic: false

# == Blocks ==
# This specifies the columns and their order when using the long and the tree
# layout.
# Possible values: permission, user, group, size, size_value, date, name, inode
blocks:
  - permission
  - user
  - group
  - size
  - date
  - name

# == Color ==
# This has various color options. (Will be expanded in the future.)
color:
  # When to colorize the output.
  # When "classic" is set, this is set to "never".
  # Possible values: never, auto, always
  when: auto
  # How to colorize the output.
  # When "classic" is set, this is set to "no-color".
  # Possible values: default, <theme-file-name>
  # when specifying <theme-file-name>, lsd will look up theme file
  # XDG Base Directory if relative, e.g. ~/.config/lsd/themes/<theme-file-name>.yaml,
  # The file path if absolute
  theme: default

# == Date ==
# This specifies the date format for the date column. The freeform format
# accepts an strftime like string.
# When "classic" is set, this is set to "date".
# Possible values: date, relative, '+<date_format>'
# `date_format` will be a `strftime` formatted value. e.g. `date: '+%d %b %y %X'` will give you a date like this: 17 Jun 21 20:14:55
date: '+%F %T'

# == Dereference ==
# Whether to dereference symbolic links.
# Possible values: false, true
dereference: false

# == Display ==
# What items to display. Do not specify this for the default behavior.
# Possible values: all, almost-all, directory-only
# display: all

# == Icons ==
icons:
  # When to use icons.
  # When "classic" is set, this is set to "never".
  # Possible values: always, auto, never
  when: auto
  # Which icon theme to use.
  # Possible values: fancy, unicode
  theme: fancy
  # Separator between icon and the name
  # Default to 1 space
  separator: " "

# == Ignore Globs ==
# A list of globs to ignore when listing.
ignore-globs:
   - .git
   - .DS_Store
# == Indicators ==
# Whether to add indicator characters to certain listed files.
# Possible values: false, true
indicators: false

# == Layout ==
# Which layout to use. "oneline" might be a bit confusing here and should be
# called "one-per-line". It might be changed in the future.
# Possible values: grid, tree, oneline
layout: grid

# == Recursion ==
recursion:
  # Whether to enable recursion.
  # Possible values: false, true
  enabled: false
  # How deep the recursion should go. This has to be a positive integer. Leave
  # it unspecified for (virtually) infinite.
  # depth: 3

# == Size ==
# Specifies the format of the size column.
# Possible values: default, short, bytes
size: default

# == Permission ==
# Specify the format of the permission column
# Possible value: rwx, octal
permission: rwx

# == Sorting ==
sorting:
  # Specify what to sort by.
  # Possible values: extension, name, time, size, version
  column: name
  # Whether to reverse the sorting.
  # Possible values: false, true
  reverse: false
  # Whether to group directories together and where.
  # When "classic" is set, this is set to "none".
  # Possible values: first, last, none
  dir-grouping: none

# == No Symlink ==
# Whether to omit showing symlink targets
# Possible values: false, true
no-symlink: false

# == Total size ==
# Whether to display the total size of directories.
# Possible values: false, true
total-size: false

# == Hyperlink ==
# Attach hyperlink to filenames
# Possible values: always, auto, never
hyperlink: auto

# == Symlink arrow ==
# Specifies how the symlink arrow display, chars in both ascii and utf8
symlink-arrow: ⇒

# == Header ==
# Whether to display block headers.
# Possible values: false, true
header: true
```
