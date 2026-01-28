import { CollectionConfig } from 'payload'

export const CorporateOverviews: CollectionConfig = {
  slug: 'corporate-overviews',
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
    { name: 'fullName', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'companyName', type: 'text' },
    { name: 'phoneNumber', type: 'text' },
    { name: 'message', type: 'richText' },
    { name: 'origin', type: 'text' },
  ],
}
