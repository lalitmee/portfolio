# Lalit Kumar – Portfolio

This repository contains the source code for my personal portfolio, hosted at [https://lalitmee.com](https://lalitmee.com). It showcases my work, skills, and experience as a software engineer, along with selected projects and writing.

> This is now the permanent home of my portfolio. The previous `lalitmee.github.io` setup is no longer used.

## Live Site

- **URL:** https://lalitmee.com
- **Hosting:** Vercel (Hobby plan)

## Features

- Responsive, accessible layout for desktop and mobile
- Sections for about, skills, experience, projects, and contact
- Smooth page transitions and subtle animations
- Dark/light theme support
- Contact form powered by EmailJS
- SEO-friendly metadata and social previews

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (React, `pages` router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, PostCSS, Autoprefixer
- **Animations:** Framer Motion
- **Forms:** React Hook Form
- **Icons:** Font Awesome, React Icons
- **Theming:** `next-themes`
- **Deployment:** Vercel

## Getting Started

Clone the repository:

```bash
git clone git@github.com:lalitmee/portfolio.git
cd portfolio
```

Install dependencies (using your preferred package manager):

```bash
npm install
# or
pnpm install
# or
yarn install
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser to view the site.

## Scripts

Commonly used scripts are defined in `package.json`:

- `npm run dev` – Start the local development server
- `npm run build` – Create an optimized production build
- `npm run start` – Start the production server
- `npm run lint` – Run linting via Next.js and ESLint
- `npm run type-check` – Run TypeScript type checking

## Project Structure

A high-level overview of the project layout:

```text
.
├── pages/             # Next.js routes
├── components/        # Reusable UI components
├── public/            # Static assets (images, icons, etc.)
├── styles/            # Global styles (Tailwind entry, etc.)
├── package.json
└── README.md
```

## Deployment

The portfolio is deployed on [Vercel](https://vercel.com/):

- Automatic deployments from the `main` branch
- Preview deployments for pull requests (if enabled)
- Environment configuration handled via Vercel project settings

To deploy your own fork:

1. Create a new project on Vercel.
2. Import your GitHub repository.
3. Use the default Next.js build settings:
   - Build command: `npm run build`
   - Output directory: `.next`
4. Set any required environment variables (for example, for EmailJS).
5. Trigger a deployment from the Vercel dashboard or by pushing to your default branch.

## Contact

If you’d like to reach out:

- Website: https://lalitmee.com
- GitHub: https://github.com/lalitmee
- LinkedIn: https://linkedin.com/in/lalitmee
- Email: https://lalitkumar.meena.lk@gmail.com

## Notes

- This repository is intended to be the canonical source for my portfolio going forward.
- The old `lalitmee.github.io` setup is deprecated and may not receive updates.
