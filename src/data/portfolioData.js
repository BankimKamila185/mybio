// =========================================================
// BANKIM CHANDRA KAMILA — PORTFOLIO DATA
// =========================================================

export const PERSONAL_INFO = {
  name: "Bankim Chandra Kamila",
  currentRole: "CTO & COO",
  company: "The Outliers Studio",
  tagline: "Building products, leading teams, and shipping real software.",
  avatar: "/profile.png",
  email: "bankimkamila185@gmail.com",
  github: "https://github.com/BankimKamila185",
  linkedin: "https://www.linkedin.com/in/bankim-chandra-kamila-b07b59236/",
  instagram: "https://www.instagram.com/bankimkamila.23/",
  whatsapp: "https://wa.me/919324634516",
};

export const ABOUT_BLURB = `I'm a 20-year-old technologist from Mumbai currently serving as CTO & COO at The Outliers Studio, where I lead product development, tech strategy, and day-to-day operations. I study AI & Machine Learning at ITM Skills University and have shipped 10+ production apps across full-stack web, Python backends, and real-time systems.`;

export const FEATURED_PROJECTS = [
  {
    title: "Reactify",
    subtitle: "Live Polling Engine",
    desc: "Real-time anonymous voting with WebSockets & live animated charts. Zero-latency live tallies, room codes, no sign-up required.",
    longDesc: "Engineered high-concurrency anonymous voting rooms with zero-latency WebSocket broadcasting, animated live tally charts, and clean responsive UI.",
    tags: ["React", "Node.js", "Socket.io", "MongoDB", "Vite"],
    link: "https://reactify-pink.vercel.app",
    github: "https://github.com/BankimKamila185/Reactify",
    category: "Full-Stack Web",
    accent: "#61dafb",
  },
  {
    title: "PayIt",
    subtitle: "Billing & Invoicing Platform",
    desc: "Automated payment calculations, invoice rendering, and historical ledger powered by Python backend.",
    longDesc: "Comprehensive invoicing engine powered by Python REST backend, supporting automated tax calculation, PDF invoice rendering, and historical ledger management.",
    tags: ["Python", "FastAPI", "React", "Tailwind", "PostgreSQL"],
    link: "https://payit-mu.vercel.app",
    github: "https://github.com/BankimKamila185/payit-",
    category: "Fintech Tool",
    accent: "#10b981",
  },
  {
    title: "Pixora",
    subtitle: "AI Image Studio",
    desc: "Extract dominant color palettes via K-Means clustering and apply neural filters in real time.",
    longDesc: "Computer vision platform using K-Means clustering to extract dominant HEX/RGB palettes from user uploads, with real-time neural filter processing.",
    tags: ["Python", "Computer Vision", "React", "Canvas API"],
    link: "https://pixora-lake.vercel.app",
    github: "https://github.com/BankimKamila185/pixora",
    category: "AI & ML",
    accent: "#ec4899",
  },
  {
    title: "WastCraft",
    subtitle: "Eco Scrap Marketplace",
    desc: "Circular economy platform connecting households with localized recyclers. Scrap categorization and price estimation.",
    longDesc: "Eco-commerce network designed to streamline recyclable scrap categorization, pricing estimation, and localized collection logistics.",
    tags: ["React", "JavaScript", "Tailwind", "Vercel"],
    link: "https://wastcraft.vercel.app",
    github: "https://github.com/BankimKamila185/wastcraft",
    category: "Marketplace",
    accent: "#22c55e",
  },
  {
    title: "Brand Studio",
    subtitle: "Design System Showcase",
    desc: "Fluid typography scales, CSS token architecture, and interactive micro-animations.",
    longDesc: "High-performance interactive design showcase implementing dynamic fluid typography scales, CSS token architectures, and micro-animations.",
    tags: ["React", "Vite", "CSS Architecture", "UI/UX"],
    link: "https://brand-two-mocha.vercel.app",
    github: "https://github.com/BankimKamila185/brand",
    category: "Design System",
    accent: "#a855f7",
  },
];

export const EXPERIENCE = [
  {
    role: "Chief Technology Officer",
    company: "The Outliers Studio",
    location: "Mumbai · Hybrid",
    period: "Jul 2026 — Present",
    current: true,
    desc: "Leading technology strategy, engineering architecture, product roadmap, and high-performance team leadership.",
    skills: ["Technology Management", "IT Strategy", "Product Development", "AI Systems"],
  },
  {
    role: "Chief Operating Officer",
    company: "The Outliers Studio",
    location: "Mumbai · Hybrid",
    period: "Jul 2026 — Present",
    current: true,
    desc: "Overseeing day-to-day business operations, cross-functional delivery, client partnerships, and scaling efficiency.",
    skills: ["Operations Strategy", "Team Leadership", "Business Strategy"],
  },
  {
    role: "Sales Intern",
    company: "Kwento",
    location: "Mumbai · Remote",
    period: "Jun 2025 — Sep 2025",
    current: false,
    desc: "User lifecycle analysis, business development pipelines, and cross-functional product communications.",
    skills: ["Client Relations", "Analytics"],
  },
  {
    role: "Back End Developer",
    company: "DESI DESTINY",
    location: "Maharashtra · Hybrid",
    period: "Jun 2025 — Sep 2025",
    current: false,
    desc: "Developed backend microservices, RESTful APIs, and relational database schemas. Collaborated on testing suites.",
    skills: ["Node.js", "REST APIs", "Database Design"],
  },
];

export const EDUCATION = [
  {
    institution: "ITM Skills University",
    degree: "B.Tech · Artificial Intelligence & Machine Learning",
    period: "2024 — 2028",
    current: true,
  },
  {
    institution: "Swami Vivekanand International School",
    degree: "12th Grade · Computer Science",
    period: "2022 — 2024",
    current: false,
  },
];

export const CERTIFICATIONS = [
  { title: "Postman API Fundamentals Student Expert", issuer: "Postman", date: "Jul 2024" },
  { title: "GenAI 101 with Pieces", issuer: "Pieces for Developers", date: "Dec 2024" },
  { title: "Google IT Support Professional", issuer: "Google / Coursera", date: "Mar 2023" },
  { title: "Fundamentals of Digital Marketing", issuer: "Google", date: "Apr 2022" },
];

export const TECH_MATRIX = [
  {
    category: "Frontend",
    skills: [
      { name: "React", level: 92, color: "#61dafb" },
      { name: "TypeScript / JS", level: 88, color: "#3178c6" },
      { name: "Tailwind CSS", level: 90, color: "#38bdf8" },
      { name: "Vite / Next.js", level: 85, color: "#a855f7" },
    ],
  },
  {
    category: "Backend & Systems",
    skills: [
      { name: "Node.js & Express", level: 90, color: "#22c55e" },
      { name: "Python & FastAPI", level: 86, color: "#3b82f6" },
      { name: "WebSockets & Socket.io", level: 88, color: "#f59e0b" },
      { name: "MongoDB & PostgreSQL", level: 84, color: "#10b981" },
    ],
  },
  {
    category: "AI / ML & Tools",
    skills: [
      { name: "Computer Vision / K-Means", level: 82, color: "#ec4899" },
      { name: "Postman API & REST", level: 94, color: "#f97316" },
      { name: "Git & GitHub CI", level: 92, color: "#e2e8f0" },
      { name: "Figma UI/UX", level: 86, color: "#a855f7" },
    ],
  },
];

export const TERMINAL_COMMANDS = {
  help: `Available commands:
• projects  - Browse flagship applications
• skills    - View technical capabilities
• exp       - Inspect leadership & experience
• certs     - List verified credentials
• contact   - Get in touch with Bankim
• github    - Direct link to 55+ open-source repos
• clear     - Clear terminal screen`,
  about: `Bankim Chandra Kamila
CTO & COO at The Outliers Studio | B.Tech AI & ML @ ITM Skills University
Passionate builder with 55+ open source repos and 10+ production apps.`,
  projects: `Flagship Projects:
1. Reactify   - Real-time anonymous voting engine (MERN + WebSockets)
2. PayIt      - Python-powered billing & invoice calculation system
3. Pixora     - AI image studio with K-Means palette extraction
4. WastCraft  - Circular eco-scrap trading marketplace
5. Brand      - Fluid typography & design system platform`,
  skills: `Core Languages & Frameworks:
React, TypeScript, JavaScript, Python, Node.js, Express, FastAPI,
MongoDB, PostgreSQL, WebSockets, Socket.io, Tailwind CSS, Vite, Figma, Postman`,
  certs: `Verified Certifications:
• Postman API Fundamentals Student Expert (2024)
• GenAI 101 with Pieces (2024)
• Google IT Support Professional (Coursera, 2023)
• Fundamentals of Digital Marketing (Google, 2022)`,
  exp: `Leadership:
• Chief Technology Officer @ The Outliers Studio (Jul 2026 — Present)
• Chief Operating Officer @ The Outliers Studio (Jul 2026 — Present)
• Back End Developer Intern @ DESI DESTINY (Jun — Sep 2025)
• Sales Intern @ Kwento (Jun — Sep 2025)`,
  contact: `Coordinates:
• Email: bankimkamila185@gmail.com
• WhatsApp: +91 9324634516
• LinkedIn: https://www.linkedin.com/in/bankim-chandra-kamila-b07b59236/
• GitHub: https://github.com/BankimKamila185`,
  github: `GitHub Profile: https://github.com/BankimKamila185 (55+ repositories)`,
};
