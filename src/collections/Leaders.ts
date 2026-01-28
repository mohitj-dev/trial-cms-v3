import type { CollectionConfig } from 'payload'

export const Leaders: CollectionConfig = {
  slug: 'leaders',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'order', 'updatedAt'],
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
      required: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'linkedinLink',
      type: 'text',
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'backgroundColor',
      type: 'select',
      options: ['PINK', 'LIGHTPINK', 'DARKPINK'],
    },
    {
      name: 'buttonText',
      type: 'text',
    },
    {
      name: 'buttonLink',
      type: 'text',
    },
    {
      name: 'order',
      type: 'number',
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
