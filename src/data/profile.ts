export const profile = {
  name: "Vedang Shelatkar",
  fullName: "Vedang Prashant Shelatkar",
  email: "shelatkarvedang2@gmail.com",
  location: "Ratnagiri, Maharashtra, India",
  roles: ["Software Developer", "Test Automation Engineer", "React + TypeScript Dev", "Agentic AI Builder"],
  status: "Software Developer @ Innodhruti",
  summary:
    "I build React + TypeScript products and the Playwright automation that keeps them shipping clean. Enterprise pharma-platform QA, an AI research paper, and 20+ shipped projects, all before finishing my MCA.",
  links: {
    linkedin: "https://www.linkedin.com/in/vedang-shelatkar",
    github: "https://github.com/CodeWithVedang",
    instagram: "https://www.instagram.com/__vedangs__/",
    resume: "PDF/Vedang_Shelatkar_Resume.pdf",
  },
  stats: [
    { value: "8.52", label: "MCA CGPA" },
    { value: "2×", label: "Phoenix 3rd place" },
    { value: "1", label: "Journal paper" },
  ],
} as const;

export interface Role {
  when: string;
  title: string;
  org: string;
  kind: string;
  points: string[];
}

export const experience: Role[] = [
  {
    when: "06/2026 – Present",
    title: "Software Developer",
    org: "Innodhruti",
    kind: "Full-time",
    points: [
      "Build and maintain web application features in TypeScript, JavaScript and React.",
      "Extend Playwright test automation across UI and API flows to raise release quality.",
      "Work in Agile sprints with Git and Jira for version control and tracking.",
    ],
  },
  {
    when: "12/2025 – 05/2026",
    title: "Software Developer Intern",
    org: "Innodhruti · Client: Pharmarack",
    kind: "Enterprise pharma platform",
    points: [
      "Built enterprise-grade test automation with Playwright and TypeScript using the Page Object Model.",
      "Automated integrated UI + API flows, including API validation and network mocking.",
      "Reported and tracked defects in Jira inside an Agile team.",
    ],
  },
  {
    when: "04/2024 – 06/2024",
    title: "RPA Intern",
    org: "RPA development",
    kind: "Internship",
    points: ["Contributed to RPA development and deployment, tested and debugged, and streamlined team workflows."],
  },
];

export const featured = [
  {
    tag: "Research · Published",
    title: "Symptom Intelligence",
    text: "Disease prediction with ensemble learning (Random Forest, SVM, Naïve Bayes) and symptom-severity analysis, shipped as a web prototype. International Scientific Research Journal, 25 Apr 2026.",
  },
  {
    tag: "Enterprise QA",
    title: "Pharmarack Test Platform",
    text: "Playwright + TypeScript framework with POM, hybrid UI/API flows and network interception for a pharma platform.",
  },
  {
    tag: "Product",
    title: "Nexly",
    text: "A next-generation peer-to-peer (P2P) chat platform.",
  },
] as const;

const icon = (path: string) => `https://raw.githubusercontent.com/devicons/devicon/master/icons/${path}.svg`;

export interface Skill {
  name: string;
  logo: string;
}

export const skills: Skill[] = [
  { name: "TypeScript", logo: icon("typescript/typescript-original") },
  { name: "React", logo: icon("react/react-original") },
  { name: "Playwright", logo: icon("playwright/playwright-original") },
  { name: "JavaScript", logo: icon("javascript/javascript-original") },
  { name: "Python", logo: icon("python/python-original") },
  { name: "Java", logo: icon("java/java-original") },
  { name: "Kotlin", logo: icon("kotlin/kotlin-original") },
  { name: "Firebase", logo: icon("firebase/firebase-plain") },
  { name: "HTML5", logo: icon("html5/html5-original") },
  { name: "CSS3", logo: icon("css3/css3-original") },
  { name: "Git", logo: icon("git/git-original") },
  { name: "GitHub", logo: icon("github/github-original") },
  { name: "Postman", logo: icon("postman/postman-original") },
  { name: "Jira", logo: icon("jira/jira-original") },
  { name: "Chrome", logo: icon("chrome/chrome-original") },
  { name: "VS Code", logo: icon("vscode/vscode-original") },
  { name: "Android", logo: icon("android/android-original") },
  { name: "GitHub Actions", logo: icon("githubactions/githubactions-original") },
];

export const skillGroups = [
  { group: "Test Automation & QA", items: ["Playwright + TypeScript", "UI + API", "Hybrid automation", "Network interception & mocking", "Page Object Model"] },
  { group: "Web & App", items: ["ReactJS", "HTML5", "CSS3", "Firebase", "REST APIs", "Kotlin Android"] },
  { group: "AI & Agentic AI", items: ["Agentic AI workflows", "MCP servers", "Prompt engineering", "AI-based automation"] },
  { group: "Tools", items: ["VS Code", "Git & GitHub", "Postman", "Chrome DevTools", "CI/CD basics", "Jira"] },
];

export const education = [
  { when: "2024 – 07/2026", title: "Master in Computer Application", where: "Finolex Academy of Management and Technology, Mumbai University", score: "8.52 / 10" },
  { when: "2022 – 2024", title: "B.Sc. Computer Science", where: "Gogate Jogalekar College (Autonomous), Mumbai University", score: "8.16 / 10" },
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
