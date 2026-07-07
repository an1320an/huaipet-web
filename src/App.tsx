import './App.css'
import idleFace from '/mascot/idle.png'
import happyFace from '/mascot/happy.png'
import thinkingFace from '/mascot/thinking.png'
import sleepFace from '/mascot/sleep.png'

const philosophy = [
  {
    title: '陪伴 > 功能',
    desc: '每一个功能都应该让用户感觉"朵朵在陪我"，而不是"我在使用一个工具"。',
  },
  {
    title: '游戏化 ≠ 功利化',
    desc: '等级、称号、徽章是成长的回馈，不是 KPI。',
  },
  {
    title: '温度 > 效率',
    desc: '鼓励比效率更重要，共情比准确更重要。',
  },
  {
    title: '漫漫医学路，朵朵一直在',
    desc: '产品的时间尺度是"几年"，不是"几天"。',
  },
]

const features = [
  { icon: happyFace, title: '宠物养成', desc: '等级 1-99，成长曲线，学历、打工、商店一应俱全' },
  { icon: thinkingFace, title: 'AI 陪伴对话', desc: 'DeepSeek 驱动，自动摘取长期记忆，越聊越懂你' },
  { icon: idleFace, title: '智能考试系统', desc: 'AI 出题、错题本、三种学习模式，专为医学考点设计' },
  { icon: sleepFace, title: '遗忘曲线复习', desc: '1h→1d→2d→4d→7d→15d→30d，科学安排复习节奏' },
  { icon: happyFace, title: '职业成长路线', desc: '医学生、医生、护士、药师，等级阈值触发晋升与徽章' },
  { icon: idleFace, title: '跨端云同步', desc: '桌面、手机、浏览器，数据和聊天记忆随身带走' },
]

const roadmap = [
  {
    status: '已完成',
    items: [
      '宠物养成系统（等级、成长曲线）',
      'AI 聊天陪伴（DeepSeek 驱动，自动摘取长期记忆）',
      '智能考试系统（AI 出题、错题本、三种学习模式）',
      '遗忘曲线复习（1h→1d→2d→4d→7d→15d→30d）',
      '职业成长路线（医学生→医生/护士/药师，职称阶梯）',
      '跨端云同步（桌面、手机、浏览器）',
    ],
  },
  {
    status: '进行中',
    items: [
      '等级制职称身份系统升级',
      '视觉奖励——等级边框、晋升徽章',
      '庆祝动画——晋升烟花 + 朵朵祝贺',
      '陪伴对话系统——学习鼓励、考前安慰、考后共情',
      '更多职业身份（检验、影像、公卫、口腔、中医……）',
    ],
  },
  {
    status: '未来方向',
    items: [
      '陪伴深化——每日问候、学习总结、考前陪伴、考后反馈',
      '成长可视化——成长时间线、知识图谱、学习报告',
      '技术基建——推送通知、离线模式、多语言',
    ],
  },
]

const changelog = [
  {
    date: '2026-07-07',
    title: '官网上线',
    desc: '槐序·HuaiPet 官网正式上线，huaipet.com 可以访问了。',
  },
  {
    date: '2026-07-06',
    title: 'v0.1.0',
    desc: '宠物养成、学历系统、打工系统、商店系统、聊天系统、任务系统、记忆系统、偏好系统、账号系统、云同步、桌面浮窗宠物、手机浮窗宠物、管理员后台、考试系统、三种学习模式、遗忘曲线复习、职业系统全部跑通。',
  },
]

function App() {
  return (
    <div className="page">
      <header className="nav">
        <div className="nav-inner">
          <span className="brand">槐序 · HuaiPet</span>
          <nav>
            <a href="#philosophy">理念</a>
            <a href="#features">功能</a>
            <a href="#roadmap">路线图</a>
            <a href="#changelog">更新日志</a>
            <a href="#architecture">架构</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <img src={idleFace} alt="朵朵" className="hero-mascot" />
          <h1>一个会陪着医学人成长的 AI 小伙伴</h1>
          <p className="hero-sub">
            不是 AI 刷题软件，不是 AI 聊天机器人，是<strong>陪伴式医学学习伴侣</strong>。
          </p>
          <p className="hero-tag">用户 ←── 陪伴 ──→ 朵朵（宠物）</p>
          <a className="cta" href="#features">了解更多</a>
        </section>

        <section id="philosophy" className="philosophy">
          <h2 className="section-title">产品哲学</h2>
          <div className="card-grid">
            {philosophy.map((item) => (
              <div className="card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="features" className="features">
          <h2 className="section-title">功能亮点</h2>
          <div className="card-grid">
            {features.map((item) => (
              <div className="card feature-card" key={item.title}>
                <img src={item.icon} alt="" className="feature-icon" />
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="roadmap" className="roadmap">
          <h2 className="section-title">路线图</h2>
          <div className="roadmap-columns">
            {roadmap.map((column) => (
              <div className="roadmap-column" key={column.status}>
                <h3 className={`roadmap-status roadmap-status--${column.status === '已完成' ? 'done' : column.status === '进行中' ? 'doing' : 'planned'}`}>
                  {column.status}
                </h3>
                <ul>
                  {column.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="changelog" className="changelog">
          <h2 className="section-title">更新日志</h2>
          <ul className="changelog-list">
            {changelog.map((entry) => (
              <li key={entry.date}>
                <span className="changelog-date">{entry.date}</span>
                <div>
                  <h3>{entry.title}</h3>
                  <p>{entry.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section id="architecture" className="architecture">
          <h2 className="section-title">一处陪伴，处处同步</h2>
          <div className="arch-diagram">
            <div className="arch-node">手机端</div>
            <div className="arch-node">电脑端</div>
            <div className="arch-node">浏览器</div>
            <div className="arch-arrow">↓</div>
          </div>
          <div className="arch-backend">后端（Fastify + SQLite）── DeepSeek API</div>
          <p className="arch-note">所有数据变更、所有 AI 调用、所有业务逻辑，统一经过后端。</p>
        </section>
      </main>

      <footer className="footer">
        <p>HuaiPet · 敬请期待</p>
      </footer>
    </div>
  )
}

export default App
