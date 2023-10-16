#!/usr/bin/env sh
set -e
echo "输入发布的版本号: "
read VERSION

read -p "发布 $VERSION - 你确定吗? (y/n)" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]] # 如果用户输入的是大小字母 y 就走进 if 里面
then
  # build 打包项目
  npm run build:lib
  if [[ `git status --porcelain` ]];  # 如果有改动就添加 commit
  then
    git add -A
    git commit -am "build: compile $VERSION" # 添加版本更新 commit 信息
  fi

  # 修改 package.json 内的版本号
  npm version $VERSION --message "release: $VERSION"

  # 提交修改到原创仓库 main 分支
  git push origin main
  git push origin refs/tags/v$VERSION # 提交 tag 到原创仓库

  if [[ $VERSION =~ [beta] ]] # 如果版本号里面有 beta 就发布到 beta 分支
  then
    npm publish --tag beta
  else 
    npm publish # 发布到 npm
  fi

  # changelog
  vant-cli changelog
fi
