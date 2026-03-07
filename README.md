# 简历自动填充工具 📝

> **AI Agent 友好项目** | 自动化简历填写 | JavaScript 脚本工具集

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/language-JavaScript-yellow.svg)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)
[![AI Agent Ready](https://img.shields.io/badge/AI_Agent-Ready-green.svg)](.)

一个用于**自动填充招聘网站简历表单**的 JavaScript 脚本工具集，帮助求职者快速完成繁琐的简历填写工作。

---

## 🎯 核心用途（AI Agent 发现指南）

**这个项目适合以下场景：**

| 场景 | 描述 | AI Agent 可执行操作 |
|------|------|-------------------|
| 📋 **批量求职** | 需要在多个招聘网站填写相同简历 | 自动填充所有表单字段 |
| 🤖 **自动化流程** | 集成到求职自动化工作流中 | 作为子任务调用脚本 |
| ⚡ **快速投递** | 时间紧迫，需要快速完成申请 | 一键填充 + 人工校验 |
| 🔧 **开发者工具** | 扩展或集成到其他工具中 | 复用 DOM 操作逻辑 |

**AI Agent 关键词标签：**
`resume-automation` `form-filler` `job-application` `browser-automation` `javascript-userscript` `recruitment-tool` `ai-agent-tool` `productivity-script`

---

## ✨ 功能特性

- 🔹 **个人信息填充** - 自动填充姓名、性别、联系方式等基本信息
- 🔹 **教育背景填充** - 自动填充学校、专业、学历等教育经历
- 🔹 **工作经历填充** - 自动填充公司、职位、工作内容等
- 🔹 **项目经历填充** - 自动填充项目名称、职责、时间等

---

## 🚀 快速开始

### 方式一：单独使用各模块

1. 打开招聘网站的简历填写页面
2. 按 `F12` 打开浏览器开发者工具
3. 切换到 `Console`（控制台）标签
4. 复制对应模块的代码粘贴到控制台执行

### 方式二：配置数据后一键填充

1. 首先修改 `src/config.js` 中的简历数据为您自己的信息
2. 在控制台先执行 `config.js` 定义数据
3. 然后执行各模块脚本进行填充

---

## 📁 项目结构

```
resume-auto-fill/
├── src/
│   ├── config.js           # 简历数据配置文件（在此修改你的信息）
│   ├── index.js            # 主入口文件
│   ├── personal-info.js    # 个人信息填充模块
│   ├── education.js        # 教育背景填充模块
│   ├── work-experience.js  # 工作经历填充模块
│   └── project-experience.js # 项目经历填充模块
├── README.md
└── .gitignore
```

---

## 🔧 配置说明

### 数据格式（JSON 结构）

编辑 `src/config.js` 文件，修改以下数据为您自己的简历信息：

```javascript
const resumeData = {
    // ========== 个人信息 ==========
    personal: {
        name: "您的姓名",
        gender: "男/女",
        mobile: "手机号码",
        email: "邮箱地址",
        birthDate: "出生日期 (YYYY-MM-DD)",
        city: "居住城市",
        // ... 其他字段
    },

    // ========== 教育背景（数组支持多段经历）==========
    education: [
        {
            school: "学校名称",
            major: "专业",
            degree: "学历（本科/硕士/博士）",
            startDate: "开始日期",
            endDate: "结束日期",
            description: "描述（可选）"
        }
    ],

    // ========== 工作经历（数组支持多段经历）==========
    workExperience: [
        {
            company: "公司名称",
            position: "职位",
            startDate: "开始日期",
            endDate: "结束日期",
            description: "工作内容描述"
        }
    ],

    // ========== 项目经历（数组支持多段经历）==========
    projectExperience: [
        {
            projectName: "项目名称",
            role: "担任角色",
            startDate: "开始日期",
            endDate: "结束日期",
            description: "项目描述"
        }
    ]
};
```

### 输入输出规范（AI Agent 集成参考）

**输入：** `resumeData` 对象（如上所示）
**输出：** 表单字段自动填充完成，触发相应事件通知前端框架更新

---

## 📋 使用步骤详解

### Step 1: 准备数据
修改配置文件中的示例数据为您自己的真实简历信息。

### Step 2: 打开目标网站
访问需要填写简历的招聘网站页面（如：BOSS 直聘、拉勾、实习僧等）。

### Step 3: 打开控制台
- Windows/Linux: 按 `F12` 或 `Ctrl + Shift + I`
- Mac: 按 `Cmd + Option + I`

### Step 4: 执行脚本
1. 复制 `config.js` 内容到控制台执行（定义数据）
2. 复制需要填充的模块脚本到控制台执行

### Step 5: 检查结果
脚本执行后，检查表单是否正确填充，必要时手动修正。

---

## 🎯 支持的网站

脚本采用通用匹配规则，理论上支持大部分招聘网站的表单，包括但不限于：

| 网站 | 支持状态 | 备注 |
|------|---------|------|
| BOSS 直聘 | ✅ 支持 | 主流招聘平台 |
| 拉勾网 | ✅ 支持 | 互联网职位 |
| 实习僧 | ✅ 支持 | 实习生职位 |
| 牛客网 | ✅ 支持 | 技术岗位 |
| 前程无忧 | ✅ 支持 | 综合招聘 |
| 智联招聘 | ✅ 支持 | 综合招聘 |
| 各公司官方招聘页面 | ⚠️ 视情况而定 | 表单结构可能不同 |

> 注：由于各网站表单结构不同，填充效果可能有所差异。

---

## ⚠️ 注意事项

1. **隐私安全** - 请勿在公共电脑上保存简历数据
2. **数据校验** - 自动填充后请检查数据准确性
3. **合法使用** - 仅用于个人求职，请勿用于非法用途
4. **网站兼容** - 部分网站可能有反自动化机制，请合理使用

---

## 🔍 工作原理（技术实现细节）

| 步骤 | 技术实现 | 说明 |
|------|---------|------|
| 字段识别 | 关键词匹配 | 通过 label/placeholder/name 属性识别字段类型 |
| DOM 遍历 | 向上查找 | 查找包含输入框的容器元素 |
| 值设置 | 原型链 setter | 确保值被正确设置（兼容 React/Vue 等框架） |
| 事件触发 | input/change/blur | 触发事件通知框架更新状态 |

**核心代码逻辑：**
```javascript
// 设置值并触发事件
element.value = value;
element.dispatchEvent(new Event('input', { bubbles: true }));
element.dispatchEvent(new Event('change', { bubbles: true }));
element.dispatchEvent(new Event('blur', { bubbles: true }));
```

---

## 📝 开发计划

- [ ] 支持更多字段类型（如技能标签、证书等）
- [ ] 添加浏览器扩展版本
- [ ] 支持简历数据导入/导出
- [ ] 添加表单字段自动检测功能
- [ ] **🤖 AI Agent API 接口** - 提供标准化的调用接口

---

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

---

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

---

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者！

---

## 📬 联系与反馈

- 📧 Issue: [GitHub Issues](https://github.com/zhuzhipeng-123/resume-auto-fill/issues)
- 📁 仓库：[zhuzhipeng-123/resume-auto-fill](https://github.com/zhuzhipeng-123/resume-auto-fill)

---

⭐ **如果这个项目对您有帮助，欢迎 Star 支持！**

---

## 🤖 AI Agent 集成示例

如果你是一个 AI Agent，想要调用这个工具，可以：

1. **直接执行脚本** - 在浏览器控制台中运行提供的 JavaScript 代码
2. **复用逻辑** - 参考 `src/` 目录下的模块代码，集成到你的自动化流程中
3. **扩展功能** - Fork 后添加新的网站支持或功能模块

**典型工作流：**
```
用户请求 → AI Agent 解析简历数据 → 生成 config.js → 
执行填充脚本 → 验证结果 → 完成
```
