import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { siteConfig, uiCopy } from "@/lib/config";
import { getContributionCalendar, type ContributionLevel } from "@/lib/github";
import KanekiMascot from "@/components/ui/KanekiMascot";
import styles from "./GithubActivitySection.module.css";

const copy = uiCopy.github;

// Ink density: empty paper to solid ink, with the busiest days in kakugan red.
const levelColor: Record<ContributionLevel, string> = {
  NONE: "var(--surface-2)",
  FIRST_QUARTILE: "color-mix(in srgb, var(--ink) 28%, var(--surface))",
  SECOND_QUARTILE: "color-mix(in srgb, var(--ink) 55%, var(--surface))",
  THIRD_QUARTILE: "var(--ink)",
  FOURTH_QUARTILE: "var(--accent)",
};

export default async function GithubActivitySection() {
  const calendar = await getContributionCalendar(siteConfig.githubUsername);
  if (!calendar) return null;

  const { weeks, totalContributions } = calendar;
  const total = totalContributions.toLocaleString("en-US");

  const days = weeks.flatMap((week) => week.contributionDays);
  const thisWeek = days.slice(-7).reduce((sum, day) => sum + day.contributionCount, 0);
  // Today may have no commits yet, so a streak can still end yesterday.
  let i = days.length - 1;
  if (days[i]?.contributionCount === 0) i--;
  let streak = 0;
  while (i >= 0 && days[i].contributionCount > 0) {
    streak++;
    i--;
  }
  let longest = 0;
  let run = 0;
  for (const day of days) {
    run = day.contributionCount > 0 ? run + 1 : 0;
    longest = Math.max(longest, run);
  }
  const activeDays = days.filter((day) => day.contributionCount > 0).length;

  const mascotLine =
    streak >= 3
      ? copy.mascot.streak(streak)
      : thisWeek > 0
        ? copy.mascot.week(thisWeek)
        : copy.mascot.idle;

  const stats = [
    { label: copy.stats.week, value: thisWeek.toLocaleString("en-US") },
    { label: copy.stats.streak, value: copy.days(streak) },
    { label: copy.stats.longest, value: copy.days(longest) },
    { label: copy.stats.active, value: activeDays.toLocaleString("en-US") },
  ];

  const monthLabels = weeks.map((week, i) => {
    const month = new Date(week.contributionDays[0].date).getUTCMonth();
    const prev = i > 0 ? new Date(weeks[i - 1].contributionDays[0].date).getUTCMonth() : month;
    return i > 0 && month !== prev ? copy.months[month] : "";
  });

  return (
    <section id="github" className="section border-b-2 border-(--ink)">
      <div className="container-x">
        <div className="mb-4 flex items-center justify-between">
          <span className="caption font-semibold">{copy.path}</span>
          <span className="font-mono text-xs text-(--ink-3)">{copy.chapter}</span>
        </div>

        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="display text-3xl sm:text-5xl">{copy.title}</h2>
            <p className="mt-2 max-w-2xl text-base text-(--ink-2)">{copy.description}</p>
          </div>
          <Link
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost text-xs uppercase tracking-wider"
          >
            <FaGithub size={15} aria-hidden="true" /> {copy.profile}
          </Link>
        </div>

        <div className="panels grid-cols-1 lg:grid-cols-12">
          {/* Kaneki panel */}
          <div className="panel tone p-4 sm:p-6 lg:col-span-4">
            <KanekiMascot
              human={[mascotLine, ...copy.mascot.humanQuips]}
              ghoul={copy.mascot.ghoulQuips}
              label={copy.mascot.label}
            />
          </div>

          {/* Data panel */}
          <div className="panel flex min-w-0 flex-col gap-5 p-4 sm:p-6 lg:col-span-8">
            <p className={styles.total}>
              <span className="display text-4xl text-(--ink) sm:text-5xl">{total}</span>
              <span className="text-sm text-(--ink-2)">{copy.total}</span>
            </p>

            <dl className={styles.stats}>
              {stats.map((stat) => (
                <div key={stat.label} className={styles.stat}>
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-(--ink-3)">
                    {stat.label}
                  </dt>
                  <dd className="text-lg font-bold tabular-nums">{stat.value}</dd>
                </div>
              ))}
            </dl>

            {/* rtl scroller starts scrolled to the most recent weeks on narrow screens */}
            <div className={styles.scroller}>
              <div
                className={styles.calendar}
                style={{ "--weeks": weeks.length } as React.CSSProperties}
                role="img"
                aria-label={`${total} ${copy.total}`}
              >
                <div className={styles.months} aria-hidden="true">
                  {monthLabels.map((label, i) => (
                    <span key={i}>{label}</span>
                  ))}
                </div>
                <div className={styles.days}>
                  {/* The first week can start mid-week; pad it so weekdays line up */}
                  {Array.from({ length: 7 - weeks[0].contributionDays.length }, (_, pad) => (
                    <span key={`pad-${pad}`} />
                  ))}
                  {days.map((day) => (
                    <span
                      key={day.date}
                      title={`${day.contributionCount} ${day.contributionCount === 1 ? copy.contribution : copy.contributions} on ${day.date}`}
                      className={styles.day}
                      style={{ background: levelColor[day.contributionLevel] }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div
              className="mt-auto flex items-center justify-end gap-1.5 font-mono text-xs text-(--ink-3)"
              aria-hidden="true"
            >
              {copy.less}
              {Object.values(levelColor).map((color) => (
                <span key={color} className={styles.legend} style={{ background: color }} />
              ))}
              {copy.more}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
