"use client";
import { useTheme } from "next-themes";
import { ModeToggle } from "./ThemeSwitch";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Github, Linkedin, Mail } from "lucide-react";
import { gitHubBaseUrl } from "@/lib/links";

export function Nav({ className }: { className?: string }) {
  const { theme } = useTheme();
  console.log("theme", theme);
  return (
    <nav
      className={`absolute w-full flex h-16 items-center justify-between border-b-2 border-accent backdrop-blur-lg shadow-lg ${className}`}
    >
      <Link href="/" className="flex items-center ml-4">
        <Image
          src={
            theme == "light"
              ? "/logo/logo_black_full.png"
              : "/logo/logo_white_full.png"
          }
          alt="logo_full"
          width={200}
          height={200}
        />
      </Link>
      <ul className="flex justify-center items-center space-x-4 mr-4 gap-2">
        <li>
          <Link href={gitHubBaseUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Button>
          </Link>
        </li>
        <li>
          <Link
            href="https://www.linkedin.com/in/arthur-aktamirov"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="ghost" size="icon">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Button>
          </Link>
        </li>
        <li>
          <Link href="mailto:arthur@aktamirov.de">
            <Button variant="ghost" size="icon">
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Button>
          </Link>
        </li>
        <li>
          <ModeToggle />
        </li>
      </ul>
    </nav>
  );
}
