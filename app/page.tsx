"use client"

import { useEffect, useMemo, useState } from "react"
import {
  Search,
  Calendar,
  Clock,
  Github,
  Linkedin,
  Instagram,
  Mail,
  GraduationCap,
  BookOpen,
  FileDown,
  FileText,
  ArrowRight,
  Phone,
  Globe,
  Moon,
  Sun,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Toaster, toast } from "sonner"

/** ---------------- DATA MODEL ---------------- */
type LectureRow = {
  lecture: number
  topic: string
  duration: number
  notesUrl?: string | null
  dppUrl?: string | null
}
type CourseType = "school" | "college"
type SchoolBatch = "english" | "computers"

/** Helpers */
function toLecturePlanFromTopics(
  topics: string[],
  defaultDuration = 1.5,
  presets?: Partial<LectureRow>[]
): LectureRow[] {
  return topics.map((topic, i) => ({
    lecture: i + 1,
    topic,
    duration: defaultDuration,
    notesUrl: presets?.[i]?.notesUrl ?? null,
    dppUrl: presets?.[i]?.dppUrl ?? null,
  }))
}

/** ------------- SCHOOL (1 year, two batches) ------------- */
const schoolEnglishTopics = [
  "Course Orientation & Baseline Speaking",
  "Introducing Yourself & Everyday Conversation",
  "Pronunciation Basics & Common Fixes",
  "Listening Skills & Shadowing",
  "Vocabulary Building: Daily Context",
  "Asking Questions & Clarifying",
  "Describing People/Places/Things",
  "Expressing Opinions Clearly",
  "Narrating Past Events (Simple Past)",
  "Talking about Plans (Future Forms)",
  "Parts of Speech Overview",
  "Tenses: Present (All Forms)",
  "Tenses: Past (All Forms)",
  "Tenses: Future (All Forms)",
  "Articles & Determiners",
  "Prepositions & Collocations",
  "Subject–Verb Agreement",
  "Modals (can/could/may/must/should)",
  "Active vs Passive Voice",
  "Direct & Indirect Speech",
  "Role Plays: School Scenarios",
  "Role Plays: Shopping/Travel",
  "Group Discussion: Do’s & Don’ts",
  "Storytelling Techniques",
  "Descriptive & Picture-based Speaking",
  "Debate Basics & Persuasion",
  "Interview Basics for School Events",
  "Public Speaking: Structure & Delivery",
  "Pronunciation: Stress & Intonation",
  "Accent Neutralization Practice",
  "Reading Comprehension Strategies",
  "Summarizing & Paraphrasing",
  "Note-taking for Listening/Speaking",
  "E-mail & Message Writing",
  "Letter/Application Writing",
  "Essay Writing: Structure & Flow",
  "Report & Notice Writing",
  "Vocabulary: Idioms & Phrasal Verbs",
  "Common Errors & Quick Fixes",
  "Mock Speaking Test I",
  "Individual Feedback & Plan",
  "Advanced Discussion Topics",
  "Presentation Skills: Slides + Speech",
  "Mock Speaking Test II",
  "Showcase Day: Presentations",
  "Final Review",
  "Certificates & Next Steps",
]
const schoolComputersTopics = [
  "What is a Computer? Devices & Use Cases",
  "Hardware vs Software; I/O Devices",
  "Operating Systems Basics (Win/Linux/Android)",
  "Files, Folders, Extensions & Safe Downloads",
  "Typing Speed & Essential Shortcuts",
  "Word Processors: Formatting & Layout",
  "Spreadsheets: Cells, Formulas, Charts",
  "Presentations: Slides, Images, Animations",
  "Email Basics: Etiquette & Attachments",
  "Cloud Storage (Drive/OneDrive): Organization",
  "Web Browsers & Effective Searching",
  "Digital Citizenship & Online Behavior",
  "Cyber Safety: Passwords, 2FA, Phishing",
  "Social Media Awareness & Privacy",
  "Responsible Content Creation",
  "Scratch: Animations & Logic",
  "Scratch: Simple Games & Conditionals",
  "HTML Basics: Structure & Tags",
  "HTML: Links, Images, Lists",
  "CSS Basics: Colors, Fonts, Box Model",
  "JavaScript Intro: Variables & Events",
  "JavaScript: Conditions & Loops",
  "Mini Web Project: Profile Page",
  "Windows Essentials: Settings & Updates",
  "Linux Primer (Ubuntu): GUI & Terminal",
  "Compression, PDFs & Utilities",
  "Basic Photo Editing (Projects)",
  "Simple Video Editing (School Projects)",
  "Networking: Wi-Fi, LAN, Internet",
  "IP Address (Simple View) & Why It Matters",
  "Careers in Tech: Roles & Skills",
  "AI Basics: Capabilities & Limits",
  "Responsible AI Use in Studies",
  "Python: Variables & Data Types",
  "Python: Input/Output & Operators",
  "Python: Conditions & Loops",
  "Python: Lists & Dictionaries",
  "Python Mini Project: Quiz App",
  "Group Project Planning",
  "Build: Static School Blog",
  "Build: Science Fair Poster",
  "Build: Scratch Game Final",
  "Project Testing & Feedback",
  "Showcase Day & Review",
  "Exam & Certificates",
  "Next Steps in Tech Learning",
]
const schoolEnglishPlan = toLecturePlanFromTopics(schoolEnglishTopics, 1.5, [])
const schoolComputersPlan = toLecturePlanFromTopics(schoolComputersTopics, 1.5, [])

/** ------------- COLLEGE (1 year) ------------- */
const collegeTopics = [
  "Orientation & CS Mindset",
  "Programming Basics: Variables, Types, IO",
  "Control Flow: Conditionals & Loops",
  "Functions, Recursion & Complexity Intro",
  "Data Structures Overview & Use-cases",
  "Arrays & Strings: Patterns & Problems",
  "Linked List: Implementation & Problems",
  "Stacks & Queues: Applications",
  "Hashing: Maps/Sets & Collisions",
  "Sorting: Merge/Quick/Heapsort",
  "Searching & Binary Search Patterns",
  "Trees: Traversals & Problems",
  "BST: Operations & Validation",
  "Heaps & Priority Queues",
  "Graphs: Representation, BFS/DFS",
  "Graph Problems: Shortest Paths",
  "MST & Union-Find",
  "Dynamic Programming: Basics",
  "DP: Knapsack, LCS Patterns",
  "Greedy: Activity, Huffman",
  "Bit Manipulation Essentials",
  "OS: Processes & Threads",
  "OS: Scheduling & Sync",
  "OS: Deadlocks & Memory",
  "OS: Virtual Memory & File Systems",
  "DBMS: ER Model & Relational Model",
  "Normalization & Keys",
  "SQL Basics: DDL/DML/DQL",
  "SQL Joins & Aggregations",
  "Indexing & Query Tuning",
  "Transactions & Isolation",
  "CN: Models & Layers",
  "IP/Subnets & Routing Basics",
  "TCP/UDP & Sockets",
  "HTTP/HTTPS & the Web",
  "DNS/CDN & Latency",
  "OOP: Principles & Patterns",
  "Interfaces, Abstraction & SOLID",
  "Error Handling & Clean Code",
  "System Design Thinking",
  "Caching, Load Balancing, Queues",
  "Data Partitioning & Consistency",
  "Modern Web: FE/BE Overview",
  "Capstone Planning: Feature Specs",
  "Capstone: Iteration 1",
  "Capstone: Iteration 2",
  "Testing, Monitoring & Docs",
  "Resume & Portfolio",
  "Interview Prep: DSA + CS",
  "Mock Interviews & Feedback",
  "AI Prompting: Principles",
  "Prompt Patterns for Devs",
  "ML Basics: Types & Workflow",
  "Data Prep & Model Intuition",
  "SQL Deep Dive: CTEs & Windows",
  "Final Review & Next Steps",
]
const collegePlan = toLecturePlanFromTopics(collegeTopics, 2.0, [])

/** ------------- Resource Button (Notes/DPP) ------------- */
function ResourceButton({
  label,
  url,
  icon: Icon,
  tone = "notes",
}: {
  label: "Notes" | "DPP"
  url?: string | null
  icon: any
  tone?: "notes" | "dpp"
}) {
  const base =
    "inline-flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-md border transition w-[96px] text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-400 dark:focus-visible:ring-slate-600"
  const color =
    tone === "notes"
      ? "border-blue-600 text-blue-700 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-300 dark:hover:bg-blue-950/30"
      : "border-emerald-600 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-400 dark:text-emerald-300 dark:hover:bg-emerald-950/30"

  const handleClick = (e: React.MouseEvent) => {
    if (!url) {
      e.preventDefault()
      toast.info("Uploaded soon")
    }
  }

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={`${base} ${color}`}
      >
        <Icon className="w-4 h-4" />
        {label}
      </a>
    )
  }
  return (
    <button onClick={handleClick} className={`${base} ${color}`} type="button" aria-label={`${label} (coming soon)`}>
      <Icon className="w-4 h-4" />
      {label}
    </button>
  )
}

/** ------------- Theme Toggle ------------- */
function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const active = theme ?? resolvedTheme
  const isDark = active === "dark"
  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      {isDark ? "Light" : "Dark"}
    </button>
  )
}

/** ---------------- MAIN PAGE ---------------- */
export default function TechrhymCoursePage() {
  const [courseType, setCourseType] = useState<CourseType>("school")
  const [schoolBatch, setSchoolBatch] = useState<SchoolBatch>("english")
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)
  const [visibleCount, setVisibleCount] = useState(20)

  useEffect(() => setIsLoaded(true), [])
  useEffect(() => setVisibleCount(20), [courseType, schoolBatch, searchTerm])

  const currentInfo = useMemo(() => {
    if (courseType === "school") {
      return {
        title: "School — 1 Year",
        description:
          "Two parallel batches: (A) English: Spoken + Grammar; (B) Computer Fundamentals aligned to classes 6–12 with modern tech awareness.",
        gradient: "from-green-600 to-blue-600",
        bgGradientLight: "from-green-50 via-blue-50 to-white",
        bgGradientDark: "from-slate-900 via-slate-950 to-black",
        icon: BookOpen,
        duration: "1.5 hrs per class",
      }
    }
    return {
      title: "College — 1 Year",
      description:
        "Full CS foundation: Programming, OS, DBMS, CN, OOP, Basic System Design, Resume, Web Project, AI Prompting, ML Basics, SQL.",
      gradient: "from-blue-600 to-purple-600",
      bgGradientLight: "from-blue-50 via-purple-50 to-white",
      bgGradientDark: "from-slate-900 via-slate-950 to-black",
      icon: GraduationCap,
      duration: "2 hrs per class",
    }
  }, [courseType])

  const CurrentIcon = currentInfo.icon

  const currentPlan: LectureRow[] = useMemo(() => {
    if (courseType === "school") {
      return schoolBatch === "english" ? schoolEnglishPlan : schoolComputersPlan
    }
    return collegePlan
  }, [courseType, schoolBatch])

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase()
    if (!q) return currentPlan
    return currentPlan.filter(
      (r) =>
        r.topic.toLowerCase().includes(q) ||
        String(r.lecture).includes(q) ||
        String(r.duration).includes(q)
    )
  }, [searchTerm, currentPlan])

  const shown = filtered.slice(0, visibleCount)
  const canLoadMore = filtered.length > visibleCount

  return (
    <div className={`min-h-screen bg-gradient-to-br dark:${currentInfo.bgGradientDark} ${currentInfo.bgGradientLight}`}>
      <Toaster richColors position="top-center" />

      {/* Header: now NON-sticky on mobile; sticky from md+ only */}
      <header className="relative md:sticky md:top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm dark:bg-slate-950/90 dark:border-slate-800">
        <div className="container mx-auto px-4 py-3">
          {/* Top meta bar with CTAs (compact for phone) */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-3">
              <a
                href="https://techrhym.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:opacity-80"
              >
                <Globe className="w-4 h-4" />
                techrhym.com
              </a>
              <a
                href="https://techrhym.com/blog/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80"
              >
                Blog
              </a>
            </div>
            <div className="flex items-center gap-3">
              <a href="https://wa.me/918078633912" className="inline-flex items-center gap-1 hover:opacity-80" aria-label="WhatsApp">
                <Phone className="w-4 h-4" />
                +91 8078633912
              </a>
              <a href="mailto:info@techrhym.com" className="hover:opacity-80" aria-label="Email">
                info@techrhym.com
              </a>
              <ThemeToggle />
            </div>
          </div>

          {/* Switchers & Pitch */}
          <div className="mt-3 text-center">
            {/* Course Switch */}
            <div className="flex justify-center">
              <div className="bg-slate-100 dark:bg-slate-900 p-1 rounded-lg flex gap-1">
                <Button
                  onClick={() => setCourseType("school")}
                  variant={courseType === "school" ? "default" : "ghost"}
                  className={`h-9 px-3 text-sm no-underline ${
                    courseType === "school"
                      ? "bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-sm"
                      : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                  }`}
                >
                  School
                </Button>
                <Button
                  onClick={() => setCourseType("college")}
                  variant={courseType === "college" ? "default" : "ghost"}
                  className={`h-9 px-3 text-sm no-underline ${
                    courseType === "college"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-sm"
                      : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                  }`}
                >
                  College
                </Button>
              </div>
            </div>

            {/* Batch Switch (School only) */}
            {courseType === "school" && (
              <div className="mt-3 flex justify-center">
                <div className="bg-slate-100 dark:bg-slate-900 p-1 rounded-lg flex gap-1">
                  <Button
                    onClick={() => setSchoolBatch("english")}
                    variant={schoolBatch === "english" ? "default" : "ghost"}
                    className={`h-8 px-3 text-xs md:text-sm ${
                      schoolBatch === "english"
                        ? "bg-white text-slate-900 shadow dark:bg-slate-800 dark:text-slate-100"
                        : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                    }`}
                  >
                    English (Spoken + Grammar)
                  </Button>
                  <Button
                    onClick={() => setSchoolBatch("computers")}
                    variant={schoolBatch === "computers" ? "default" : "ghost"}
                    className={`h-8 px-3 text-xs md:text-sm ${
                      schoolBatch === "computers"
                        ? "bg-white text-slate-900 shadow dark:bg-slate-800 dark:text-slate-100"
                        : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                    }`}
                  >
                    Computer Fundamentals (6–12)
                  </Button>
                </div>
              </div>
            )}

            {/* Brand line */}
            <div className="mt-5 max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-3">
                <CurrentIcon className="w-7 h-7 text-slate-900 dark:text-slate-100" />
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{currentInfo.title}</h1>
              </div>
              <p className="mt-2 text-slate-600 dark:text-slate-300 leading-relaxed">
                {currentInfo.description}
              </p>

              <div className="mt-3 flex flex-wrap justify-center gap-3 text-sm">
                <div className="inline-flex items-center gap-1 text-slate-700 dark:text-slate-300">
                  <Calendar className="w-4 h-4" />
                  Structured lecture-wise roadmap
                </div>
                <div className="inline-flex items-center gap-1 text-slate-700 dark:text-slate-300">
                  <Clock className="w-4 h-4" />
                  Duration: {currentInfo.duration}
                </div>
              </div>

              {/* Primary CTA */}
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <a
                  href="https://techrhym.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-white hover:opacity-90 dark:bg-slate-200 dark:text-slate-900"
                >
                  Explore Techrhym <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="https://techrhym.com/blog/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
                >
                  Read Blog
                </a>
                <a
                  href="https://wa.me/918078633912"
                  className="inline-flex items-center gap-2 rounded-lg border border-emerald-600 px-4 py-2 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-500 dark:text-emerald-300 dark:hover:bg-emerald-950/30"
                >
                  WhatsApp
                </a>
                <a
                  href="mailto:info@techrhym.com"
                  className="inline-flex items-center gap-2 rounded-lg border border-blue-600 px-4 py-2 text-blue-700 hover:bg-blue-50 dark:border-blue-500 dark:text-blue-300 dark:hover:bg-blue-950/30"
                >
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-4 py-8">
        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 w-4 h-4" />
            <Input
              aria-label="Search lectures"
              type="text"
              placeholder="Search by lecture number, topic, or duration…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-10 bg-white border-slate-300 focus:ring-2 transition dark:bg-slate-950 dark:border-slate-800 ${
                courseType === "school"
                  ? "focus:border-green-500 focus:ring-green-500/20"
                  : "focus:border-purple-500 focus:ring-purple-500/20"
              }`}
            />
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
          <div className={`transition duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
            <table className="w-full">
              <thead className={`bg-gradient-to-r ${currentInfo.gradient} text-white`}>
                <tr className="text-left">
                  <th className="px-6 py-3 font-semibold">Lecture</th>
                  <th className="px-6 py-3 font-semibold">Topic</th>
                  <th className="px-6 py-3 font-semibold">Duration (hrs)</th>
                  <th className="px-6 py-3 font-semibold">Notes</th>
                  <th className="px-6 py-3 font-semibold">DPP</th>
                </tr>
              </thead>
              <tbody>
                {shown.map((row, idx) => (
                  <tr
                    key={row.lecture}
                    className={`border-b border-slate-100 dark:border-slate-800 ${
                      idx % 2 === 0 ? "bg-white dark:bg-slate-950" : "bg-slate-50 dark:bg-slate-900"
                    } hover:bg-slate-50 dark:hover:bg-slate-900/70`}
                  >
                    <td className="px-6 py-3 font-semibold text-slate-800 dark:text-slate-100">Lecture {row.lecture}</td>
                    <td className="px-6 py-3 text-slate-800 dark:text-slate-100">{row.topic}</td>
                    <td className="px-6 py-3 text-slate-700 dark:text-slate-300">{row.duration}</td>
                    <td className="px-6 py-3">
                      <ResourceButton label="Notes" icon={FileText} url={row.notesUrl} tone="notes" />
                    </td>
                    <td className="px-6 py-3">
                      <ResourceButton label="DPP" icon={FileDown} url={row.dppUrl} tone="dpp" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {shown.length === 0 && (
              <div className="text-center py-12 text-slate-600 dark:text-slate-400">No lectures found.</div>
            )}
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3">
          {shown.map((row) => (
            <Card key={row.lecture} className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">Lecture {row.lecture}</div>
                  <div className="inline-flex items-center gap-1 text-sm text-slate-600 dark:text-slate-300">
                    <Clock className="w-4 h-4" />
                    {row.duration} h
                  </div>
                </div>
                <div className="mt-2 text-slate-800 dark:text-slate-100">{row.topic}</div>
                <div className="mt-3 flex items-center gap-2">
                  <ResourceButton label="Notes" icon={FileText} url={row.notesUrl} tone="notes" />
                  <ResourceButton label="DPP" icon={FileDown} url={row.dppUrl} tone="dpp" />
                </div>
              </CardContent>
            </Card>
          ))}
          {shown.length === 0 && (
            <div className="text-center py-12 text-slate-600 dark:text-slate-400">No lectures found.</div>
          )}
        </div>

        {/* Load more */}
        {canLoadMore && (
          <div className="mt-6 flex justify-center">
            <Button
              onClick={() => setVisibleCount((c) => c + 20)}
              className="bg-slate-900 hover:opacity-90 text-white dark:bg-slate-200 dark:text-slate-900"
            >
              Load more
            </Button>
          </div>
        )}

        {/* Value CTA */}
        <div className="mt-10 rounded-xl border bg-white p-6 shadow-sm dark:bg-slate-950 dark:border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h4 className="text-lg md:text-xl font-semibold">Why learners choose Techrhym</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Transparent syllabus, live problem-solving, doubt-first approach, and resource links you can revisit anytime.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href="https://techrhym.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-white hover:opacity-90 dark:bg-slate-200 dark:text-slate-900"
              >
                Join Now <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://techrhym.com/blog/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
              >
                Read Blog
              </a>
              <a
                href="https://wa.me/918078633912"
                className="inline-flex items-center gap-2 rounded-lg border border-emerald-600 px-4 py-2 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-500 dark:text-emerald-300 dark:hover:bg-emerald-950/30"
              >
                WhatsApp
              </a>
              <a
                href="mailto:info@techrhym.com"
                className="inline-flex items-center gap-2 rounded-lg border border-blue-600 px-4 py-2 text-blue-700 hover:bg-blue-50 dark:border-blue-500 dark:text-blue-300 dark:hover:bg-blue-950/30"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h5 className="font-semibold">Techrhym</h5>
              <p className="mt-2 text-slate-300 text-sm">
                Practical, outcome-focused sessions for school and college learners.
              </p>
            </div>
            <div>
              <h5 className="font-semibold">Explore</h5>
              <ul className="mt-2 space-y-1 text-slate-300 text-sm">
                <li>
                  <a href="https://techrhym.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-90 inline-flex items-center gap-2">
                    <Globe className="w-4 h-4" /> Website
                  </a>
                </li>
                <li>
                  <a href="https://techrhym.com/blog/" target="_blank" rel="noopener noreferrer" className="hover:opacity-90">
                    Blog
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <a href="https://linkedin.com" className="hover:opacity-90"> <Linkedin className="w-4 h-4" /> </a>
                  <a href="https://github.com" className="hover:opacity-90"> <Github className="w-4 h-4" /> </a>
                  <a href="https://instagram.com" className="hover:opacity-90"> <Instagram className="w-4 h-4" /> </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold">Contact</h5>
              <ul className="mt-2 space-y-1 text-slate-300 text-sm">
                <li><a href="https://wa.me/918078633912" className="hover:opacity-90">WhatsApp: +91 8078633912</a></li>
                <li><a href="mailto:info@techrhym.com" className="hover:opacity-90">info@techrhym.com</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-6 text-center text-slate-400 text-xs">
            © {new Date().getFullYear()} Techrhym. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
