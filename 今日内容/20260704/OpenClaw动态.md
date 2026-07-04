## OpenClaw 每日动态推送

**日期**：2026-07-04（周六）
**简报已保存至**：`/app/data/所有对话/主对话/热点资讯追踪/OpenClaw动态/OpenClaw动态_2026-07-04.md`

---

### 今日主线

**中美AI安全博弈升级，阿里全面禁用Claude转推国产替代方案Qoder；企业级安全管控进入深水区，火山引擎ArkClaw与青藤WorkClaw双线发力。**

---

### 版本更新

- **OpenClaw 当前稳定版：2026.6.10**（6月24日发布），主打短对话 fast mode 和模型路由优化，近日无新版本发布
- **AutoClaw（智谱）v1.9.0** 已更新，全面接入 GLM-5.2，支持 100 万上下文能力；**7月4日新发布 Auto Design 设计师**——"一句话生成界面的全链路设计 Agent"，国内国外全量上线
- **火山引擎 ArkClaw 企业版** 7月3日更新：新增审计日志可观测数据脱敏开关、MCP Tool 级别权限控制、TDE 加密存储用户数据

---

### 生态动态

#### 🔴 重磅：阿里全面禁用 Claude，推 Qoder 替代
- 阿里因 Claude Code 被曝存在植入后门安全风险，7月10日起全面禁止员工在办公环境使用 Claude Code 及 Sonnet/Opus/Fable 等全系模型
- 同步发布 **Qoder 企业版**：支持企业知识库 QMind、Credits 资源池化付费、五层安全防护体系
- 背景：Anthropic 此前指控阿里利用约 2.5 万个虚假账号进行 2800 万次对话，定性为"工业级模型蒸馏攻击"；地缘政治"双向切割"趋势明显
- **对扣子生态影响**：阿里系（悟空/Qoder）与字节系（扣子+飞书）在 OpenClaw 生态的竞争加剧

#### 腾讯 QClaw 产品经理张舒昱离职
- 7月2日宣布离职，在职约10个月；澄清 QClaw 与 WorkBuddy"是同一个老板"，内部并无"赛马"
- QClaw 已升格为腾讯公司核心战略项目，基于 OpenClaw 开源生态

#### 阿里云发布 HITL 安全插件
- 阿里云推出 **HITL（Human-in-the-Loop）插件**，可自动识别 AI Agent 通过阿里云 CLI 发起的中高风险云资源操作，执行前暂停等待人工确认
- 已适配 OpenClaw 工具，支持钉钉通知推送审批，免费开源（MIT 协议）

#### 火山引擎 ArkClaw 企业版持续迭代
- 7月3日发布多项管理员端新功能：MCP 权限管理页签优化、企业 MCP Tool 级别细粒度权限控制、席位等级变更审计等
- 6月已累计发布：方舟 AgentPlan 适配、镜像管理、品牌定制、沙箱中心等

---

### 安全与合规

#### 青藤 WorkClaw 获 AIIA 安全防护先锋案例奖
- 中国人工智能产业发展联盟（AIIA）发布"OpenClaw 安全防护专项"评选结果
- 青藤 WorkClaw 通过中国信通院**智能体内生安全最高 5 级专项测评**，国内首批达最高安全标准
- 已在头部快消上市公司试点落地：提示词注入攻击防护趋近全域覆盖、高危操作 100% 阻断、180 天全量审计日志留存

#### 企业安全选型持续升温
- 工信部 NVDB 持续预警：OpenClaw 默认配置存在较高安全风险
- 多所高校仍在叫停：珠海科技学院要求彻底卸载、华南师范大学禁止在生产环境安装
- 企业选型四大维度：安全管控、统一管理、质量保障、合规审计
- **8000 人制造集团私有化部署案例**：青藤方案实现数据不出域、大模型调用成本降低 40%

#### Claude Code 安全事件汇总（影响全局生态）
- CVE-2025-59536（CVSS 8.7）：自动执行任意 shell 命令
- CVE-2026-21852：窃取 API 密钥
- 3月底源代码泄露事件（KAIROS 系统暴露）
- macOS 版静默安装 Native Messaging 清单文件，无需权限提示
- SkillJect 论文指出 Agent 技能生态已成新型供应链攻击面

---

### 全球应用案例

#### 智谱 AutoClaw 新发布 Auto Design
- "一句话生成界面的全链路设计 Agent"，支持需求澄清→初版设计→画布迭代→格式导出全流程
- 此前已上线飞书直连集成（5分钟接入）、集群模式（18人并行43分钟出2万字报告）

#### 旧手机改造 OpenClaw 服务器案例
- 开发者将闲置 iQOO Neo 5 安卓手机改造为 Linux 服务器，接入飞书机器人
- 效果：手机在抽屉里跑着，通过飞书发消息即可调度 AI 执行任务（拍照、ADB 命令、SSH 等）

#### 新书《OpenClaw 从入门到精通》出版
- 作者余星奇，面向零基础用户，覆盖本地/云端部署、飞书/微信接入、ClawHub 技能扩展

---

### ClawHub 技能市场热度

| 排名 | 技能名称 | 下载量 | 核心功能 |
|------|---------|--------|---------|
| 1 | web-fetch-plus | 4.8万 | 增强版网页抓取，支持JS动态渲染 |
| 2 | self-improving-agent | 4.6万 | Agent 自我迭代，自动纠错优化 |
| 3 | gog (Google Workspace) | 4.6万 | Gmail/Calendar/Drive/Docs 全覆盖 |
| 4 | smart-scheduler | 4.2万 | 自然语言定时任务，冲突检测 |
| 5 | tavily-search | 3.7万 | 实时搜索，多模态支持 |
| 6 | github (GH CLI) | 3.5万 | GitHub 全功能集成 |

**GitHub Trending 本周 AI/Skills 赛道爆发**：
- Superpowers 突破 21 万星
- mattpocock/skills 周增 1.1 万星（TypeScript 社区技能武器库）
- agency-agents 周增近 8000 星（AI 角色化从 Demo 走向生产）
- Google agents-cli 和小米 MiMo-Code 同时入场

---

### 对盘鹰/扣子的关联影响

1. **安全选型参考**：盘鹰使用扣子平台托管方案相对安全，如涉及本地部署需重点关注凭证管理和权限控制。火山引擎 ArkClaw 企业版是当前最成熟的字节系企业方案
2. **扣子生态竞争格局**：阿里推 Qoder、腾讯做 QClaw、智谱做 AutoClaw，各家都在 OpenClaw 生态上加码。扣子与 OpenClaw 官方深度合作的定位不变，但需关注竞品差异化
3. **Auto Design 值得关注**：智谱新发布的设计 Agent 可能对盘鹰网站/物料的AI辅助设计有参考价值
4. **无紧急行动项**，当前无重大版本更新影响盘鹰现有部署

---

**信息来源**：
- [阿里云HITL插件](https://help.aliyun.com/zh/skillsportal/security-compliance/)
- [火山引擎ArkClaw企业版更新](https://www.volcengine.com/docs/87732/2301394?lang=zh)
- [腾讯QClaw产品经理离职 - 凤凰网](https://tech.ifeng.com/c/8uShXwkDwD9)
- [阿里禁用Claude - 凤凰网](https://news.ifeng.com/c/8uSdKrb0QLB)
- [阿里云发布Qoder企业版 - 凤凰网](https://tech.ifeng.com/c/8uSe1zAVo74)
- [青藤WorkClaw获AIIA先锋案例奖](https://www.cnblogs.com/1698-20260688/p/21076237)
- [企业安全选型指南 - IT168](https://software.it168.com/a2026/0703/6938/000006938288.shtml)
- [AutoClaw 博客](https://autoclaw.zhipuai.cn/blog/)
- [GitHub Trending AI/Skills 热门项目 - 头条](http://m.toutiao.com/group/7658177393786208808/)
- [智能体"龙虾"陷安全争议 - 中华网](https://soft.china.com/article/1580425.html)
