import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'milestone',
  title: 'Tappa storica (Chi Siamo)',
  type: 'document',
  fields: [
    defineField({
      name: 'year',
      title: 'Anno',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Descrizione',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Ordine',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Ordine',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'year',
      subtitle: 'text',
    },
  },
})
