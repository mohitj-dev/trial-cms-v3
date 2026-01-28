import { CollectionConfig } from 'payload'

export const Countries: CollectionConfig = {
  slug: 'countries',
  admin: {
    useAsTitle: 'countryName',
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'locale',
      type: 'select',
      defaultValue: 'en',
      options: ['en', 'zh'],
      required: true,
    },
    {
      name: 'countryName',
      type: 'text',
      required: true,
    },
    {
      name: 'officeName',
      type: 'text',
    },
    {
      name: 'googleMapLink',
      type: 'richText',
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'countryCode',
      type: 'text',
    },
    {
      name: 'officeInfoDetails',
      type: 'array',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'value', type: 'text' },
      ],
    },
    {
      name: 'officeImages',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        { name: 'caption', type: 'text' },
      ],
    },
    {
      name: 'sortOrder',
      type: 'number',
    },
    {
      name: 'secondarySortOrder',
      type: 'number',
    },
  ],
}
