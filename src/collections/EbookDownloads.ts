import { CollectionConfig } from 'payload'

export const EbookDownloads: CollectionConfig = {
  slug: 'ebook-downloads',
  admin: {
    hidden: true,
  },
  access: {
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: () => false,
    delete: () => false,
  },
  fields: [
    { name: 'name', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'companyName', type: 'text' },
    { name: 'jobRole', type: 'text' },
    { name: 'ebookTitle', type: 'text' },
    {
      name: 'locale',
      type: 'select',
      options: ['en', 'zh'],
    },
  ],
}
