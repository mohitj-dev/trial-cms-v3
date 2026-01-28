import { CollectionConfig } from 'payload'

export const Awards: CollectionConfig = {
  slug: 'awards',
  admin: {
    useAsTitle: 'title',
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
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'awardedBy',
      type: 'text',
    },
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'awardedDate',
      type: 'date',
    },
    {
      name: 'country',
      type: 'select',
      options: [
        'Singapore',
        'Malaysia',
        'Thailand',
        'Philippines',
        'HongKong',
        'China',
        'SouthKorea',
        'Japan',
        'India',
        'Romania',
        'Spain',
        'Colombia',
        'Brazil',
        'Turkey',
        'Indonesia',
        'Vietnam',
        'Regional',
      ],
    },
    {
      name: 'category',
      type: 'select',
      options: [
        'CustomerExperience',
        'PeopleCommunity',
        'PreferredEmployer',
        'InnovationTechnology',
        'IndustryCompliance',
        'Business',
        'Human Resources',
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'link',
      type: 'text',
    },
  ],
}
