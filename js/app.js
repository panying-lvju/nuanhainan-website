/**
 * 暖海南资讯网站 - 主应用逻辑（调试版）
 */

// 全局状态
const state = {
    currentCategory: 'yanglao',
    articles: {},
    currentArticle: null
};

// 栏目配置
const categories = {
    yanglao: { title: '养老动态', icon: '👴', key: 'yanglao' },
    'ai-agent': { title: 'AI 智能体', icon: '🤖', key: 'ai_agent' },
    hainan: { title: '海南热点', icon: '🌴', key: 'hainan' }
};

// 调试日志
function log(msg, data = null) {
    console.log('[暖海南]', msg, data || '');
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    log('页面加载完成');
    loadArticles(state.currentCategory);
    setupNavigation();
});

// 加载文章列表
async function loadArticles(category) {
    log('加载栏目:', category);
    
    const container = document.getElementById('articlesContainer');
    const titleEl = document.getElementById('categoryTitle');
    
    if (!container) {
        log('错误：找不到 articlesContainer 元素');
        return;
    }
    
    container.innerHTML = '<p>加载中...</p>';
    
    try {
        // 从 index.json 加载（适配小扣的格式）
        const response = await fetch('data/index.json');
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        log('index.json 数据:', data);
        
        // 小扣的格式：data.articles.yanglao = { title, url }
        const key = categories[category]?.key || category;
        log('使用 key:', key);
        
        const articleData = data.articles[key] || {};
        log('文章数据:', articleData);
        
        // 更新标题
        titleEl.textContent = articleData.title || categories[category]?.title || '未知栏目';
        
        // 渲染列表（小扣每天生成一篇，显示最新）
        if (!articleData.url) {
            container.innerHTML = `<p class="no-articles">暂无文章（${key} 栏目没有 URL）</p>`;
            log('无文章：', key);
            return;
        }
        
        // 从 Coze 链接获取 MD 文件名
        const fileName = 'latest.md';
        
        container.innerHTML = `
            <div class="article-item" onclick="openArticle('${category}', '${fileName}')">
                <div class="date">${data.date || ''}</div>
                <div class="title">${articleData.title}</div>
                <div class="summary">点击查看今日${categories[category]?.title || ''}</div>
            </div>
        `;
        
        log('渲染成功');
        
    } catch (error) {
        const errorMsg = `加载失败：${error.message}`;
        log('错误:', error);
        container.innerHTML = `<p class="error" style="color:red;">${errorMsg}</p><p>请打开浏览器控制台（F12）查看详细错误</p>`;
    }
}

// 打开文章详情
async function openArticle(category, file) {
    log('打开文章:', category, file);
    
    try {
        const response = await fetch(`data/articles/${category}/${file}`);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const markdown = await response.text();
        log('Markdown 长度:', markdown.length);
        
        // 解析 Markdown
        const html = markdownParser.parse(markdown);
        log('HTML 长度:', html.length);
        
        // 显示详情页
        document.getElementById('articleContent').innerHTML = html;
        document.getElementById('articleList').classList.add('hidden');
        document.getElementById('articleDetail').classList.remove('hidden');
        
        // 滚动到顶部
        window.scrollTo(0, 0);
        
        log('文章显示成功');
        
    } catch (error) {
        log('加载文章失败:', error);
        alert(`文章加载失败：${error.message}`);
    }
}

// 返回列表
function backToList() {
    document.getElementById('articleDetail').classList.add('hidden');
    document.getElementById('articleList').classList.remove('hidden');
}

// 设置导航
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    log('导航项数量:', navItems.length);
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const category = item.dataset.category;
            log('点击栏目:', category);
            
            // 更新激活状态
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            // 加载文章
            state.currentCategory = category;
            loadArticles(category);
            
            // 移动端关闭菜单
            const sidebar = document.getElementById('sidebar');
            if (sidebar) sidebar.classList.remove('active');
        });
    });
}

// 移动端菜单切换
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.toggle('active');
}
