# Portfolio Website

A personal portfolio site to showcase skills, services, and projects in Full Stack Development, Frontend Development, and RPA. Built using HTML, CSS, JavaScript, with project automation handled via Python and Google Sheets.

---

## 🚀 Features

- **Homepage**: Professional intro with a typewriter effect cycling titles like Frontend Developer, RPA Developer, etc.
- **About**: Skills, tech stack, and brief background.
- **Services**: UI/UX Design, Website Design, and Kotlin App Development.
- **Portfolio**: 
  - Displays 3 latest projects on the homepage.
  - Full project list on the "My Projects" page.
- **Contact**: Functional contact form that submits directly to Google Sheets.
- **Responsive Design**: Mobile-first layout with sticky navbar and entry animations.
- **Automation**: Python script keeps project list in sync with a Google Sheet. Runs daily using GitHub Actions.

---

## 🛠️ Stack

React 18 + TypeScript + Vite. Projects live in `src/data/projects.json`, refreshed daily from Google Sheets by `update_projects.py` (GitHub Actions). Profile content lives in `src/data/profile.ts`.

## 🧪 Run

```bash
npm install
npm run dev      # local dev
npm run build    # typecheck + production build to dist/
```

## 🚢 Deployment

* Deploy via **GitHub Pages**, **Netlify**, or **Vercel**.
* Make sure your Google Apps Script is deployed and the web app URL is accessible for the contact form.

---

## 📄 License

MIT License. See the [LICENSE](LICENSE) file for details.

---

## 📬 Contact

* **GitHub**: [CodeWithVedang](https://github.com/CodeWithVedang)
* **Email**: [shelatkarvedang2@gmail.com](mailto:shelatkarvedang2@gmail.com)

```

