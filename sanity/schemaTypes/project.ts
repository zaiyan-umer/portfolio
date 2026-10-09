import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  fieldsets: [
    {
      name: 'story',
      title: 'Project story',
      description: 'Aim for 150–300 words across these optional sections. Use plain text and blank lines between paragraphs; Markdown is not rendered.',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url',
    }),
    defineField({
      name: 'liveUrl',
      title: 'Live URL',
      type: 'url',
    }),
    defineField({
      name: 'techStack',
      title: 'Tech Stack',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'text',
      rows: 4,
      fieldset: 'story',
      description: 'What does the project do, who is it for, and why did you build it? Go beyond the short description.',
    }),
    defineField({
      name: 'contribution',
      title: 'My contribution',
      type: 'text',
      rows: 4,
      fieldset: 'story',
      description: 'Describe what you personally built or owned. For team projects, distinguish your work from the team’s.',
    }),
    defineField({
      name: 'technicalNotes',
      title: 'Technical highlight / reflection',
      type: 'text',
      rows: 5,
      fieldset: 'story',
      description: 'Explain one meaningful decision, challenge, tradeoff, or lesson. You can also describe what works today and what you would improve.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower numbers appear first. Used for custom ordering of projects.',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'thumbnail',
      featured: 'featured',
    },
    prepare(selection) {
      const { featured } = selection
      return {
        ...selection,
        subtitle: featured ? '⭐ Featured' : '',
      }
    },
  },
})
