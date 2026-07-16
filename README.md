# Jamil Cards

A digital business card viewer. Each card has a unique URL (`/#/<cardId>`) that looks up the card's data in Firestore and renders it as an interactive profile page — photo, title, contact actions (call/email), a downloadable contact snippet, share, and social links.

## How it works

- **Routing** — [App.jsx](src/App.jsx) reads the card ID from the URL hash (`#/<cardId>`) and listens for `hashchange`. No router library is used.
- **Data** — the card ID is looked up as a document in the Firestore `cards` collection ([firebase.js](src/firebase.js)). If the document doesn't exist, a "Card not available" state is shown; if there's no hash at all, a landing/empty state is shown.
- **Rendering** — [ProfileCard.jsx](src/components/ProfileCard.jsx) renders the card: avatar, name, title, email, quick actions (call, email, download `.txt` of links, native share), and any social links marked `visibleOnCard`.

## Tech stack

- React 19 + Vite
- Firebase (Firestore for data, Hosting for deployment)
- Oxlint for linting

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:5173/#/<cardId>` with a valid card ID from Firestore to view a card.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Build for production into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint |
| `npm run deploy` | Deploy the current `dist/` to Firebase Hosting (run `build` first) |

## Deployment

Hosting is configured in [firebase.json](firebase.json) (serves `dist/`, SPA rewrite to `index.html`) and the target project is set in [.firebaserc](.firebaserc).

```bash
npm run build
firebase deploy --only hosting
```

See [Custom domain](#custom-domain) below for pointing a domain (e.g. `jamilcards.com`) at this deployment instead of the default `*.web.app` / `*.firebaseapp.com` URL.

## Custom domain

By default Firebase Hosting serves your app at `https://<project-id>.web.app` and `https://<project-id>.firebaseapp.com`. To serve it from your own domain instead:

1. **Add the domain in Firebase**

   Easiest via the [Firebase Console](https://console.firebase.google.com/) → **Hosting** → **Add custom domain** → enter your domain (e.g. `jamilcards.com` and `www.jamilcards.com`).

2. **Verify ownership & add DNS records**

   Firebase gives you a TXT record (for verification) and either `A` records (apex domain) or a `CNAME` record (subdomain like `www`). Add these at your domain registrar/DNS provider using the exact values Firebase shows you, e.g.:

   ```text
   TXT   @        <verification-value-from-firebase>
   A     @        <ip-1-from-firebase>
   A     @        <ip-2-from-firebase>
   CNAME www      <project-id>.web.app.
   ```

3. **Wait for provisioning**

   Firebase auto-issues an SSL certificate once DNS propagates (minutes to ~24h). Check status with:

   ```bash
   firebase hosting:sites:list
   ```

   or in the Console under Hosting → your domain's status.

4. **Deploy**

   ```bash
   npm run build
   firebase deploy --only hosting
   ```

   Once the domain shows **Connected** in the console, the app is live at the custom domain instead of the default `*.web.app` URL.
