import { Block } from 'payload'

export const HeroCarouselBlock: Block = {
  slug: 'heroCarousel',
  labels: {
    singular: 'Hero Carousel',
    plural: 'Hero Carousels',
  },
  fields: [
    {
      name: 'settings',
      type: 'group',
      fields: [
        {
          name: 'autoplay',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'autoplayInterval',
          type: 'number',
          defaultValue: 5000,
          admin: {
            condition: (_, siblingData) => siblingData.autoplay,
          },
        },
        {
          name: 'showDots',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'showArrows',
          type: 'checkbox',
          defaultValue: true,
        },
      ],
    },
    {
      name: 'slides',
      type: 'array',
      required: true,
      minRows: 1,
      labels: {
        singular: 'Slide',
        plural: 'Slides',
      },
      fields: [
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'primaryCTA',
          type: 'group',
          fields: [
            { name: 'text', type: 'text', required: true },
            { name: 'link', type: 'text', required: true },
          ],
        },
        {
          name: 'secondaryCTA',
          type: 'group',
          admin: { condition: (_, data) => Boolean(data) },
          fields: [
            { name: 'text', type: 'text' },
            { name: 'link', type: 'text' },
          ],
        },
      ],
    },
  ],
}
