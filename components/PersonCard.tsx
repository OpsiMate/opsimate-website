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
};

const PersonCard: React.FC<PersonCardProps> = ({ contributor: c }) => (
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

export default PersonCard;