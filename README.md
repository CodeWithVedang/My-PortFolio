Here’s your well-formatted version, ready for clean copy-paste:

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

## 🛠️ Technologies Used

- **Frontend**:  
  `HTML5`, `CSS3`, `JavaScript`, `Typed.js`, `ScrollReveal.js`, `Bootstrap Icons`, `Google Fonts (Nunito)`

- **Automation & Backend**:  
  `Python`, `gspread`, `beautifulsoup4`, `GitPython`, `Google Apps Script`, `GitHub Actions`

- **Version Control**:  
  `Git`, `GitHub`

---

## ⚙️ How It Works

1. **Static Site**: 
   - `index.html` and `myprojects.html` are the core pages.
   - Projects are dynamically injected into these files by a Python script.

2. **Dynamic Project Updates**:
   - `update_projects.py` pulls project data from a connected Google Sheet.
   - Rewrites the homepage with the latest 3 projects.
   - Updates the full list on the My Projects page.
   - Commits and pushes changes to GitHub using `GitPython`.

3. **Automation**:
   - GitHub Actions workflow (`update-projects.yml`) triggers daily at 10 AM IST.
   - Authenticates via GitHub token and Google Sheets API credentials.

4. **Contact Form**:
   - Submits form data to a connected Google Sheet using Google Apps Script.

---

## 🧪 Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/CodeWithVedang/My-PortFolio.git
   cd My-PortFolio


2. **Install Dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

3. **Set Environment Variables**:

   ```bash
   export GOOGLE_SHEET_CREDENTIALS='$(cat path/to/credentials.json)'
   export G_TOKEN='your-github-token'
   ```

4. **(Optional) Run the Update Script**:

   ```bash
   python update_projects.py
   ```

5. **Serve Locally**:

   ```bash
   python -m http.server 8000
   ```

   Open `http://localhost:8000` in your browser.

---

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

