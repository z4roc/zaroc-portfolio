"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { gitHubBaseUrl } from "@/lib/links";
import { archIcon, csharpIcon, flutterIcon, nextjsIcon } from "@/lib/svgs";
import { features } from "process";

// Mock projects data
const projects: Project[] = [
  {
    id: 1,
    title: "ValStore",
    description:
      "A mobile application for accessing your VALORANT Shop from anywhere.",
    logo: "/logo/valstore.png",
    technologies: ["Flutter", "Firebase", "Rest API", "Provider"],
    githubUrl: `${gitHubBaseUrl}/valstore-mobile`,
    websiteUrl: "https://valostore.zaroc.de",
    featured: true,
  },
  {
    id: 2,
    title: "Kafka",
    description:
      "Host minecraft servers with a single click. A simple and easy to use web interface.",
    logo: nextjsIcon,
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Docker"],
    githubUrl: `${gitHubBaseUrl}/mcserver`,
    websiteUrl: null,
    featured: true,
  },
  {
    id: 3,
    title: "Statify",
    description:
      "A web application that provides Spotify statistics and insights.",
    logo: "/logo/statify_icon.png",
    technologies: ["TypeScript", "Next.js", "Spotify API", "Tailwind CSS"],
    githubUrl: `${gitHubBaseUrl}/statify`,
    websiteUrl: null,
    featured: false,
  },
  {
    id: 4,
    title: "Portfolio Website",
    description:
      "A personal portfolio website showcasing projects and skills with a modern, responsive design.",
    logo: nextjsIcon,
    technologies: ["Next.js", "Framer Motion", "Tailwind CSS"],
    githubUrl: `${gitHubBaseUrl}/zaroc-portfolio`,
    websiteUrl: "https://aktamirov.de",
    featured: true,
  },
  {
    id: 5,
    title: "Prüfungsvorbereitung",
    description:
      "Eine Website erstellt mit NextJS, um Anwendungsentwickler auf die Abschlussprüfung vorzubereiten.",
    logo: nextjsIcon,
    technologies: ["JavaScript", "React", "NextJS", "MDX"],
    githubUrl: "https://github.com/z4roc/pruefungsvorbereitung",
    websiteUrl: "https://pruefungsvorbereitung.aktamirov.de",
    featured: false,
  },
  {
    id: 6,
    title: "Ausbildungsberichte",
    description:
      "Eine App erstellt mit flutter, um meine Ausbildungsberichte am Handy und im Web schreiben zu können und sie anschließend als PDF zu exportieren.",
    logo: flutterIcon,
    technologies: ["Flutter", "Firebase"],
    githubUrl: "https://github.com/z4roc/berichtverwaltung_flutter",
    websiteUrl: "https://berichte.aktamirov.de",
    featured: false,
  },
  {
    id: 7,
    title: "MyPass",
    description:
      "Eine kleine WPF .NET Anwendung, um die eigenen Passwörter zu verwalten",
    logo: csharpIcon,
    technologies: ["C#", ".NET", "WPF"],
    githubUrl: "https://github.com/z4roc/MyPass",
    websiteUrl: null,
    featured: false,
  },
  {
    id: 8,
    title: "ChatApp",
    description:
      "Chat application with real-time messaging on the same network with .NET WPF",
    logo: csharpIcon,
    technologies: ["C#", ".NET", "WPF"],
    githubUrl: "https://github.com/z4roc/ChatApp",
    websiteUrl: null,
    featured: false,
  },
  {
    id: 9,
    title: "hyprdots",
    description:
      "My fork of the HyDE Project, simple and aesthetic Linux desktop setup with Hyprland and Waybar",
    logo: archIcon,
    technologies: ["Hyprland", "Linux", "Shell"],
    githubUrl: "https://github.com/z4roc/hyprdots",
    websiteUrl: null,
    featured: false,
  },
];

// Project card component
interface Project {
  id: number;
  title: string;
  description: string;
  logo: string;
  technologies: string[];
  githubUrl: string;
  websiteUrl: string | null;
  featured: boolean;
}

const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="flex flex-col h-full"
    >
      <div className="group relative flex flex-col h-full overflow-hidden rounded-lg border border-border bg-background/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-foreground/5">
        <div className="flex items-center gap-4 border-b border-border p-4 pl-6">
          <div className="relative h-12 w-12 overflow-hidden rounded-md bg-muted">
            <Image
              src={project.logo || "/vercel.svg"}
              alt={`${project.title} logo`}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold">{project.title}</h3>
            {project.featured && (
              <Badge variant="secondary" className="mt-1">
                Featured Project
              </Badge>
            )}
          </div>
        </div>

        <div className="flex-grow p-4">
          <p className="mb-4 text-muted-foreground">{project.description}</p>

          <div className="mb-6 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-border p-4">
          {project.githubUrl && (
            <Button variant="outline" size="sm" asChild>
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                Code
              </Link>
            </Button>
          )}

          {project.websiteUrl && (
            <Button size="sm" asChild>
              <Link
                href={project.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </Link>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default function ProjectsSection() {
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
    <section
      id="projects"
      className="w-full py-16 md:py-24 flex justify-center"
    >
      <div className="container px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            My Projects
          </h1>
          <p className="mt-4 text-muted-foreground md:text-xl">
            A collection of projects I&apos;ve worked on
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
