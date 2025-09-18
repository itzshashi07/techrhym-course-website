import { Plus_Jakarta_Sans } from "next/font/google"
import { JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "next-themes"
import "./globals.css"

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})
const jetmono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata = {
  title: "Techrhym — Lecture-wise Course Planner",
  description:
    "Techrhym: transparent, lecture-wise training with Notes & DPP for School (English & Computer Fundamentals) and a 1-year College CS track.",
  metadataBase: new URL("https://techrhym.com"),
  openGraph: {
    title: "Techrhym — Lecture-wise Course Planner",
    description:
      "See what Techrhym is, how sessions run, and the full lecture-wise roadmap with resources.",
    url: "https://techrhym.com",
    siteName: "Techrhym",
    images: [{ url: "https://techrhym.com/wp-content/uploads/2025/03/logo-1.jpg", width: 1200, height: 630, alt: "Techrhym Courses" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Techrhym — Lecture-wise Course Planner",
    description: "Outcome-focused sessions with Notes & DPP.",
    images: ["https://techrhym.com/wp-content/uploads/2025/03/logo-1.jpg"],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${jakarta.variable} ${jetmono.variable}`}>
      <body className="min-h-screen bg-white text-slate-900 antialiased transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
