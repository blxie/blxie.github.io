> 参考文档：https://blog.csdn.net/mukes/article/details/115693833

```bash
git config --global user.name  "blxie"
git config --global user.email  "blxie@outlook.com"

git list
```



> `.gitignore` 不起作用？

清除缓存！

```bash
git rm -r --cached .
git add .
git push -u origin main -f
```



> 修改本地以及远程分支名称

```bash
# 查看所有分支名称
git branch -a

# 在 GitHub 手动修改当前分支名称：master -> main
# 本地修改分支名称
git branch -m master main
git fetch origin
git branch -u origin/main main
git remote set-head origin -a
```







## 使用

在拉取远程仓库之后，首先先创建一个 `dev` 分支，在这上面进行开发提交，管理，没有问题之后再合并到 `main` 分支！这样不会产生过多无用的 `commit`！



如果是 `private`，本地安装一个 `git`，然后开启终端代理，就行了，会在浏览器或者其他方式让你确认。


```bash
git init

[user]
    name = blxie
    email = blxie@outlook.com
    
git add .
git commit -m "init"

git remote add origin https://github.com/blxie/TrackDemo.git
git branch -M main
git push -u origin main

## 创建分支
git branch dev
git checkout dev

git add -u
git commit -m ""
git push --set-upstream origin dev

## 合并到主分支（在 dev 上开发提交 commit，经常变）
git checkout main
git merge dev  # 将 dev 合并到 main


## 删除分支



## 拉取分支
git pull origin main
```



## 合并分支

要将一个分支的更改合并到主分支（通常是`master`分支），可以使用以下步骤：

1. 确保你在主分支上，可以使用以下命令切换到主分支：
   ```shell
   git checkout master
   ```

2. 确保主分支是最新的，使用以下命令拉取最新的代码：
   ```shell
   git pull origin master
   ```

3. 切换回要合并的分支，使用以下命令切换到要合并的分支：
   ```shell
   git checkout your-branch
   ```

4. 将要合并的分支与主分支进行合并，使用以下命令：
   ```shell
   git merge master
   ```

   这将将主分支中的更改合并到你的分支中。

5. 如果在合并过程中出现冲突，Git 会标记冲突的文件。你需要手动解决冲突，编辑文件以解决冲突，并使用以下命令将解决后的文件标记为已解决：
   ```shell
   git add <conflicted-file>
   ```

   重复此过程，直到所有冲突都解决完毕。

6. 提交合并后的更改，使用以下命令提交合并后的更改：
   ```shell
   git commit -m "Merge master into your-branch"
   ```

7. 将合并后的更改推送到远程仓库，使用以下命令将合并后的更改推送到远程仓库：
   ```shell
   git push origin your-branch
   ```

   这将把你的分支以及合并后的更改推送到远程仓库。

现在，你的分支中的更改已经成功合并到主分支中。请记住，合并后可以选择删除已经合并的分支，以保持代码库的整洁和组织。



---

如果您想要以"blxie-patch-1"分支的内容为准，并将其覆盖到主分支上，可以使用以下步骤：

1. 确保您已经切换到主分支。在命令行终端或Git客户端中，使用以下命令切换到主分支：
   ```
   git checkout main
   ```

2. 使用"blxie-patch-1"分支的内容覆盖主分支。运行以下命令：
   ```
   git reset --hard blxie-patch-1
   ```

   这将使主分支的指针指向"blxie-patch-1"分支的最新提交，并将主分支的内容完全替换为"blxie-patch-1"分支的内容。请注意，这将丢失主分支上任何未合并的更改。

3. 将更改推送到远程主分支。运行以下命令：
   ```
   git push --force origin master
   ```

   使用`--force`选项强制推送更改。请注意，这将覆盖远程主分支的内容，请确保您知道正在进行的操作，并且已经备份了重要的代码。

现在，"blxie-patch-1"分支的内容已经覆盖到主分支上，并且该更改已被推送到远程主分支。请谨慎使用`--force`选项，并确保您了解可能产生的影响。



## 删除分支

要删除一个分支，可以按照以下步骤进行操作：

1. 确保您了解要删除的分支。确保您在删除分支之前已经合并或保存了分支上的重要更改。

2. 在命令行终端或Git客户端中，运行以下命令来删除分支：
   ```
   git branch -d branch_name
   ```

   将 "branch_name" 替换为要删除的分支的名称。例如，如果要删除名为 "blxie-patch-1" 的分支，可以运行：
   ```
   git branch -d blxie-patch-1
   ```

   如果分支还未合并到其他分支，Git会显示一条警告消息。如果您确定要删除该分支并丢失其中的提交，请使用小写的 `-d` 选项。如果您希望强制删除未合并的分支，请使用大写的 `-D` 选项：
   ```
   git branch -D branch_name
   ```

3. 分支现在已被删除。如果您想要更新远程仓库的分支列表，请运行以下命令来删除远程仓库中的分支：
   ```
   git push origin --delete branch_name
   ```

   将 "branch_name" 替换为要删除的远程分支的名称。例如，如果要删除名为 "blxie-patch-1" 的远程分支，可以运行：
   ```
   git push origin --delete blxie-patch-1
   ```

   这将从远程仓库中删除指定的分支。

请注意，删除分支是一个不可逆转的操作，请确保在删除之前备份和确认您的操作。





```bash
git status
# 取消代理: https://www.cnblogs.com/syw20170419/p/16363129.html
# (1)
git config --global --unset http.https://github.com.proxy

# (2) for windows powershell
$env:http_proxy = "http://127.0.0.1:10809"
$Env:HTTPS_PROXY = "http://127.0.0.1:10809"
$env:https_proxy = "http://127.0.0.1:10809"
echo $env:http_proxy
echo $env:https_proxy

# (3)
git config --global --unset http.proxy
git config --global --unset https.proxy
git config --global http.sslverify "false"
sudo git config --system http.sslCAinfo /etc/ssl/certs/ca-certificates.crt


git add -u
git commit -m ""
git commit --amend
git push -u origin master -f

git pull origin master
git merge --no-ff --no-commit master


## 合并/修改多个 commit!
git rebase -i 要合并的前一个提交ID
# 根据报错的提示进行操作
hint: Resolve all conflicts manually, mark them as resolved with
hint: "git add/rm <conflicted_files>", then run "git rebase --continue".
hint: You can instead skip this commit: run "git rebase --skip".
hint: To abort and get back to the state before "git rebase", run "git rebase --abort".
# 合并成功之后，同步到远端
git push origin main --force


## tag
git tag -a v1.1 -m "tracking engine, not tracker name directly"
git tag
git push origin v1.1
```





更新主分支名称，

```bash
git branch -m master main
git fetch origin
git branch -u origin/main main
git remote set-head origin -a

git branch -m master <BRANCH>
git fetch origin
git branch -u origin/<BRANCH> <BRANCH>
git remote set-head origin -a

git config --global core.editor vim  # 修改默认的编辑器
git commit --amend  # 修改最近的提交信息，同时实现追加到上一次提交的功能，即不会产生新的 HEAD 记录
```

```bash
git clone --depth=1 https://github.com/visionml/pytracking.git
```



## 本地与远程合并

要将本地项目与远程项目进行合并，你需要按照以下步骤进行操作：

1. **在远程仓库创建一个新的仓库（如果没有现有仓库）**：如果远程仓库尚不存在，你需要在代码托管服务（如GitHub、GitLab或Bitbucket）上创建一个新的仓库。然后，将本地项目与该远程仓库进行关联。

2. **初始化本地项目并与远程仓库关联**：打开命令行，进入本地项目的目录，运行以下命令来初始化本地项目并与远程仓库进行关联：
   ```bash
   git init
   ## http-url
   git remote add origin <远程仓库的URL>
   ```
   将 `<远程仓库的URL>` 替换为你实际的远程仓库URL。
   
3. **拉取远程仓库的内容**：运行以下命令来拉取远程仓库的内容到本地：
   ```
   git pull origin main
   ```
   如果是第一次拉取，可能需要输入用户名和密码进行身份验证。

4. **将本地更改提交到远程仓库**：如果你有本地更改需要提交到远程仓库，首先使用 `git add` 将更改添加到暂存区，然后使用 `git commit` 提交更改到本地仓库，最后使用 `git push` 将更改推送到远程仓库：
   ```
   git add .
   git commit -m "提交说明"
   git push origin main
   ```
   这里的 `main` 可能需要替换为你所使用的分支名称。

这样，你的本地项目就会与远程项目进行了合并和同步。



---

### 合并允许冲突（需要手动合并冲突）

这个错误通常是由于两个分支的历史不相关导致的，可能是由于分支间的重写或者不同分支的基础提交不同。要解决这个问题，你可以尝试以下几种方法：

1. **使用`--allow-unrelated-histories`选项强制合并**：在 `git pull` 命令中添加 `--allow-unrelated-histories` 选项，强制允许合并不相关的历史。例如：
   ```
   git pull origin dev --allow-unrelated-histories
   ```

2. **使用`rebase`命令进行合并**：使用 `git rebase` 命令可以将当前分支的提交移动到目标分支的顶部，从而避免了合并不相关历史的问题。首先切换到目标分支，然后使用 `git rebase` 命令：
   ```
   git checkout dev
   git rebase master
   ```

   这将把 dev 分支上的提交移到 master 分支的顶端，然后你可以切换回 master 分支并进行合并。

3. **手动创建一个新的合并提交**：如果以上方法都无法解决问题，你可以手动创建一个新的合并提交，将两个分支的历史合并起来。首先使用 `git merge` 命令进行合并：
   ```
   git merge dev
   ```
   然后解决可能出现的冲突，最后提交合并结果。

选择适合你情况的方法进行操作，记得在进行任何操作前备份重要的数据，以免造成不可逆的影响。



---

### 重命名分支

你可以按照以下步骤来将本地的 master 分支重新命名为 dev 分支，即覆盖原有的 dev 分支：

1. **切换到 master 分支**：首先确保你当前不在 dev 分支上，而是在 master 分支上。使用以下命令切换到 master 分支：
   ```
   git checkout master
   ```

2. **重命名 master 分支为临时名称**：因为你已经有一个名为 dev 的分支，你需要先将 master 分支重命名为另一个名称，以便稍后将其更改为 dev 分支。使用以下命令将 master 分支重命名为临时名称（例如 temp_dev）：
   ```
   git branch -m temp_dev
   ```

3. **将现有的 dev 分支删除**：为了避免冲突，删除现有的 dev 分支。确保你不会丢失 dev 分支上的任何重要更改。如果需要，可以先将 dev 分支上的更改合并到其他分支中。删除 dev 分支：
   ```
   git branch -D dev
   ```

4. **将 temp_dev 分支重命名为 dev**：现在，将之前的 master 分支（现在是 temp_dev 分支）重命名为 dev 分支：
   ```
   git branch -m dev
   ```

这样，你就成功地将本地的 master 分支重新命名为 dev 分支，覆盖了原有的 dev 分支。请确保在执行这些操作之前备份重要的数据，以防意外情况发生。



## 参考链接

> - [git-修改commit信息_Muscleape的博客-CSDN博客_git 修改commit信息](https://blog.csdn.net/Muscleape/article/details/105637401)
> - [百闻不如一试——公式图片转Latex代码 - 行无际 - 博客园](https://www.cnblogs.com/bytesfly/p/image-to-latex.html)
> - [[Git\] 两种方法合并多个commit为一个_多次提交,一个mr_Spade_的博客-CSDN博客](https://blog.csdn.net/Spade_/article/details/108698036) 🆗



