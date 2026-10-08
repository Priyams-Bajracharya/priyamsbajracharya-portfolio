# Portfolio Brief

Build my personal portfolio website. It must feel genuinely impressive and
memorable, not like a generic template. I'm Priyams Bajracharya, a
Computer Engineering graduate working as a data engineer/analyst. The
audience is recruiters and data engineering interviewers.

## Design concept: "The Pipeline"

The whole site is themed as a data pipeline, executed with restraint:

- Hero: an animated SVG pipeline diagram. Small labeled source nodes
  (Education, Internships, Projects, Certifications) send data packets
  along curved paths through a "Transform" node into a "Warehouse" node
  that resolves into my name and title "Data Engineer". Subtle, smooth,
  loops gently. Below it: a one-line pitch, plus buttons for View Projects,
  Download CV, and Contact.
- Section headings styled like pipeline stages, e.g. "01 / extract",
  "02 / transform", in a monospace accent font.
- Project case studies each include a small interactive diagram: for the
  data warehouse projects, an SVG star schema where hovering a dimension
  table highlights its join to the fact table.
- Visual style: dark-first, deep near-black background with a faint grid,
  one strong accent color (electric teal or amber, pick one and commit),
  sharp typography. Pair a characterful sans (e.g. Space Grotesk or
  Instrument Sans) with IBM Plex Mono or JetBrains Mono for technical
  accents. Light mode supported but dark is the showcase.
- Motion: scroll-triggered fade/slide reveals, hover states on cards,
  nothing flashy. Respect prefers-reduced-motion (show a static version
  of the pipeline instead).
- Avoid: stock gradients, generic "Hi, I'm..." layouts, emoji icons,
  heavy 3D, particle backgrounds, buzzword-filled text.

## Sections

1. Hero (described above). Links: GitHub (github.com/Priyams-Bajracharya),
   LinkedIn, email.
2. About: a short, plain-spoken bio plus a vertical "journey" timeline
   showing how I got into data engineering:
   Leapfrog Connect bootcamp → DataCamp Data Engineer tracks →
   NLN marketing internship → Frontend Developer Intern at Outlines R&D
   (Nov 2025–Feb 2026, REST APIs + React dashboards) →
   BE Computer Engineering, Kathmandu Engineering College (TU), 2022–2026,
   Distinction, 82.90% → Data Analyst intern at Nimble Clinical Research
   (Sept 2026–present, clinical data / SDTM in SAS).
   Leave clear TODO placeholders where I need to adjust dates or wording.
3. Projects: case-study cards that expand into a full view with
   Problem → Architecture (diagram) → My Role → Tech Stack →
   Challenges & Fixes → What I'd Improve → GitHub link.
   a. Healthcare Analytics Data Warehouse: star schema, Python ETL,
      incremental loading, Airflow DAG.
   b. Ride-Hailing Analytics Data Warehouse: 3NF OLTP schema (10 tables)
      → star schema (fact_trips + 8 dimensions), idempotent Python ETL on
      PostgreSQL (ON CONFLICT DO NOTHING), 10,000 synthetic trips via
      Faker. Challenge: found and fixed a schema-drift bug (time_key added
      as NOT NULL but ETL not updated). Improvements: SCD Type 2, Airflow
      orchestration, dead-letter table, partitioning fact_trips by date.
   c. Adaptive Traffic Signal Controller: TEAM project. My role was
      planning, key technical decisions, and leading the results
      presentation. Label it clearly as a team project.
   d. AQI Forecast: TEAM project. Leave "My Role" as a TODO for me.
4. Skills: grouped visual layout, not a progress-bar list (no fake
   percentages). Groups: Data Engineering (ETL, data warehousing, star
   schema, Airflow), Databases (PostgreSQL, SQL), Languages (Python, SQL,
   SAS, JavaScript), Tools (Git, GitHub), Frontend (React, Tailwind).
5. Certifications: DataCamp Associate Data Engineer in SQL, Data Engineer
   in Python.
6. Contact: a short inviting line, my email and LinkedIn, and a working
   form (name, email, message) posting to a Vercel serverless function at
   /api/contact that emails me via Resend. API key from the RESEND_API_KEY
   env var, never hardcoded. Include validation, a honeypot spam field,
   and loading/success/error states.
7. Footer: "Built with React + Tailwind, deployed on Vercel" plus links.

## Tech & performance

- Vite + React + Tailwind CSS. Match Vercel's Vite preset exactly
  (build: npm run build, output: dist). Minimal vercel.json, only for
  cleanUrls and caching headers.
- Hand-written SVG + CSS/Framer Motion for animation; no heavy libraries.
- Target 90+ Lighthouse on mobile. Lazy-load images, keep the bundle small.
- Fully responsive from 360px to wide desktop. The hero pipeline must
  re-layout vertically on mobile, not just shrink.
- Accessible: semantic HTML, keyboard-navigable cards and modals, visible
  focus states, good contrast.
- ALL text content lives in src/data.js so I can edit without touching
  components. Comment the code so I can explain it.

## Domain & SEO

Production domain: apex priyamsbajracharya.com.np (www redirects to it),
DNS on Cloudflare. Add canonical URL, Open Graph + Twitter card tags with a
generated OG image, favicon, sitemap.xml, robots.txt.

## Deploy prep

Initialize git, create a GitHub repo "portfolio" with the gh CLI, and push.
Then give me a checklist of what to do manually in Vercel and Cloudflare.

## Images

- My images are in src/assets/images/ (I will add them myself):
  - profilePicture.png: my photo, for the About section. Show it rounded, with
    a subtle accent-colored border that fits the pipeline theme. Do NOT
    put it in the hero; the pipeline animation stays the focus there.
  - Project screenshots (e.g. healthcare-airflow-dag.png,
    ridehailing-erd.png): add each to its matching project case study.
- If an image file doesn't exist yet, use a placeholder box with the
  correct dimensions and a "TODO: add image" label, so I can drop in the
  real file later without changing the layout.
- Convert all images to WebP, resize them to the largest size they're
  actually displayed at, lazy-load anything below the fold, and write
  meaningful alt text for each.
- Generate the Open Graph preview image from my name and title (not my
  photo).

## Decisions locked in during planning

- Accent color: electric teal (`#2DD4BF`).
- Name as displayed everywhere on the site: **Priyams Bajracharya** (not
  "Priyams Ratna Bajracharya").
- Tailwind CSS v4 (CSS-native `@theme` tokens, `@tailwindcss/vite` plugin).
- Fonts self-hosted via `@fontsource-variable/space-grotesk` +
  `@fontsource/jetbrains-mono`.
- Hero packet animation: framer-motion tweening a progress value sampled
  against the visible `<path>` via `getPointAtLength()`.
