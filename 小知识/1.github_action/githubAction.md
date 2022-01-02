我的demo https://github.com/zhang874010534/githubAction

阮一峰 https://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html 

[官方市场](https://github.com/marketplace?type=actions)

[github文档](https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions)

GitHub Actions 有一些自己的术语。

（1）**workflow** （工作流程）：持续集成一次运行的过程，就是一个 workflow。

（2）**job** （任务）：一个 workflow 由一个或多个 jobs 构成，含义是一次持续集成的运行，可以完成多个任务。

（3）**step**（步骤）：每个 job 由多个 step 构成，一步步完成。

（4）**action** （动作）：每个 step 可以依次执行一个或多个命令（action）。

```yaml
name: push-action

# on: [push]
on: 
  push:
    branches:
      - master

jobs:
  build-job: 
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@v2
    - name: install and build
      run: |
        npm install
        npm run build
    - name: Build and Deploy
      # 构建发布 Github pages
      uses: JamesIves/github-pages-deploy-action@4.1.7
      with:
        ACCESS_TOEKN: ${{secrets.ACTION_TOKEN}}
        
        # 在部署前要checkout的基本分支，默认是master
        # BASE_BRANCH: master # The branch the action should deploy from.
        
        # 指定部署的分支，默认是 gh-pages 分支
        BRANCH: gh-pages # The branch the action should deploy to.
        
        # Vue CLI默认打包到 dist 目录
        FOLDER: dist # The folder the action should deploy.
        
        # 在向 BRANCH 分支推送代码前，可以指定构建脚本
        # BUILD_SCRIPT: npm install && npm run build # The build script the action 
      
```

### ACTION_TOKEN获取

个人setting/developer settings

https://github.com/settings/tokens

### ACTION_TOKEN使用

https://github.com/zhang874010534/githubAction/settings/secrets/actions

项目设置页面secrets