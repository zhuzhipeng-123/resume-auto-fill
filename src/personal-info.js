/**
 * 个人信息自动填充脚本
 * 用于自动填充招聘网站的个人基本信息表单
 */

(function() {
    // 获取数据（优先使用全局配置）
    const personalData = typeof resumeData !== 'undefined' ? resumeData.personal : {
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
    };

    // 字段匹配规则
    const fieldMap = [
        { key: 'name', keywords: ["姓名", "中文名"], exact: true, exclude: ["性别", "男", "女"] },
        { key: 'gender', keywords: ["性别"], exact: true },
        { key: 'nationality', keywords: ["国籍", "民族"], exact: true },
        { key: 'mobile', keywords: ["手机号码", "手机号", "联系电话"], exact: false },
        { key: 'email', keywords: ["邮箱", "电子邮箱"], exact: false },
        { key: 'idNumber', keywords: ["证件号码", "身份证号"], exact: false },
        { key: 'targetCity', keywords: ["期望工作城市", "目标城市"], exact: false },
        { key: 'expectedGraduation', keywords: ["预计毕业时间", "毕业时间"], exact: false },
        { key: 'availableDate', keywords: ["可以实习入职时间", "到岗时间"], exact: false },
        { key: 'internshipDuration', keywords: ["可以实习的时长", "实习时长"], exact: false }
    ];

    /**
     * 设置表单元素值
     * @param {HTMLElement} el - 表单元素
     * @param {string} value - 要设置的值
     * @param {string} fieldKey - 字段键名
     */
    function setElementValue(el, value, fieldKey) {
        if (!el) return;

        // 跳过姓名字段的单选框/复选框
        if (fieldKey === 'name' && (el.type === 'radio' || el.type === 'checkbox')) return;

        // 处理单选框（主要用于性别）
        if (el.type === 'radio') {
            if (fieldKey !== 'gender') return;
            
            const parentText = el.parentElement ? el.parentElement.innerText.trim() : "";
            const idText = el.id ? (document.querySelector(`label[for="${el.id}"]`)?.innerText || "") : "";
            const combinedText = parentText + idText;
            
            if (combinedText.includes(value) || el.value === value) {
                el.checked = true;
                el.dispatchEvent(new Event("click", { bubbles: true }));
                el.dispatchEvent(new Event("change", { bubbles: true }));
            }
            return;
        }

        // 处理输入框和文本域
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            // 跳过性别文本框
            if (fieldKey === 'gender' && el.type === 'text' && !el.placeholder.includes("性别")) return;
            
            // 使用原型链的 setter 确保值被正确设置（兼容 React 等框架）
            const prototype = Object.getPrototypeOf(el);
            const setter = Object.getOwnPropertyDescriptor(prototype, "value")?.set;
            
            if (setter) {
                setter.call(el, value);
            } else {
                el.value = value;
            }
            
            // 触发事件以通知框架
            const events = ["input", "change", "blur"];
            events.forEach(evt => el.dispatchEvent(new Event(evt, { bubbles: true })));
        }
    }

    /**
     * 填充个人信息表单
     */
    function fillPersonalInfo() {
        console.log("📋 开始填充个人信息...");
        
        const allElements = Array.from(document.querySelectorAll('label, .form-item__text, span, p, div'));
        
        allElements.forEach(label => {
            // 只处理叶子节点或特定标签
            if (label.children.length > 0 && !["SPAN", "LABEL"].includes(label.tagName)) return;
            
            const rawLabelText = label.innerText.trim();
            const labelText = rawLabelText.replace(/[:：*]/g, "");
            if (!labelText) return;
            
            fieldMap.forEach(field => {
                // 检查排除关键词
                if (field.exclude && field.exclude.some(ex => labelText.includes(ex))) return;
                
                // 匹配字段
                const isMatch = field.exact ? 
                    field.keywords.some(k => labelText === k) : 
                    field.keywords.some(k => labelText.includes(k));
                
                if (isMatch) {
                    let container = label.parentElement;
                    let foundInput = false;
                    
                    // 向上查找包含输入框的容器
                    for (let i = 0; i < 4; i++) {
                        if (!container) break;
                        
                        const inputs = container.querySelectorAll('input, textarea');
                        if (inputs.length > 0) {
                            inputs.forEach(input => {
                                if (input.type !== 'hidden' && getComputedStyle(input).display !== 'none') {
                                    setElementValue(input, personalData[field.key], field.key);
                                    foundInput = true;
                                }
                            });
                        }
                        if (foundInput) break;
                        container = container.parentElement;
                    }
                }
            });
        });
    }

    fillPersonalInfo();
    console.log("✅ 个人信息填充完成。");
})();