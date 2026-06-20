import type { CollectionConfig } from 'payload'

import { isLoggedIn } from '../access/isLoggedIn'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: isLoggedIn,
    delete: isLoggedIn,
    read: () => true,
    update: isLoggedIn
  },
  admin: {
    useAsTitle: 'alt'
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true
    }
  ],
  upload: true
}
