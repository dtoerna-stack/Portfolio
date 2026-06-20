import type { CollectionConfig } from 'payload'

import { isLoggedIn } from '../access/isLoggedIn'

export const Skills: CollectionConfig = {
  slug: 'skills',
  access: {
    create: isLoggedIn,
    delete: isLoggedIn,
    read: () => true,
    update: isLoggedIn
  },
  admin: {
    defaultColumns: ['name', 'area', 'level', 'highlight'],
    group: 'Portfolio',
    useAsTitle: 'name'
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true
    },
    {
      name: 'area',
      type: 'select',
      defaultValue: 'Frontend',
      options: [
        { label: 'Frontend', value: 'Frontend' },
        { label: 'CMS', value: 'CMS' },
        { label: 'Motion', value: 'Motion' },
        { label: 'Tooling', value: 'Tooling' }
      ],
      required: true
    },
    {
      name: 'level',
      type: 'number',
      defaultValue: 75,
      max: 100,
      min: 0,
      required: true
    },
    {
      name: 'highlight',
      type: 'checkbox',
      defaultValue: false
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 10
    }
  ],
  timestamps: true
}
