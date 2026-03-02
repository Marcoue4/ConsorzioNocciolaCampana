import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pillar',
  title: 'Pilastro (Home)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titolo',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descrizione',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icona',
      type: 'string',
      description: 'Nome icona: leaf, award, truck, heart',
      options: {
        list: [
          { title: 'Foglia (leaf)', value: 'leaf' },
          { title: 'Premio (award)', value: 'award' },
          { title: 'Camion (truck)', value: 'truck' },
          { title: 'Cuore (heart)', value: 'heart' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Link',
      type: 'string',
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
