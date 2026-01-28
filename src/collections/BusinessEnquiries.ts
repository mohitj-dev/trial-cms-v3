import { CollectionConfig } from 'payload'

export const BusinessEnquiries: CollectionConfig = {
  slug: 'business-enquiries',
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
    { name: 'firstName', type: 'text' },
    { name: 'lastName', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'phoneNumber', type: 'text' },
    { name: 'companyName', type: 'text' },
    { name: 'companyIndustry', type: 'text' },
    { name: 'preferredLocation', type: 'text' },
    { name: 'preferredLanguage', type: 'text' },
    { name: 'headcount', type: 'text' },
    { name: 'solutions', type: 'text' },
    {
      name: 'message',
      type: 'richText',
    },
    {
      name: 'origin',
      type: 'text',
    },
    {
      name: 'emailSent',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
