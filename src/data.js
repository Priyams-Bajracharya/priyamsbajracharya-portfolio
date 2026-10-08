// All site copy lives here. Edit this file to change text anywhere on the site
// without touching component code. Entries marked TODO are placeholders the
// components will render as-is (often inside a visibly flagged "TODO" tag) —
// search this file for "TODO" before launch.

export const site = {
  name: 'Priyams Bajracharya',
  role: 'Data Engineer',
  email: 'priyams.bajracharya@gmail.com',
  github: 'https://github.com/Priyams-Bajracharya',
  linkedin: 'https://www.linkedin.com/in/priyams-bajracharya', // TODO: confirm exact LinkedIn URL
  cvUrl: '/cv/Priyams-Ratna-Bajracharya-CV.pdf', // TODO: drop the real CV file into public/cv/
  domain: 'https://priyamsbajracharya.com.np',
};

export const hero = {
  eyebrow: 'Data Engineer / Analyst',
  pitch:
    'I build pipelines that turn messy, scattered data into warehouses people can actually trust and query.',
  ctas: [
    { label: 'View Projects', href: '#projects', variant: 'primary' },
    { label: 'Download CV', href: site.cvUrl, variant: 'secondary', download: true },
    { label: 'Contact', href: '#contact', variant: 'ghost' },
  ],
  sources: [
    { id: 'education', label: 'Education' },
    { id: 'internships', label: 'Internships' },
    { id: 'projects', label: 'Projects' },
    { id: 'certifications', label: 'Certifications' },
  ],
  transformLabel: 'Transform',
  warehouseLabel: 'Warehouse',
};

export const about = {
  heading: 'About',
  kicker: '01 / extract',
  bio: [
    "I'm a Computer Engineering graduate who got pulled into data engineering by accident — a bootcamp module on pipelines turned into a genuine interest in how data moves, breaks, and gets fixed between systems.",
    "Most of what I know comes from building things end to end: writing the ETL, designing the schema, then finding out in production why the schema was wrong. I like that feedback loop.",
    "Right now I work with clinical trial data as a data analyst, and outside of that I build small-scale data warehouse projects to keep learning the parts of the stack I don't touch day to day.",
  ],
  timelineHeading: 'How I got here',
  timeline: [
    {
      id: 'leapfrog',
      dateRange: 'TODO: confirm dates',
      title: 'Leapfrog Connect Bootcamp',
      org: 'Leapfrog Technology',
      description: 'Introductory bootcamp covering software engineering fundamentals — the starting point before specializing toward data.',
      todo: 'Confirm exact start/end dates and whether to name the specific track/module.',
    },
    {
      id: 'datacamp',
      dateRange: 'TODO: confirm dates',
      title: 'Data Engineer Career Tracks',
      org: 'DataCamp',
      description: 'Self-paced tracks in Python and SQL for data engineering — ETL design, data warehousing concepts, and pipeline tooling.',
      todo: 'Confirm when these were completed relative to the bootcamp and internships.',
    },
    {
      id: 'nln',
      dateRange: 'TODO: confirm dates',
      title: 'Marketing Intern',
      org: 'NLN',
      description: 'TODO: add 1–2 lines on what this role involved and why it is worth including on a data engineering portfolio (e.g. first exposure to reporting/analytics, or just early work experience).',
      todo: 'Confirm dates and whether/how to frame this for a DE audience.',
    },
    {
      id: 'outlines',
      dateRange: 'Nov 2025 – Feb 2026',
      title: 'Frontend Developer Intern',
      org: 'Outlines R&D',
      description: 'Built React dashboards consuming internal REST APIs — the first time I worked on the consumption side of data I would otherwise be producing, which reshaped how I think about API contracts.',
      todo: null,
    },
    {
      id: 'kec',
      dateRange: '2022 – 2026',
      title: 'BE in Computer Engineering',
      org: 'Kathmandu Engineering College (Tribhuvan University)',
      description: 'Graduated with Distinction, 82.90%.',
      todo: null,
    },
    {
      id: 'nimble',
      dateRange: 'Sept 2026 – Present',
      title: 'Data Analyst Intern',
      org: 'Nimble Clinical Research',
      description: 'Working with clinical trial data, structuring datasets to SDTM standards in SAS — a different domain from my personal projects, but the same underlying discipline: get the data model right before anything downstream can be trusted.',
      todo: null,
    },
  ],
};

export const projectsSection = {
  heading: 'Projects',
  kicker: '02 / transform',
};

export const projects = [
  {
    id: 'healthcare-dw',
    title: 'Healthcare Analytics Data Warehouse',
    team: false,
    summary:
      'A star-schema warehouse for healthcare encounter data, loaded incrementally by an Airflow-orchestrated Python ETL pipeline.',
    techStack: ['Python', 'PostgreSQL', 'Airflow', 'SQL', 'Star Schema'],
    githubUrl: 'https://github.com/Priyams-Bajracharya', // TODO: link the specific repo
    screenshot: {
      file: 'healthcare-airflow-dag.webp',
      width: 1600,
      height: 900,
      alt: 'Airflow graph view showing the healthcare ETL DAG and its task dependencies',
    },
    architecture: {
      type: 'star-schema',
      schema: {
        fact: {
          id: 'fact_encounters',
          name: 'fact_encounters',
          columns: ['encounter_key', 'patient_key', 'provider_key', 'facility_key', 'date_key', 'diagnosis_key', 'cost', 'duration_minutes'],
        },
        dimensions: [
          { id: 'dim_patient', name: 'dim_patient', columns: ['patient_key', 'patient_id', 'age', 'gender', 'region'] },
          { id: 'dim_provider', name: 'dim_provider', columns: ['provider_key', 'provider_id', 'specialty'] },
          { id: 'dim_facility', name: 'dim_facility', columns: ['facility_key', 'facility_id', 'facility_type', 'region'] },
          { id: 'dim_date', name: 'dim_date', columns: ['date_key', 'date', 'month', 'quarter', 'year'] },
          { id: 'dim_diagnosis', name: 'dim_diagnosis', columns: ['diagnosis_key', 'icd_code', 'description'] },
        ],
      },
    },
    caseStudy: {
      problem:
        'TODO: describe the specific analytics questions this warehouse was built to answer (e.g. encounter volume trends, cost-per-diagnosis reporting) and who the data was for.',
      myRole:
        'Designed the star schema, wrote the Python ETL (extract → transform → incremental load), and orchestrated the pipeline with Airflow.',
      challenges:
        'TODO: add a specific bug/decision worth telling — e.g. how incremental loading was made idempotent, or a data-quality issue caught in the diagnosis dimension.',
      improvements:
        'TODO: what would you change with more time? (e.g. SCD Type 2 on dim_patient, automated data-quality tests, partitioning fact_encounters by date.)',
    },
  },
  {
    id: 'ridehailing-dw',
    title: 'Ride-Hailing Analytics Data Warehouse',
    team: false,
    summary:
      'A 3NF OLTP schema transformed into a star schema via an idempotent Python ETL pipeline, tested against 10,000 synthetic trips.',
    techStack: ['Python', 'PostgreSQL', 'SQL', 'Faker', 'Star Schema', 'ETL'],
    githubUrl: 'https://github.com/Priyams-Bajracharya', // TODO: link the specific repo
    screenshot: {
      file: 'ridehailing-erd.webp',
      width: 1600,
      height: 1000,
      alt: 'Entity-relationship diagram showing fact_trips joined to its 8 dimension tables',
    },
    architecture: {
      type: 'star-schema',
      schema: {
        fact: {
          id: 'fact_trips',
          name: 'fact_trips',
          columns: ['trip_key', 'date_key', 'time_key', 'driver_key', 'rider_key', 'vehicle_key', 'pickup_location_key', 'dropoff_location_key', 'payment_method_key', 'fare_amount', 'distance_km', 'duration_minutes'],
        },
        dimensions: [
          { id: 'dim_date', name: 'dim_date', columns: ['date_key', 'date', 'day_of_week', 'month', 'year'] },
          { id: 'dim_time', name: 'dim_time', columns: ['time_key', 'hour', 'minute', 'period_of_day'] },
          { id: 'dim_driver', name: 'dim_driver', columns: ['driver_key', 'driver_id', 'rating', 'years_active'] },
          { id: 'dim_rider', name: 'dim_rider', columns: ['rider_key', 'rider_id', 'signup_date'] },
          { id: 'dim_vehicle', name: 'dim_vehicle', columns: ['vehicle_key', 'vehicle_id', 'make', 'model', 'category'] },
          { id: 'dim_pickup_location', name: 'dim_pickup_location', columns: ['pickup_location_key', 'zone', 'city'] },
          { id: 'dim_dropoff_location', name: 'dim_dropoff_location', columns: ['dropoff_location_key', 'zone', 'city'] },
          { id: 'dim_payment_method', name: 'dim_payment_method', columns: ['payment_method_key', 'method_type'] },
        ],
      },
    },
    caseStudy: {
      problem:
        'Ride-hailing trip data lived in a normalized 3NF OLTP schema (10 tables) optimized for transactional writes, not analytics — answering a question like "average fare by time-of-day and zone" meant joining across most of the schema every time.',
      myRole:
        'Designed the OLTP → star-schema transformation end to end: the 3NF source schema, the fact_trips + 8-dimension target schema, and an idempotent Python ETL pipeline (PostgreSQL, ON CONFLICT DO NOTHING) tested against 10,000 synthetic trips generated with Faker.',
      challenges:
        'Found and fixed a schema-drift bug: a NOT NULL time_key column was added to fact_trips, but the ETL script was not updated to populate it, so every load after the migration failed on the NOT NULL constraint until I traced it back and patched the transform step to derive and populate time_key correctly.',
      improvements:
        'With more time: SCD Type 2 on the slowly-changing dimensions (driver rating, vehicle category), Airflow orchestration instead of manual runs, a dead-letter table to capture and inspect rows that fail transformation instead of silently dropping them, and partitioning fact_trips by date for query performance at scale.',
    },
  },
  {
    id: 'traffic-signal',
    title: 'Adaptive Traffic Signal Controller',
    team: true,
    summary:
      'A team project exploring signal timing that adapts to real-time traffic conditions instead of running on fixed cycles.',
    techStack: ['Python'], // TODO: fill in the real tech stack (sensors/simulation framework/etc.)
    githubUrl: 'https://github.com/Priyams-Bajracharya', // TODO: link the specific repo
    screenshot: {
      file: 'traffic-signal-demo.webp',
      width: 1600,
      height: 900,
      alt: 'TODO: describe the screenshot once added (e.g. simulation dashboard or hardware demo)',
    },
    architecture: { type: 'none' },
    caseStudy: {
      problem:
        'TODO: describe the problem this team project addressed and the approach taken.',
      myRole:
        'Team project. My role was planning, key technical decisions, and leading the results presentation.',
      challenges: 'TODO: add a specific challenge from the project.',
      improvements: 'TODO: what would the team improve with more time?',
    },
  },
  {
    id: 'aqi-forecast',
    title: 'AQI Forecast',
    team: true,
    summary: 'A team project forecasting air quality index trends.', // TODO: expand this summary
    techStack: ['Python'], // TODO: fill in the real tech stack (model/libraries/data source)
    githubUrl: 'https://github.com/Priyams-Bajracharya', // TODO: link the specific repo
    screenshot: {
      file: 'aqi-forecast-dashboard.webp',
      width: 1600,
      height: 900,
      alt: 'TODO: describe the screenshot once added',
    },
    architecture: { type: 'none' },
    caseStudy: {
      problem: 'TODO: describe the forecasting problem and data sources used.',
      myRole: 'TODO',
      challenges: 'TODO: add a specific challenge from the project.',
      improvements: 'TODO: what would the team improve with more time?',
    },
  },
];

export const skills = {
  heading: 'Skills',
  kicker: '03 / model',
  groups: [
    {
      id: 'data-engineering',
      label: 'Data Engineering',
      items: ['ETL Design', 'Data Warehousing', 'Star Schema Modeling', 'Incremental Loading', 'Airflow'],
    },
    {
      id: 'databases',
      label: 'Databases',
      items: ['PostgreSQL', 'SQL'],
    },
    {
      id: 'languages',
      label: 'Languages',
      items: ['Python', 'SQL', 'SAS', 'JavaScript'],
    },
    {
      id: 'tools',
      label: 'Tools',
      items: ['Git', 'GitHub'],
    },
    {
      id: 'frontend',
      label: 'Frontend',
      items: ['React', 'Tailwind CSS'],
    },
  ],
};

export const certifications = {
  heading: 'Certifications',
  kicker: '04 / validate',
  items: [
    {
      id: 'datacamp-sql',
      title: 'Associate Data Engineer in SQL',
      issuer: 'DataCamp',
      date: 'TODO: add completion date',
      url: 'https://www.datacamp.com/certificate/', // TODO: add the real credential URL
    },
    {
      id: 'datacamp-python',
      title: 'Data Engineer in Python',
      issuer: 'DataCamp',
      date: 'TODO: add completion date',
      url: 'https://www.datacamp.com/certificate/', // TODO: add the real credential URL
    },
  ],
};

export const contact = {
  heading: 'Contact',
  kicker: '05 / load',
  line: "Open to data engineering and analytics roles — if you're hiring or just want to talk shop about pipelines, reach out.",
  email: site.email,
  linkedin: site.linkedin,
};

export const footer = {
  line: 'Built with React + Tailwind, deployed on Vercel.',
  links: [
    { label: 'GitHub', href: site.github },
    { label: 'LinkedIn', href: site.linkedin },
    { label: 'Email', href: `mailto:${site.email}` },
  ],
};
