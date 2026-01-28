import { Block } from 'payload'

export const CXTalkSpeakers: Block = {
  slug: 'cxTalkSpeakers',
  fields: [
    {
      name: 'speakers',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'designation', type: 'text' },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
