/**
 * 教育背景自动填充脚本
 * 用于自动填充招聘网站的教育背景表单
 */

(function() {
    // 获取数据
    const eduList = typeof resumeData !== 'undefined' ? resumeData.education : [
        {
            school: "某大学",
            major: "计算机科学",
            startTime: "2021-09",
            endTime: "2025-06",
            degree: "本科"
        }
    ];

    /**
     * 填充教育背景表单
     */
    function fillEducation() {
        console.log("🎓 开始填充教育经历...");
        
        const labels = Array.from(document.querySelectorAll('label, .form-item__text, span, p, div'));
        
        const fieldMap = [
            { key: 'school', keywords: ["学校名称", "毕业院校", "学校"] },
            { key: 'major', keywords: ["专业名称", "所学专业", "专业"] },
            { key: 'startTime', keywords: ["开始时间", "入学日期", "入学时间"] },
            { key: 'endTime', keywords: ["结束时间", "毕业日期", "毕业时间"] },
            { key: 'degree', keywords: ["学历", "学位"] }
        ];

        const counters = { school: 0, major: 0, startTime: 0, endTime: 0, degree: 0 };

        labels.forEach(label => {
            if (label.children.length > 0 && !["SPAN", "LABEL"].includes(label.tagName)) return;
            
            const labelText = label.innerText.trim();
            if (!labelText) return;
            
            fieldMap.forEach(field => {
                if (field.keywords.some(k => labelText === k || labelText === k + ":" || labelText === k + "：")) {
                    let container = label.parentElement;
                    let foundControl = false;
                    
                    for (let i = 0; i < 4; i++) {
                        if (!container) break;
                        if (container.querySelector('input:not([type=hidden]), textarea, select')) {
                            foundControl = true;
                            break;
                        }
                        container = container.parentElement;
                    }
                    
                    if (foundControl && container) {
                        const input = container.querySelector('input:not([type=hidden]), textarea, select');
                        const dataIndex = counters[field.key];
                        
                        if (input && eduList[dataIndex] && eduList[dataIndex][field.key]) {
                            const val = eduList[dataIndex][field.key];
                            
                            // 使用原型链的 setter
                            const prototype = input.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : 
                                             input.tagName === 'SELECT' ? HTMLSelectElement.prototype : 
                                             HTMLInputElement.prototype;
                            const setter = Object.getOwnPropertyDescriptor(prototype, "value")?.set;
                            
                            if (setter) {
                                setter.call(input, val);
                            } else {
                                input.value = val;
                            }
                            
                            const events = ["input", "change", "blur"];
                            events.forEach(evt => input.dispatchEvent(new Event(evt, { bubbles: true })));
                            
                            counters[field.key]++;
                        }
                    }
                }
            });
        });
    }

    fillEducation();
    console.log("✅ 教育经历填充完成。");
})();