/**
 * 简历数据配置文件
 * 请根据您的实际情况修改以下数据
 */

const resumeData = {
    // 个人信息
    personal: {
        name: "张三",
        gender: "男",
        nationality: "中国",
        mobile: "13800138000",
        email: "example@example.com",
        idType: "身份证",
        idNumber: "11010119900101001X",
        targetCity: "北京",
        expectedGraduation: "2025-06-01",
        internshipDuration: "3-6个月",
        availableDate: "2024-03-01"
    },

    // 教育背景
    education: [
        {
            school: "某大学",
            major: "计算机科学",
            startTime: "2021-09",
            endTime: "2025-06",
            degree: "本科"
        }
    ],

    // 工作经历
    workExperience: [
        {
            company: "某科技公司",
            dept: "技术部",
            post: "算法实习生",
            desc: "负责算法相关工作，参与项目开发。"
        }
    ],

    // 项目经历
    projectExperience: [
        {
            name: "机器学习项目",
            post: "项目成员",
            startTime: "2023-06",
            endTime: "2024-06",
            desc: "这是一个机器学习相关的项目，主要研究数据预测问题。",
            duty: "负责数据处理和模型构建工作。"
        }
    ]
};

// 导出数据（用于模块化使用）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = resumeData;
}