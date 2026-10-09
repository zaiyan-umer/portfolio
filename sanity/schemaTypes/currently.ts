import { defineArrayMember, defineField, defineType } from 'sanity';
import { currentlyLink, normalizeCurrently } from '@/features/home/lib/currently';

export default defineType({
  name: 'currently',
  title: 'Currently',
  type: 'document',
  fields: [
    defineField({
      name: 'entries',
      title: 'Notes',
      type: 'array',
      description: 'Up to three things on your mind. A sentence is enough; add detail only when useful. Drag to reorder. An empty list hides the section.',
      validation: (Rule) => Rule.max(3),
      of: [
        defineArrayMember({
          name: 'currentInterest',
          title: 'Note',
          type: 'object',
          validation: (Rule) => Rule.custom((value) =>
            normalizeCurrently({ entries: [value] }).entries.length ? true : 'Write a note before publishing.',
          ),
          fields: [
            defineField({
              name: 'note',
              title: 'Note',
              type: 'array',
              description: 'For example: “Writing evals for Automata”. Select words to add a link. Existing entries keep their previous text until you write a replacement here.',
              validation: (Rule) => Rule.max(1).error('Keep each note to one paragraph.'),
              of: [
                defineArrayMember({
                  type: 'block',
                  styles: [{ title: 'Normal', value: 'normal' }],
                  lists: [],
                  marks: {
                    decorators: [],
                    annotations: [
                      defineArrayMember({
                        name: 'link',
                        title: 'Link',
                        type: 'object',
                        fields: [
                          defineField({
                            name: 'href',
                            title: 'Destination',
                            type: 'url',
                            description: 'Use an internal path such as /projects/automata or an HTTP(S) URL.',
                            validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'], allowRelative: true }).custom((value) =>
                              currentlyLink(value) ? true : 'Use an internal path or a public HTTP(S) URL without embedded credentials.',
                            ),
                          }),
                        ],
                      }),
                    ],
                  },
                }),
              ],
            }),
            defineField({
              name: 'description',
              title: 'Extra detail',
              type: 'text',
              rows: 2,
              description: 'Optional supporting sentence. Plain text, without Markdown or HTML.',
            }),
            // Preserve stored entries without migrations or unknown-field warnings.
            defineField({ name: 'category', title: 'Previous category', type: 'string', hidden: true, readOnly: true }),
            defineField({ name: 'title', title: 'Previous text', type: 'string', hidden: true, readOnly: true }),
            defineField({ name: 'href', title: 'Previous link', type: 'url', hidden: true, readOnly: true }),
          ],
          preview: {
            select: { note: 'note', title: 'title', description: 'description' },
            prepare({ note, title, description }) {
              const entry = normalizeCurrently({ entries: [{ note, title, description }] }).entries[0];
              return {
                title: entry?.note[0].children.map((span) => span.text).join('') || 'Empty note',
                subtitle: entry?.description || 'Current note',
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'updatedAt',
      title: 'Last reviewed',
      type: 'date',
      description: 'Optional. Set this when you review your notes, or leave it empty to hide the public update date.',
    }),
  ],
  preview: { prepare: () => ({ title: 'Currently', subtitle: 'Your current notes' }) },
});
