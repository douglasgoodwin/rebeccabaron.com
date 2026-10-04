# rebeccabaron.com

Static site built with [Eleventy](https://www.11ty.dev/). Replaces the old
Hugo + Netlify setup. Content is flat files; the build is plain HTML deployed
to GitHub Pages.

## Run locally

```sh
npm install        # once
npm run dev        # serves at http://localhost:8080 with live reload
npm run build      # writes the static site to _site/
```

Laravel Herd can also serve `_site/` if you prefer, but `npm run dev` is the
simplest local preview.

## Structure

```
src/
  index.njk              home — fullscreen Ted Serios video + three links
  about.njk              bio
  films.njk              films index (auto-lists everything in src/films/)
  contact.njk            contact page + form
  films/*.md             one file per film (front matter + synopsis)
  _includes/             layouts (base, page, film) + bottom menu
  _data/site.json        title, footer, bottom menu, contact email
  css/main.css           styles (Didact Gothic, dark slate, galleries)
  js/lightbox.js         gallery lightbox
  assets/                video, favicon, per-film images
  CNAME                  rebeccabaron.com
```

## Add or edit a film

Create `src/films/<slug>.md`:

```yaml
---
title: "film title"
slug: newfilm
images:
  - still1.jpg
  - still2.jpg
---
One paragraph of synopsis.
```

Put the images in `src/assets/films/<slug>/`. The films index picks it up
automatically (alphabetical by title).

## TODO (left for you)

- **Contact email**: set `contactEmail` in `src/_data/site.json` to Rebecca's
  address. The form posts to FormSubmit; the first submission triggers a
  one-time confirmation email to that address to activate it.
- **"the idea of north"**: `src/films/idea.md` currently repeats the
  "lossless" synopsis (that error was in the old site too). Replace it.
- **"installations"**: `src/films/installations.md` is a stub ("About the
  installations"). Add real copy.

## Deploy (GitHub Pages)

`.github/workflows/deploy.yml` builds and deploys on every push to `main`.
In the repo: Settings -> Pages -> Build and deployment -> Source =
"GitHub Actions". The `CNAME` file keeps the rebeccabaron.com domain; point
the domain's DNS at GitHub Pages and the site is no longer on Netlify.
