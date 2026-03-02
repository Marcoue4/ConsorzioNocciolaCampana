import { type SchemaTypeDefinition } from 'sanity'

import pillar from './pillar'
import product from './product'
import article from './article'
import milestone from './milestone'
import value from './value'
import partner from './partner'
import inventoryLog from './inventoryLog'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [pillar, product, article, milestone, value, partner, inventoryLog],
}
