import React from "react";
import Layout from "../components/Layout";
import GitHubStarButton from "@/components/GitHubStarsButton";
import Link from "next/link";
import PersonCard, { Contributor } from "@/components/PersonCard";

const gridColsFor = (count: number) => {
  if (count >= 4) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
  if (count === 3) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
  if (count === 2) return "grid-cols-1 sm:grid-cols-2";
  return "grid-cols-1";
};

const founders: Contributor[] = [
  {
    name: "Yuval Michaeli",
    role: "Founder",
    avatarUrl: "https://avatars.githubusercontent.com/u/30408029?v=4",
    github: "https://github.com/yuvalmich",
    linkedin: "https://www.linkedin.com/in/yuval-michaeli/",
    quote: "Backend developer with extensive experience in building scalable systems.",
  },
  {
    name: "Idan Lodzki",
    role: "Founder",
    avatarUrl: "https://avatars.githubusercontent.com/u/37178156?v=4",
    github: "https://github.com/idanlodzki",
    linkedin: "https://www.linkedin.com/in/idan-lodzki-755939157",
    quote: "DevOps expert focused on infrastructure automation and reliability.",
  },
  {
    name: "Tamir Goldberg",
    role: "Founder",
    avatarUrl: "https://avatars.githubusercontent.com/u/6613551?v=4",
    github: "https://github.com/tamirg",
    linkedin: "https://www.linkedin.com/in/tamir-goldberg-625106119/",
    quote: "Frontend engineer passionate about distributed systems and monitoring.",
  },
  {
    name: "Sahar Levy",
    role: "Founder",
    avatarUrl: "https://avatars.githubusercontent.com/u/43012075?v=4",
    github: "https://github.com/Sahar541998",
    linkedin: "https://www.linkedin.com/in/saharlevy/",
    quote: "Backend developer specializing in high-performance systems.",
  },
];

const communityLeaders: Contributor[] = [
  {
    name: "Karan Negi",
    role: "Community Leader",
    avatarUrl: "https://avatars.githubusercontent.com/u/142792314?v=4",
    github: "https://github.com/KaranNegi20Feb",
    linkedin: "https://www.linkedin.com/in/karan-negi-20feb/",
    quote: "DevOps specialist who built all workflows and deployment infrastructure.",
  },
  {
    name: "Yash Rathod",
    role: "Community Leader",
    avatarUrl: "https://avatars.githubusercontent.com/u/178126084?v=4",
    github: "https://github.com/yjrathod",
    quote: "Developer and public relations champion for the community.",
  },
  {
    name: "Anthony Finney",
    role: "Community Leader",
    avatarUrl: "https://avatars.githubusercontent.com/u/67946673?v=4",
    github: "https://github.com/AnthonyFinney",
    linkedin: "https://www.linkedin.com/in/soshie-finney-557361233/",
    quote: "Developer focused on testing and quality assurance.",
  },
  {
    name: "Manishhh",
    role: "Community Leader",
    avatarUrl: "https://avatars.githubusercontent.com/u/80617841?v=4",
    github: "https://github.com/Manishhhsys",
    linkedin: "https://www.linkedin.com/in/manishhhsys/",
    quote: "Developer helping build and maintain the brand website.",
  },
  {
    name: "Oleksii",
    role: "Community Leader",
    avatarUrl: "https://avatars.githubusercontent.com/u/184424508?v=4",
    github: "https://github.com/Oleksii101",
    linkedin: "https://www.linkedin.com/in/oleksii-haiduk-101119395/",
    quote: "Backend developer strengthening the core infrastructure.",
  },
  {
    name: "Raphael Teixeira",
    role: "Community Leader",
    avatarUrl: "https://avatars.githubusercontent.com/u/34927505?v=4",
    github: "https://github.com/raphaeltx",
    linkedin: "https://www.linkedin.com/in/raphael-teixeira-2a1012188/",
    quote: "Senior developer bringing deep technical expertise.",
  },
  {
    name: "Varun Mantri",
    role: "Community Leader",
    avatarUrl: "https://avatars.githubusercontent.com/u/39723815?v=4",
    github: "https://github.com/varunrmantri23",
    linkedin: "https://www.linkedin.com/in/varun-mantri/",
    quote: "Frontend developer crafting exceptional user experiences.",
  },
  {
    name: "Michael Uzukwu",
    role: "Community Leader",
    avatarUrl: "https://avatars.githubusercontent.com/u/172800711?v=4",
    github: "https://github.com/Mike-4-prog",
    linkedin: "https://www.linkedin.com/in/michael-uzukwu/",
    quote: "Technical writer crafting clear documentation for the community.",
  },
];

const AboutPage: React.FC = () => {
  return (
    <Layout title="About OpsiMate" description="Meet the OpsiMate community and contributors behind the project.">
      <section className="bg-surface-50 dark:bg-surface-950 border-b border-surface-200 dark:border-surface-800">
        <div className="container-max section-padding">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold text-surface-900 dark:text-white mb-4">
              About OpsiMate
            </h1>
            <p className="text-lg text-surface-700 dark:text-surface-300">
              Born from a vision to revolutionize infrastructure monitoring, OpsiMate was founded by a core team of four visionaries who saw a world drowning in fragmented tools. Instead of adding yet another monitoring solution to the chaos, we built one unified platform to control and monitor everything. Our mission is simple but bold: replace the complexity of multiple tools with a single, powerful, intelligent system that brings clarity to the modern infrastructure landscape.
            </p>
            <div className="mt-8 max-w-4xl mx-auto relative">
              <div
                className="pointer-events-none absolute inset-0 -top-10 -z-10 flex justify-center"
                aria-hidden="true"
              >
                <svg width="720" height="220" viewBox="0 0 720 220" fill="none" className="opacity-40 dark:opacity-25 blur-2xl">
                  <defs>
                    <radialGradient id="rg1" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#60a5fa" />
                      <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="rg2" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#a78bfa" />
                      <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <circle cx="220" cy="110" r="140" fill="url(#rg1)" />
                  <circle cx="500" cy="110" r="140" fill="url(#rg2)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contributors by group */}
      <section className="bg-surface-50 dark:bg-surface-950 border-y border-surface-200 dark:border-surface-800">
        <div className="container-max section-padding">
          <div className="mb-8 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-surface-900 dark:text-white">The People of OpsiMate</h2>
            <p className="text-surface-700 dark:text-surface-300 mt-2">Faces, names, and voices from our community.</p>
          </div>

          {/* Founders */}
          <div className="mb-10">
            <h3 className="text-xl md:text-2xl font-semibold text-surface-900 dark:text-white mb-4 text-center">Founders 👋</h3>
            <div className={`grid gap-6 ${gridColsFor(founders.length)} justify-items-center`}>
              {founders.map((c, idx) => (
                <PersonCard key={`founder-${c.name}-${idx}`} contributor={c} />
              ))}
            </div>
          </div>

          {/* Community Leaders */}
          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-surface-900 dark:text-white mb-4 text-center">Community Leaders 🌟</h3>
            <p className="text-surface-700 dark:text-surface-300 text-center mb-6 max-w-2xl mx-auto">
              Our community leaders are the driving force behind OpsiMate's success. They dedicate their time, expertise, and passion to help build, improve, and grow the platform, making OpsiMate better for everyone.
            </p>
            <div className={`grid gap-6 ${gridColsFor(communityLeaders.length)} justify-items-center`}>
              {communityLeaders.map((c, idx) => (
                <PersonCard key={`communityLeaders-${c.name}-${idx}`} contributor={c}  />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-50 dark:bg-surface-950 border-t border-surface-200 dark:border-surface-800">
        <div className="container-max section-padding">
          <div className="rounded-2xl p-8 md:p-12 bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-surface-900 dark:text-white">Join the OpsiMate community 🚀</h2>
            <p className="mt-3 text-surface-700 dark:text-surface-300">
              Whether you're exploring, adopting, or contributing—you're welcome here.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="https://join.slack.com/t/opsimate/shared_invite/zt-39bq3x6et-NrVCZzH7xuBGIXmOjJM7gA"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-lg bg-primary-600 text-white hover:bg-primary-700"
              >
                Join Slack
              </Link>
              <Link
                href="https://github.com/OpsiMate/OpsiMate"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-lg border border-surface-300 dark:border-surface-700 text-surface-900 dark:text-white hover:bg-surface-50 dark:hover:bg-surface-800"
              >
                Star on GitHub
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
