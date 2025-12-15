# Leetcode Premium Companies Viewer

A modern web interface to browse Leetcode company-specific questions.

## Features

- **Dark Mode**: Sleek, modern interface with glassmorphism effects.
- **Responsive**: Works on desktop and mobile.
- **Search**: Quickly find companies.
- **Duration Filtering**: Filter questions by frequency period (30 days, 6 months, etc.).
- **Static Generation**: Fast performance with pre-rendered pages.

## Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000).

3.  **Build for Production**:
    ```bash
    npm run build
    ```

4.  **Start Production Server**:
    ```bash
    npm start
    ```

## Deployment

### Vercel (Recommended)
This is a Next.js app, so Vercel is the easiest deployment.
1. Push this `web-interface` folder (or the whole repo) to GitHub.
2. Import the project in Vercel.
3. **Important**: The app requires access to the `../Companies` directory.
   - If deploying the `web-interface` folder as the root, `../Companies` will NOT be available in Vercel's build environment unless updated.
   - **Solution**: Move `Companies` into `web-interface/public/data` or `web-interface/data` and update `lib/data.ts`.
   - **OR**: Configure the Root Directory in Vercel to `web-interface` but ensure the monorepo structure is preserved.

### Static Export
To deploy as static HTML (e.g., GitHub Pages, Netlify Drop):

1. Update `next.config.ts`:
   ```ts
   import type { NextConfig } from "next";

   const nextConfig: NextConfig = {
     output: 'export',
     // ...
   };
   export default nextConfig;
   ```
2. Run `npm run build`.
3. The `out` folder contains the website.

### Data Location
Currently, the app reads data from `../Companies`.
- For local use, this works fine.
- For deployment, ensure the `Companies` data is accessible during the build process.
