import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

type StandardHeroProps = NonNullable<Page['hero']>['standard']

export const StandardHero: React.FC<StandardHeroProps | undefined> = (props) => {
  const {
    backgroundImage,
    description,
    metrics,
    links,
    title,
  } = props || {}
  if (!title) return null

  return (
    <div className="relative mt-16">
      {backgroundImage &&
        typeof backgroundImage === 'object' &&
        backgroundImage.mobileImage &&
        typeof backgroundImage.mobileImage === 'object' && (
          <Media
            className="md:hidden"
            fill
            imgClassName="-z-10 object-cover"
            priority
            resource={backgroundImage.mobileImage}
          />
        )}
      {backgroundImage && typeof backgroundImage === 'object' && (
        <Media
          className={backgroundImage.mobileImage ? 'hidden md:block' : undefined}
          fill
          imgClassName="-z-10 object-cover"
          priority
          resource={backgroundImage}
        />
      )}
      <div className="container relative z-10 py-16">
        <div className="max-w-[56rem] text-white">
          <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl">{title}</h1>
          {description && <p className="mb-6 text-lg">{description}</p>}
          {Array.isArray(metrics) && metrics.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-8">
              {metrics.map((metric, index) => (
                <div key={index} className="min-w-[6rem]">
                  <div className="text-3xl md:text-4xl font-semibold">{metric?.value}</div>
                  <div className="text-sm uppercase tracking-wide text-white/80">
                    {metric?.label}
                  </div>
                </div>
              ))}
            </div>
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex flex-wrap gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink className="bg-[#ff7500]" {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="absolute inset-0 bg-black/40" />
    </div>
  )
}
