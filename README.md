# Irtaza Ahmed — Portfolio & CV

A responsive, accessible, single-page portfolio website designed for GitHub Pages. It presents Irtaza Ahmed's Information Security education, academic projects, practical labs, tools explored, and current learning journey.

## Files

- `index.html` — page content and semantic structure
- `styles.css` — responsive layout, light/dark themes, project illustrations, print styles
- `script.js` — theme toggle, mobile navigation, project filters, contact-link configuration, and print-to-PDF action
- `resume.md` — editable plain-text CV content

## Personalise before publishing

Open `script.js` and update the `portfolioConfig` object near the top:

```js
const portfolioConfig = {
  email: 'your.real.email@example.com',
  githubUrl: 'https://github.com/YOUR_USERNAME',
  linkedinUrl: 'https://www.linkedin.com/in/YOUR_PROFILE/'
};
```

Use your real profile URLs. Leave a value as an empty string if you do not want that contact link displayed.

Also review the education and project descriptions in `index.html`. Update them whenever a project becomes a working implementation, a lab is completed, or you have a new achievement to add. The current portfolio deliberately labels academic concepts, coursework, hands-on labs, research assignments, and in-progress learning separately. The relevant coursework list is based on the MCS Information Security undergraduate course information; keep it aligned with the courses you have actually taken.

## Publish on GitHub Pages

### Option A — your main personal website

1. Sign in to GitHub and create a **public** repository named exactly `YOUR_USERNAME.github.io`.
2. Upload `index.html`, `styles.css`, `script.js`, and `README.md` to the repository root. You can also upload `resume.md`.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then save.
6. GitHub Pages will publish the site at `https://YOUR_USERNAME.github.io/` after deployment completes.

### Option B — a project repository

Create a repository with any name, upload the same files to its root, and enable Pages from **Settings → Pages**. The address will be `https://YOUR_USERNAME.github.io/REPOSITORY_NAME/`.

## Use it as a PDF CV

Open the published website (or open `index.html` locally) and select **Print CV** on desktop. In the print dialog, choose **Save as PDF**. The page has a dedicated print stylesheet that removes navigation and decorative elements and formats the content for A4 paper.

## Design and accessibility

- Responsive layouts for mobile, tablet, and desktop
- Keyboard skip link and visible focus indicators
- Semantic sections and accessible labels
- Reduced-motion preference support
- Light/dark theme toggle, with the choice remembered in the browser
- Filterable projects with accessible pressed states and status announcements
- No frontend framework or build step required

The Google Fonts import is an optional enhancement. The site falls back to system fonts if Google Fonts are unavailable.
