import React from 'react'

import type { Page } from '@/payload-types'

import { AnimatedTwoLineHero } from '@/heros/AnimatedTwoLine'
import { CarouselHero } from '@/heros/Carousel'
import { StandardHero } from '@/heros/Standard'

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  if (type === 'animatedTwoLine' && props?.animatedTwoLine) {
    return <AnimatedTwoLineHero {...props.animatedTwoLine} />
  }

  if (type === 'standard' && props?.standard) {
    return <StandardHero {...props.standard} />
  }

  if (type === 'carousel' && props?.carousel) {
    return <CarouselHero {...props.carousel} />
  }

  return null
}
