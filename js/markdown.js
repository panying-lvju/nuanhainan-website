/**
 * 手写 Markdown 解析器
 * 不依赖第三方库，支持基础语法
 */

class MarkdownParser {
    constructor() {
        this.html = '';
    }

    parse(markdown) {
        if (!markdown) return '';
        
        this.html = '';
        const lines = markdown.split('\n');
        let inList = false;
        let listType = null;
        let inCodeBlock = false;
        let codeBlockContent = '';
        let inBlockquote = false;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            
            // 代码块
            if (line.trim().startsWith('```')) {
                if (inCodeBlock) {
                    this.html += `<pre><code>${codeBlockContent}</code></pre>\n`;
                    codeBlockContent = '';
                    inCodeBlock = false;
                } else {
                    inCodeBlock = true;
                }
                continue;
            }

            if (inCodeBlock) {
                codeBlockContent += this.escapeHtml(line) + '\n';
                continue;
            }

            // 引用块
            if (line.trim().startsWith('>')) {
                if (!inBlockquote) {
                    this.html += '<blockquote>\n';
                    inBlockquote = true;
                }
                this.html += `<p>${this.parseInline(line.replace(/^>\s*/, ''))}</p>\n`;
                continue;
            } else if (inBlockquote) {
                this.html += '</blockquote>\n';
                inBlockquote = false;
            }

            // 列表结束
            if (inList && !line.trim().match(/^[\-\*]\s/) && !line.trim().match(/^\d+\.\s/)) {
                this.html += inListType === 'ul' ? '</ul>\n' : '</ol>\n';
                inList = false;
                inListType = null;
            }

            // 无序列表
            if (line.trim().match(/^[\-\*]\s/)) {
                if (!inList) {
                    this.html += '<ul>\n';
                    inList = true;
                    inListType = 'ul';
                }
                this.html += `<li>${this.parseInline(line.replace(/^[\-\*]\s/, ''))}</li>\n`;
                continue;
            }

            // 有序列表
            if (line.trim().match(/^\d+\.\s/)) {
                if (!inList) {
                    this.html += '<ol>\n';
                    inList = true;
                    inListType = 'ol';
                }
                this.html += `<li>${this.parseInline(line.replace(/^\d+\.\s/, ''))}</li>\n`;
                continue;
            }

            // 水平线
            if (line.trim().match(/^---+$/) || line.trim().match(/^\*\*\*+$/)) {
                this.html += '<hr>\n';
                continue;
            }

            // 标题
            const headerMatch = line.match(/^(#{1,6})\s+(.+)$/);
            if (headerMatch) {
                const level = headerMatch[1].length;
                this.html += `<h${level}>${this.parseInline(headerMatch[2])}</h${level}>\n`;
                continue;
            }

            // 空行
            if (line.trim() === '') {
                continue;
            }

            // 段落
            this.html += `<p>${this.parseInline(line)}</p>\n`;
        }

        // 关闭未闭合的标签
        if (inList) {
            this.html += inListType === 'ul' ? '</ul>\n' : '</ol>\n';
        }
        if (inBlockquote) {
            this.html += '</blockquote>\n';
        }
        if (inCodeBlock) {
            this.html += `<pre><code>${codeBlockContent}</code></pre>\n`;
        }

        return this.html;
    }

    parseInline(text) {
        // 转义 HTML
        text = this.escapeHtml(text);

        // 粗体 **text**
        text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

        // 斜体 *text*
        text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');

        // 行内代码 `code`
        text = text.replace(/`(.+?)`/g, '<code>$1</code>');

        // 链接 [text](url)
        text = text.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank">$1</a>');

        // 图片 ![alt](url)
        text = text.replace(/!\[(.+?)\]\((.+?)\)/g, '<img src="$2" alt="$1">');

        return text;
    }

    escapeHtml(text) {
        const escapeMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };
        return text.replace(/[&<>"']/g, m => escapeMap[m]);
    }
}

// 全局实例
const markdownParser = new MarkdownParser();
