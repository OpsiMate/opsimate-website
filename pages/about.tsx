import React from "react";
import Layout from "../components/Layout";
import GitHubStarButton from "@/components/GitHubStarsButton";
import Link from "next/link";

type Contributor = {
  name: string;
  role: string;
  country?: string;
  avatarUrl?: string;
  github?: string;
  linkedin?: string;
  quote?: string;
};

type PersonCardProps = {
  contributor: Contributor;
  keyPrefix: string;
};
const PersonCard: React.FC<PersonCardProps> = ({ contributor: c, keyPrefix }) => (
  <div className="rounded-2xl p-6 bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 flex flex-col w-full max-w-[360px]">
    <div className="flex items-center gap-4">
      <div className="h-14 w-14 rounded-full overflow-hidden border border-surface-200 dark:border-surface-700 bg-surface-100 dark:bg-surface-800 flex items-center justify-center">
        {c.avatarUrl ? (
          <img src={c.avatarUrl} alt={`${c.name} avatar`} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <span className="text-xl" aria-hidden="true">👤</span>
        )}
      </div>
      <div>
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-surface-900 dark:text-white">{c.name}</h3>
          {c.country && <span className="text-lg" aria-label="country">{c.country}</span>}
        </div>
        <p className="text-sm text-surface-600 dark:text-surface-400">{c.role}</p>
      </div>
    </div>

    {c.quote && (
      <blockquote className="mt-4 text-surface-700 dark:text-surface-300 italic">"{c.quote}"</blockquote>
    )}

    {(c.github || c.linkedin) && (
      <div className="mt-4 flex items-center gap-4">
        {c.github && (
          <Link href={c.github} target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline">
            GitHub
          </Link>
        )}
        {c.linkedin && (
          <Link href={c.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline">
            LinkedIn
          </Link>
        )}
      </div>
    )}
  </div>
);

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
    country: "🏳️",
    avatarUrl: "https://avatars.githubusercontent.com/u/30408029?v=4",
    github: "https://github.com/yuvalmich",
    quote: "Shaping the vision for OpsiMate.",
  },
  {
    name: "Idan Lodzki",
    role: "Founder",
    country: "🏳️",
    avatarUrl: "https://avatars.githubusercontent.com/u/37178156?v=4",
    github: "https://github.com/idanlodzki",
    quote: "Shaping the vision for OpsiMate.",
  },
  {
    name: "Tamir Goldberg",
    role: "Founder",
    country: "🏳️",
    avatarUrl: "https://avatars.githubusercontent.com/u/6613551?v=4",
    github: "https://github.com/tamirg",
    quote: "Shaping the vision for OpsiMate.",
  },
  {
    name: "Sahar Levy",
    role: "Founder",
    country: "🏳️",
    avatarUrl: "https://avatars.githubusercontent.com/u/43012075?v=4",
    github: "https://github.com/Sahar541998",
    quote: "Shaping the vision for OpsiMate.",
  },
];

const communityLeaders: Contributor[] = [
  {
    name: "Anthony Finney",
    role: "Community Lead",
    country: "🏳️",
    avatarUrl: "https://avatars.githubusercontent.com/u/67946673?v=4",
    github: "https://github.com/AnthonyFinney",
    quote: "Helping the community grow and thrive.",
  },
];

const contributors: Contributor[] = [
  {
    name: "Yash Rathod",
    role: "Contributor",
    country: "🏳️",
    avatarUrl: "https://avatars.githubusercontent.com/u/178126084?v=4",
    github: "https://github.com/yjrathod",
    quote: "Automation frees minds for creative work.",
  },
  {
    name: "Karan Negi",
    role: "Contributor",
    country: "🏳️",
    avatarUrl: "https://avatars.githubusercontent.com/u/142792314?v=4",
    github: "https://github.com/KaranNegi20Feb",
    quote: "Automation frees minds for creative work.",
  },
  {
    name: "AsHim Shrestha",
    role: "Contributor",
    country: "🏳️",
    avatarUrl: "https://avatars.githubusercontent.com/u/130267320?v=4",
    github: "https://github.com/shresthashim",
    quote: "Automation frees minds for creative work.",
  },
  {
    name: "Manishhh",
    role: "Contributor",
    country: "🏳️",
    avatarUrl: "https://avatars.githubusercontent.com/u/80617841?v=4",
    github: "https://github.com/Manishhhsys",
    quote: "Automation frees minds for creative work.",
  },
  {
    name: "HarK",
    role: "Contributor",
    country: "🏳️",
    avatarUrl: "https://avatars.githubusercontent.com/u/171217644?v=4",
    github: "https://github.com/HarK-github",
    quote: "Automation frees minds for creative work.",
  },
  {
    name: "Oleksii",
    role: "Contributor",
    country: "🏳️",
    avatarUrl: "https://avatars.githubusercontent.com/u/184424508?v=4",
    github: "https://github.com/Oleksii101",
    quote: "Automation frees minds for creative work.",
  },
  {
    name: "Shreeharsh Shinde",
    role: "Contributor",
    country: "🏳️",
    avatarUrl: "https://avatars.githubusercontent.com/u/132091100?v=4",
    github: "https://github.com/shreeharshshinde",
    quote: "Automation frees minds for creative work.",
  },
  {
    name: "Vansh nagar",
    role: "Contributor",
    country: "🏳️",
    avatarUrl: "https://avatars.githubusercontent.com/u/189650812?v=4",
    github: "https://github.com/vansh-nagar",
    quote: "Automation frees minds for creative work.",
  },
  {
    name: "Varun Mantri",
    role: "Contributor",
    country: "🏳️",
    avatarUrl: "https://avatars.githubusercontent.com/u/39723815?v=4",
    github: "https://github.com/varunrmantri23",
    quote: "Automation frees minds for creative work.",
  },
  {
    name: "Raphael Teixeira",
    role: "Contributor",
    country: "🏳️",
    avatarUrl: "https://avatars.githubusercontent.com/u/34927505?v=4",
    github: "https://github.com/raphaeltx",
    quote: "Automation frees minds for creative work.",
  },
  {
    name: "Bhavya Patel",
    role: "Contributor",
    country: "🏳️",
    avatarUrl: "https://avatars.githubusercontent.com/u/100468926?v=4",
    github: "https://github.com/BhavyaMPatel",
    quote: "Automation frees minds for creative work.",
  },
  {
    name: "Rex divakar",
    role: "Contributor",
    country: "🏳️",
    avatarUrl: "https://avatars.githubusercontent.com/u/15235122?v=4",
    github: "https://github.com/rexdivakar",
    quote: "Automation frees minds for creative work.",
  },
  {
    name: "SK Akram",
    role: "Contributor",
    country: "🏳️",
    avatarUrl: "https://avatars.githubusercontent.com/u/179671552?v=4",
    github: "https://github.com/akramcodez",
    quote: "Automation frees minds for creative work.",
  },
  {
    name: "Nizan Naor",
    role: "Contributor",
    country: "🏳️",
    avatarUrl: "https://avatars.githubusercontent.com/u/90415256?v=4",
    github: "https://github.com/NizCom",
    quote: "Automation frees minds for creative work.",
  },
  {
    name: "Mariam Saeed",
    role: "Contributor",
    country: "🏳️",
    avatarUrl: "https://avatars.githubusercontent.com/u/69825646?v=4",
    github: "https://github.com/Mariam-Saeed",
    quote: "Automation frees minds for creative work.",
  },
  {
    name: "hparihar-07",
    role: "Contributor",
    country: "🏳️",
    avatarUrl: "https://avatars.githubusercontent.com/u/73985710?v=4",
    github: "https://github.com/hparihar-07",
    quote: "Automation frees minds for creative work.",
  },
  {
    name: "sccalabr",
    role: "Contributor",
    country: "🏳️",
    avatarUrl: "https://avatars.githubusercontent.com/u/4111230?v=4",
    github: "https://github.com/sccalabr",
    quote: "Automation frees minds for creative work.",
  },
  {
    name: "KANISHKA",
    role: "Contributor",
    country: "🏳️",
    avatarUrl: "https://avatars.githubusercontent.com/u/214576158?v=4",
    github: "https://github.com/kanishka1804",
    quote: "Automation frees minds for creative work.",
  },
  {
    name: "JettX",
    role: "Contributor",
    country: "🏳️",
    avatarUrl: "https://avatars.githubusercontent.com/u/150858423?v=4",
    github: "https://github.com/JetGera",
    quote: "Automation frees minds for creative work.",
  },
  {
    name: "Harsh Santwani",
    role: "Contributor",
    country: "🏳️",
    avatarUrl: "https://avatars.githubusercontent.com/u/96873014?v=4",
    github: "https://github.com/HydrallHarsh",
    quote: "Automation frees minds for creative work.",
  },
  {
    name: "Gilad Iosef",
    role: "Contributor",
    country: "🏳️",
    avatarUrl: "https://avatars.githubusercontent.com/u/101499028?v=4",
    github: "https://github.com/Gidiy",
    quote: "Automation frees minds for creative work.",
  },
  {
    name: "Elshad Humbatli",
    role: "Contributor",
    country: "🏳️",
    avatarUrl: "https://avatars.githubusercontent.com/u/216122679?v=4",
    github: "https://github.com/ElshadHu",
    quote: "Automation frees minds for creative work.",
  },
  {
    name: "Denis Oliveira",
    role: "Contributor",
    country: "🏳️",
    avatarUrl: "https://avatars.githubusercontent.com/u/8192274?v=4",
    github: "https://github.com/denisolvr",
    quote: "Automation frees minds for creative work.",
  },
  {
    name: "Arghya Das",
    role: "Contributor",
    country: "🏳️",
    avatarUrl: "https://avatars.githubusercontent.com/u/95538110?v=4",
    github: "https://github.com/alfaarghya",
    quote: "Automation frees minds for creative work.",
  },
  {
    name: "Aman Gupta",
    role: "Contributor",
    country: "🏳️",
    avatarUrl: "https://avatars.githubusercontent.com/u/100619913?v=4",
    github: "https://github.com/Nexvyn",
    quote: "Automation frees minds for creative work.",
  },
  {
    name: "Aman Agrawal",
    role: "Contributor",
    country: "🏳️",
    avatarUrl: "https://avatars.githubusercontent.com/u/119893462?v=4",
    github: "https://github.com/Aman-agraw-35",
    quote: "Automation frees minds for creative work.",
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
              OpsiMate is a growing community of engineers and builders creating a unified, human-friendly way to monitor, manage, and optimize infrastructure. We believe great tooling feels welcoming, transparent, and collaborative built in the open, by real people from around the world.
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
              <img
                src="/images/opsimate-dashboard.png"
                alt="OpsiMate dashboard placeholder"
                className="w-full h-auto rounded-2xl border border-surface-200 dark:border-surface-800 shadow"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container-max section-padding">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl p-6 bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800">
              <h3 className="font-semibold text-surface-900 dark:text-white mb-2">Open & Welcoming</h3>
              <p className="text-surface-700 dark:text-surface-300">New to the project? You’re in the right place. Friendly discussions, thoughtful reviews, and beginner-friendly issues help everyone contribute at their own pace. ✨</p>
            </div>
            <div className="rounded-2xl p-6 bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800">
              <h3 className="font-semibold text-surface-900 dark:text-white mb-2">Built Together</h3>
              <p className="text-surface-700 dark:text-surface-300">From docs and design to code and community, OpsiMate grows through collaboration. We value clarity, curiosity, and kindness. 🤝</p>
            </div>
            <div className="rounded-2xl p-6 bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800">
              <h3 className="font-semibold text-surface-900 dark:text-white mb-2">Made in the Open</h3>
              <p className="text-surface-700 dark:text-surface-300">Everything happens in public: roadmaps, issues, and ideas. Transparency builds trust and invites meaningful contributions. 🔍</p>
            </div>
            <div className="rounded-2xl p-6 bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800">
              <h3 className="font-semibold text-surface-900 dark:text-white mb-2">GitHub</h3>
              <p className="text-surface-700 dark:text-surface-300 mb-3">Star the repo and follow progress.</p>
              <GitHubStarButton />
            </div>
            <div className="rounded-2xl p-6 bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800">
              <h3 className="font-semibold text-surface-900 dark:text-white mb-2">Built in the Open</h3>
              <p className="text-surface-700 dark:text-surface-300 mb-3">MIT-licensed and open to contributions.</p>
              <Link
                href="https://github.com/OpsiMate/OpsiMate"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                Explore the repository
              </Link>
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
                <PersonCard key={`founder-${c.name}-${idx}`} contributor={c} keyPrefix="founder" />
              ))}
            </div>
          </div>

          {/* Community Leaders */}
          <div className="mb-10">
            <h3 className="text-xl md:text-2xl font-semibold text-surface-900 dark:text-white mb-4 text-center">Community Leaders 🌟</h3>
            <div className={`grid gap-6 ${gridColsFor(communityLeaders.length)} justify-items-center`}>
              {communityLeaders.map((c, idx) => (
                <PersonCard key={`communityLeaders-${c.name}-${idx}`} contributor={c} keyPrefix="communityLeaders" />
              ))}
            </div>
          </div>

          {/* Contributors / Slack Members */}
          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-surface-900 dark:text-white mb-4 text-center">Contributors & Slack Members 💬</h3>
            <div className={`grid gap-6 ${gridColsFor(contributors.length)} justify-items-center`}>
              {contributors.map((c, idx) => (
                <PersonCard key={`contributors-${c.name}-${idx}`} contributor={c} keyPrefix="contributors" />
              ))}
            </div>

            <p className="mt-6 text-sm text-surface-600 dark:text-surface-400 text-center">
              Want to be featured here? Open a PR to add yourself, or join Slack and say hi.
            </p>
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
