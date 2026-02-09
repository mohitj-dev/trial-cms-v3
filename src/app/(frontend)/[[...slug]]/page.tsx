import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

type Params = {
  slug?: string[]
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
      breadcrumbs: true,
    },
  })

  const params = pages.docs
    ?.filter((doc) => {
      const url = doc?.breadcrumbs?.at(-1)?.url
      return doc.slug !== 'home' && url !== '/'
    })
    .map((doc) => {
      const url = doc?.breadcrumbs?.at(-1)?.url || `/${doc.slug}`
      const segments = url.split('/').filter(Boolean)
      return { slug: segments }
    })

  return params
}

type Args = {
  params: Promise<Params>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = [] } = await paramsPromise

  const path = slug.length === 0 ? '/' : `/${slug.map(decodeURIComponent).join('/')}`
  const url = path
  let page: RequiredDataFromCollectionSlug<'pages'> | null

  if (path === '/') {
    page = await queryPageBySlug({
      slug: 'home',
    })
  } else {
    page = await queryPageByPath({
      path,
    })
  }

  // Remove this code once your website is seeded
  if (!page && path === '/') {
    page = homeStatic
  }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page

  return (
    <article className="pt-16 pb-24">
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = [] } = await paramsPromise
  const path = slug.length === 0 ? '/' : `/${slug.map(decodeURIComponent).join('/')}`

  const page =
    path === '/'
      ? await queryPageBySlug({ slug: 'home' })
      : await queryPageByPath({ path })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

const queryPageByPath = cache(async ({ path }: { path: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      'breadcrumbs.url': {
        equals: path,
      },
    },
  })

  return result.docs?.[0] || null
})
