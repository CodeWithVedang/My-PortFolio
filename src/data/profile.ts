export const profile = {
  name: "Vedang Shelatkar",
  email: "shelatkarvedang2@gmail.com",
  location: "Ratnagiri, Maharashtra, India",
  roles: ["Full-Stack Developer", "RPA Developer", "UI/UX Designer", "Android Developer"],
  summary:
    "MCA student and developer who builds responsive web apps, Android apps and automation bots. Looking for a Full-Stack or Front-End role where I can ship dynamic user experiences and grow on the backend and deployment side.",
  links: {
    linkedin: "https://www.linkedin.com/in/vedang-shelatkar-39a111371/",
    github: "https://github.com/CodeWithVedang",
    instagram: "https://www.instagram.com/__vedangs__/",
    cv: "PDF/MyCv.pdf",
  },
  stats: [
    { value: "7 mo", label: "RPA internship" },
    { value: "2×", label: "Phoenix 3rd place" },
  ],
} as const;

const icon = (path: string) => `https://raw.githubusercontent.com/devicons/devicon/master/icons/${path}.svg`;

export interface Skill {
  name: string;
  logo: string;
}

export const skills: { group: string; items: Skill[] }[] = [
  {
    group: "Frontend",
    items: [
      { name: "HTML", logo: icon("html5/html5-original") },
      { name: "CSS", logo: icon("css3/css3-original") },
      { name: "JavaScript", logo: icon("javascript/javascript-original") },
      { name: "React", logo: icon("react/react-original") },
      { name: "Flutter", logo: icon("flutter/flutter-original") },
    ],
  },
  {
    group: "Languages",
    items: [
      { name: "Java", logo: icon("java/java-original") },
      { name: "Python", logo: icon("python/python-original") },
      { name: "C++", logo: icon("cplusplus/cplusplus-original") },
      { name: "C#", logo: icon("csharp/csharp-original") },
      { name: "Kotlin", logo: icon("kotlin/kotlin-original") },
    ],
  },
  {
    group: "Data & Cloud",
    items: [
      { name: "Firebase", logo: icon("firebase/firebase-plain") },
      { name: "MongoDB", logo: icon("mongodb/mongodb-original") },
      { name: "MySQL", logo: icon("mysql/mysql-original") },
      { name: "Oracle", logo: icon("oracle/oracle-original") },
    ],
  },
  {
    group: "Automation",
    items: [
      { name: "GitHub Actions", logo: icon("githubactions/githubactions-original") },
      { name: "Git", logo: icon("git/git-original") },
    ],
  },
];

export const timeline = [
  { when: "2024 – 2026", title: "Master in Computer Application", where: "Finolex Academy of Management and Technology, Mumbai University", note: "Pursuing" },
  { when: "Jan – Jul 2024", title: "Project Intern, RPA Developer", where: "Satchitanand Stencils Pvt. Ltd.", note: "7 months" },
  { when: "2021 – 2024", title: "B.Sc. Computer Science", where: "Gogate Jogalekar College, Mumbai University", note: "69%" },
];

export const achievements = [
  "Phoenix Competition 2024 — Website, 3rd place",
  "Phoenix Competition 2023 — Android App, 3rd place",
];

export const courses = [
  "Android App Development using Kotlin (Infosys)",
  "Robotic Process Automation (UiPath)",
  "UI/UX Design (Coursera)",
  "UI/UX Design — Bartakke Institute of Information Technology",
  "Unity 3D Game Development",
];
