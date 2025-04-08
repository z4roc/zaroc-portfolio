"use client";

import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { useTheme } from "next-themes";
import { gitHubBaseUrl } from "@/lib/links";

export default function HeroSection() {
  const [currentSnippetIndex, setCurrentSnippetIndex] = useState(0);
  const [animationDirection, setAnimationDirection] = useState("down");
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  const codeSnippets = [
    {
      language: "javascript",
      displayName: "JavaScript",
      code: `function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  
  return app;
}`,
    },
    {
      language: "jsx",
      displayName: "React",
      code: `function UserProfile({ user }) {
  return (
    <div className="profile">
      <h2>{user.name}</h2>
      <p>{user.bio}</p>
      <Button>View Projects</Button>
    </div>
  );
}`,
    },
    {
      language: "javascript",
      displayName: "Node.js",
      code: `async function fetchData() {
  try {
    const response = await db.query(
      'SELECT * FROM projects WHERE user_id = $1',
      [userId]
    );
    return response.rows;
  } catch (err) {
    console.error('Database error:', err);
    throw new Error('Failed to fetch projects');
  }
}`,
    },
    {
      language: "css",
      displayName: "CSS",
      code: `.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}`,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      // Start exit animation
      setAnimationDirection("down");

      // After animation completes, change the snippet and set up for entrance animation
      setTimeout(() => {
        setCurrentSnippetIndex(
          (prevIndex) => (prevIndex + 1) % codeSnippets.length
        );
        setAnimationDirection("up");
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const currentSnippet = codeSnippets[currentSnippetIndex];
  const prismTheme = theme === "dark" ? themes.nightOwl : themes.github;

  return (
    <section className="w-full flex items-center justify-center py-12 md:py-24 lg:py-32 xl:py-48 h-screen">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Arthur &apos;ZAROC&apos; Aktamirov
              </h1>
              <p className="text-xl text-muted-foreground">
                Full Stack Developer
              </p>
            </div>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              I build exceptional and accessible digital experiences for the
              web. Focused on creating intuitive, user-friendly applications
              that solve real-world problems.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild>
                <Link href="#projects">
                  View My Work <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <a href="mailto:arthur@aktamirov.de">Get In Touch</a>
              </Button>
            </div>
            <div className="flex items-center gap-4 pt-4">
              <Link
                href={gitHubBaseUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="icon">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </Link>
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
              <Link href="mailto:arthur@aktamirov.de">
                <Button variant="ghost" size="icon">
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div
              ref={containerRef}
              className="code-editor-container w-full h-[250px] md:h-[325px] lg:h-[400px] rounded-lg overflow-hidden 
                border border-border shadow-lg backdrop-blur-md 
                bg-background/70 dark:bg-background/40 
                transition-all duration-500 ease-in-out"
            >
              <div
                className="code-editor-header flex items-center justify-between px-4 py-2 
                bg-muted/80 dark:bg-muted/30 border-b border-border"
              >
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-sm text-foreground/70">
                  {currentSnippet.displayName}
                </div>
                <div className="w-4"></div>
              </div>
              <div className="code-editor-content-wrapper h-[calc(100%-40px)] overflow-hidden">
                <div
                  className={`code-editor-content p-4 h-full overflow-auto animate-${animationDirection}`}
                >
                  <Highlight
                    theme={prismTheme}
                    code={currentSnippet.code}
                    language={currentSnippet.language}
                  >
                    {({ style, tokens, getTokenProps }) => (
                      <pre
                        className="text-sm md:text-base font-mono bg-transparent"
                        style={{ ...style, background: "transparent" }}
                      >
                        {tokens.map((line, i) => {
                          return (
                            <div key={i} style={{ background: "transparent" }}>
                              {line.map((token, key) => {
                                const { key: tokenKey, ...restTokenProps } =
                                  getTokenProps({ token, key });
                                return <span key={key} {...restTokenProps} />;
                              })}
                            </div>
                          );
                        })}
                      </pre>
                    )}
                  </Highlight>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
