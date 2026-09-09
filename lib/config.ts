export const siteConfig = {
  title: "Radja Ravine Salfriandry - Web Developer",
  role: "Fresh Graduate Web Developer",
  tagline:
    "Frontend-focused web developer who enjoys building responsive, clean, and scalable web applications with React and Next.js, while continuing to grow into full-stack development.",
  supportText:
    "Built several web projects with React and Next.js, and gained hands-on industry experience through an internship at Pupuk Kujang.",
  email: "ravinesalf@gmail.com",
  location: "Karawang, Indonesia",
  github: "https://github.com/yoravo",
  linkedin: "https://www.linkedin.com/in/radja-ravine-salfriandry/",
  instagram: "https://www.instagram.com/ravine.exe/",
  cv: "/Resume%20-%20Radja%20Ravine%20Salfriandry.pdf",
  avatar: "/avatar.png",
  formspree: "https://formspree.io/f/mlgarepq",
};

export const navLinks = [
  { href: "/#hero", label: "Home", sectionId: "hero" },
  { href: "/#about", label: "About", sectionId: "about" },
  { href: "/#journey", label: "Journey", sectionId: "journey" },
  { href: "/#skills", label: "Skills", sectionId: "skills" },
  { href: "/projects", label: "Projects", sectionId: "projects" },
  { href: "/#contact", label: "Contact", sectionId: "contact" },
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
  footerStatus: "All systems operational.",
  hero: {
    greeting: "Hi, I'm",
    availability: "Available for work",
    projects: "View Projects",
    contact: "Contact Me",
    avatarAlt: "Portrait of Radja Ravine Salfriandry",
    badges: ["Next.js + React", "Laravel", "Web Developer"],
  },
  about: {
    path: "~/about",
    title: "About Me",
    terminal: "about.exe",
    paragraphs: [
      "Hi! I'm Radja Ravine Salfriandry, a fresh graduate web developer based in Karawang, Indonesia. I enjoy building modern, responsive, and user-friendly web applications, with a current focus on React and Next.js.",
      "I have experience working with both frontend and backend technologies, including Laravel and PHP. I'm especially interested in creating interfaces that are clean, functional, and easy to use.",
      "I'm always looking for opportunities to learn, improve my skills, and gain more real-world experience through meaningful projects and collaboration.",
    ],
    languages: "Languages: Indonesian (Native), English (Intermediate)",
    download: "Download CV",
    stats: [
      { value: "2+", label: "Years Learning" },
      { value: "10+", label: "Projects Built" },
      { value: "5+", label: "Tech Mastered" },
      { value: "∞", label: "Passion Level" },
    ],
  },
  journey: {
    path: "~/journey",
    title: "Journey",
    description: "My path so far — education, work, and projects.",
  },
  skills: {
    path: "~/skills",
    title: "Skills",
    description: "Technologies and tools I work with daily.",
  },
  projects: {
    path: "~/projects",
    title: "Projects",
    description: "Things I've built so far.",
    metadataTitle: `Projects — ${siteConfig.title.split(" - ")[0]}`,
    metadataDescription: `A collection of projects built by ${siteConfig.title.split(" - ")[0]}.`,
    back: "Back to Projects",
    preview: "Preview of",
    noPreview: "No preview available",
    openLive: "Open live site",
    stack: "Tech Stack",
    github: "GitHub",
    demo: "Live Demo",
  },
  contact: {
    path: "~/contact",
    title: "Contact",
    description: "Interested in working together? Let's connect.",
    introduction: "I'm currently open to freelance projects, internships, and full-time opportunities. Feel free to reach out.",
    name: "Your name",
    email: "Your email",
    message: "Your message",
    required: "All fields are required.",
    messageHint: "At least 10 characters. Tell me a little about your project.",
    send: "Send Message",
    sending: "Sending...",
    success: "Message sent! I'll get back to you soon.",
    errors: {
      name: "Please enter your name.",
      email: "Please enter a valid email address.",
      message: "Please enter a message of at least 10 characters.",
      request: "Message could not be sent. Your draft is safe — please try again or email me.",
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
