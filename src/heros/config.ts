import type { Field } from 'payload'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'standard',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'Animated Two-Line',
          value: 'animatedTwoLine',
        },
        {
          label: 'Standard',
          value: 'standard',
        },
        {
          label: 'Carousel',
          value: 'carousel',
        },
      ],
      required: true,
    },
    {
      name: 'animatedTwoLine',
      type: 'group',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'animatedTwoLine',
      },
      fields: [
        {
          name: 'staticTitle',
          type: 'text',
          required: true,
        },
        {
          name: 'animatedPhrases',
          type: 'array',
          minRows: 1,
          labels: {
            singular: 'Phrase',
            plural: 'Phrases',
          },
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'typingSpeed',
          type: 'number',
          defaultValue: 60,
          admin: {
            description: 'Milliseconds per character for the typing effect.',
          },
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'metrics',
          type: 'array',
          labels: {
            singular: 'Metric',
            plural: 'Metrics',
          },
          maxRows: 3,
          fields: [
            {
              name: 'value',
              type: 'text',
              required: true,
              admin: {
                description: 'Number or value (e.g. 37, 575+)',
              },
            },
            {
              name: 'label',
              type: 'text',
              required: true,
              admin: {
                description: 'Metric label (e.g. Locations, Awards)',
              },
            },
          ],
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
        },
        linkGroup({
          overrides: {
            dbName: 'atl_links',
            maxRows: 2,
            minRows: 1,
          },
        }),
      ],
    },
    {
      name: 'standard',
      type: 'group',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'standard',
      },
      fields: [
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
          name: 'metrics',
          type: 'array',
          labels: {
            singular: 'Metric',
            plural: 'Metrics',
          },
          maxRows: 3,
          fields: [
            {
              name: 'value',
              type: 'text',
              required: true,
              admin: {
                description: 'Number or value (e.g. 37, 575+)',
              },
            },
            {
              name: 'label',
              type: 'text',
              required: true,
              admin: {
                description: 'Metric label (e.g. Locations, Awards)',
              },
            },
          ],
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
        },
        linkGroup({
          overrides: {
            dbName: 'std_links',
            maxRows: 2,
            minRows: 1,
          },
        }),
      ],
    },
    {
      name: 'carousel',
      type: 'group',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'carousel',
      },
      fields: [
        {
          name: 'slides',
          type: 'array',
          minRows: 1,
          labels: {
            singular: 'Slide',
            plural: 'Slides',
          },
          fields: [
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
              name: 'metrics',
              type: 'array',
              labels: {
                singular: 'Metric',
                plural: 'Metrics',
              },
              maxRows: 3,
              fields: [
                {
                  name: 'value',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'Number or value (e.g. 37, 575+)',
                  },
                },
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'Metric label (e.g. Locations, Awards)',
                  },
                },
              ],
            },
            {
              name: 'backgroundImage',
              type: 'upload',
              relationTo: 'media',
            },
            linkGroup({
              overrides: {
                dbName: 'crs_links',
                maxRows: 2,
                minRows: 1,
              },
            }),
          ],
        },
      ],
    },
  ],
  label: false,
}
