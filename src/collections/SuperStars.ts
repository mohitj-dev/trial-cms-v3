import type { CollectionConfig } from 'payload'

export const Superstars: CollectionConfig = {
  slug: 'superstars',
  admin: {
    useAsTitle: 'name',
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'locale',
      type: 'select',
      options: ['en', 'zh'],
      defaultValue: 'en',
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'positionTitle',
      type: 'text',
    },
    {
      name: 'country',
      type: 'relationship',
      relationTo: 'media',
    },
    {
      name: 'linkedinUrl',
      type: 'text',
    },
    {
      name: 'summary',
      type: 'richText',
    },
    {
      name: 'backgroundColor',
      type: 'select',
      options: ['PINK', 'LIGHTPINK', 'DARKPINK'],
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'metaTitle', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
      ],
    },
  ],
}
