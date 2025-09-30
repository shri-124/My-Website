"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Download,
  ExternalLink,
  GraduationCap,
  BadgeCheck,
  Briefcase,
  Cpu,
  Rocket,
  Wrench
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// ---------- Helper Data ----------
const skills = {
  Languages: ["C", "C++", "Python", "Golang", "JavaScript", "TypeScript", "SQL"],
  Frameworks: ["Node.js", "Express", "React", "Angular (basics)", "Flask"],
  DevOps: ["Docker", "Kubernetes", "GitHub Actions", "Prometheus/Grafana", "AWS (IAM, S3)", "Kafka"],
  Databases: ["PostgreSQL", "MongoDB", "Neon", "Redis (basics)"]
};

const projects = [
  {
    title: "Kafka → S3 Export Service (Go)",
    summary:
      "Microservice exporting millions of MongoDB records through Kafka to durable CSVs in S3 with multipart uploads and end-to-end retries.",
    highlights: [
      "100% export reliability across large batches",
      "Multipart uploads, backoff/retry, metrics",
      "Containerized dev env; CI/CD ready"
    ],
    links: []
  },
  {
    title: "Bank IVR (TypeScript + Express)",
    summary:
      "Interactive voice response app using FreeClimb API: dial options, call routing, call recording; focused on low-latency flows.",
    highlights: ["Real-time callbacks", "REST webhooks", "40%+ faster handling (internal est.)"],
    links: []
  },
  {
    title: "Calculator Project",
    summary: "A polished web calculator with clean UI and precise arithmetic behaviors.",
    highlights: ["Responsive UI", "Keyboard support", "Deployed on GitHub Pages"],
    links: [ { href: "https://shri-124.github.io/Calculator-Project/", label: "Live demo" } ]
  },
  {
    title: "Library Management App",
    summary: "CRUD web app to catalog books, authors, and loans; hosted on Render.",
    highlights: ["Full-stack", "RESTful endpoints", "Deployed on Render"],
    links: [ { href: "https://library-management-app-4gnc.onrender.com/", label: "Live app" } ]
  },
  {
    title: "Ping & Latency Dashboard",
    summary: "Prometheus + Grafana + Alertmanager stack for network probes.",
    highlights: ["Alerting rules", "Dashboards", "SLI/SLO templates"],
    links: [ { href: "https://shri-124.github.io/ping-latency-dashboard/", label: "Live demo" } ]
  },
  {
    title: "Docker Chaos Lite",
    summary: "Lightweight chaos experiments for Dockerized services (latency, restarts, resource pressure).",
    highlights: ["Safe toggles", "Scriptable scenarios", "Docs included"],
    links: [ { href: "https://shri-124.github.io/docker-chaos-lite/", label: "Project site" } ]
  },
  {
    title: "S3 Backup Automation",
    summary: "Automated backups to S3 with versioning, encryption, and integrity checks.",
    highlights: ["CLI workflow", "Lifecycle policies", "Config profiles"],
    links: [ { href: "https://shri-124.github.io/S3_Backup_Automation/", label: "Project site" } ]
  },
  {
    title: "Backup Folder Script",
    summary: "Python utility to back up folders to S3 with category-based organization.",
    highlights: ["Versioned backups", "Simple installer", "Cross-platform"],
    links: [ { href: "https://shri-124.github.io/backup-folder-script/", label: "Project site" } ]
  },
  {
    title: "System Info Dashboard",
    summary: "Flask app + agents reporting CPU/mem/disk and metadata; deployed to Render.",
    highlights: ["Dockerized", "Role-based config", "Live metrics view"],
    links: [ { href: "https://system-info-dashboard.onrender.com/", label: "Live app" } ]
  },
  {
    title: "CropWise (NASA Space Apps)",
    summary:
      "Climate-driven ML for crop health insights; AWS-hosted demo, >90% validation accuracy in pilot.",
    highlights: ["Geospatial features", "Model serving", "Team project"],
    links: []
  }
];

const experience = [
  {
    role: "Software Engineering Intern",
    org: "Vail Systems",
    time: "Summer 2023 & Summer 2024",
    bullets: [
      "Built Golang microservice exporting records → Kafka → S3; observability + retries for reliability.",
      "Improved docs & onboarding; standardized requirements and API change logs.",
      "Collaborated cross-functionally with SREs and PMs on data pipelines and IVR features."
    ]
  },
  {
    role: "C++ Teaching Assistant",
    org: "University of Illinois Chicago (UIC)",
    time: "2024–2025",
    bullets: [
      "Led labs on pointers, memory mgmt, and debugging (gdb/valgrind).",
      "Reviewed assignments; created rubrics and example solutions."
    ]
  },
  {
    role: "IT Endpoint Management Engineer",
    org: "UIC",
    time: "2023–2024",
    bullets: [
      "Automated device provisioning and updates; reduced manual steps via scripts.",
      "Improved asset tracking and deployment reliability."
    ]
  }
];

const education = [
  {
    school: "University of Illinois Chicago (UIC)",
    credential: "B.S. in Computer Engineering",
    time: "Graduated May 2025",
    extra: "Coursework: Systems, OS, Networks, Databases, Security"
  },
  {
    school: "Georgia Tech (OMSCS)",
    credential: "M.S. in Computer Science (in progress)",
    time: "Fall 2025 cohort",
    extra: "Health informatics & security focus"
  }
];

// ---------- Components ----------
const Section = ({ id, title, icon, children }: any) => (
  <section id={id} className="py-16 sm:py-20" aria-label={title}>
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex items-center gap-3 mb-8">
        {icon}
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</h2>
      </div>
      {children}
    </div>
  </section>
);

const NavLink = ({ href, children }: any) => (
  <a href={href} className="text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors">
    {children}
  </a>
);

export default function Portfolio() {
  // Email form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Email form handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5" />
            <span className="font-semibold">Shri Patel</span>
          </div>
          <nav className="hidden sm:flex items-center gap-5">
            <NavLink href="#about">About</NavLink>
            <NavLink href="#skills">Skills</NavLink>
            <NavLink href="#projects">Projects</NavLink>
            <NavLink href="#experience">Experience</NavLink>
            <NavLink href="#education">Education</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="secondary" className="hidden sm:inline-flex">
              <a href="#resume"><Download className="w-4 h-4 mr-2" /> Resume</a>
            </Button>
            <Button asChild variant="default" className="inline-flex">
              <a href="#contact"><Mail className="w-4 h-4 mr-2" /> Contact</a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-20 bg-[radial-gradient(ellipse_at_center,theme(colors.primary/40),transparent_60%)]" />
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto px-4 py-20 sm:py-28 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium">
            <BadgeCheck className="w-4 h-4" /> Open to SWE / SRE / Cloud / DevOps roles
          </div>
          <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold leading-tight">
            Building reliable systems, data pipelines, and delightful tools.
          </h1>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            I'm Shri, a Computer Engineering graduate from UIC ('25) and a Computer Science Master's student at Georgia Tech.
            I like turning ideas into resilient services—think microservices, real-time apps, Kubernetes-powered apps, and analytical dashboards.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Button asChild>
              <a href="#projects"><Rocket className="w-4 h-4 mr-2" /> See Projects</a>
            </Button>
            <Button asChild variant="secondary">
              <a href="#contact"><Mail className="w-4 h-4 mr-2" /> Get in touch</a>
            </Button>
            <Button asChild variant="outline">
              <a href="https://github.com/shri-124" target="_blank" rel="noreferrer"><Github className="w-4 h-4 mr-2" /> GitHub</a>
            </Button>
            <Button asChild variant="outline">
              <a href="https://www.linkedin.com/in/shri-patel-/" target="_blank" rel="noreferrer"><Linkedin className="w-4 h-4 mr-2" /> LinkedIn</a>
            </Button>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground justify-center">
            <MapPin className="w-4 h-4" /> Chicago, IL
          </div>
          <div className="mt-8 flex flex-wrap gap-2 justify-center">
            {["Python", "C++", "TypeScript", "Go", "Docker", "Kubernetes", "Kafka", "AWS", "Node"].map((tech) => (
              <Badge key={tech} variant="secondary">{tech}</Badge>
            ))}
          </div>
        </motion.section>
      </div>

      {/* About */}
      <Section id="about" title="About" icon={<Wrench className="w-6 h-6" />}>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Who I am</CardTitle>
              <CardDescription>
                Engineer who enjoys reliability, performance, and clean Developer Experience.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
              <p>
                I've shipped production microservices in Go, designed IVR flows with real-time webhooks,
                and built dashboards for visibility. I like measurable wins: faster pipelines, lower latency,
                clearer docs, and smoother onboarding.
              </p>
              <p>
                Outside of code: mountain biking, travel, new food spots, and side projects in
                quant/automation.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Quick facts</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {[
                "Go • TS/JS • C/C++ • Python",
                "MongoDB • Postgres • Kafka",
                "Docker • K8s • GH Actions",
                "AWS (IAM, S3)",
                "Prometheus • Grafana",
                "Linux, gdb/valgrind"
              ].map((t) => (
                <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
              ))}
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Skills */}
      <Section id="skills" title="Skills" icon={<BadgeCheck className="w-6 h-6" />}>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(skills).map(([group, items]) => (
            <Card key={group}>
              <CardHeader>
                <CardTitle className="text-base">{group}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {items.map((s) => (
                  <Badge key={s} variant="outline">{s}</Badge>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects" title="Projects" icon={<Rocket className="w-6 h-6" />}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <Card key={p.title} className="flex flex-col">
              <CardHeader>
                <CardTitle>{p.title}</CardTitle>
                <CardDescription>{p.summary}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  {p.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex gap-3">
                {p.links.map((l) => (
                  <Button asChild key={l.label} variant="outline" size="sm">
                    <a href={l.href} target="_blank" rel="noreferrer">
                      <ExternalLink className="w-4 h-4 mr-1" /> {l.label}
                    </a>
                  </Button>
                ))}
              </CardFooter>
            </Card>
          ))}
        </div>
      </Section>

      {/* Experience */}
      <Section id="experience" title="Experience" icon={<Briefcase className="w-6 h-6" />}>
        <div className="space-y-4">
          {experience.map((e) => (
            <Card key={e.role}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{e.role} · {e.org}</span>
                  <span className="text-sm font-normal text-muted-foreground">{e.time}</span>
                </CardTitle>
                <CardDescription>Impact highlights</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  {e.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Education */}
      <Section id="education" title="Education" icon={<GraduationCap className="w-6 h-6" />}>
        <div className="grid md:grid-cols-2 gap-4">
          {education.map((ed) => (
            <Card key={ed.school}>
              <CardHeader>
                <CardTitle>{ed.school}</CardTitle>
                <CardDescription>{ed.credential}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span>{ed.extra}</span>
                  <span>{ed.time}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Resume */}
      <Section id="resume" title="Resume" icon={<Download className="w-6 h-6" />}>
        <Card>
          <CardHeader>
            <CardTitle>Grab a copy</CardTitle>
            <CardDescription>Attach your latest PDF to the link below.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild>
              <a href="/Shri_Patel_Resume.pdf" download>
                <Download className="w-4 h-4 mr-2" /> Download Resume (PDF)
              </a>
            </Button>
          </CardFooter>
        </Card>
      </Section>

      {/* Contact */}
      <Section id="contact" title="Contact" icon={<Mail className="w-6 h-6" />}>
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <Card>
            <CardHeader>
              <CardTitle>Send a note</CardTitle>
              <CardDescription>Drop a message—I'll get back soon.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-3">
                <Input 
                  placeholder="Your name" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <Input 
                  placeholder="Your email" 
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <Textarea 
                  placeholder="Message" 
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
                {submitStatus === 'success' && (
                  <p className="text-sm text-green-600">Message sent successfully!</p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-sm text-red-600">Failed to send. Please try again.</p>
                )}
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send'}
                </Button>
              </CardFooter>
            </form>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Links</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              <Button asChild variant="outline" className="justify-start">
                <a href="https://github.com/shri-124" target="_blank" rel="noreferrer"><Github className="w-4 h-4 mr-2" /> github.com/shri-124</a>
              </Button>
              <Button asChild variant="outline" className="justify-start">
                <a href="https://www.linkedin.com/in/shri-patel-/" target="_blank" rel="noreferrer"><Linkedin className="w-4 h-4 mr-2" /> linkedin.com/in/shri-patel-/</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-10 border-t">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Shri Patel. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#about" className="hover:text-foreground">About</a>
            <a href="#projects" className="hover:text-foreground">Projects</a>
            <a href="#contact" className="hover:text-foreground">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}