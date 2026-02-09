'use client'
import React, { useEffect, useMemo, useState } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

type AnimatedTwoLineHeroProps = NonNullable<Page['hero']>['animatedTwoLine']

const DEFAULT_TYPING_SPEED = 60
const DEFAULT_PAUSE_MS = 1000

export const AnimatedTwoLineHero: React.FC<AnimatedTwoLineHeroProps | undefined> = (props) => {
  const {
    animatedPhrases,
    backgroundImage,
    description,
    metrics,
    links,
    staticTitle,
    typingSpeed,
  } = props || {}
  const phrases = useMemo(
    () => (animatedPhrases || []).map((phrase) => phrase?.text).filter(Boolean) as string[],
    [animatedPhrases],
  )
  const speed = typingSpeed && typingSpeed > 0 ? typingSpeed : DEFAULT_TYPING_SPEED

  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    setPhraseIndex(0)
    setCharIndex(0)
    setIsDeleting(false)
  }, [phrases.length])

  useEffect(() => {
    if (phrases.length === 0) return

    const currentPhrase = phrases[phraseIndex % phrases.length]
    if (!currentPhrase) return

    let timeoutId: number | undefined

    if (!isDeleting && charIndex === currentPhrase.length) {
      timeoutId = window.setTimeout(() => {
        setIsDeleting(true)
      }, DEFAULT_PAUSE_MS)
    } else if (isDeleting && charIndex === 0) {
      timeoutId = window.setTimeout(() => {
        setIsDeleting(false)
        setPhraseIndex((prev) => (prev + 1) % phrases.length)
      }, DEFAULT_PAUSE_MS / 2)
    } else {
      timeoutId = window.setTimeout(() => {
        setCharIndex((prev) => prev + (isDeleting ? -1 : 1))
      }, isDeleting ? speed / 2 : speed)
    }

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId)
    }
  }, [charIndex, isDeleting, phraseIndex, phrases, speed])

  const currentPhrase = phrases[phraseIndex % phrases.length] || ''
  const typedText = currentPhrase.slice(0, charIndex)

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
          <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl">
            <span className="block">{staticTitle}</span>
            <span className="block text-primary">
              <span className="border-r-2 border-current pr-1">{typedText}</span>
            </span>
          </h1>
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
                    <CMSLink {...link} />
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
