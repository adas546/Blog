# 博客项目说明

## 项目概况说明

​	本项目均使用现在react推荐的函数式组件和hooks搭建，使用的依赖包基本都是2022年之后的，项目使用技术新颖，有较大参考价值。

## 环境配置说明

- 前台使用nextjs+ant-design组件库搭建，各项配置为

- ```json
  "dependencies": {
      "@next/font": "13.1.6",
      "@zeit/next-css": "^1.0.1",
      "antd": "^5.2.0",
      "axios": "^1.3.3",
      "babel-plugin-import": "^1.13.6",
      "eslint": "8.33.0",
      "eslint-config-next": "13.1.6",
      "highlight.js": "^11.7.0",
      "lodash": "^4.17.21",
      "markdown-navbar": "^1.4.3",
      "marked": "^4.2.12",
      "next": "13.1.6",
      "react": "^18.2.0",
      "react-dom": "^18.2.0",
      "react-lazyload": "^3.2.0",
      "react-router-dom": "^6.9.0"
    },
  ```

- 中台使用基于nodejs的egg.js搭建

- ```json
  "dependencies": {
  "egg": "^3",
  "egg-cors": "^2.2.3",
  "egg-mysql": "^3.3.0",
  "egg-scripts": "^2"
  },
  "devDependencies": {
  "egg-bin": "^5",
  "egg-ci": "^2",
  "egg-mock": "^5",
  "eslint": "^8",
  "eslint-config-egg": "^12"
  },
  ```

- 后台使用react搭建

- ```json
  "dependencies": {
      "@testing-library/jest-dom": "^5.16.5",
      "@testing-library/react": "^13.4.0",
      "@testing-library/user-event": "^13.5.0",
      "antd": "^5.2.1",
      "axios": "^1.3.4",
      "highlight.js": "^11.7.0",
      "marked": "^4.2.12",
      "react": "^18.2.0",
      "react-dom": "^18.2.0",
      "react-router-dom": "^6.8.1",
      "react-scripts": "5.0.1",
      "web-vitals": "^2.1.4"
    },
  ```

- 本文件下载后，注意进入admin,service,blog三个文件，分别运行npm intsall，根据package.json配置文件下载项目依赖包

## 博客项目运行

- 前台(blog) npm run build+npm run start
- 中台(service) npm run start
- 后台(admin) npm run starr

