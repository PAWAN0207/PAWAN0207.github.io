# Pawan Ajay Prasad — AI Engineer Portfolio

A responsive, static portfolio built with HTML, CSS and vanilla JavaScript. It is designed for GitHub Pages and requires no build step, backend, API key or package installation.

## Files

- `index.html` — all page content, project details, credentials and links.
- `styles.css` — responsive dark visual system and project artwork built with CSS/HTML/SVG.
- `script.js` — mobile navigation, project category filters, reveal effects and current-year footer.
- `assets/` — add your latest resume PDF here (and optionally your profile photo).

## Before publishing — two owner-supplied assets

1. Put your latest resume at `assets/Pawan_Ajay_Prasad_Resume.pdf`. The download buttons already point to this path.
2. In `index.html`, replace `NASSCOM_CERTIFICATE_URL` with the public verification/share URL for **Advanced Certification in Data Analytics & Gen AI Engineering — NASSCOM FutureSkills Prime**. The certificate is listed, but its actual URL was not included with the source files. Until replaced, clicking it shows a reminder rather than opening a broken link.

The profile section currently uses a designed initials placeholder because no `profile.jpg` was included in the uploaded source files. To use a photo, add `assets/profile.jpg` and replace the `.profile-placeholder` block in `index.html` with an `<img>` element.

## Run locally on Windows

No installation is required. Open `index.html` in a browser, or use the VS Code Live Server extension.

## Deploy to GitHub Pages

1. Extract the ZIP.
2. Copy the **contents** of this folder into the root of `PAWAN0207.github.io` (do not upload the outer folder as a nested directory).
3. Confirm `index.html`, `styles.css`, `script.js` and the `assets` folder are in the repository root.
4. Commit and push to the `main` branch.
5. In GitHub, open **Settings → Pages** and select **Deploy from a branch → main → /(root)** if not already configured.
6. Wait for the Pages deployment and open `https://pawan0207.github.io/`.

## PowerShell Git commands

Run these from your local repository folder after copying the updated files:

```powershell
git status
git add index.html styles.css script.js README.md assets
git commit -m "Revamp AI engineer portfolio"
git push origin main
```

## Accuracy notes

- The Infosys evaluation figures are shown as reported: 25/25 retrieval test cases, 100% Hit@1/3/5, MRR 1.0, 100% RBAC pass rate and generation evaluation 5/5.
- The AI Sales Assistant shows 22 passing tests as a repository-wide result, not as a Sales Assistant-only test count.
- PAWANSPACE testing is described as backend smoke tests, a separate in-memory Yjs sync test and manual browser workflows; no production deployment or independent security audit is claimed.
- DocuMind AI does not claim persistent chat history, OCR or durable hosted vector storage as completed features.
- No employment history or unverified performance metrics have been added.


## Resume and certificates
- The latest supplied resume is included at `assets/Pawan_Ajay_Prasad_Resume.pdf`.
- The NASSCOM FutureSkills Prime certificate link is configured in the Credentials section of `index.html`.
