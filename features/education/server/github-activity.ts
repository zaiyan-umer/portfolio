import 'server-only';
import { parseGithubActivity } from '@/features/education/lib/github-activity';
import type { GithubActivity } from '@/features/education/types';

export async function fetchGithubActivity(weeks = 52): Promise<GithubActivity> {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME?.trim();
  if (!token || !username) return { status: 'unavailable' };

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(10000),
      body: JSON.stringify({
        query: `query Contributions($username: String!) {
          user(login: $username) {
            contributionsCollection {
              contributionCalendar { weeks { contributionDays { date contributionCount } } }
            }
          }
        }`,
        variables: { username },
      }),
    });
    if (!response.ok) {
      console.warn(`GitHub activity unavailable (HTTP ${response.status}).`);
      return { status: 'unavailable' };
    }
    const activity = parseGithubActivity(await response.json(), weeks);
    if (activity.status === 'unavailable')
      console.warn('GitHub activity unavailable: invalid or unsuccessful response.');
    return activity;
  } catch {
    console.warn('GitHub activity unavailable: request failed or timed out.');
    return { status: 'unavailable' };
  }
}
