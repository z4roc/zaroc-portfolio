"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Code,
  Database,
  Server,
  Globe,
  Cpu,
  Terminal,
  Layers,
  GitBranch,
  Workflow,
  Paintbrush,
  BarChart,
  LucideIcon,
} from "lucide-react";

// Technology data structure with icons and colors
const technologies = [
  {
    category: "Frontend",
    items: [
      {
        name: "HTML5",
        description: "Semantic markup and accessibility",
        icon: Code,
        color: "from-orange-500/20 to-orange-600/20 text-orange-500",
      },
      {
        name: "CSS3",
        description: "Advanced styling with animations and flexbox/grid",
        icon: Paintbrush,
        color: "from-blue-500/20 to-blue-600/20 text-blue-500",
      },
      {
        name: "JavaScript",
        description: "ES6+, async/await, and DOM manipulation",
        icon: Terminal,
        color: "from-yellow-500/20 to-yellow-600/20 text-yellow-500",
      },
      {
        name: "React",
        description: "Component-based UI with hooks and context",
        icon: Layers,
        color: "from-cyan-500/20 to-cyan-600/20 text-cyan-500",
      },
      {
        name: "Next.js",
        description: "React framework with SSR and routing",
        icon: Globe,
        color: "from-slate-500/20 to-slate-600/20 text-slate-400",
      },
      {
        name: "Tailwind CSS",
        description: "Utility-first CSS framework",
        icon: Paintbrush,
        color: "from-sky-500/20 to-sky-600/20 text-sky-500",
      },
    ],
  },
  {
    category: "Backend",
    items: [
      {
        name: "Node.js",
        description: "JavaScript runtime for server-side development",
        icon: Server,
        color: "from-green-500/20 to-green-600/20 text-green-500",
      },
      {
        name: "Express",
        description: "Web framework for Node.js",
        icon: Workflow,
        color: "from-gray-500/20 to-gray-600/20 text-gray-400",
      },
      {
        name: "PostgreSQL",
        description: "Relational database management system",
        icon: Database,
        color: "from-indigo-500/20 to-indigo-600/20 text-indigo-500",
      },
      {
        name: "MongoDB",
        description: "NoSQL document database",
        icon: Database,
        color: "from-emerald-500/20 to-emerald-600/20 text-emerald-500",
      },
      {
        name: "REST API",
        description: "RESTful architecture for web services",
        icon: Globe,
        color: "from-purple-500/20 to-purple-600/20 text-purple-500",
      },
      {
        name: "GraphQL",
        description: "Query language for APIs",
        icon: BarChart,
        color: "from-pink-500/20 to-pink-600/20 text-pink-500",
      },
    ],
  },
  {
    category: "DevOps & Tools",
    items: [
      {
        name: "Git",
        description: "Version control system",
        icon: GitBranch,
        color: "from-red-500/20 to-red-600/20 text-red-500",
      },
      {
        name: "Docker",
        description: "Containerization platform",
        icon: Cpu,
        color: "from-blue-500/20 to-blue-600/20 text-blue-500",
      },
      {
        name: "CI/CD",
        description: "Continuous integration and deployment",
        icon: Workflow,
        color: "from-amber-500/20 to-amber-600/20 text-amber-500",
      },
    ],
  },
  {
    category: "Languages",
    items: [
      {
        name: "TypeScript",
        description: "Typed superset of JavaScript",
        icon: Code,
        color: "from-blue-500/20 to-blue-600/20 text-blue-500",
      },
      {
        name: "Python",
        description: "General-purpose programming language",
        icon: Terminal,
        color: "from-yellow-500/20 to-yellow-600/20 text-yellow-500",
      },
      {
        name: "SQL",
        description: "Language for database management",
        icon: Database,
        color: "from-violet-500/20 to-violet-600/20 text-violet-500",
      },
    ],
  },
];

// Technology card component
interface TechnologyCardProps {
  tech: {
    name: string;
    icon: LucideIcon;
    color: string;
    description: string;
  };
  index: number;
  categoryIndex: number;
}

const TechnologyCard = ({
  tech,
  index,
  categoryIndex,
}: TechnologyCardProps) => {
  const Icon = tech.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 + categoryIndex * 0.1 }}
      className="w-full"
    >
      <div
        className={`tech-card bg-gradient-to-br ${tech.color} backdrop-blur-sm border border-white/10 rounded-xl p-6 h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
      >
        <div className="flex items-start space-x-4">
          <div className={`p-2 rounded-full bg-background/10 backdrop-blur-md`}>
            <Icon className={`w-5 h-5`} />
          </div>
          <div className="space-y-2">
            <h3 className="font-medium text-lg">{tech.name}</h3>
            <p className="text-sm text-muted-foreground">{tech.description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface CategorySectionProps {
  category: string;
  items: {
    name: string;
    description: string;
    icon: LucideIcon;
    color: string;
  }[];
  index: number;
}

const CategorySection = ({ category, items, index }: CategorySectionProps) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="mb-16"
    >
      <h2 className="text-2xl font-bold mb-6">{category}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((tech, techIndex) => (
          <TechnologyCard
            key={tech.name}
            tech={tech}
            index={techIndex}
            categoryIndex={index}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default function TechnologiesSection() {
  return (
    <section className="w-full py-16 flex justify-center md:py-24 bg-gradient-to-bl from-primary to-secondary">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Technologies & Skills
          </h1>
          <p className="mt-4 text-muted-foreground md:text-xl">
            The tools and technologies I use to bring products to life
          </p>
        </motion.div>

        <div className="space-y-16">
          {technologies.map((category, index) => (
            <CategorySection
              key={category.category}
              category={category.category}
              items={category.items}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
