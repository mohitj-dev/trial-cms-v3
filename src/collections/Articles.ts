import type { CollectionConfig } from 'payload'

export const Articles: CollectionConfig = {
  slug: 'articles',
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
      options: [
        { label: 'Global (EN)', value: 'en' },
        { label: 'China (ZH)', value: 'zh' },
      ],
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'category',
      type: 'select',
      options: [
        'AWARDS',
        'PRESS_RELEASES',
        'FEATURED_ARTICLES',
        'CSR_ACTIVITIES',
        'WEBINARS',
        'IN_THE_NEWS',
        'FINANCIAL_NEWS',
        'INDUSTRY_INSIGHTS',
        'E_BOOKS',
        'WHITE_PAPERS',
      ],
    },
    {
      name: 'articleOrigin',
      type: 'text',
    },
    {
      name: 'youtubeUrl',
      type: 'text',
    },
    {
      name: 'youkuUrl',
      type: 'text',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'metaTitle', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
      ],
    },
    {
      name: 'summary',
      type: 'richText',
    },
    {
      name: 'body',
      type: 'richText',
    },
    {
      name: 'speakers',
      type: 'array',
      fields: [
        { name: 'name', type: 'text' },
        { name: 'title', type: 'text' },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'formTitle',
      type: 'text',
    },
    {
      name: 'industryInsightsEbook',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'internalScript',
      type: 'richText',
    },
    {
      name: 'industryInsightsDownloadButtonLabel',
      type: 'text',
    },
    {
      name: 'articlePublishDate',
      type: 'date',
    },
    {
      name: 'tags',
      type: 'array',
      fields: [{ name: 'label', type: 'text' }],
    },
    {
      name: 'publishOn',
      type: 'select',
      options: ['Global', 'China'],
    },
    {
      name: 'faq',
      type: 'array',
      fields: [
        { name: 'question', type: 'text' },
        { name: 'answer', type: 'richText' },
      ],
    },
    {
      name: 'sliderImages',
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
  ],
}
