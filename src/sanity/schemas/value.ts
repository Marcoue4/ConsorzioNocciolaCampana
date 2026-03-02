import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'value',
  title: 'Valore (Chi Siamo)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titolo',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Descrizione',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'accent',
      title: 'Colore accento (classe CSS)',
      type: 'string',
      description: 'Es. bg-hazel-800, bg-forest-700, bg-hazel-600',
      options: {
        list: [
          { title: 'Nocciola scuro', value: 'bg-hazel-800' },
          { title: 'Foresta', value: 'bg-forest-700' },
          { title: 'Nocciola medio', value: 'bg-hazel-600' },
        ],
      },
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
})
