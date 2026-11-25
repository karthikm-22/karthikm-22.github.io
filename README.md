# Karthik Maddimsetti — Portfolio

Live at **https://ramaraju-lemniscate.github.io/karthik-portfolio/**

GitHub Pages builds this site automatically with Jekyll whenever something changes. There's nothing to install.

## The easy way to edit: Pages CMS (no code)

1. Go to **https://app.pagescms.org** and sign in with GitHub.
2. Open the **karthik-portfolio** repository.
3. Use the menu on the left:
   - **Profile & home page**: name, bio, photo, email, CV, GitHub/LinkedIn/Scholar links, CGPA line, research interest, publications.
   - **Projects**: one entry per project card. Add, reorder (with the *Position* number) or delete projects. Upload a card image.
4. Click **Save**. The live site updates in about a minute.

**Giving a project its own page:** write something in the project's *Write-up* box (headings, text, images and lists all work). The card then links to a full page like the PPG one. Projects with an empty Write-up stay as plain cards.

Any field left empty is hidden on the site. For example, the Contact section appears only once an email or a link is filled in.

## Editing directly on GitHub

| To change…                         | Edit this file                         |
|-----------------------------------|----------------------------------------|
| Intro, CGPA, links, research, publications | `_data/profile.yml`        |
| A project card or its write-up    | `_projects/<name>.md`                  |
| Add a project                     | Copy any file in `_projects/`, rename it, edit it |
| Colours, fonts, spacing           | `css/style.css` (the `:root` block at the top) |
| Site title, description, address | `_config.yml`                          |

Photos go in `images/` and PDFs in `files/` (open the folder on GitHub, then **Add file → Upload files**). Then use their path, for example `images/profile.jpg`. File names are case-sensitive.

### A project file looks like this

```markdown
---
title: Sobel Edge Detection on FPGA
order: 2                      # position on the home page
tag: FPGA · Image Processing
summary: One or two sentences for the card.
meta: 2.015 ms per 256 × 256 image
image: images/sobel.jpg       # optional card image
mark: FPGA                    # shown on the tile when there's no image
---

## Optional write-up

Anything written here turns the card into a full project page.

![Alt text](images/sobel-result.png)
*Fig. 1 — The italic line right under an image becomes its caption.*
```

`_projects/ppg-front-end.md` shows every optional page field: intro, facts row, cover image, key numbers strip and report PDF.

## Moving the site to Karthik's account

Go to **Settings → General → Transfer ownership**. Afterwards, in `_config.yml`:

- If the repo is renamed to `<his-username>.github.io`, set `url: https://<his-username>.github.io` and `baseurl: ""`.
- Otherwise, set `url: https://<his-username>.github.io` and keep `baseurl: /karthik-portfolio`.

## Folder map

```
_config.yml        site settings (title, address, SEO)
_data/profile.yml  home page content
_projects/         one Markdown file per project
_layouts/          page templates (default + project)
_includes/         small template pieces
index.html         home page template
css/style.css      all styling
images/  files/    photos and PDFs
.pages.yml         Pages CMS editor setup
```
