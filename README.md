# Rachel & Ryan wedding website

This static site is ready for GitHub Pages and Pages CMS. Pages CMS edits `content/site.json` in the GitHub repository; uploaded photos are stored under `media/site/`.

## Edit the site in Pages CMS

1. Put the contents of this project folder in the root of a GitHub repository.
2. Publish the repository with GitHub Pages (Settings → Pages). The site is plain HTML, CSS and JavaScript; no build step is needed.
3. Open [Pages CMS](https://app.pagescms.org/), sign in with GitHub, and install/authorize its GitHub App for the repository.
4. Choose the repository and the branch GitHub Pages publishes. The `.pages.yml` file configures the editor.
5. Open **Website content** to edit the site copy, titles, banner photos, home carousel, venue photos, travel ribbon, people, FAQs, hotels, local guide, colors, logo, and RSVP/Registry destinations. Upload photos in the CMS Media area and select them in the image fields.

Pages CMS commits edits to GitHub; GitHub Pages then publishes them.

## Local preview

Because the site loads `content/site.json` with `fetch`, serve this folder over HTTP instead of opening `index.html` directly. From this folder run:

```sh
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Notes

- RSVP and Registry URLs are editable in **Website content → Wedding details and links** and open in a new tab.
- The horizontal logo spaces have no border. Add a wide transparent PNG or SVG in the CMS logo field.
- The RDU Guide cards use portrait photo crops. Venue photos use landscape crops.
- The wedding colors are editable in CMS and default to `#BDD99F`, `#DE8E65`, and `#87A96B`.
- The Anglican Text and Junicode fonts are bundled locally. Anglican Text is free for private use; its designer requests a commercial-use license for commercial projects. See `assets/fonts/ANGLICAN-FONT-NOTICE.txt`. Junicode’s SIL Open Font License is included beside its font files.
- All photo fields start blank with labeled spaces. Add your images through the Pages CMS image fields; uploaded photos are committed into the repository.

