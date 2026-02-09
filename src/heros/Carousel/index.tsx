'use client'
import React, { useEffect, useMemo, useState } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

type CarouselHeroProps = NonNullable<Page['hero']>['carousel']

export const CarouselHero: React.FC<CarouselHeroProps | undefined> = (props) => {
  const items = useMemo(() => (Array.isArray(props?.slides) ? props.slides : []), [props?.slides])
  const total = items.length
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (activeIndex >= total) setActiveIndex(0)
  }, [activeIndex, total])

  if (total === 0) return null

  const activeSlide = items[activeIndex]

  return (
    <div className="relative mt-16">
      {activeSlide?.backgroundImage &&
        typeof activeSlide.backgroundImage === 'object' &&
        activeSlide.backgroundImage.mobileImage &&
        typeof activeSlide.backgroundImage.mobileImage === 'object' && (
          <Media
            className="md:hidden"
            fill
            imgClassName="-z-10 object-cover"
            priority
            resource={activeSlide.backgroundImage.mobileImage}
          />
        )}
      {activeSlide?.backgroundImage && typeof activeSlide.backgroundImage === 'object' && (
        <Media
          className={activeSlide.backgroundImage.mobileImage ? 'hidden md:block' : undefined}
          fill
          imgClassName="-z-10 object-cover"
          priority
          resource={activeSlide.backgroundImage}
        />
      )}
      <div className="container relative z-10 py-16">
        <div className="max-w-[56rem] text-white">
          <div className="mb-6">
            <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl">{activeSlide?.title}</h1>
            {activeSlide?.description && <p className="mb-6 text-lg">{activeSlide.description}</p>}
            {Array.isArray(activeSlide?.metrics) && activeSlide.metrics.length > 0 && (
              <div className="mb-6 flex flex-wrap gap-8">
                {activeSlide.metrics.map((metric, index) => (
                  <div key={index} className="min-w-[6rem]">
                    <div className="text-3xl md:text-4xl font-semibold">{metric?.value}</div>
                    <div className="text-sm uppercase tracking-wide text-white/80">
                      {metric?.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {Array.isArray(activeSlide?.links) && activeSlide.links.length > 0 && (
              <ul className="flex flex-wrap gap-4">
                {activeSlide.links.map(
                  ({ link }: { link: React.ComponentProps<typeof CMSLink> }, i: number) => {
                    return (
                      <li key={i}>
                        <CMSLink {...link} />
                      </li>
                    )
                  },
                )}
              </ul>
            )}
          </div>

          {total > 1 && (
            <div className="flex items-center gap-3">
              <button
                className="rounded-full border px-3 py-1 text-sm"
                onClick={() => setActiveIndex((prev) => (prev - 1 + total) % total)}
                type="button"
              >
                Prev
              </button>
              <div className="flex items-center gap-2">
                {items.map((_, index) => (
                  <button
                    key={index}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`h-2.5 w-2.5 rounded-full ${
                      index === activeIndex ? 'bg-current' : 'bg-muted-foreground/40'
                    }`}
                    onClick={() => setActiveIndex(index)}
                    type="button"
                  />
                ))}
              </div>
              <button
                className="rounded-full border px-3 py-1 text-sm"
                onClick={() => setActiveIndex((prev) => (prev + 1) % total)}
                type="button"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="absolute inset-0 bg-black/40" />
    </div>
  )
}
