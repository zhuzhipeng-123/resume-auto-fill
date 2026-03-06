/**
 * 项目经历自动填充脚本
 * 用于自动填充招聘网站的项目经历表单
 */

(function() {
    // 获取数据
    const projectData = typeof resumeData !== 'undefined' ? resumeData.projectExperience : [
        {
            name: "机器学习项目",
            post: "项目成员",
            startTime: "2023-06",
            endTime: "2024-06",
            desc: "这是一个机器学习相关的项目，主要研究数据预测问题。",
            duty: "负责数据处理和模型构建工作。"
        }
    ];

    // 字段识别规则
    const fieldMap = [
        { key: 'name', keywords: ["项目名称", "project name", "项目"] },
        { key: 'post', keywords: ["职务", "角色", "担任角色"] },
        { key: 'startTime', keywords: ["开始日期", "start", "开始时间"] },
        { key: 'endTime', keywords: ["结束日期", "end", "结束时间"] },
        { key: 'desc', keywords: ["项目描述", "description", "项目简介"] },
        { key: 'duty', keywords: ["项目职责", "职责", "个人职责"] }
    ];

    /**
     * 设置表单元素值
     * @param {HTMLElement} el - 表单元素
     * @param {string} value - 要设置的值
     */
    function setElementValue(el, value) {
        if (!el || value === undefined) return;
        
        const prototype = el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : 
                         el.tagName === 'SELECT' ? HTMLSelectElement.prototype : 
                         HTMLInputElement.prototype;
        const setter = Object.getOwnPropertyDescriptor(prototype, "value")?.set;
        
        if (setter) {
            setter.call(el, value);
        } else {
            el.value = value;
        }
        
        const events = ["input", "change", "blur"];
        events.forEach(evt => el.dispatchEvent(new Event(evt, { bubbles: true })));
    }

    /**
     * 填充项目经历表单
     */
    function fillProjectExperience() {
        console.log("🚀 开始填充项目经历...");
        
        const counters = { name: 0, post: 0, startTime: 0, endTime: 0, desc: 0, duty: 0 };
        const labels = Array.from(document.querySelectorAll('label, .form-item__text, span, p, div, .label'));
        
        labels.forEach(label => {
            if (label.children.length > 0 && !["SPAN", "LABEL"].includes(label.tagName)) return;
            
            const labelText = label.innerText.trim().replace(/[:：*]/g, "");
            if (!labelText) return;
            
            fieldMap.forEach(field => {
                if (field.keywords.some(k => labelText.includes(k))) {
                    let container = label.parentElement;
                    let found = false;
                    
                    for (let i = 0; i < 5; i++) {
                        if (!container) break;
                        
                        const input = container.querySelector('input:not([type=hidden]), textarea, select');
                        if (input && getComputedStyle(input).display !== 'none') {
                            const dataIndex = counters[field.key];
                            if (projectData[dataIndex] && projectData[dataIndex][field.key]) {
                                setElementValue(input, projectData[dataIndex][field.key]);
                                counters[field.key]++;
                                found = true;
                            }
                        }
                        if (found) break;
                        container = container.parentElement;
                    }
                }
            });
        });
    }
    
    fillProjectExperience();
    console.log("✅ 项目经历填充完成。");
})();