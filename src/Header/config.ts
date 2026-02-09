import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        {
          name: 'type',
          type: 'select',
          defaultValue: 'simple',
          options: [
            { label: 'Simple Link', value: 'simple' },
            { label: 'Dropdown', value: 'dropdown' },
          ],
          required: true,
        },
        link({
          appearances: false,
          overrides: {
            admin: {
              condition: (_, siblingData) => siblingData?.type !== 'dropdown',
            },
          },
        }),
        {
          ...link({
            appearances: false,
          }),
          name: 'dropdownLink',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'dropdown',
          },
        } as const,
        {
          name: 'dropdownLinks',
          type: 'array',
          minRows: 1,
          maxRows: 8,
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'dropdown',
            initCollapsed: true,
          },
          fields: [
            link({
              appearances: false,
            }),
          ],
        },
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
