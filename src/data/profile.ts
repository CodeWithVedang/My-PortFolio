export const profile = {
  name: "Vedang Shelatkar",
  fullName: "Vedang Prashant Shelatkar",
  email: "shelatkarvedang2@gmail.com",
  location: "Ratnagiri, Maharashtra, India",
  roles: ["Software Developer", "React + TypeScript Dev", "Agentic AI Builder"],
  status: "Software Developer @ Innodhruti",
  summary:
    "I design and build fast, accessible React + TypeScript products, from clean interfaces to the APIs behind them. 20+ shipped projects, a published AI research paper and enterprise platform work.",
  links: {
    linkedin: "https://www.linkedin.com/in/vedang-shelatkar",
    github: "https://github.com/CodeWithVedang",
    instagram: "https://www.instagram.com/__vedangs__/",
    resume: "PDF/Vedang_Shelatkar_Resume.pdf",
  },
  stats: [
    { value: "8.52", label: "MCA CGPA" },
    { value: "20+", label: "Projects shipped" },
    { value: "2×", label: "Phoenix 3rd place" },
    { value: "1", label: "Journal paper" },
  ],
} as const;

export type StepKind = "work" | "intern" | "edu" | "milestone";

export interface Step {
  when: string;
  kind: StepKind;
  title: string;
  org: string;
  note?: string;
  points?: string[];
}

// newest first
export const journey: Step[] = [
  {
    when: "06/2026 – Present",
    kind: "work",
    title: "Software Developer",
    org: "Innodhruti",
    note: "Full-time",
    points: [
      "Build and maintain web application features in TypeScript, JavaScript and React.",
      "Extend Playwright test automation across UI and API flows to raise release quality.",
      "Work in Agile sprints with Git and Jira for version control and tracking.",
    ],
  },
  {
    when: "04/2026",
    kind: "milestone",
    title: "Research paper published: Symptom Intelligence",
    org: "International Scientific Research Journal",
    points: ["Disease prediction with ensemble learning (Random Forest, SVM, Naïve Bayes), shipped as a web prototype."],
  },
  {
    when: "12/2025 – 05/2026",
    kind: "intern",
    title: "Software Developer Intern",
    org: "Innodhruti · Client: Pharmarack",
    note: "Enterprise pharma platform",
    points: [
      "Built enterprise-grade test automation with Playwright and TypeScript using the Page Object Model.",
      "Automated integrated UI + API flows, including API validation and network mocking.",
      "Reported and tracked defects in Jira inside an Agile team.",
    ],
  },
  {
    when: "2024 – 07/2026",
    kind: "edu",
    title: "Master in Computer Application",
    org: "Finolex Academy of Management and Technology, Mumbai University",
    note: "CGPA 8.52 / 10",
  },
  {
    when: "04/2024 – 06/2024",
    kind: "intern",
    title: "RPA Intern",
    org: "RPA development",
    points: ["Contributed to RPA development and deployment, tested and debugged, and streamlined team workflows."],
  },
  {
    when: "2023 – 24",
    kind: "milestone",
    title: "3rd place, Phoenix In-House Software Competition (App)",
    org: "Phoenix 2023-24",
  },
  {
    when: "2022 – 2024",
    kind: "edu",
    title: "B.Sc. Computer Science",
    org: "Gogate Jogalekar College (Autonomous), Mumbai University",
    note: "CGPA 8.16 / 10",
  },
  {
    when: "2022 – 23",
    kind: "milestone",
    title: "3rd place, Phoenix In-House Software Competition (Web)",
    org: "Phoenix 2022-23",
  },
];

export const featured = [
  {
    tag: "Research · Published",
    title: "Symptom Intelligence",
    text: "Disease prediction with ensemble learning (Random Forest, SVM, Naïve Bayes) and symptom-severity analysis, shipped as a web prototype. International Scientific Research Journal, 25 Apr 2026.",
  },
  {
    tag: "Enterprise platform",
    title: "Pharmarack Platform",
    text: "Playwright + TypeScript framework with POM, hybrid UI/API flows and network interception for a pharma platform.",
  },
  {
    tag: "Product",
    title: "Nexly",
    text: "A next-generation peer-to-peer (P2P) chat platform.",
  },
] as const;

export const skillGroups = [
  { group: "Web & App", items: ["ReactJS", "HTML5", "CSS3", "Firebase", "REST APIs", "Kotlin Android"] },
  { group: "AI & Agentic AI", items: ["Agentic AI workflows", "MCP servers", "Prompt engineering", "AI-based automation"] },
  { group: "Automation & Testing", items: ["Playwright + TypeScript", "UI + API", "Hybrid automation", "Network interception & mocking", "Page Object Model"] },
  { group: "Tools", items: ["VS Code", "Git & GitHub", "Postman", "Chrome DevTools", "CI/CD basics", "Jira"] },
];

export const achievements = [
  "Phoenix 2023-24 In-House Software Competition (App) — 3rd position",
  "Phoenix 2022-23 In-House Software Competition (Web) — 3rd position",
];

export const certificates = [
  "Web Development Fundamentals — IBM SkillsBuild",
  "Android App Development using Kotlin — Infosys",
  "Robotic Process Automation — UiPath",
  "UI/UX Design — Coursera",
  "UI/UX Design — Bartakke Institute of Information Technology",
  "Unity 3D, Game Development Intercollegiate course",
];
