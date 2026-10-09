import { ArrowUpRight } from 'lucide-react';
import { cacheLife } from 'next/cache';
import { fetchGithubActivity } from '@/lib/github-activity';
import { siteContact } from '@/lib/site';
import { cn } from '@/lib/utils';

export type { ContributionDay } from '@/lib/github-activity';

const intensity = (count: number) => count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 10 ? 3 : 4;
const dateLabel = (date: string) => new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

export default async function ContributionCalendar({ className, weeks = 52 }: { className?: string; weeks?: number }) {
  'use cache';
  cacheLife('hours');
  const activity = await fetchGithubActivity(weeks);
  const githubLink = <a href={siteContact.github} target="_blank" rel="noopener noreferrer" className="portfolio-activity-link" aria-label="View GitHub profile (opens in a new tab)">View GitHub profile<ArrowUpRight size={16} aria-hidden="true" /></a>;

  if (activity.status === 'unavailable') {
    return <div className={cn('portfolio-activity-panel', className)}>
      <h3>Activity unavailable</h3>
      <p className="portfolio-education-muted">GitHub activity could not be loaded. You can still explore my work on GitHub.</p>
      {githubLink}
    </div>;
  }

  const period = `${dateLabel(activity.start)} – ${dateLabel(activity.end)}`;
  const summary = `${activity.total.toLocaleString('en-US')} contribution${activity.total === 1 ? '' : 's'}`;
  const months = activity.weeks.map(week => new Date(`${week[0].date}T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' }));

  return <div className={cn('portfolio-activity-panel', className)}>
    <div className="portfolio-activity-summary"><h3>{summary}</h3><p>{period}</p></div>
    <div className="portfolio-calendar-scroll" tabIndex={0} role="region" aria-label="GitHub contribution calendar; scroll horizontally to see all weeks">
      <div className="portfolio-calendar" role="img" aria-label={`${summary}, ${period}. Darker blue squares indicate more contributions.`}>
        <div className="portfolio-calendar-weekdays" aria-hidden="true">
          <span />{['', 'Mon', '', 'Wed', '', 'Fri', ''].map((day, index) => <span key={index}>{day}</span>)}
        </div>
        <div className="portfolio-calendar-columns" aria-hidden="true">
          {activity.weeks.map((week, index) => {
            const byWeekday = new Map(week.map(day => [new Date(`${day.date}T00:00:00Z`).getUTCDay(), day]));
            return <div className="portfolio-calendar-week" key={week[0].date}>
              <span className="portfolio-calendar-month">{index === 0 || months[index] !== months[index - 1] ? months[index] : ''}</span>
              {Array.from({ length: 7 }, (_, weekday) => {
                const day = byWeekday.get(weekday);
                return day ? <span key={day.date} className={`portfolio-calendar-cell portfolio-calendar-level-${intensity(day.count)}`} title={`${dateLabel(day.date)}: ${day.count} contribution${day.count === 1 ? '' : 's'}`} /> : <span key={`blank-${weekday}`} className="portfolio-calendar-cell portfolio-calendar-blank" />;
              })}
            </div>;
          })}
        </div>
      </div>
    </div>
    <div className="portfolio-activity-footer">
      {githubLink}
      <div className="portfolio-calendar-legend" aria-label="Contribution intensity, less to more"><span>Less</span>{[0, 1, 2, 3, 4].map(level => <span key={level} className={`portfolio-calendar-cell portfolio-calendar-level-${level}`} aria-hidden="true" />)}<span>More</span></div>
    </div>
  </div>;
}
