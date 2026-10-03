# My Portfolio – a NextWork template

A one-page portfolio you can publish for free with **GitHub Pages**: your headline, the tools you're learning, your projects, an About section and a way to contact you.

You don't need to install anything. Everything below happens in your web browser.

---

## 1. Make your own copy

1. Sign in to [GitHub](https://github.com) (create a free account if you don't have one).
2. On this repository's page, click the green **Use this template** button, then **Create a new repository**.
   - If you don't see that button, click **Fork** instead.
3. Name your repository. Two good options:
   - `your-username.github.io` → your site will live at `https://your-username.github.io`
   - anything else, like `portfolio` → your site will live at `https://your-username.github.io/portfolio`
4. Leave it **Public** and click **Create repository**.

## 2. Put your details in

All your content lives in one file: **`portfolio.js`**.

1. In your new repository, click **`portfolio.js`**, then the ✏️ pencil icon (**Edit this file**).
2. Change the text between the quotes `'...'`: your name, headline, email, about text and links.
3. Keep the quotes and the commas at the end of each line. They hold the file together.
4. Click **Commit changes** (top right), then **Commit changes** again.

### Your photo
1. Open the **`images`** folder → **Add file** → **Upload files** → drag in your photo (for example `me.jpg`) → **Commit changes**.
2. In `portfolio.js`, change `photo: 'images/avatar.svg'` to `photo: 'images/me.jpg'`.

## 3. Publish it

1. In your repository, go to **Settings** → **Pages** (in the left menu).
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Set **Branch** to **`main`** and the folder to **`/ (root)`**, then click **Save**.
4. Wait a minute or two, then refresh the page. A link appears at the top: **"Your site is live at …"**. 🎉

From now on, every time you commit a change, GitHub updates your site automatically within a minute or two.

---

## Using the Settings panel (the easy way to edit)

Your site has a **Settings** button in the sidebar (on phones, open the ☰ menu). Use it to change your name, links and tools, and see the result straight away.

**Important:** Settings only changes the site **in your own browser**. Nobody else can see those changes yet. To publish them:

1. Click **Download portfolio.js**.
2. In your GitHub repository, click **Add file** → **Upload files**, drop in the downloaded `portfolio.js`, and commit. It replaces the old one.
3. If you picked any images in Settings, upload those too. Settings tells you which files and which folder.

Changed your mind? **Undo my changes** goes back to what's in your `portfolio.js`.

## Adding a tool you've learned

Each tool in the carousel is a bubble with a logo and a link (for example, to the NextWork project where you learned it).

- **With Settings:** click **+ Add a tool**, fill in the name and link, and click **Pick image** for the logo.
- **By hand:** add a line to the `tools` list in `portfolio.js`:
  ```js
  { name: 'Python', logo: 'images/tools/python.svg', url: 'https://nextwork.ai/...' },
  ```
  and upload the logo to the `images/tools` folder.

Square logos (SVG or PNG) look best. You can find many at [simpleicons.org](https://simpleicons.org) and [devicon.dev](https://devicon.dev).

---

## Something's not working?

| Problem | Fix |
|---|---|
| The page is blank | There's probably a typo in `portfolio.js`, usually a missing quote `'` or comma `,`. Compare your file with the original, line by line. |
| My photo or a logo doesn't show | Check that the file name in `portfolio.js` matches the uploaded file **exactly**, including capital letters and the extension (`.jpg`, `.png`, `.svg`). |
| My changes don't appear | Wait two minutes and refresh. If you used Settings, make sure you uploaded the downloaded `portfolio.js` to GitHub. |
| I want to try it on my computer first | Download the repository (**Code** → **Download ZIP**), unzip it, and double-click `index.html`. |

## What's in this repository

```
index.html        the page
style.css         the look (colours are at the top)
script.js         makes it work: you don't need to edit it
portfolio.js      ← YOUR content
images/           your photo goes here
images/tools/     tool logos
images/social/    icons for your links
```

## Credits

- Font: [Inter](https://rsms.me/inter/) (SIL Open Font License), loaded from Google Fonts.
- Tool and social logos are trademarks of their owners and are used only to name each tool. Several come from [Simple Icons](https://simpleicons.org) and [Devicon](https://devicon.dev).
