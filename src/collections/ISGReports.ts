import { CollectionConfig } from 'payload'

export const ISGReports: CollectionConfig = {
  slug: 'isg-reports',
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
    { name: 'firstName', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'companyName', type: 'text' },
    { name: 'jobRole', type: 'text' },
  ],
}
