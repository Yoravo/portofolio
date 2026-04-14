export const siteConfig = {
  title: "Radja Ravine Salfriandry - Web Developer",
  role: "Web Developer",
  tagline:
    "Frontend-focused developer building fast and scalable web apps, growing into full-stack.",
  supportText:
    "Built multiple projects using React and Next.js, with hands-on experience from an internship at Pupuk Kujang.",
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
  image: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "Meal-App",
    title: "Meal App",
    description:
      "A meal planning app built with React and API From themealdb to help users organize their meals and grocery shopping.",
    tags: ["React", "API", "Tailwind CSS"],
    github: "https://github.com/yoravo/meal-app",
    demo: "https://cmlabs-frontend-fulltime-test-nu.vercel.app",
    image: "/projects/personal-website.png",
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
      "React",
      "Next.js",
      "Tailwind CSS",
      "TypeScript",
      "JavaScript",
      "Framer Motion",
    ],
  },
  {
    category: "Backend",
    skills: ["Laravel", "PHP", "MySQL", "PostgreSQL"],
  },
  {
    category: "Tools",
    skills: ["Git", "Github", "VS Code", "Figma", "Vercel"],
  },
  {
    category: "Other",
    skills: [
      "REST API",
      "SEO",
      "Responsive Design",
      "Web Performance Optimization",
    ],
  },
];
