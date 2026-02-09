import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

type ExpandableParaBlockProps = Extract<Page['layout'][0], { blockType: 'expandablePara' }>

export const ExpandableParaBlock: React.FC<ExpandableParaBlockProps> = ({ heading, items }) => {
  if (!items || items.length === 0) return null

  return (
    <section className="bg-neutral-100">
      <div className="container py-16">
        {heading && (
          <h2 className="mb-12 text-4xl md:text-5xl font-semibold text-neutral-800">{heading}</h2>
        )}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            return (
              <div key={index} className="flex h-full flex-col items-center text-center">
                {item.icon && typeof item.icon === 'object' && (
                  <div className="mb-6 h-24 w-24">
                    <Media imgClassName="object-contain" priority={false} resource={item.icon} />
                  </div>
                )}
                {item.eyebrow && (
                  <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-orange-500">
                    {item.eyebrow}
                  </p>
                )}
                {item.title && (
                  <h3 className="mb-4 text-2xl font-semibold text-neutral-900">{item.title}</h3>
                )}
                {item.description && (
                  <p className="mb-8 text-base leading-relaxed text-neutral-700">
                    {item.description}
                  </p>
                )}
                {item.link && (
                  <CMSLink
                    {...item.link}
                    appearance="default"
                    className="bg-[#ff7500] text-white hover:bg-[#e56700]"
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
