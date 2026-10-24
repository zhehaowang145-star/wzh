# Portfolio Deployment

## Option 1: Upload a static build

Publish this folder:

`C:\Users\23914\Documents\ChatGPT\New project\portfolio-site\dist`

The essential files are:

- `dist/index.html`
- `dist/assets/`
- `dist/media/optimized/`
- `dist/media/grain.svg`

Uploading the complete `dist` folder is the safest option. The legacy
JPG/PNG files in `dist/media` are retained source images and are not requested
by the current website. Omitting them reduces the upload from about 14.70 MB
to about 4.25 MB.

## Option 2: Build on the hosting platform

For Vercel, Netlify, Cloudflare Pages, or a similar platform:

- Build command: `pnpm run build`
- Publish directory: `dist`
- Root directory: `portfolio-site`
- Do not deploy `node_modules/`
- Do not upload `.env.local`

## Domain path

The current Vite configuration uses root-relative paths and works when the
site is deployed at a domain root. If deploying under a subpath such as
`https://example.com/portfolio/`, set the matching `base` value in
`vite.config.js` before rebuilding.

## Local preview

Run `pnpm run dev` and open:

`http://127.0.0.1:5173/`
