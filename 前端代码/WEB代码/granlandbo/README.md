# GranLand BO

本项目是基于 [Ant-Design-Pro](https://pro.ant.design) 框架建立的，下面是文件目录和具体的使用方法。

## 代码下载


```bash
git clone git@repo.gl-data.com:sjl/project_pom.git
```
进入项目中 ```./前段代码/WEB代码/granlandbo/``` 执行以下脚本。

## 环境准备

Install `node_modules`:

```bash
npm install
or
cnpm install （镜像）
or
npx install   (npm携带命令)
or
yarn           (运行此命令 需要安装：全局)
```


## Provided Scripts

Ant Design Pro提供了一些脚本命令帮助你快速启动和构建web项目、代码检查和测试。

### Start project

```bash
npm start
```

### Build project

```bash
npm run build
```

### Check code style

```bash
npm run lint
```

You can also use script to auto fix some lint error:

```bash
npm run lint:fix
```

### Test code

```bash
npm test
```

## More


# 文件目录

```nashorn js
|-- undefined
    |-- config   配置文件
    |   |-- config.js            菜单路由配置
    |   |-- defaultSettings.js   默认设置
    |   |-- plugin.config.js     插件设置
    |   |-- proxy.js             代理设置
    |   |-- themePluginConfig.js 主题设置
    |-- dist 打包后的文件
    |   |-- asset-manifest.json
    |   |-- favicon.png
    |   |-- home_bg.png
    |   |-- index.html
    |   |-- layouts__BasicLayout.6c3cda27.async.js
    |   |-- layouts__BasicLayout.6e0e7a92.chunk.css
    |   |-- layouts__SecurityLayout.1ba20868.async.js
    |   |-- layouts__UserLayout.5587f037.chunk.css
    |   |-- layouts__UserLayout.992f7cc6.async.js
    |   |-- pro_icon.svg
    |   |-- p__404.f5e9de9b.async.js
    |   |-- p__Admin.2fbf8aa7.async.js
    |   |-- p__ListTableList.d1da244e.async.js
    |   |-- p__ListTableList.e7917486.chunk.css
    |   |-- p__user__login.7aa86c7a.async.js
    |   |-- p__user__login.b0110808.chunk.css
    |   |-- umi.17bf737b.css
    |   |-- umi.4a3d324a.js
    |   |-- vendors.41138875.async.js
    |   |-- vendors.7fbfe407.chunk.css
    |   |-- icons
    |       |-- icon-128x128.png
    |       |-- icon-192x192.png
    |       |-- icon-512x512.png
    |-- doc               存放说明文档
    |-- mock              Mock数据
    |   |-- notices.js
    |   |-- route.js
    |   |-- user.js
    |-- public            公用文件
    |   |-- favicon.png
    |   |-- home_bg.png
    |   |-- pro_icon.svg
    |   |-- icons
    |       |-- icon-128x128.png
    |       |-- icon-192x192.png
    |       |-- icon-512x512.png
    |-- src              项目主目录
    |   |-- global.jsx   全局jsx
    |   |-- global.less  全局样式
    |   |-- manifest.json
    |   |-- service-worker.js
    |   |-- assets       资源文件
    |   |   |-- logo.svg
    |   |-- components   组件文件
    |   |   |-- Authorized
    |   |   |   |-- Authorized.jsx
    |   |   |   |-- AuthorizedRoute.jsx
    |   |   |   |-- CheckPermissions.jsx
    |   |   |   |-- index.jsx
    |   |   |   |-- PromiseRender.jsx
    |   |   |   |-- renderAuthorize.js
    |   |   |   |-- Secured.jsx
    |   |   |-- GlobalHeader
    |   |   |   |-- AvatarDropdown.jsx
    |   |   |   |-- index.less
    |   |   |   |-- NoticeIconView.jsx
    |   |   |   |-- RightContent.jsx
    |   |   |-- HeaderDropdown
    |   |   |   |-- index.jsx
    |   |   |   |-- index.less
    |   |   |-- HeaderSearch
    |   |   |   |-- index.jsx
    |   |   |   |-- index.less
    |   |   |-- NoticeIcon
    |   |   |   |-- index.jsx
    |   |   |   |-- index.less
    |   |   |   |-- NoticeList.jsx
    |   |   |   |-- NoticeList.less
    |   |   |-- PageLoading
    |   |   |   |-- index.jsx
    |   |   |-- SelectLang
    |   |       |-- index.jsx
    |   |       |-- index.less
    |   |-- e2e
    |   |   |-- baseLayout.e2e.js
    |   |   |-- topMenu.e2e.js
    |   |   |-- __mocks__
    |   |       |-- antd-pro-merge-less.js
    |   |-- layouts         布局文件夹
    |   |   |-- BasicLayout.jsx
    |   |   |-- BlankLayout.jsx
    |   |   |-- SecurityLayout.jsx
    |   |   |-- UserLayout.jsx
    |   |   |-- UserLayout.less
    |   |-- locales     国家化 暂时不用
    |   |   |-- en-US.js
    |   |   |-- pt-BR.js
    |   |   |-- zh-CN.js
    |   |   |-- zh-TW.js
    |   |   |-- en-US
    |   |   |   |-- component.js
    |   |   |   |-- globalHeader.js
    |   |   |   |-- menu.js
    |   |   |   |-- pwa.js
    |   |   |   |-- settingDrawer.js
    |   |   |   |-- settings.js
    |   |   |-- pt-BR
    |   |   |   |-- component.js
    |   |   |   |-- globalHeader.js
    |   |   |   |-- menu.js
    |   |   |   |-- pwa.js
    |   |   |   |-- settingDrawer.js
    |   |   |   |-- settings.js
    |   |   |-- zh-CN
    |   |   |   |-- component.js
    |   |   |   |-- globalHeader.js
    |   |   |   |-- menu.js
    |   |   |   |-- pwa.js
    |   |   |   |-- settingDrawer.js
    |   |   |   |-- settings.js
    |   |   |-- zh-TW
    |   |       |-- component.js
    |   |       |-- globalHeader.js
    |   |       |-- menu.js
    |   |       |-- pwa.js
    |   |       |-- settingDrawer.js
    |   |       |-- settings.js
    |   |-- models    models层
    |   |   |-- global.js
    |   |   |-- login.js
    |   |   |-- setting.js
    |   |   |-- user.js
    |   |-- pages     页面
    |   |   |-- 404.jsx
    |   |   |-- Admin.jsx
    |   |   |-- Authorized.jsx
    |   |   |-- document.ejs
    |   |   |-- Welcome.jsx
    |   |   |-- Welcome.less
    |   |   |-- .umi
    |   |   |   |-- dva.js
    |   |   |   |-- history.js
    |   |   |   |-- LocaleWrapper.jsx
    |   |   |   |-- polyfills.js
    |   |   |   |-- router.js
    |   |   |   |-- umi.js
    |   |   |   |-- umiExports.ts
    |   |   |-- ListTableList
    |   |   |   |-- index.jsx
    |   |   |   |-- service.js
    |   |   |   |-- _mock.js
    |   |   |   |-- components
    |   |   |       |-- CreateForm.jsx
    |   |   |       |-- UpdateForm.jsx
    |   |   |-- user
    |   |       |-- login
    |   |           |-- index.jsx
    |   |           |-- style.less
    |   |           |-- components
    |   |               |-- Login
    |   |                   |-- index.jsx
    |   |                   |-- index.less
    |   |                   |-- LoginContext.jsx
    |   |                   |-- LoginItem.jsx
    |   |                   |-- LoginSubmit.jsx
    |   |                   |-- LoginTab.jsx
    |   |                   |-- map.jsx
    |   |-- services   serveces层
    |   |   |-- login.js
    |   |   |-- user.js
    |   |-- utils     工具函数目录
    |       |-- authority.js
    |       |-- authority.test.js
    |       |-- Authorized.js
    |       |-- request.js
    |       |-- utils.js
    |       |-- utils.less
    |       |-- utils.test.js
    |-- tests  tests目录
        |-- run-tests.js
        |-- setupTests.js
    |-- .editorconfig       编辑器配置
    |-- .eslintignore       Eslint忽略配置
    |-- .eslintrc.js        Eslint配置
    |-- .gitignore          Git忽略配置
    |-- .prettierignore     Prettier忽略文件配置
    |-- .prettierrc.js      Prettier忽略配置
    |-- .stylelintrc.js     Stylelint配置
    |-- jest-puppeteer.config.js
    |-- jest.config.js
    |-- jsconfig.json
    |-- package.json     项目信息
    |-- README.md        说明文档
    |-- tsconfig.json
```


官方网站： [official website](https://pro.ant.design).


