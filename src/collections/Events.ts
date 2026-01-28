import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
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
      options: [
        { label: 'English', value: 'en' },
        { label: 'Chinese', value: 'zh' },
      ],
      defaultValue: 'en',
      required: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'publishedDate',
      type: 'date',
    },

    /* === CX Parts Block === */
    {
      name: 'cxParts',
      type: 'array',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'richText' },
      ],
    },

    /* === Carousel Featured === */
    {
      name: 'carouselFeatured',
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

    /* === Featured Items === */
    {
      name: 'featuredItems',
      type: 'array',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'richText' },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },

    /* === Content Blocks === */
    {
      name: 'contentBlocks',
      type: 'array',
      fields: [
        { name: 'heading', type: 'text' },
        { name: 'content', type: 'richText' },
      ],
    },

    /* === Gallery === */
    {
      name: 'gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        { name: 'alt', type: 'text' },
      ],
    },

    /* === SEO === */
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
