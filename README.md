The web frontend for Hackerspace, the production application for discovering and managing community events. This repository contains the frontend only; the backend is maintained separately.

#### What It Provides

- A public landing page introducing Hackerspace
- Event discovery, search, filtering, pagination, and event details
- Account registration and login
- A signed-in dashboard for managing events and profile information
- A contact form

#### Technology

Next.js, TypeScript, Tailwind CSS, TanStack Query, and EmailJS.

#### Architecture

![Hackerspace frontend architecture](https://i.imgur.com/Bj1fAT8.png)

#### Production Deployment

- The frontend is deployed on Vercel.
- The backend is packaged as a Docker image and deployed on Render, with a custom subdomain for the backend API.
- The application domain is hosted through OVH Cloud.
- PostgreSQL is provided by Neon.
- Uploaded files use an S3-compatible object storage bucket.

The frontend connects to the deployed backend through `NEXT_PUBLIC_API_URL`. Keep deployment credentials and other secrets in the hosting providers' environment configuration; do not commit them to this repository.

#### Configuration

Create a `.env.local` file in the project root and configure:

| Variable                          | Purpose                                   |
| --------------------------------- | ----------------------------------------- |
| `NEXT_PUBLIC_API_URL`             | Base URL of the Hackerspace backend API   |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID`  | EmailJS service used by the contact form  |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS template used by the contact form |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`  | EmailJS public key                        |

See `.env.example` for the variable names.

#### Running Locally

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

#### Build and Lint

Create a production build and run the configured linter with:

```bash
npm run build
npm run lint
```
