import { SkillCard } from "@/components/skill-card";
import {
  Code,
  Database,
  Layout,
  Palette,
  Server,
  Zap,
} from "lucide-react";

const skills = [
  {
    name: "React",
    icon: Code,
    description: "Building interactive UI components with React hooks and Server Components",
  },
  {
    name: "TypeScript",
    icon: Zap,
    description: "Type-safe development with strict mode for scalable applications",
  },
  {
    name: "Next.js",
    icon: Server,
    description: "Full-stack web development using App Router and Server Actions",
  },
  {
    name: "Tailwind CSS",
    icon: Palette,
    description: "Utility-first styling for responsive, accessible UI design",
  },
  {
    name: "Database Design",
    icon: Database,
    description: "Relational database structure and optimization with Supabase",
  },
  {
    name: "AI Integration",
    icon: Code,
    description: "Integrating AI tools and agentic workflows into web applications",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Sarah</h1>
          <p className="text-lg text-muted-foreground">
            Web Development Student | AI-Native Full-Stack Developer
          </p>
        </div>
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
          I'm passionate about building modern web applications using AI-assisted development workflows. Currently learning full-stack development with Next.js, TypeScript, and Supabase to create scalable, type-safe applications.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Skills</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map(({ name, icon: Icon, description }) => (
            <SkillCard
              key={name}
              name={name}
              icon={Icon}
              description={description}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
