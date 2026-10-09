import { z } from 'zod';
import type { GithubActivity } from '@/features/education/types';

const responseSchema = z.object({
  errors: z.array(z.unknown()).optional(),
  data: z
    .object({
      user: z
        .object({
          contributionsCollection: z.object({
            contributionCalendar: z.object({
              weeks: z
                .array(
                  z.object({
                    contributionDays: z
                      .array(
                        z.object({
                          date: z
                            .string()
                            .regex(/^\d{4}-\d{2}-\d{2}$/)
                            .refine((date) => {
                              const parsed = new Date(`${date}T00:00:00Z`);
                              return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === date;
                            }),
                          contributionCount: z.number().int().nonnegative(),
                        }),
                      )
                      .min(1)
                      .max(7),
                  }),
                )
                .min(1)
                .max(54),
            }),
          }),
        })
        .nullable(),
    })
    .optional(),
});

export function parseGithubActivity(value: unknown, requestedWeeks = 52): GithubActivity {
  const parsed = responseSchema.safeParse(value);
  if (!parsed.success || parsed.data.errors?.length || !parsed.data.data?.user) return { status: 'unavailable' };

  const allWeeks = parsed.data.data.user.contributionsCollection.contributionCalendar.weeks;
  let previousDate: number | null = null;
  for (const week of allWeeks) {
    let sunday: number | null = null;
    for (const day of week.contributionDays) {
      const date = new Date(`${day.date}T00:00:00Z`);
      const timestamp = date.getTime();
      const weekStart = timestamp - date.getUTCDay() * 86400000;
      if (
        (sunday !== null && sunday !== weekStart) ||
        (previousDate !== null && timestamp - previousDate !== 86400000)
      ) {
        return { status: 'unavailable' };
      }
      sunday = weekStart;
      previousDate = timestamp;
    }
  }

  const count = Number.isFinite(requestedWeeks) ? Math.max(1, Math.min(54, Math.floor(requestedWeeks))) : 52;
  const weeks = allWeeks
    .slice(-count)
    .map((week) => week.contributionDays.map((day) => ({ date: day.date, count: day.contributionCount })));
  const days = weeks.flat();
  return {
    status: 'available',
    weeks,
    total: days.reduce((sum, day) => sum + day.count, 0),
    start: days[0].date,
    end: days[days.length - 1].date,
  };
}
