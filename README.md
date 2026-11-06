# Rachel & Ryan wedding website

This static site is ready for GitHub Pages and Pages CMS. Pages CMS edits the content in `content/site.json` in your GitHub repository, and uploaded photos can be stored under `media/site/`.

## Edit the site in Pages CMS

1. Put the contents of this project folder in the root of a GitHub repository.
2. Publish the repository with GitHub Pages (Settings → Pages). The site is plain HTML, CSS and JavaScript; no build step is needed.
3. Open [Pages CMS](https://app.pagescms.org/), sign in with GitHub, and install/authorize the Pages CMS GitHub App for the repository.
4. Choose the repository and the branch GitHub Pages publishes. The `.pages.yml` file configures the editor.
5. Open **Website content** to edit all page copy, titles, subtitles, backgrounds, carousel photos, people, FAQs, hotels, guide listings, colors, logo, and RSVP/Registry destinations. Upload media in the CMS Media area and select it in an image field.

Changes are committed to GitHub by Pages CMS and then published by GitHub Pages.

## Local preview

Because the site loads `content/site.json` with `fetch`, serve this folder over HTTP instead of opening `index.html` directly. From this folder run:

```sh
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Notes

- RSVP and Registry links are editable in **Website content → Wedding details and links** and open in a new tab.
- The horizontal logo space is intentionally reserved. Add a wide transparent PNG or SVG using the CMS logo field.
- Guide photos use a portrait crop. Pick tall images for the best result.
- The requested wedding colors are editable in the CMS colors fields. The default values are `#BDD99F`, `#DE8E65`, and `#87A96B`.
- Remote Unsplash photos and Google Fonts need an internet connection. Uploaded images in `media/site/` are committed with the repository.

