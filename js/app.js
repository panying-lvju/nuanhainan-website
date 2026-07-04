/**
 * 暖海南资讯网站 - 主应用逻辑
 */

// 全局状态
const state = {
    currentCategory: 'yanglao',
    articles: {},
    currentArticle: null
};

// 栏目配置
const categories = {
    yanglao: { title: '养老动态', icon: '👴' },
    'ai-agent': { title: 'AI 智能体', icon: '🤖' },
    hainan: { title: '海南热点', icon: '🌴' }
};

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    loadArticles(state.currentCategory);
    setupNavigation();
});

// 加载文章列表
async function loadArticles(category) {
    const container = document.getElementById('articlesContainer');
    const titleEl = document.getElementById('categoryTitle');
    
    try {
        // 从 index.json 加载
        const response = await fetch('data/index.json');
        const data = await response.json();
        
        const articles = data[category] || [];
        state.articles[category] = articles;
        
        // 更新标题
        titleEl.textContent = categories[category].title;
        
        // 渲染列表
        if (articles.length === 0) {
            container.innerHTML = '<p class="no-articles">暂无文章</p>';
            return;
        }
        
        container.innerHTML = articles.map(article => `
            <div class="article-item" onclick="openArticle('${category}', '${article.file}')">
                <div class="date">${article.date}</div>
                <div class="title">${article.title}</div>
                <div class="summary">${article.summary}</div>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('加载文章失败:', error);
        container.innerHTML = '<p class="error">加载失败，请刷新重试</p>';
    }
}

// 打开文章详情
async function openArticle(category, file) {
    try {
        const response = await fetch(`data/articles/${category}/${file}`);
        const markdown = await response.text();
        
        // 解析 Markdown
        const html = markdownParser.parse(markdown);
        
        // 显示详情页
        document.getElementById('articleContent').innerHTML = html;
        document.getElementById('articleList').classList.add('hidden');
        document.getElementById('articleDetail').classList.remove('hidden');
        
        // 滚动到顶部
        window.scrollTo(0, 0);
        
    } catch (error) {
        console.error('加载文章失败:', error);
        alert('文章加载失败，请重试');
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
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const category = item.dataset.category;
            
            // 更新激活状态
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            // 加载文章
            state.currentCategory = category;
            loadArticles(category);
            
            // 移动端关闭菜单
            document.getElementById('sidebar').classList.remove('active');
        });
    });
}

// 移动端菜单切换
function toggleMenu() {
    document.getElementById('sidebar').classList.toggle('active');
}
