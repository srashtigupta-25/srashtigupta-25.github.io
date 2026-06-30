import React, { useEffect, useMemo, useRef, useState } from "react";

const navItems = [
  ["work", "Work"],
  ["stack", "Tech Stack"],
  ["experience", "Experience"],
  ["recommendations", "Recommendations"],
  ["about", "About"],
  ["contact", "Contact"],
];

const resumeUrl = "/resume.pdf?v=20260630-final";

const projects = [
  {
    id: "alpha",
    index: "01",
    label: "Multi-agent AI · Hackathon",
    title: "Alpha Sign",
    description:
      "A team-built LLM application where four specialist agents turn one ticker into narrative research, quantitative signals, regime analysis, and an executive report. I owned the Narrative/News Agent and co-developed the LangChain/LangGraph agent layer.",
    outcomes: ["Owned Narrative/News Agent", "4-agent workflow", "Co-built LangChain orchestration"],
    stack: ["Python", "LangChain", "LangGraph", "LLM APIs", "Next.js", "SSE"],
    live: "https://alpha-sign-zeta.vercel.app",
    github: "https://github.com/Dankguy17/AlphaSign",
    repositoryLabel: "Team Repository",
    theme: "blue",
  },
  {
    id: "sage",
    index: "02",
    label: "Production GenAI · AWS",
    title: "Sage Research Synthesizer",
    description:
      "A production-style serverless LLM system built in Java that grounds research in live web data, runs three Claude threads in parallel, and returns a structured brief in under 45 seconds.",
    outcomes: ["Brief in <45 seconds", "60% faster through parallelism", "3 grounded LLM research threads"],
    stack: ["Java 25", "Amazon Bedrock", "Claude", "AWS Lambda", "Step Functions", "Tavily", "DynamoDB"],
    live: "https://d1kbvlvilht945.cloudfront.net",
    github: "https://github.com/srashtigupta-25/sage-research-synthesizer",
    theme: "coral",
  },
  {
    id: "server",
    index: "04",
    label: "Systems engineering",
    title: "Adaptive Concurrent Web Server",
    description:
      "A multithreaded Rust server with an adaptive worker pool designed to stay responsive when request traffic becomes bursty.",
    outcomes: ["40% lower P99 latency", "31,725 requests/sec", "1.04 ms P99"],
    stack: ["Rust", "Python", "Concurrency", "Benchmarking"],
    github: "https://github.com/cs5600-sp26/project-webserver-team0100",
    caseStudy: "/StreetLegal-Webserver-presentation.pdf",
    theme: "green",
  },
  {
    id: "autopsy",
    index: "03",
    label: "AI reliability · Hackathon",
    title: "Autopsy Lab",
    description:
      "An AI incident reconstruction engine built in four hours at the Madison AI Hackathon, then hardened into a deployable product that turns raw logs into evidence-backed timelines, root-cause analysis, and remediation plans.",
    outcomes: ["Built in 4 hours", "Structured LLM output", "Tested production deployment"],
    stack: ["Python", "FastAPI", "Groq", "Llama 3.3", "Next.js", "TypeScript", "Pydantic"],
    live: "https://autopsy-lab.vercel.app",
    github: "https://github.com/srashtigupta-25/hackathon-1",
    theme: "violet",
  },
  {
    id: "warehouse",
    index: "05",
    label: "Data engineering",
    title: "Streaming Analytics Warehouse",
    description:
      "A Dockerized ETL pipeline and year-partitioned MySQL star schema for analyzing multi-year streaming viewership patterns across nearly 100K transaction records.",
    outcomes: ["98,472 records", "13 dimensions", "34% Q4 increase surfaced"],
    stack: ["R", "MySQL", "Docker", "ETL", "Star Schema", "Data Modeling"],
    github: "https://github.com/srashtigupta-25/Streaming-Analytics-Data-Warehouse",
    theme: "violet",
  },
];

const roles = [
  {
    company: "NAB",
    logo: "/nab.png",
    role: "Senior Software Engineer",
    period: "2023 to 2025",
    summary:
      "Owned performance, modernization, and developer-experience initiatives across banking platforms.",
    scope: "20+ APIs · 20 microservices · 20+ engineering teams",
    highlights: [
      "Applied Redis caching, database indexing, OAuth 2.0/JWT, and AWS deployment patterns to high-volume banking APIs.",
      "Coached five engineers on microservices and TDD while sustaining 92% code coverage.",
    ],
    impact: [
      ["35%", "lower API latency across 20+ services handling 1M+ requests daily"],
      ["20", "banking microservices migrated from Java 8 to Java 17 in four months"],
      ["80%", "greater deployment visibility for more than 20 engineering teams"],
    ],
    stack: ["Java 17", "Spring Boot", "AWS", "Kubernetes", "Kafka", "Redis"],
    awards: ["STAR Award", "SPOT Award"],
  },
  {
    company: "IBM",
    logo: "/ibm.jpeg",
    role: "Software Engineer",
    period: "2021 to 2022",
    summary:
      "Built event-driven services, automated releases, and shipped full-stack product features.",
    scope: "10+ services · Event-driven architecture · Full-stack delivery",
    highlights: [
      "Designed resilient services with Circuit Breaker and Saga patterns backed by PostgreSQL.",
      "Standardized delivery through Jenkins, Docker, and OpenAPI documentation.",
    ],
    impact: [
      ["45%", "system performance improvement through resilient microservice patterns"],
      ["40%", "faster release cycles across more than 10 services"],
      ["40%", "increase in client-portal engagement after a full-stack launch"],
    ],
    stack: ["Java", "Spring Data", "React", "PostgreSQL", "Docker", "Jenkins"],
    awards: [],
  },
  {
    company: "Capgemini",
    logo: "/capgemini.png",
    role: "Software Engineer",
    period: "2019 to 2021",
    summary:
      "Improved enterprise services for clients including Samsung and HughesNet.",
    scope: "14 microservices · Global enterprise clients · Backend performance",
    highlights: [
      "Diagnosed production bottlenecks across Java, J2EE, Node.js, and SQL-backed services.",
      "Strengthened release confidence through TestNG and Mockito automation.",
    ],
    impact: [
      ["25%", "lower response time across 14 production microservices"],
      ["30%", "faster data retrieval after SQL query optimization"],
      ["98%", "automated test coverage with TestNG and Mockito"],
    ],
    stack: ["Java", "J2EE", "Node.js", "Spring Boot", "SQL", "Mockito"],
    awards: ["Team Excellence Award"],
  },
];

const skillGroups = [
  ["Languages", "Java · Python · Rust · JavaScript · TypeScript · SQL · C++"],
  ["Backend", "Spring Boot · REST APIs · Microservices · JPA · Hibernate · FastAPI"],
  ["Cloud", "AWS · Docker · Kubernetes · Kafka · CI/CD · Linux"],
  ["Data", "PostgreSQL · MySQL · MongoDB · Redis · DynamoDB · Oracle"],
];

const techCategories = {
  "AI & LLM engineering": [
    ["LangChain", "langchain.svg"],
    ["LangGraph", "langgraph.svg"],
    ["Amazon Bedrock", "bedrock.svg"],
    ["Claude", "anthropic.svg"],
    ["LLM APIs", "llmapi.svg"],
    ["Multi-agent AI", "multiagent.svg"],
  ],
  "Core engineering": [
    ["Java", "java.svg"],
    ["Python", "python.svg"],
    ["Rust", "rust.svg"],
    ["JavaScript", "javascript.svg"],
    ["TypeScript", "typescript.svg"],
    ["SQL", "sql.svg"],
  ],
  "Frameworks & APIs": [
    ["Spring Boot", "spring.svg"],
    ["React", "react.svg"],
    ["Node.js", "nodejs.svg"],
    ["FastAPI", "fastapi.svg"],
    ["Hibernate", "hibernate.svg"],
    ["OpenAPI", "swagger.svg"],
  ],
  "Cloud & platform": [
    ["AWS", "aws.svg"],
    ["Docker", "docker.svg"],
    ["Kubernetes", "kubernetes.svg"],
    ["Kafka", "kafka.svg"],
    ["Linux", "linux.svg"],
    ["Git", "git.svg"],
  ],
  "Data systems": [
    ["PostgreSQL", "postgresql.svg"],
    ["MySQL", "mysql.svg"],
    ["MongoDB", "mongodb.svg"],
    ["Redis", "redis.svg"],
    ["DynamoDB", "dynamodb.svg"],
    ["Oracle", "oracle.svg"],
  ],
};

const recommendations = [
  {
    name: "Piyush Joshi",
    title: "Vice President, NAB",
    relation: "Direct manager",
    photo: "/piyush.jpeg",
    focus: ["Backend APIs", "Ownership", "Secure systems"],
    quote:
      "Srashti owns the complete development lifecycle, from translating business needs into technical designs to deploying secure, high-performance APIs.",
    fullQuote: [
      "I've had the privilege of working with Srashti for the past two years, and she has consistently proven herself as an exceptionally capable backend engineer. With expertise in Java 17, Spring Boot, and microservices, she has designed and delivered high-performance APIs that are core to our platform's success.",
      "Srashti owns the complete development lifecycle, from translating business requirements into technical designs, implementing scalable and secure solutions, to overseeing deployments and monitoring performance. She has strengthened our systems with robust authentication protocols, token management, and secure API integrations, while optimizing PostgreSQL queries and improving API response times.",
      "What sets Srashti apart is her ownership mindset, foresight in anticipating challenges, and clear communication with stakeholders. She delivers not only reliable solutions but also long-term architectural improvements. Any team seeking a technically strong, proactive, and dependable backend developer would be fortunate to have her.",
    ],
  },
  {
    name: "Anil Rawat",
    title: "VP, Sr Engineer II, NAB India",
    relation: "Senior to Srashti",
    photo: "/anil.jpeg",
    focus: ["Leadership", "Java", "Docker"],
    quote:
      "Srashti is a talented and driven professional with exceptional skills in Java, Node.js, and Docker. Her leadership, creativity, and commitment to excellence make her stand out in any team. She has the rare ability to turn complex challenges into impactful solutions.",
    fullQuote: [
      "Srashti is a talented and driven professional with exceptional skills in Java, Node.js, and Docker. Her leadership, creativity, and commitment to excellence make her stand out in any team. She has the rare ability to turn complex challenges into impactful solutions.",
    ],
  },
  {
    name: "Anuj Agarwal",
    title: "Leader, Solution Designer, Vanguard Australia",
    relation: "Technical manager",
    photo: "/anuj.jpeg",
    focus: ["Code quality", "Agile delivery", "Testing"],
    quote:
      "Srashti learned fast, delivered quality work on time, and strengthened code quality through coverage, test frameworks, and bug fixes.",
    fullQuote: [
      "I have worked with Srashti as her technical manager and lead. She joined my team fresh out of college and was able to learn and deliver quickly. She was quick in grasping the corporate work culture, including Agile practices, project methodologies, work ethics, and environment.",
      "Due to her good analytical skills, she quickly understood the assigned modules and helped us improve quality metrics of our code by enhancing code coverage, developing test frameworks, and contributing to bug fixes. Srashti demonstrated good communication, strong analytical and technical skills, and delivered all her tasks with quality and on time.",
      "Her positive attitude and good team skills helped her gel and become an integral part of the team. She always showed keen interest in learning and working on challenging tasks. All the best, Srashti. Keep doing the good work.",
    ],
  },
  {
    name: "Kamal Verma",
    title: "Senior Analyst, Accenture",
    relation: "Team colleague",
    photo: "/kamal.jpeg",
    focus: ["Testing", "Debugging", "Team culture"],
    quote:
      "Srashti stood out for her testing discipline, bug-finding ability, technical logic, hard work, and warmth as a teammate.",
    fullQuote: [
      "I rarely come across real talents who stand out like Srashti. I had the pleasure of working with her for three years at Altran, formerly known as Aricent Technologies, collaborating on a Web Components development and testing project.",
      "Srashti's ability to test the application and find bugs as small as a speck of dust in a crystal was exceptional. No matter how difficult the task, Srashti made it easy with her immense knowledge, logical capabilities, and hard work.",
      "As a human being, she is warm and makes everyone comfortable around her in the team. I will conclude by saying, \"I was lucky enough to have the privilege of working with her in a team.\"",
    ],
  },
];

function Arrow({ direction = "up" }) {
  return <span aria-hidden="true">{direction === "down" ? "↓" : "↗"}</span>;
}

function NetworkCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let frame = 0;
    let points = [];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = Math.max(26, Math.floor(width / 32));
      points = Array.from({ length: count }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        r: index % 8 === 0 ? 2.8 : 1.4,
      }));
    }

    function draw() {
      context.clearRect(0, 0, width, height);
      points.forEach((point, index) => {
        if (!reduced) {
          point.x += point.vx;
          point.y += point.vy;
          if (point.x < 0 || point.x > width) point.vx *= -1;
          if (point.y < 0 || point.y > height) point.vy *= -1;
        }

        points.slice(index + 1).forEach((other) => {
          const distance = Math.hypot(point.x - other.x, point.y - other.y);
          if (distance < 125) {
            context.beginPath();
            context.moveTo(point.x, point.y);
            context.lineTo(other.x, other.y);
            context.strokeStyle = `rgba(35, 82, 166, ${0.13 * (1 - distance / 125)})`;
            context.lineWidth = 0.8;
            context.stroke();
          }
        });

        context.beginPath();
        context.arc(point.x, point.y, point.r, 0, Math.PI * 2);
        context.fillStyle = point.r > 2 ? "rgba(255, 109, 73, .55)" : "rgba(29, 71, 154, .42)";
        context.fill();
      });
      frame = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas className="network-canvas" ref={canvasRef} aria-hidden="true" />;
}

function ProjectVisual({ project }) {
  if (project.id === "alpha") {
    return (
      <div className="visual alpha-visual">
        <div className="visual-bar"><span /><span /><span /><b>analysis.session</b></div>
        <div className="agent-map">
          <div className="agent-center"><img src="/alpha-sign-logo.webp" alt="" /></div>
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          {["Narrative", "Quant", "Regime", "Executive"].map((agent, index) => (
            <div className={`agent-node node-${index + 1}`} key={agent}><i />{agent}</div>
          ))}
        </div>
      </div>
    );
  }

  if (project.id === "sage") {
    return (
      <div className="visual sage-visual">
        <div className="pipeline-head"><span>research.pipeline</span><b>RUNNING</b></div>
        <div className="pipeline">
          <div className="pipe-block primary">Question</div>
          <span>→</span>
          <div className="parallel-stack">
            <div>Research 01</div><div>Research 02</div><div>Research 03</div>
          </div>
          <span>→</span>
          <div className="pipe-block report">Brief</div>
        </div>
        <div className="pipeline-progress"><i /><span>42 sec</span></div>
      </div>
    );
  }

  if (project.id === "server") {
    return (
      <div className="visual server-visual">
        <div className="chart-header"><span>P99 latency under load</span><b>31,725 req/s</b></div>
        <div className="chart-grid">
          <div className="chart-line line-before"><span>1.73 ms</span></div>
          <div className="chart-line line-after"><span>1.04 ms</span></div>
        </div>
        <div className="chart-legend"><span><i className="before-dot" /> Before</span><span><i /> Adaptive pool</span></div>
      </div>
    );
  }

  if (project.id === "autopsy") {
    return (
      <div className="visual autopsy-visual">
        <div className="autopsy-head"><span>incident.report.json</span><b>ANALYSIS COMPLETE</b></div>
        <div className="autopsy-panel">
          <div className="severity-card"><span>SEVERITY</span><strong>HIGH</strong></div>
          <div className="cause-card">
            <span>LIKELY ROOT CAUSE</span>
            <strong>Database connection pool exhausted during retry storm</strong>
          </div>
          <div className="evidence-list">
            <span><i />14:03:12 · HTTP 503 begins</span>
            <span><i />14:03:18 · Pool timeout detected</span>
            <span><i />14:04:01 · Retry volume amplifies</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="visual data-visual">
      <div className="data-head"><span>stream_analytics.sql</span><b>98,472 rows</b></div>
      <div className="data-bars">
        {[42, 68, 51, 82, 65, 96, 73, 88, 61, 100, 76, 91].map((height, index) => (
          <i key={index} style={{ "--height": `${height}%` }} />
        ))}
      </div>
      <div className="data-years"><span>2022</span><span>2023</span><span>2025</span></div>
    </div>
  );
}

function CommandPalette({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined;
    const handler = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="command-overlay" onMouseDown={onClose}>
      <div className="command-box" onMouseDown={(event) => event.stopPropagation()}>
        <div className="command-input"><span>⌕</span><input autoFocus placeholder="Jump to a section…" /></div>
        <div className="command-list">
          {navItems.map(([id, label], index) => (
            <a key={id} href={`#${id}`} onClick={onClose}>
              <span>0{index + 1}</span><b>{label}</b><kbd>↵</kbd>
            </a>
          ))}
          <a href={resumeUrl} target="_blank" rel="noreferrer" onClick={onClose}>
            <span>07</span><b>Open résumé</b><kbd>↗</kbd>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [activeProject, setActiveProject] = useState(0);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("work");
  const [activeTechCategory, setActiveTechCategory] = useState("AI & LLM engineering");
  const currentProject = projects[activeProject];

  const handleContactSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const message = String(form.get("message") || "").trim();
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:sg.srashtigupta@gmail.com?subject=${subject}&body=${body}`;
  };

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((value) => !value);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-30% 0px -60%" },
    );
    document.querySelectorAll("main section[id]").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const projectLinks = useMemo(() => {
    const links = [];
    if (currentProject.live) links.push(["Live product", currentProject.live]);
    if (currentProject.github) links.push([currentProject.repositoryLabel || "Repository", currentProject.github]);
    if (currentProject.caseStudy) links.push(["Case study", currentProject.caseStudy]);
    return links;
  }, [currentProject]);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Srashti Gupta home">
          <span>SG</span><b>Srashti Gupta</b>
        </a>
        <nav className={menuOpen ? "open" : ""} aria-label="Primary navigation">
          {navItems.map(([id, label]) => (
            <a className={activeSection === id ? "active" : ""} href={`#${id}`} key={id} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
        </nav>
        <div className="header-actions">
          <button className="command-button" onClick={() => setPaletteOpen(true)}><span>Search</span><kbd>⌘ K</kbd></button>
          <a className="resume-button" href={resumeUrl} target="_blank" rel="noreferrer">Résumé <Arrow /></a>
          <button className={`menu-toggle ${menuOpen ? "open" : ""}`} aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}><span /><span /></button>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <NetworkCanvas />
          <div className="hero-grid" />
          <div className="hero-content">
            <div className="hero-copy">
              <div className="availability"><i /> Open to software engineering internships</div>
              <p className="hero-kicker">Software engineer · AI systems builder</p>
              <h1>Production engineering for <em>AI-powered products.</em></h1>
              <p className="hero-summary">
                Five-plus years building distributed platforms with Java, Spring Boot, and AWS, now applying that foundation to LLM workflows, multi-agent systems, and serverless AI.
              </p>
              <div className="hero-capabilities" aria-label="Core capabilities">
                <span>Java</span><span>Python</span><span>Spring Boot</span><span>AWS</span><span>LangChain</span><span>LLM Systems</span>
              </div>
              <div className="hero-actions">
                <a className="primary-button" href="#work">Explore AI projects <Arrow direction="down" /></a>
                <a className="secondary-button" href="mailto:sg.srashtigupta@gmail.com">Start a conversation <Arrow /></a>
              </div>
              <div className="proof-row">
                <div><strong>5+ years</strong><span>production engineering</span></div>
                <div><strong>4 agents</strong><span>coordinated in Alpha Sign</span></div>
                <div><strong>&lt;45 sec</strong><span>Sage research brief</span></div>
              </div>
            </div>

            <div className="hero-system">
              <div className="portrait-card">
                <div className="portrait-top"><span>engineer.profile</span><b>ONLINE</b></div>
                <img src="/profile-photo.png" alt="Srashti Gupta" />
                <div className="portrait-meta"><span>Boston, MA</span><span>MS CS · 4.0</span></div>
              </div>
              <div className="system-card system-card-one"><span>Production core</span><b>Java · Spring · AWS</b></div>
              <div className="system-card system-card-two"><span>AI systems</span><b>Python · LangChain · LLMs</b></div>
              <div className="system-card system-card-three"><span>Engineering edge</span><b>Reliable systems for intelligent products</b></div>
            </div>
          </div>
          <a className="scroll-cue" href="#work"><span>Scroll to work</span><i /></a>
        </section>

        <section className="work section" id="work">
          <div className="section-intro">
            <div><span className="section-number">01</span><p>Selected work</p></div>
            <h2>AI products backed by real engineering depth.</h2>
            <p className="section-copy">Alpha Sign, Sage, Autopsy Lab, Adaptive Server, and Streaming Analytics show AI orchestration, cloud systems, performance engineering, and data depth.</p>
          </div>

          <div className="project-shell">
            <div className="project-tabs" role="tablist" aria-label="Projects">
              {[projects[0], projects[1], projects[3], projects[2], projects[4]].map((project) => (
                <button
                  className={currentProject.id === project.id ? "active" : ""}
                  key={project.id}
                  onClick={() => setActiveProject(projects.findIndex((candidate) => candidate.id === project.id))}
                  role="tab"
                  aria-selected={currentProject.id === project.id}
                >
                  <span>{project.index}</span><b>{project.title}</b><i />
                </button>
              ))}
            </div>

            <article className={`project-stage theme-${currentProject.theme}`} key={currentProject.id}>
              <ProjectVisual project={currentProject} />
              <div className="project-content">
                <div className="project-eyebrow"><span>{currentProject.index}</span>{currentProject.label}</div>
                <h3>{currentProject.title}</h3>
                <p>{currentProject.description}</p>
                <div className="outcome-grid">
                  {currentProject.outcomes.map((outcome) => <span key={outcome}>{outcome}</span>)}
                </div>
                <div className="stack-row">{currentProject.stack.map((item) => <span key={item}>{item}</span>)}</div>
                <div className="project-links">
                  {projectLinks.map(([label, href]) => <a key={label} href={href} target="_blank" rel="noreferrer">{label} <Arrow /></a>)}
                </div>
              </div>
            </article>
          </div>
        </section>

        <aside className="engineering-bridge" aria-label="Engineering positioning">
          <span>Production engineering depth</span>
          <strong>+</strong>
          <span>Modern AI systems</span>
          <p>I bring reliability, API design, cloud architecture, testing, and performance discipline to LLM-powered products.</p>
        </aside>

        <section className="stack-section section" id="stack">
          <div className="section-intro">
            <div><span className="section-number">02</span><p>Tech stack</p></div>
            <h2>Tools I have used to ship production software.</h2>
            <p className="section-copy">A working toolkit across backend engineering, cloud infrastructure, distributed systems, data, and interface development.</p>
          </div>
          <div className="stack-workbench">
            <div className="stack-tabs" role="tablist" aria-label="Technology categories">
              {Object.keys(techCategories).map((category) => (
                <button
                  className={activeTechCategory === category ? "active" : ""}
                  key={category}
                  onClick={() => setActiveTechCategory(category)}
                  role="tab"
                  aria-selected={activeTechCategory === category}
                >
                  <span>{String(Object.keys(techCategories).indexOf(category) + 1).padStart(2, "0")}</span>
                  {category}
                </button>
              ))}
            </div>
            <div className="tech-grid" key={activeTechCategory}>
              {techCategories[activeTechCategory].map(([name, icon]) => (
                <article className="tech-card" key={name}>
                  <img
                    src={`/icons/${icon}`}
                    alt=""
                  />
                  <div><strong>{name}</strong><span>Production toolkit</span></div>
                  <i aria-hidden="true" />
                </article>
              ))}
            </div>
          </div>
          <div className="stack-principles">
            <span>System design</span><i />
            <span>Event-driven architecture</span><i />
            <span>Testing & observability</span><i />
            <span>CI/CD</span><i />
            <span>Performance engineering</span>
          </div>
        </section>

        <section className="experience section" id="experience">
          <div className="section-intro compact">
            <div><span className="section-number">03</span><p>Experience</p></div>
            <h2>Production engineering, measured in outcomes.</h2>
          </div>
          <div className="experience-summary">
            <div><strong>5+ years</strong><span>production engineering</span></div>
            <div><strong>3 companies</strong><span>banking and enterprise systems</span></div>
            <div><strong>3 awards</strong><span>technical excellence and innovation</span></div>
            <div><strong>5 engineers</strong><span>mentored on architecture and TDD</span></div>
          </div>
          <div className="timeline">
            {roles.map((role, index) => (
              <article className="role" key={role.company}>
                <div className="role-index"><span>0{index + 1}</span><i /></div>
                <div className="company-mark"><img src={role.logo} alt={`${role.company} logo`} /></div>
                <div className="role-heading">
                  <p>{role.period}</p><h3>{role.role}</h3><span>{role.company}</span>
                  <p className="role-summary">{role.summary}</p>
                  <p className="role-scope">{role.scope}</p>
                  <ul className="role-highlights">
                    {role.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                  </ul>
                  {role.awards.length > 0 && <div className="awards">{role.awards.map((award) => <b key={award}>◆ {award}</b>)}</div>}
                </div>
                <div className="impact-list">
                  {role.impact.map(([metric, text]) => (
                    <div key={metric + text}><strong>{metric}</strong><span>{text}</span></div>
                  ))}
                  <div className="role-stack">{role.stack.map((item) => <span key={item}>{item}</span>)}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="recommendations section" id="recommendations">
          <div className="section-intro">
            <div><span className="section-number">04</span><p>Recommendations</p></div>
            <h2>Trusted by managers and teammates.</h2>
            <p className="section-copy">A few words from people who worked directly with me across engineering teams, delivery ownership, and production systems.</p>
          </div>
          <div className="recommendation-proof" aria-label="Recommendation highlights">
            <span><b>4</b> senior voices</span>
            <span><b>3</b> company contexts</span>
            <span><b>1</b> consistent signal: ownership</span>
          </div>
          <div className="recommendation-grid">
            {recommendations.map((recommendation) => (
              <article className="recommendation-card" key={recommendation.name}>
                <span className="quote-mark" aria-hidden="true">"</span>
                <div className="recommendation-content">
                  <p className="recommendation-quote">{recommendation.quote}</p>
                  <div className="recommendation-tags">
                    {recommendation.focus.map((item) => <span key={item}>{item}</span>)}
                  </div>
                  <details className="recommendation-details">
                    <summary>Read full recommendation</summary>
                    <div>
                      {recommendation.fullQuote.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    </div>
                  </details>
                </div>
                <div className="recommendation-person">
                  <img src={recommendation.photo} alt={recommendation.name} />
                  <div>
                    <strong>{recommendation.name}</strong>
                    <span>{recommendation.title}</span>
                    <small>{recommendation.relation}</small>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="about section" id="about">
          <div className="about-grid">
            <div className="about-copy">
              <div className="section-label"><span className="section-number">05</span><p>About</p></div>
              <h2>I care about the seam between architecture and experience.</h2>
              <p>Reliable APIs, observable systems, thoughtful interfaces, and deployment paths that do not surprise the next engineer are part of the product.</p>
              <p>After building enterprise software at NAB, IBM, and Capgemini, I am pursuing an MS in Computer Science at Northeastern University and looking for an internship where production judgment is useful from day one.</p>
              <a className="inline-link" href={resumeUrl} target="_blank" rel="noreferrer">Read the full résumé <Arrow /></a>
            </div>
            <div className="about-console">
              <div className="console-head"><span /><span /><span /><b>capabilities.json</b></div>
              <pre>{`{
  "education": {
    "program": "MS Computer Science",
    "school": "Northeastern University",
    "gpa": 4.0
  },
  "experience": "5+ years",
  "principles": [
    "measure the bottleneck",
    "design for failure",
    "make the system legible"
  ]
}`}</pre>
              <div className="skill-table">
                {skillGroups.map(([label, skills]) => <div key={label}><strong>{label}</strong><span>{skills}</span></div>)}
              </div>
            </div>
          </div>
        </section>

        <section className="contact section" id="contact">
          <NetworkCanvas />
          <div className="contact-inner">
            <div className="contact-copy">
              <span className="section-number">06</span>
              <p>Let’s build something dependable.</p>
              <h2>Start a conversation.</h2>
              <p className="contact-description">Have an internship opportunity, an engineering challenge, or a product worth making more reliable? Send me a note.</p>
              <div className="contact-socials">
                <a href="https://linkedin.com/in/srashti-gupta-07b634151" target="_blank" rel="noreferrer">
                  <img src="/icons/linkedin.svg" alt="" />
                  <span><b>LinkedIn</b><small>Professional profile</small></span><Arrow />
                </a>
                <a href="https://github.com/srashtigupta-25" target="_blank" rel="noreferrer">
                  <img src="/icons/github.svg" alt="" />
                  <span><b>GitHub</b><small>Code and projects</small></span><Arrow />
                </a>
              </div>
            </div>
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div className="form-heading"><span>New message</span><i>●</i></div>
              <label>
                <span>Name</span>
                <input name="name" type="text" placeholder="Your name" autoComplete="name" required />
              </label>
              <label>
                <span>Email</span>
                <input name="email" type="email" placeholder="you@company.com" autoComplete="email" required />
              </label>
              <label>
                <span>Message</span>
                <textarea name="message" placeholder="What would you like to discuss?" rows="6" required />
              </label>
              <button className="primary-button" type="submit">Compose message <Arrow /></button>
              <small>This opens a prepared email in your default mail app.</small>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <span>© 2026 Srashti Gupta</span>
        <span>Built with React · designed for clarity</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </>
  );
}
