/**
 * 简历自动填充 - 主入口文件
 * 一键填充所有简历信息
 * 
 * 使用方法：
 * 1. 先在浏览器控制台执行 config.js 定义简历数据
 * 2. 然后执行此文件一键填充所有信息
 */

(function() {
    console.log("========================================");
    console.log("    📝 简历自动填充工具 v1.0.0");
    console.log("========================================");
    
    // 检查是否已加载数据
    if (typeof resumeData === 'undefined') {
        console.warn("⚠️  未检测到简历数据配置！");
        console.log("💡 提示：请先执行 config.js 文件定义您的简历数据");
        console.log("   或使用各模块单独填充（personal-info.js 等）");
    }
    
    // 加载各模块
    const scripts = [
        { name: 'personal-info.js', desc: '个人信息' },
        { name: 'education.js', desc: '教育背景' },
        { name: 'work-experience.js', desc: '工作经历' },
        { name: 'project-experience.js', desc: '项目经历' }
    ];
    
    console.log("\n📦 可用模块：");
    scripts.forEach((s, i) => {
        console.log(`   ${i + 1}. ${s.desc} (${s.name})`);
    });
    
    console.log("\n📖 使用说明：");
    console.log("   方式一：逐个执行模块文件");
    console.log("   方式二：复制整个文件内容到控制台执行");
    console.log("\n✨ 准备就绪，请在控制台执行相应模块！");
})();