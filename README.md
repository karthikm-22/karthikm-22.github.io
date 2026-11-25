# Karthik Maddimsetti — Portfolio

A plain HTML website. No build step and nothing to install. GitHub Pages serves it as-is.

## Put it online with GitHub Pages (one time, about 5 minutes)

1. Sign in to GitHub with the account the site should belong to.
2. Create a new repository (the **+** at the top right, then **New repository**).
   - Name it **`<username>.github.io`** (for example `karthik-m.github.io`) and the site's address will be `https://karthik-m.github.io`.
   - Any other name, like `portfolio`, also works. The address is then `https://<username>.github.io/portfolio`.
   - Set it to **Public** and click **Create repository**.
3. On the new repo page, click **uploading an existing file**. Drag in **everything inside this folder** (including the `css`, `js`, `images` and `files` folders), not the folder itself. Then click **Commit changes**.
4. Go to **Settings → Pages**. Under *Build and deployment*, set **Source: Deploy from a branch** and **Branch: `main`**, folder **`/ (root)`**, then click **Save**.
5. Wait about a minute and refresh. The live address appears at the top of the Pages screen.

> The `.nojekyll` file is hidden on most computers. If it doesn't upload, that's fine because the site works without it.

## Filling things in later

**Everything you'll want to add is in one file: `config.js`.**

On GitHub, open `config.js` and click the ✏️ pencil icon. Fill in a value between the quotes and click **Commit changes**. The live site updates within a minute.

| What                     | In `config.js`                | What happens when it's empty                         |
|--------------------------|-------------------------------|------------------------------------------------------|
| Email                    | `email`                       | The email line and Contact section are hidden         |
| GitHub / LinkedIn / Scholar | `github`, `linkedin`, `scholar` | That link is hidden                                 |
| CV                       | `cv`                          | The "Download CV" button is hidden                    |
| Profile photo            | `photos.profile`              | The photo column is hidden                            |
| Project photos           | `photos.processor`, `sobel`, … | A neat grid tile with the project's tag is shown     |

The Contact section and its menu link stay hidden until at least one contact detail is filled in.

### Adding a photo or the CV

1. On GitHub, open the `images` folder (or the `files` folder for the CV). Click **Add file → Upload files**, drop the file in, and click **Commit changes**.
2. Open `config.js` and write the path, for example:
   ```js
   profile: "images/profile.jpg",
   cv: "files/Karthik-Maddimsetti-CV.pdf",
   ```
3. Commit. If the path has a typo, the site falls back to the placeholder tile instead of showing a broken image.

File names are **case-sensitive** on GitHub Pages. `Profile.JPG` and `profile.jpg` count as different files.

## Editing text

Text lives in `index.html` (home page) and `ppg-front-end.html` (PPG project page). Edit them the same way, with the pencil icon on GitHub. Each section of `index.html` is marked with a comment such as `<!-- ============ PROJECTS ============ -->`.

To make another project open its own page like the PPG one, copy `ppg-front-end.html` to a new name and change its contents. Then, in `index.html`, change that project's `<article class="card">…</article>` to `<a class="card" href="new-page.html">…</a>`.

## Files

```
index.html            home page
ppg-front-end.html    PPG project write-up
config.js             ← links, email, CV, photos (edit this)
css/style.css         look and layout
js/site.js            applies config.js (no need to edit)
images/               photos (images/ppg/ holds the PPG figures)
files/                PDFs (PPG report, CV)
favicon.svg, 404.html
```
