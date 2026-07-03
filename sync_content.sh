#!/bin/bash
# 暖海南资讯网站 - 内容同步脚本
# 从小扣的 Coze 链接自动拉取最新内容

set -e

# ============ 配置区域（小扣提供）===========
YANGLAO_URL="https://www.coze.cn/s/sL3L9ARqWvs/"
AI_AGENT_URL="https://www.coze.cn/s/vjpD5UdXY7k/"
HAINAN_URL="https://www.coze.cn/s/qmy2OZZg8cM/"
INDEX_URL="https://www.coze.cn/s/dTsr0Ml-AS4/"

# ============ 系统配置 ============
TARGET_DIR="/var/www/nuanhainan/data"
BACKUP_DIR="/var/www/nuanhainan/backup"
LOG_FILE="/var/www/nuanhainan/sync.log"
TEMP_DIR=$(mktemp -d)

# ============ 日志函数 ============
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

error_log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ❌ ERROR: $1" | tee -a "$LOG_FILE"
}

# ============ 下载函数 ============
download_file() {
    local url=$1
    local output=$2
    local category=$3
    
    log "下载 $category: $url"
    
    # 尝试下载（处理 Coze 链接可能重定向）
    if wget -q --no-check-certificate -O "$output" "$url" 2>/dev/null; then
        # 检查是否是有效文件（不是 HTML 页面）
        if file "$output" | grep -q "HTML"; then
            error_log "$category 下载失败：返回的是 HTML 页面"
            rm -f "$output"
            return 1
        fi
        log "✓ $category 下载成功"
        return 0
    else
        error_log "$category 下载失败"
        rm -f "$output"
        return 1
    fi
}

# ============ 备份函数 ============
backup_data() {
    if [ -d "$TARGET_DIR" ] && [ "$(ls -A $TARGET_DIR 2>/dev/null)" ]; then
        BACKUP_NAME="backup_$(date '+%Y%m%d_%H%M%S').tar.gz"
        log "创建备份：$BACKUP_NAME"
        tar -czf "$BACKUP_DIR/$BACKUP_NAME" -C "$TARGET_DIR" . 2>/dev/null || true
        # 保留最近 7 天的备份
        find "$BACKUP_DIR" -name "backup_*.tar.gz" -mtime +7 -delete 2>/dev/null || true
        log "✓ 备份完成"
    fi
}

# ============ 同步主流程 ============
sync_content() {
    log "========== 同步开始 =========="
    
    # 1. 备份现有数据
    backup_data
    
    # 2. 创建临时目录
    mkdir -p "$TEMP_DIR"
    cd "$TEMP_DIR"
    
    # 3. 下载索引文件
    if download_file "$INDEX_URL" "index.json" "索引文件"; then
        # 4. 创建栏目目录
        mkdir -p articles/{yanglao,ai-agent,hainan}
        
        # 5. 下载各栏目 MD 文件
        download_file "$YANGLAO_URL" "articles/yanglao/latest.md" "养老动态" || true
        download_file "$AI_AGENT_URL" "articles/ai-agent/latest.md" "AI 动态" || true
        download_file "$HAINAN_URL" "articles/hainan/latest.md" "海南热点" || true
        
        # 6. 同步到目标目录
        log "同步数据到 $TARGET_DIR..."
        rsync -av --delete "$TEMP_DIR/" "$TARGET_DIR/" 2>&1 | tee -a "$LOG_FILE"
        
        log "✓ 同步完成"
    else
        error_log "索引文件下载失败，同步中止"
    fi
    
    # 7. 清理临时目录
    cd - > /dev/null
    rm -rf "$TEMP_DIR"
    
    log "========== 同步结束 =========="
}

# ============ 主程序 ============
main() {
    # 确保目录存在
    mkdir -p "$TARGET_DIR"/{articles/{yanglao,ai-agent,hainan}} "$BACKUP_DIR"
    touch "$LOG_FILE"
    
    sync_content
}

main "$@"
