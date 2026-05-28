const stages = [
  "理解问题",
  "拆解任务",
  "探索方案",
  "验证逻辑",
  "输出结果",
];

const stageDetails = [
  { label: "用户意图与约束", detail: "目标是评估 Agent 落地路径..." },
  { label: "分析维度", detail: "拆为场景、MVP、方案、风险..." },
  { label: "候选路径", detail: "比较知识助手、流程型 Agent..." },
  { label: "最终取舍", detail: "流程型 Agent 价值更可量化..." },
  { label: "交付建议", detail: "先降接入门槛，再扩工作流..." },
];

const nodes = [
  { label: "企业知识", x: 46, y: 44 },
  { label: "用户角色", x: 24, y: 22 },
  { label: "信息流", x: 70, y: 22 },
  { label: "Agent 能力", x: 22, y: 70 },
  { label: "商业化", x: 72, y: 68 },
  { label: "风险控制", x: 48, y: 78 },
];

const arenaPlans = [
  {
    title: "嵌入式知识助手",
    text: "接入现有知识库和协作工具，降低迁移成本，最快形成试点。",
  },
  {
    title: "流程型 Agent",
    text: "围绕销售、客服、研发等高频流程编排任务，价值更可量化。",
  },
  {
    title: "知识操作系统",
    text: "平台化愿景强，但早期建设成本和组织阻力较高。",
  },
];

const stageList = document.querySelector("#stageList");
const mapCanvas = document.querySelector("#mapCanvas");
const progressFill = document.querySelector("#progressFill");
const progressStageList = document.querySelector("#progressStageList");
const timerValue = document.querySelector("#timerValue");
const startDemo = document.querySelector("#startDemo");
const pauseDemo = document.querySelector("#pauseDemo");
const resetDemo = document.querySelector("#resetDemo");
const arenaGrid = document.querySelector("#arenaGrid");
const resultText = document.querySelector("#resultText");
const resultTimeline = document.querySelector("#resultTimeline");
const screenTitle = document.querySelector("#screenTitle");
const thinkingScreen = document.querySelector(".thinking-screen");
const preferenceFeedback = document.querySelector("#preferenceFeedback");
const preferenceChips = document.querySelector("#preferenceChips");

let intervalId = null;
let typewriterId = null;
let elapsed = 0;
let isPaused = false;
let selectedPreference = "";

const finalSteps = [
  {
    type: "理解问题",
    file: "用户意图与约束",
    detail: "目标是评估 AI Agent 在企业知识管理场景的落地路径与商业化可行性。",
    icon: "doc",
  },
  {
    type: "拆解任务",
    file: "分析维度",
    detail: "拆为场景切入、MVP 能力、方案选择、风险控制、商业化指标五个输出模块。",
    icon: "doc",
  },
  {
    type: "探索方案",
    file: "候选路径",
    detail: "比较嵌入式知识助手、流程型 Agent、知识操作系统三条路径。",
    icon: "doc",
  },
  {
    type: "验证逻辑",
    file: "最终取舍",
    detail: "流程型 Agent 价值更可量化，适合承接试点后的规模化验证。",
    icon: "doc",
  },
  {
    type: "输出结果",
    file: "交付建议",
    detail: "先以嵌入式知识助手降低接入门槛，再扩展到流程型 Agent 的可计费工作流。",
    icon: "slide",
  },
];

function renderResultTimeline() {
  const introText = "以下是为您梳理的落地方法论与商业化路径分析：";
  resultTimeline.innerHTML = `
    <article class="recommendation-card">
      <header class="recommendation-header">
        <div>
          <h4 class="recommendation-title">AI 给出的结果建议</h4>
          <p class="recommendation-kicker" id="typedRecommendation"></p>
        </div>
        <span>企业知识管理 Agent 方案</span>
      </header>

      <section class="recommendation-section">
        <h4>一、AI Agent 在企业知识管理中的核心落地场景</h4>
        <p>传统痛点是“知识孤岛”和“低效维护”。Agent 的价值是把静态知识库转化为动态执行力。</p>
      </section>

      <div class="method-flow" aria-label="AI Agent landing flow">
        <div class="flow-node">多源数据输入</div>
        <span>→</span>
        <div class="flow-node emphasis">Agent 知识加工引擎</div>
        <span>→</span>
        <div class="flow-stack">
          <strong>三层落地应用场景</strong>
          <ul>
            <li>交互层：智能问答与专家协作</li>
            <li>流程层：流程自动化与合规风控</li>
            <li>生产层：知识资产自动沉淀</li>
          </ul>
        </div>
      </div>

      <section class="scenario-grid" aria-label="Landing scenario layers">
        <article>
          <h5>1. 交互层：问答 → 专家协同</h5>
          <p>新员工导引 Agent 串联政策、培训、权限申请，并跟踪学习进度。</p>
          <p>复杂决策 Agent 联动车型库、客诉、竞品报告，输出话术 + 诊断 + 案例。</p>
        </article>
        <article>
          <h5>2. 流程层：查阅 → 自动化</h5>
          <p>合规审阅 Agent 自动扫描招投标、合同和计划书，标注风险并给出修改建议。</p>
          <p>跨系统数据 Agent 调用飞书、GitHub、FineReport、CRM 生成复盘报告。</p>
        </article>
        <article>
          <h5>3. 生产层：录入 → 沉淀</h5>
          <p>复盘会后自动把会议纪要提炼为 SOP 或 PRD 知识库，解决“知识留不下”。</p>
        </article>
      </section>

      <section class="challenge-table">
        <h4>二、企业落地挑战与破局点</h4>
        <div class="challenge-row">
          <b>数据质量</b>
          <span>文档格式混乱导致 RAG 幻觉</span>
          <strong>多模态解析 Agent 清洗、结构化、标签化</strong>
        </div>
        <div class="challenge-row">
          <b>权限控制</b>
          <span>知识涉及机密，不能一刀切开放</span>
          <strong>ACL 权限校验 + Prompt 注入防护</strong>
        </div>
        <div class="challenge-row">
          <b>用户信任</b>
          <span>高风险业务不敢直接采用 AI 答案</span>
          <strong>反思-验证机制，每个结论可追溯出处</strong>
        </div>
      </section>

      <section class="commercial-path">
        <h4>三、商业化路径与变现模式设计</h4>
        <div class="path-steps">
          <span>1. 场景试点：按流程价值验证 ROI</span>
          <span>2. 工作流套餐：卖效率提升，不卖 Token</span>
          <span>3. 平台化扩展：按部门/Agent/自动化次数计费</span>
        </div>
      </section>
    </article>
  `;
  typeText(document.querySelector("#typedRecommendation"), introText);
}

function typeText(target, text) {
  if (!target) return;
  clearInterval(typewriterId);
  target.textContent = "";
  let index = 0;
  typewriterId = setInterval(() => {
    target.textContent += text[index] || "";
    index += 1;
    if (index >= text.length) {
      clearInterval(typewriterId);
      typewriterId = null;
    }
  }, 18);
}

function renderStages(activeIndex = -1) {
  stageList.innerHTML = stages
    .map((stage, index) => {
      const state = index < activeIndex ? "done" : index === activeIndex ? "active" : "";
      const detail = stageDetails[index];
      return `
        <li class="${state}">
          <div class="stage-main-row">
            <span class="stage-folder" aria-hidden="true"></span>
            <span class="stage-title">${stage}</span>
            <span class="stage-subtitle">${detail.label}</span>
            <span class="stage-chevron" aria-hidden="true"></span>
          </div>
          <div class="stage-detail-row">
            <span class="stage-dot" aria-hidden="true"></span>
            <span class="stage-detail">${detail.detail}</span>
            <span class="stage-chevron" aria-hidden="true"></span>
          </div>
        </li>
      `;
    })
    .join("");
}

function renderProgressStages(activeIndex = -1) {
  progressStageList.innerHTML = stages
    .map((stage, index) => {
      const state = index < activeIndex ? "done" : index === activeIndex ? "active" : "";
      const divider = index < stages.length - 1 ? '<span class="progress-separator">&gt;</span>' : "";
      return `<span class="progress-stage ${state}">${stage}</span>${divider}`;
    })
    .join("");
}

function renderArena(highlightIndex = -1, final = false) {
  arenaGrid.innerHTML = arenaPlans
    .map((plan, index) => {
      const state = final
        ? index === 1
          ? "winner"
          : "rejected"
        : index === highlightIndex
          ? "active"
          : "";
      return `
        <article class="arena-card ${state}">
          <h4>${plan.title}</h4>
          <p>${plan.text}</p>
        </article>
      `;
    })
    .join("");
}

function setMetric(id, value) {
  document.querySelector(`#metric${id}`).textContent = `${value}%`;
  document.querySelector(`#meter${id}`).style.width = `${value}%`;
}

function clearMap() {
  mapCanvas.innerHTML = "";
}

function addNode(index) {
  if (mapCanvas.querySelector(`[data-node="${index}"]`)) return;
  const node = nodes[index];
  const el = document.createElement("div");
  el.className = `map-node ${index === 0 ? "active" : ""}`;
  el.dataset.node = index;
  el.style.left = `${node.x}%`;
  el.style.top = `${node.y}%`;
  el.style.transform = "translate(-50%, -50%) scale(0.8)";
  el.textContent = node.label;
  mapCanvas.appendChild(el);

  if (index > 0) addLine(nodes[0], node, index);
}

function addLine(from, to, index) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);
  const line = document.createElement("span");
  line.className = "map-line";
  line.dataset.line = index;
  line.style.left = `${from.x}%`;
  line.style.top = `${from.y}%`;
  line.style.width = `${distance}%`;
  line.style.transform = `rotate(${angle}deg)`;
  mapCanvas.appendChild(line);
}

function updateFrame() {
  elapsed += 1;
  const remaining = Math.max(30 - elapsed, 0);
  const progress = Math.min((elapsed / 30) * 100, 100);
  const activeStage = Math.min(Math.floor(elapsed / 6), stages.length - 1);

  timerValue.textContent = `${remaining}s`;
  progressFill.style.width = `${progress}%`;
  renderStages(activeStage);
  renderProgressStages(activeStage);

  const nodesToShow = Math.min(Math.ceil(elapsed / 4), nodes.length);
  for (let i = 0; i < nodesToShow; i += 1) addNode(i);

  setMetric("Info", Math.min(48 + elapsed * 2, 88));
  setMetric("Logic", Math.min(61 + elapsed, 91));
  setMetric("Case", Math.min(35 + elapsed * 2, 79));

  renderArena(Math.floor((elapsed - 1) / 2) % arenaPlans.length);

  if (remaining <= 5) {
    screenTitle.textContent = "AI 正在生成结果结构";
    resultText.textContent =
      "一、场景切入  二、MVP 能力  三、商业化路径  四、风险与指标。";
  }

  if (elapsed >= 30) {
    clearInterval(intervalId);
    intervalId = null;
    isPaused = false;
    pauseDemo.setAttribute("aria-label", "暂停");
    pauseDemo.setAttribute("title", "暂停");
    pauseDemo.setAttribute("aria-pressed", "false");
    pauseDemo.disabled = true;
    thinkingScreen.classList.remove("is-paused");
    thinkingScreen.classList.add("is-complete");
    renderArena(1, true);
    screenTitle.textContent = "思考完成，答案可交付";
    resultText.textContent =
      "建议从嵌入式知识助手切入，优先验证流程型 Agent 的可量化价值，再扩展为知识操作系统。";
    renderResultTimeline();
  }
}

function reset() {
  clearInterval(intervalId);
  clearInterval(typewriterId);
  intervalId = null;
  typewriterId = null;
  elapsed = 0;
  isPaused = false;
  timerValue.textContent = "30s";
  pauseDemo.setAttribute("aria-label", "暂停");
  pauseDemo.setAttribute("title", "暂停");
  pauseDemo.setAttribute("aria-pressed", "false");
  pauseDemo.disabled = false;
  thinkingScreen.classList.remove("is-paused");
  progressFill.style.width = "0%";
  screenTitle.textContent = "AI 正在思考你的问题";
  thinkingScreen.classList.remove("is-complete");
  resultText.textContent = "等待最后验证完成后展示。";
  resultTimeline.innerHTML = "";
  clearMap();
  renderStages(-1);
  renderProgressStages(-1);
  renderArena(-1);
  setMetric("Info", 48);
  setMetric("Logic", 61);
  setMetric("Case", 35);
}

function start() {
  reset();
  updateFrame();
  intervalId = setInterval(updateFrame, 1000);
}

function togglePause() {
  if (elapsed <= 0 || elapsed >= 30) return;
  isPaused = !isPaused;
  pauseDemo.setAttribute("aria-label", isPaused ? "继续" : "暂停");
  pauseDemo.setAttribute("title", isPaused ? "继续" : "暂停");
  pauseDemo.setAttribute("aria-pressed", String(isPaused));
  thinkingScreen.classList.toggle("is-paused", isPaused);

  if (isPaused) {
    clearInterval(intervalId);
    intervalId = null;
    return;
  }

  if (!intervalId) {
    intervalId = setInterval(updateFrame, 1000);
  }
}

preferenceChips.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  selectedPreference = button.dataset.pref;
  document
    .querySelectorAll("#preferenceChips button")
    .forEach((chip) => chip.classList.toggle("selected", chip === button));
  preferenceFeedback.textContent = `已提高「${selectedPreference}」权重。`;
});

startDemo.addEventListener("click", start);
pauseDemo.addEventListener("click", togglePause);
resetDemo.addEventListener("click", reset);

renderStages(-1);
renderProgressStages(-1);
renderArena(-1);
setMetric("Info", 48);
setMetric("Logic", 61);
setMetric("Case", 35);
