[Bitbucket](https://www.atlassian.com/git/tutorials/learn-git-with-bitbucket-cloud)

# Git

## 什么是Git?

  - Git是一款源代码管理工具(版本控制工具)
    - 我们写的代码需要使用Git进行管理。
  - 源代码有必要管理起吗？
  - 1.0
  - 2.0 // 
  - svn,vss,vcs.... git
  - 有必要，因为人工的去处理不同的版本，做相应备份会很麻烦。
  - Git是linux之父当年为了维护linux---linus之前也是手动维护合并把文件发给Linus
  - linus自己写了一个版本管理的工具(Git)

## commit 规范与提交验证

  - build：表示构建，发布版本可用这个
  - ci：更新 CI/CD 等自动化配置
  - chore：杂项，其他更改
  - docs：更新文档
  - feat：常用，表示新增功能
  - fix：常用：表示修复 bug
  - perf：性能优化
  - refactor：重构
  - revert：代码回滚 
  - style：样式更改
  - test：单元测试更改

## 误操作的撤回方案

  - git revert -n [commitId]

## Tag与生产环境

git 支持对于历史的某个提交，打一个 tag 标签，常用于标识重要的版本更新。

目前普遍的做法是，用 tag 来表示生产环境的版本。当最新的提交通过测试，准备发布之时，我们就可以创建一个 tag，表示要发布的生产环境版本。

比如我要发一个 `v1.0.1` 的版本：

```sh
$ git tag -a v1.0.1 -m "my version 1.0.1"
复制代码
```

然后可以查看：

```sh
$ git show v1.0.1

tag v1.0.1
Tagger: zhangce <z874010534@vip.qq.com>
Date:   Sat Nov 13 11:10:12 2021 +0800

my version 1.0.1
```

最后用 git push 将 tag 推到远程：

```sh
$ git push origin v1.0.1
复制代码
```

**这里注意**：tag 和在哪个分支创建是没有关系的，tag 只是提交的别名。因此 commit 的能力 tag 均可使用

当生产环境出问题，需要版本回退时，可以这样：

```sh
$ git revert [pre-tag]
# 若上一个版本是 v1.0.0，则：
$ git revert v1.0.0
```

在频繁更新，commit 数量庞大的仓库里，用 tag 标识版本显然更清爽，可读性更佳。

再换一个角度思考 tag 的用处。

上面分支管理策略的部分说过，release 分支与生产环境代码同步。在 CI/CD（下面会讲到）持续部署的流程中，我们是监听 release 分支的推送然后触发自动构建。

那是不是也可以监听 tag 推送再触发自动构建，这样版本更新的直观性是不是更好？

## Git安装

## 初始化Git仓储/(仓库)

- 这个仓库会存放，git对我们项目代码进行备份的文件
- 在项目目录右键打开 git bash
- 命令: `git init`


## 自报家门

- 就是在git中设置当前使用的用户是谁
- 每一次备份都会把当前备份者的信息存储起来
- 命令: 
  + 配置用户名:`git config --global user.name "xiaoming"`
  + 配置邮箱:  `git config --global user.email "xm@sina.com"`


## 把大象放到冰箱要几步

1. 打开冰箱门
2. 放大象
3. 关上冰箱

## 把代码存储到.git仓储中

- 1.把代码放到仓储的门口
  + `git add ./readme.md` 所指定的文件放到大门口
  + `git add ./` 把所有的修改的文件添加到大门口
- 2.把仓储门口的代码放到里面的房间中去
  + `git commit -m "这是对这次添加的东西的说明" `

## 可以一次性把我们修改的代码放到房间里(版本库)

- `git commit --all -m "一些说明"`
  + --all 表示是把所有修改的文件提交到版本库

## 查看当前的状态

- 可以用来查看当前代码有没有被放到仓储中去
- 命令: `git status`

## git中的忽略文件

- .gitignore,在这个文件中可以设置要被忽略的文件或者目录。
- 被忽略的文件不会被提交仓储里去.
- 在.gitignore中可以书写要被忽略的文件的路径，以/开头，
  一行写一个路径，这些路径所对应的文件都会被忽略，
  不会被提交到仓储中
  + 写法
    * ` /.idea  ` 会忽略.idea文件
    * ` /js`      会忽略js目录里的所有文件
    * ` /js/*.js` 会忽略js目录下所有js文件

## 查看日志

- `git log` 查看历史提交的日志
- `git log --oneline` 可以看到简洁版的日志

## 回退到指定的版本

- `git reset --hard Head~0`
  + 表示回退到上一次代码提交时的状态
- `git reset --hard Head~1`
  + 表示回退到上上次代码提交时的状态

- `git reset --hard [版本号]`
  + 可以通过版本号精确的回退到某一次提交时的状态

- `git reflog`
  + 可以看到每一次切换版本的记录:可以看到所有提交的版本号

## 分支

- 默认是有一个主分支master

### 创建分支

- `git branch dev`
  + 创建了一个dev分支
  + 在刚创建时dev分支里的东西和master分支里的东西是一样的

### 切换分支

- `git checkout dev`
  + 切换到指定的分支,这里的切换到名为dev的分支
    `git branch` 可以查看当前有哪些分支


### 合并分支

- `git merge dev`
  + 合并分支内容,把当前分支与指定的分支(dev),进行合并
  + 当前分支指的是`git branch`命令输出的前面有*号的分支

- 合并时如果有冲突，需要手动去处理，处理后还需要再提交一次.  

### 在本地创建分支并跟踪远端

- git   checkout    -b   dev(本地分支)    origin/dev(远程分支)

### GitHub 

- https://github.com
- 不是git,只是一个网站
- 只不过这个网站提供了允许别通过git上传代码的功能

### 提交代码到github(当作git服务器来用)

- `git push [地址] master`

 + 示例: `git push https://github.com/huoqishi/test112.git master  master`
 + 会把当前分支的内容上传到远程的master分支上

- `git pull [地址] master`

 + 示例: `git pull https://github.com/huoqishi/test112.git master`
 + 会把远程分支的数据得到:(*注意本地-要初始一个仓储!*)

- `git clone [地址]`
- git clone https://github.com.cnpmjs.org/xxx.git

 + 会得到远程仓储相同的数据,如果多次执行会覆盖本地内容。
