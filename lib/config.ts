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
  cv: "resume-radja-ravine-salfriandry.pdf",
  avatar: "/avatar.png",
  formspree: "https://formspree.io/f/mlgarepq",
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  github: string;
  demo?: string;
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
    subtitle: "4 Months at Pupuk Kujang",
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
    title: "Meal App — cmlabs Test",
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
