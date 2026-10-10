// Canonical origin for metadata, sitemap and robots. Set NEXT_PUBLIC_SITE_URL once a
// custom domain exists; on Vercel the production URL is provided automatically.
const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (productionHost ? `https://${productionHost}` : "http://localhost:3000");

export const siteConfig = {
  name: "Radja Ravine Salfriandry",
  title: "Radja Ravine Salfriandry - Web Developer",
  role: "Fresh Graduate Web Developer",
  tagline:
    "Frontend-focused web developer who enjoys building responsive, clean, and scalable web applications with React and Next.js, while continuing to grow into full-stack development.",
  supportText:
    "Built several web projects with React and Next.js, and gained hands-on industry experience through an internship at Pupuk Kujang.",
  email: "ravinesalf@gmail.com",
  location: "Karawang, Indonesia",
  github: "https://github.com/yoravo",
  githubUsername: "yoravo",
  linkedin: "https://www.linkedin.com/in/radja-ravine-salfriandry/",
  instagram: "https://www.instagram.com/ravine.exe/",
  cv: "/Resume%20-%20Radja%20Ravine%20Salfriandry.pdf",
  avatar: "/avatar.png",
  formspree: "https://formspree.io/f/mlgarepq",
};

export const navLinks = [
  { href: "/#hero", label: "Home", sectionId: "hero", chapter: "00" },
  { href: "/#about", label: "About", sectionId: "about", chapter: "01" },
  { href: "/#projects", label: "Projects", sectionId: "projects", chapter: "02" },
  { href: "/#journey", label: "Journey", sectionId: "journey", chapter: "03" },
  { href: "/#skills", label: "Skills", sectionId: "skills", chapter: "04" },
  { href: "/#github", label: "GitHub", sectionId: "github", chapter: "05" },
  { href: "/#contact", label: "Contact", sectionId: "contact", chapter: "06" },
];

export const socialLinks = [
  { href: siteConfig.github, label: "GitHub" },
  { href: siteConfig.linkedin, label: "LinkedIn" },
  { href: siteConfig.instagram, label: "Instagram" },
  { href: `mailto:${siteConfig.email}`, label: "Email" },
];

export const uiCopy = {
  skipLink: "Skip to content",
  navigation: "Main navigation",
  footerNavigation: "Footer navigation",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  lightMode: "Switch to light mode",
  darkMode: "Switch to dark mode",
  footerStatus: "Built with Next.js and a lot of ink.",
  hero: {
    chapter: "CHAPTER 00",
    volume: "VOL. 01 / 2026",
    status: "OPEN FOR ENGINEERING ROLES",
    title: "RADJA RAVINE",
    subtitle: "WEB DEVELOPER",
    location: "KARAWANG, ID",
    speech:
      "I build web apps with React, Next.js and TypeScript, and I'm growing into full-stack with Laravel.",
    projects: "See projects",
    contact: "Contact",
    resume: "Resume (PDF)",
    avatarAlt: "Portrait of Radja Ravine Salfriandry",
    viewModes: {
      avatar: "Portrait",
      matrix3d: "3D",
    },
    panel3d: "FIG. 1: INK ICOSAHEDRON",
    panelPhoto: "FIG. 1: THE AUTHOR",
    hint3d: "Drag to spin it. Let go and it keeps turning.",
    hintPhoto: "Radja Ravine Salfriandry, Karawang.",
    label3d: "Interactive 3D icosahedron drawn in ink. Drag to rotate.",
  },
  about: {
    chapter: "CHAPTER 01",
    path: "ACT.01 // IDENTITY",
    title: "ABOUT",
    lead: "Developer based in Karawang, Indonesia. Fresh graduate with shipped production work.",
    paragraphs: [
      "I build web applications with React, Next.js and TypeScript. I care about clean interfaces, code that is easy to change, and layouts that hold up on every screen.",
      "On the backend I work with Laravel and PHP, PostgreSQL and MySQL, and REST APIs. During my internship at Pupuk Kujang I built a student data management site and a car showroom site with Laravel 11, and moved Excel data into a web system.",
      "My latest project is NotaKu, a SaaS invoice generator for Indonesian UMKM. It is live, with PDF export, WhatsApp sharing, Better Auth and Midtrans subscriptions.",
    ],
    languages: "Indonesian (Native), English (Intermediate)",
    download: "Download resume",
    narrative: "IN SHORT",
    dossier: "DOSSIER",
    copyDossier: "Copy",
    copyDossierLabel: "Copy the about text to the clipboard",
    copied: "Copied",
    specs: [
      { label: "Degree", value: "Bachelor of Computer Science" },
      { label: "University", value: "Singaperbangsa Karawang University" },
      { label: "Graduated", value: "July 2025" },
      { label: "Internship", value: "IT Staff Intern, Pupuk Kujang (3 months)" },
      { label: "Latest project", value: "NotaKu, live at notaku.store" },
      { label: "Daily stack", value: "Next.js, React, TypeScript, Laravel, Tailwind CSS" },
    ],
  },
  journey: {
    chapter: "CHAPTER 03",
    path: "ACT.03 // CHRONICLE",
    title: "JOURNEY",
    description: "Milestones across university, industry internship, and shipped projects.",
    filterAll: "All",
    filterAria: "Filter journey events by category",
  },
  github: {
    chapter: "CHAPTER 05",
    path: "ACT.05 // ACTIVITY",
    title: "COMMITS",
    description: "Public contributions across GitHub repositories over the past year.",
    total: "contributions in the last year",
    profile: "GitHub profile",
    stats: {
      week: "This week",
      streak: "Current streak",
      longest: "Longest streak",
      active: "Active days",
    },
    days: (count: number) => `${count} day${count === 1 ? "" : "s"}`,
    less: "Less",
    more: "More",
    contribution: "contribution",
    contributions: "contributions",
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    mascot: {
      label: "Kaneki Ken coding on a laptop, turning from human to ghoul and back",
      streak: (days: number) => `${days}-day streak... 1000 - 7 = 993. Keep going.`,
      week: (count: number) =>
        `${count} contribution${count === 1 ? "" : "s"} this week. The ghoul hungers for more commits.`,
      idle: "Quiet week... what's 1000 minus 7? Push something.",
      ghoul: "The mask comes on when the build turns red.",
    },
  },
  skills: {
    chapter: "CHAPTER 04",
    path: "ACT.04 // ARSENAL",
    title: "SKILLS",
    description: "What I reach for, grouped by where it sits in the stack.",
    searchPlaceholder: "Search skills (React, Next.js, Laravel, TypeScript)...",
    searchLabel: "Filter skills by keyword",
    noMatch: "No skills matched your search filter.",
  },
  projects: {
    chapter: "CHAPTER 02",
    path: "ACT.02 // WORKS",
    title: "PROJECTS",
    description: "One product in production, plus the smaller apps that got me there.",
    // The root layout template appends " | <name>".
    metadataTitle: "Projects",
    metadataDescription: `Web applications built by ${siteConfig.name}: a SaaS invoice generator, technical assessments and small tools.`,
    back: "Back to projects",
    preview: "Preview of",
    noPreview: "No preview available",
    openLive: "Open live site",
    stack: "Tech stack",
    github: "Source code",
    demo: "Live demo",
    allProjects: "All projects",
    liveLabel: "Live",
    featured: "LATEST WORK",
    details: "Details",
    caseStudy: "Read more",
  },
  contact: {
    chapter: "CHAPTER 06",
    path: "ACT.06 // SIGNAL",
    title: "CONTACT",
    description: "Available for engineering roles, freelance builds, and contract work.",
    introduction:
      "I'm open to full-time roles, internships and freelance projects. Email me directly or leave a message here.",
    copyEmail: "Copy email address",
    copied: "Email copied to clipboard!",
    name: "Your name",
    email: "Your email",
    message: "Your message",
    required: "All fields are required.",
    messageHint: "At least 10 characters. Tell me what you're building.",
    send: "Send message",
    sending: "Sending...",
    success: "Message sent. I will get back to you soon.",
    errors: {
      name: "Please enter your name.",
      email: "Please enter a valid email address.",
      message: "Please enter a message of at least 10 characters.",
      request: "Message could not be sent. Your draft is safe, so please try again or email me.",
    },
  },
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  github: string;
  demo?: string;
  image?: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "Meal-App",
    title: "Meal App",
    description:
      "A meal planning app built with React and API From themealdb to help users organize their meals and cooking tutorials for their favorite recipes.",
    tags: ["React", "API", "Tailwind CSS"],
    github: "https://github.com/yoravo/meal-app",
    demo: "https://cmlabs-frontend-fulltime-test-nu.vercel.app",
    featured: true,
  },
  {
    slug: "AI-Sales-Generator",
    title: "AI Sales Generator",
    description:
      "An AI-powered sales lead generation tool built with Laravel and PHP, designed to help businesses identify and engage potential customers.",
    tags: ["Laravel", "PHP", "AI Integration", "Tailwind CSS"],
    github: "https://github.com/Yoravo/ai-sales-generator",
    demo: "https://ai-sales-generator-main-jdl0gr.free.laravel.cloud/",
    featured: true,
  },
  {
    slug: "Score-Keeper",
    title: "Score Keeper",
    description:
      "A simple score keeping app built with React, Tailwind CSS, and TypeScript, designed to help users easily track scores for various games and activities.",
    tags: ["React", "Tailwind CSS", "TypeScript", "Zustand"],
    github: "https://github.com/Yoravo/Score-Keeper",
    demo: "https://score-keeper-alpha.vercel.app",
    featured: true,
  },
  {
    slug: "notaku",
    title: "NotaKu - Invoice Generator untuk UMKM",
    description:
      "A SaaS invoice generator built for Indonesian UMKM. Create and send professional invoices in 30 seconds, with PDF export, WhatsApp share link, customer management, and Midtrans subscription for Pro tier (unlimited invoices, no watermark, custom branding).",
    tags: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Better Auth",
      "Midtrans",
      "Resend",
      "Tailwind CSS",
    ],
    github: "https://github.com/yoravo/notaku",
    demo: "https://notaku.store/",
    image: "/images/projects/notaku-thumb.jpg",
    featured: true,
  },
  // Add more projects here
];

export type SkillGroup = {
  category: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Bootstrap",
      "Framer Motion",
    ],
  },
  {
    category: "Backend",
    skills: ["PHP", "Laravel", "MySQL", "PostgreSQL"],
  },
  {
    category: "Tools",
    skills: ["Git", "GitHub", "VS Code", "Figma", "Vercel"],
  },
  {
    category: "Other",
    skills: ["REST API", "SEO", "Responsive Design", "Web Performance"],
  },
];

// ═══════════════════════════════
//  TIMELINE / JOURNEY DATA
// ═══════════════════════════════

export type TimelineEvent = {
  id: number;
  date: string;
  title: string;
  subtitle: string;
  description: string;
  type: "education" | "work" | "project" | "milestone";
};

export const timeline: TimelineEvent[] = [
  {
    id: 1,
    date: "Sep 2021",
    title: "Started University",
    subtitle: "Singaperbangsa Karawang University",
    description:
      "Enrolled in Bachelor of Computer Science. Coursework in Web Development, Object-Oriented Programming, and Database Management.",
    type: "education",
  },
  {
    id: 2,
    date: "Aug 2024",
    title: "IT Staff Intern",
    subtitle: "Pupuk Kujang",
    description:
      "Developed student data management & car showroom websites with Laravel 11. Collaborated with UI/UX designers on movie ticket booking system. Performed Excel-to-web data migration.",
    type: "work",
  },
  {
    id: 3,
    date: "Nov 2024",
    title: "Internship Completed",
    subtitle: "3 Months at Pupuk Kujang",
    description:
      "Completed internship gaining hands-on experience in full-stack development, team collaboration, and real-world data management systems.",
    type: "milestone",
  },
  {
    id: 4,
    date: "Jul 2025",
    title: "Graduated",
    subtitle: "B.Cs Computer Science",
    description:
      "Graduated from Singaperbangsa Karawang University with a Bachelor's degree in Computer Science.",
    type: "education",
  },
  {
    id: 5,
    date: "Mar 2026",
    title: "Region Filter Web App",
    subtitle: "Technical Assessment",
    description:
      "Dynamic region filtering interface supporting province, regency, and district hierarchy using TypeScript and React with real-time state management.",
    type: "project",
  },
  {
    id: 6,
    date: "Apr 2026",
    title: "Meal App - cmlabs Test",
    subtitle: "Technical Assessment",
    description:
      "Multi-page meal browser using React & TypeScript. Consumed TheMealDB API with client-side search, dynamic routing, and embedded YouTube tutorials.",
    type: "project",
  },
  {
    id: 7,
    date: "Apr 2026",
    title: "Portfolio Website",
    subtitle: "Personal Project",
    description:
      "Responsive portfolio with Next.js, TypeScript, Tailwind CSS, and Framer Motion. Deployed on Vercel with SEO optimization.",
    type: "project",
  },
];
