import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'inventoryLog',
  title: 'Log Inventario',
  type: 'document',
  fields: [
    defineField({
      name: 'timestamp',
      title: 'Data/Ora',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fileName',
      title: 'Nome file',
      type: 'string',
    }),
    defineField({
      name: 'totalRows',
      title: 'Righe totali',
      type: 'number',
    }),
    defineField({
      name: 'updatedCount',
      title: 'Prodotti aggiornati',
      type: 'number',
    }),
    defineField({
      name: 'errorCount',
      title: 'Errori',
      type: 'number',
    }),
    defineField({
      name: 'changes',
      title: 'Dettaglio modifiche',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'sku', title: 'SKU', type: 'string' }),
            defineField({ name: 'productTitle', title: 'Prodotto', type: 'string' }),
            defineField({ name: 'field', title: 'Campo', type: 'string' }),
            defineField({ name: 'oldValue', title: 'Valore precedente', type: 'string' }),
            defineField({ name: 'newValue', title: 'Nuovo valore', type: 'string' }),
          ],
        },
      ],
    }),
  ],
  orderings: [
    {
      title: 'Più recente',
      name: 'timestampDesc',
      by: [{ field: 'timestamp', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'fileName',
      subtitle: 'timestamp',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Import CSV',
        subtitle: subtitle
          ? new Date(subtitle).toLocaleString('it-IT')
          : '',
      }
    },
  },
})
