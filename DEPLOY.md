# GitHub Pages 部署指南

## 已完成的配置修改

✅ **Vite 配置** (`vite.config.js`): 添加了 `base` 路径
✅ **路由模式** (`main.tsx`): 改为 `HashRouter` 避免 404 问题
✅ **Git 忽略** (`.gitignore`): 创建了标准的 React 项目忽略文件

---

## 部署步骤

### 1. 准备 GitHub 仓库

在 GitHub 上创建一个新仓库（仓库名可以任意，比如 `meeting-assistant`）

### 2. 初始化本地 Git 仓库

在项目根目录执行：

```bash
git init
```

### 3. 配置用户信息（如果还没配置过）

```bash
git config user.name "你的GitHub用户名"
git config user.email "你的GitHub邮箱"
```

### 4. 添加并提交文件

```bash
git add .
git commit -m "initial commit: 会议助手应用"
```

### 5. 关联远程仓库

**注意**：将下面的 `<你的GitHub用户名>` 和 `<仓库名>` 替换为实际值

```bash
git remote add origin https://github.com/<你的GitHub用户名>/<仓库名>.git
```

**例子**：
- 如果你的 GitHub 用户名是 `zhangsan`，仓库名是 `meeting-assistant`
- 那么命令是：`git remote add origin https://github.com/zhangsan/meeting-assistant.git`

### 6. 推送到 GitHub

```bash
git branch -M main
git push -u origin main
```

---

## 部署方案选择

### 方案 A：使用 GitHub Actions 自动部署（推荐）

**步骤**：

1. 在项目根目录创建 `.github/workflows/deploy.yml` 文件

2. 复制以下内容（请先确认仓库名）：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ "main" ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

3. 提交并推送 workflow 文件
4. 在 GitHub 仓库设置中：
   - 进入 **Settings > Pages**
   - **Source** 选择 **GitHub Actions**

### 方案 B：手动部署（简单）

**步骤**：

1. 在本地构建项目：
```bash
npm run build
```

2. 安装 `gh-pages` 工具：
```bash
npm install -D gh-pages
```

3. 在 `package.json` 中添加 deploy 脚本：
```json
"scripts": {
  "deploy": "gh-pages -d dist"
}
```

4. 运行部署：
```bash
npm run deploy
```

5. 在 GitHub 仓库设置中：
   - 进入 **Settings > Pages**
   - **Branch** 选择 `gh-pages` 分支，文件夹选择 `/ (root)`

---

## 访问你的网站

部署成功后，访问地址格式为：

```
https://<你的GitHub用户名>.github.io/<仓库名>/
```

**例子**：
- 用户名：`zhangsan`
- 仓库名：`meeting-assistant`
- 访问地址：`https://zhangsan.github.io/meeting-assistant/`

---

## 常见问题

### Q: 页面加载出来是空白？

**A**: 检查 `vite.config.js` 中的 `base` 路径，确保正确设置为你的仓库名（如果用方案B）

### Q: 刷新页面出现 404？

**A**: 我们已经使用 HashRouter，URL 中会有 `#`，不会出现 404

### Q: 图片或资源加载失败？

**A**: 确保所有资源路径使用相对路径或正确的 base 路径

---

## 下一步

完成部署后，可以：
- 自定义域名（在仓库 Settings > Pages 中设置）
- 添加自定义 404 页面
- 配置 GitHub Pages 的分支策略
