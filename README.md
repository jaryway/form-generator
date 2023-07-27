![image](https://ae01.alicdn.com/kf/U51bfb661aba945b48a4c71774421d414C.gif)

## 简介

Element UI 表单设计及代码生成器，可将生成的代码直接运行在基于 Element 的 vue 项目中；也可导出 JSON 表单，使用配套的解析器将 JSON 解析成真实的表单。

- 【[国内预览地址](https://mrhj.gitee.io/form-generator)】 【[国际预览地址](https://jakhuang.github.io/form-generator)】
- 【[github 仓库](https://github.com/JakHuang/form-generator)】 【 [码云仓库](https://gitee.com/mrhj/form-generator)】
- [配套 vscode 插件](https://github.com/JakHuang/form-generator-plugin)
- [配套 JSON 解析器](https://github.com/JakHuang/form-generator/blob/dev/src/components/parser/example/Index.vue)

## 文档

- [el-dialog 的封装与调用](https://github.com/JakHuang/form-generator/wiki/el-dialog%E7%9A%84%E5%B0%81%E8%A3%85%E4%B8%8E%E8%B0%83%E7%94%A8)
- [项目主要结构分析](https://github.com/JakHuang/form-generator/wiki/%E9%A1%B9%E7%9B%AE%E4%B8%BB%E8%A6%81%E7%BB%93%E6%9E%84%E5%88%86%E6%9E%90)
- [【常见问题】如何以 npm 的方式集成 monaco 编辑器](https://github.com/JakHuang/monaco-vue-demo)
- 系列教程：
  [《表单设计器 · 开发教程》](https://github.com/JakHuang/form-generator/issues/30)
  [《表单解析器 · 开发教程》](https://github.com/JakHuang/form-generator/issues/32)
  [《vue 代码生成器 · 开发教程》](https://github.com/JakHuang/form-generator/issues/31)
  [《vue 代码预览器 · 开发教程》](https://github.com/JakHuang/form-generator/issues/33)
- [JSON 表单参数对照表](https://github.com/JakHuang/form-generator/issues/46)

## JSON 解析器

将保存在数据库中的 JSON 表单，解析成真实的表单  
[查看在线示例](https://mrhj.gitee.io/form-generator/#/parser)

```
// 安装
npm i form-gen-parser
```

[更多信息](https://github.com/JakHuang/form-generator/tree/dev/src/components/parser)

## vscode 插件

帮助使用 element UI 的开发者完成基本的表单代码搭建任务，减少重复的劳动。  
vscode-plugin 分支配套插件为：[form-generator-plugin](https://github.com/JakHuang/form-generator-plugin)；  
使用插件可右键打开设计器，直接将代码保存到工程中。  
安装插件请在 vscode 中搜索：

> jakHuang  
> 或  
> Form Generator Plugin

## 运行

- 确保已经安装 node.js 10+
- 首次下载项目后，安装项目依赖：

```
yarn
```

或

```
npm install
```

- 本地开发

```
npm run dev
```

- 构建

```
npm run build
```

## 开源协议

[MIT](https://opensource.org/licenses/MIT)

### TODO

- [ ] 完善组件
  - [x] 1.  单行文本
  - [x] 2.  多行文本
  - [x] 3.  单选按钮组
  - [x] 4.  复选框组
  - [x] 5.  下拉框
  - [x] 6.  下拉复选框
  - [x] 7.  数字
  - [x] 8.  日期
  - [x] 9.  上传
  - [x] 10. 分割线
  - [x] 11. 地址
  - [x] 12. 定位
  - [ ] 13. 关联查询
  - [ ] 14. 关联数据
  - [ ] 15. 子表单
  - [x] 16. 选人
  - [x] 17. 签名
- [x] 完善验证功能
- [x] 显隐依赖规则
- [ ] 关联查询后数据填充
- [ ] 关联数据
- [x] 编辑模式和预览模式
