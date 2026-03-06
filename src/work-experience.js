/**
 * 工作经历自动填充脚本
 * 用于自动填充招聘网站的工作经历表单
 */

(function() {
    // 获取数据
    const dataList = typeof resumeData !== 'undefined' ? resumeData.workExperience : [
        {
            company: "某科技公司",
            dept: "技术部",
            post: "算法实习生",
            desc: "负责算法相关工作，参与项目开发。"
        }
    ];

    // 识别规则与独立计数器
    const rules = [
        { key: 'company', keywords: ["公司", "单位", "企业"], counter: 0 },
        { key: 'dept', keywords: ["部门", "科室"], counter: 0 },
        { key: 'post', keywords: ["职位", "岗位", "职务"], counter: 0 },
        { key: 'desc', keywords: ["职责", "内容", "工作内容"], counter: 0 }
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
        
        el.dispatchEvent(new Event("input", { bubbles: true }));
        el.dispatchEvent(new Event("change", { bubbles: true }));
    }

    /**
     * 获取元素上下文文本
     * @param {HTMLElement} el - DOM元素
     * @returns {string} 上下文文本
     */
    function getContextText(el) {
        let text = (el.placeholder || "") + (el.name || "") + (el.id || "");
        let p = el.parentElement;
        
        for (let i = 0; i < 3; i++) {
            if (p) {
                text += p.innerText || "";
                p = p.parentElement;
            }
        }
        return text;
    }

    /**
     * 填充工作经历表单
     */
    function fillWorkExperience() {
        console.log("💼 开始填充工作经历...");
        
        const allInputs = document.querySelectorAll("input:not([type=file]), textarea, select");
        
        allInputs.forEach(el => {
            const context = getContextText(el);
            
            for (let rule of rules) {
                if (rule.keywords.some(k => context.includes(k))) {
                    const dataIndex = rule.counter;
                    if (dataList[dataIndex] && dataList[dataIndex][rule.key]) {
                        setElementValue(el, dataList[dataIndex][rule.key]);
                    }
                    rule.counter++;
                    break;
                }
            }
        });
        
        console.log("✅ 工作经历填充完成。");
    }

    fillWorkExperience();
})();