import { readFileSync } from "node:fs";
import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";

const SITE = "https://codewithvedang.vercel.app";

interface Project {
  name: string;
  description: string;
  link: string;
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Build-time SEO: project structured data, no-JS content and sitemap stay in sync with projects.json
function seo(): Plugin {
  const projects: Project[] = JSON.parse(readFileSync("src/data/projects.json", "utf8"));
  const today = new Date().toISOString().slice(0, 10);

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE}/#person`,
        name: "Vedang Prashant Shelatkar",
        alternateName: ["Vedang Shelatkar", "CodeWithVedang"],
        jobTitle: "Software Developer",
        url: `${SITE}/`,
        image: `${SITE}/img/profile.jpg`,
        email: "shelatkarvedang2@gmail.com",
        worksFor: { "@type": "Organization", name: "Innodhruti" },
        alumniOf: [
          { "@type": "CollegeOrUniversity", name: "Mumbai University" },
        ],
        address: { "@type": "PostalAddress", addressLocality: "Ratnagiri", addressRegion: "Maharashtra", addressCountry: "IN" },
        knowsAbout: ["React", "TypeScript", "JavaScript", "Playwright", "Kotlin", "Firebase", "Agentic AI"],
        sameAs: ["https://github.com/CodeWithVedang", "https://www.linkedin.com/in/vedang-shelatkar", "https://www.instagram.com/__vedangs__/"],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE}/#website`,
        url: `${SITE}/`,
        name: "CodeWithVedang",
        description: "Portfolio of Vedang Shelatkar, software developer building React and TypeScript products.",
        inLanguage: "en",
        publisher: { "@id": `${SITE}/#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE}/#profile`,
        url: `${SITE}/`,
        name: "Vedang Shelatkar | Software Developer",
        mainEntity: { "@id": `${SITE}/#person` },
        isPartOf: { "@id": `${SITE}/#website` },
      },
      {
        "@type": "ItemList",
        name: "Projects by Vedang Shelatkar",
        itemListElement: projects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: { "@type": "CreativeWork", name: p.name, description: p.description, url: p.link, author: { "@id": `${SITE}/#person` } },
        })),
      },
    ],
  };

  const fallback = `<noscript>
      <h1>Vedang Shelatkar, Software Developer</h1>
      <p>React and TypeScript developer from Ratnagiri, India. Projects, experience and contact details below. Enable JavaScript for the full interactive portfolio.</p>
      <h2>Projects</h2>
      <ul>${projects.map((p) => `<li><a href="${esc(p.link)}">${esc(p.name)}</a>: ${esc(p.description)}</li>`).join("")}</ul>
      <p><a href="https://github.com/CodeWithVedang">GitHub</a> · <a href="https://www.linkedin.com/in/vedang-shelatkar">LinkedIn</a> · <a href="mailto:shelatkarvedang2@gmail.com">Email</a></p>
    </noscript>`;

  return {
    name: "seo",
    transformIndexHtml: (html) =>
      html
        .replace("<!--jsonld-->", `<script type="application/ld+json">${JSON.stringify(graph)}</script>`)
        .replace('<div id="root"></div>', `<div id="root"></div>\n    ${fallback}`),
    generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${SITE}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <image:image><image:loc>${SITE}/img/profile.jpg</image:loc><image:title>Vedang Shelatkar, Software Developer</image:title></image:image>
  </url>
</urlset>
`,
      });
    },
  };
}

export default defineConfig({ plugins: [react(), seo()], base: "./" });
