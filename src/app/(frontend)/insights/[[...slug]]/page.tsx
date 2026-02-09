import type { Metadata } from 'next'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import type { Post } from '@/payload-types'

import { PostHero } from '@/heros/PostHero'
import { generateMeta } from '@/utilities/generateMeta'
import InsightClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { getPostPath } from '@/utilities/getPostPath'

type Params = {
  slug?: string[]
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    depth: 2,
    select: {
      slug: true,
      categories: true,
    },
  })

  const params = posts.docs
    .map((post) => {
      const path = getPostPath(post as Post)
      if (!path) return null
      const segments = path.replace('/insights/', '').split('/').filter(Boolean)
      return { slug: segments }
    })
    .filter(Boolean) as { slug: string[] }[]

  return params
}

type Args = {
  params: Promise<Params>
}

export default async function PostPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = [] } = await paramsPromise
  const decodedSegments = slug.map((segment) => decodeURIComponent(segment))

  if (decodedSegments.length === 0) {
    const payload = await getPayload({ config: configPromise })
    const posts = await payload.find({
      collection: 'posts',
      depth: 2,
      limit: 12,
      overrideAccess: false,
      select: {
        title: true,
        slug: true,
        categories: true,
        meta: true,
      },
    })

    return (
      <div className="pt-24 pb-24">
        <InsightClient />
        <div className="container mb-16">
          <div className="prose dark:prose-invert max-w-none">
            <h1>Insights</h1>
          </div>
        </div>

        <div className="container mb-8">
          <PageRange
            collection="posts"
            currentPage={posts.page}
            limit={12}
            totalDocs={posts.totalDocs}
          />
        </div>

        <CollectionArchive posts={posts.docs} />

        <div className="container">
          {posts.totalPages > 1 && posts.page && (
            <Pagination page={posts.page} totalPages={posts.totalPages} basePath="/insights/page" />
          )}
        </div>
      </div>
    )
  }

  const postSlug = decodedSegments.at(-1) || ''
  const categorySlug = decodedSegments.length > 1 ? decodedSegments.at(-2) || '' : ''
  const url = `/insights/${decodedSegments.join('/')}`

  const post = await queryPostBySlugAndCategory({ postSlug, categorySlug })

  if (!post) return <PayloadRedirects url={url} />

  const canonicalPath = getPostPath(post as Post)
  if (canonicalPath && canonicalPath !== url) {
    return <PayloadRedirects url={canonicalPath} />
  }

  return (
    <article className="pt-16 pb-16">
      <InsightClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <PostHero post={post} />

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          <RichText className="max-w-[48rem] mx-auto" data={post.content} enableGutter={false} />
          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <RelatedPosts
              className="mt-12 max-w-[52rem] lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]"
              docs={post.relatedPosts.filter((post) => typeof post === 'object')}
            />
          )}
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = [] } = await paramsPromise
  const decodedSegments = slug.map((segment) => decodeURIComponent(segment))
  if (decodedSegments.length === 0) {
    return {
      title: 'Insights',
    }
  }
  const postSlug = decodedSegments.at(-1) || ''
  const categorySlug = decodedSegments.length > 1 ? decodedSegments.at(-2) || '' : ''
  const post = await queryPostBySlugAndCategory({ postSlug, categorySlug })

  return generateMeta({ doc: post })
}

const queryPostBySlugAndCategory = cache(
  async ({ postSlug, categorySlug }: { postSlug: string; categorySlug: string }) => {
    const { isEnabled: draft } = await draftMode()

    const payload = await getPayload({ config: configPromise })

    const where: any = categorySlug
      ? {
          and: [
            {
              slug: {
                equals: postSlug,
              },
            },
            {
              'categories.slug': {
                equals: categorySlug,
              },
            },
          ],
        }
      : {
          slug: {
            equals: postSlug,
          },
        }

    const result = await payload.find({
      collection: 'posts',
      draft,
      limit: 1,
      overrideAccess: draft,
      pagination: false,
      depth: 2,
      where,
    })

    if (result.docs?.[0]) return result.docs[0]

    if (categorySlug) {
      const fallback = await payload.find({
        collection: 'posts',
        draft,
        limit: 1,
        overrideAccess: draft,
        pagination: false,
        depth: 2,
        where: {
          slug: {
            equals: postSlug,
          },
        },
      })

      return fallback.docs?.[0] || null
    }

    return null
  },
)
