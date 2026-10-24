# 王哲豪个人作品集

React + Vite 实现的个人作品集，包含三图建筑式首屏、个人经历、精选项目、能力卡片和整屏联系方式。

## 本地运行

```powershell
pnpm install
pnpm dev
```

打开终端中显示的本地地址，默认是 `http://127.0.0.1:5173`。

当前电脑没有把 Node 加入系统命令路径时，可以在项目目录直接运行：

```powershell
.\start-preview.ps1
```

## 生产构建

```powershell
pnpm build
pnpm preview
```

## 内容维护

- 页面文案、经历和项目信息在 `src/App.jsx` 中集中维护。
- 全局样式与响应式规则在 `src/styles.css` 中。
- 首屏图片与其他视觉素材存放在 `public/media/` 中。
- 当前景观项目图为工作副本渲染截图，后续提供正式项目图时可以直接替换同名文件。
