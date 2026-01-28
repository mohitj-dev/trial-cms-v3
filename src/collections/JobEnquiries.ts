import type { CollectionConfig } from 'payload'

export const JobEnquiries: CollectionConfig = {
  slug: 'job-enquiries',
  admin: {
    hidden: true,
  },
  access: {
    create: () => true, // public form
    read: ({ req }) => Boolean(req.user),
    update: () => false,
    delete: () => false,
  },
  fields: [
    { name: 'fullName', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'preferredLocation', type: 'text' },
    { name: 'phoneNumber', type: 'text' },
    { name: 'message', type: 'richText' },
  ],
}
