import configPromise from '@payload-config'
import { getPayload } from 'payload'

type PageDoc = {
  id: number | string
  title?: string | null
  slug?: string | null
  generateSlug?: boolean | null
  parent?: { id?: number | string } | number | string | null
  hero?: unknown
  layout?: unknown
  meta?: unknown
  publishedAt?: string | null
  _status?: 'draft' | 'published'
}

const getParentID = (parent: PageDoc['parent']) => {
  if (!parent) return null
  if (typeof parent === 'object' && 'id' in parent) return parent.id ?? null
  return parent
}

const run = async () => {
  const payload = await getPayload({ config: configPromise })

  let page = 1
  let hasNextPage = true

  while (hasNextPage) {
    const result = await payload.find({
      collection: 'pages',
      depth: 0,
      draft: true,
      overrideAccess: true,
      limit: 100,
      page,
    })

    const docs = (result.docs || []) as PageDoc[]

    for (const doc of docs) {
      await payload.update({
        collection: 'pages',
        id: doc.id,
        draft: doc._status === 'draft',
        overrideAccess: true,
        context: {
          disableRevalidate: true,
        },
        data: {
          title: doc.title ?? '',
          slug: doc.slug ?? '',
          generateSlug: doc.generateSlug ?? false,
          parent: getParentID(doc.parent),
          hero: doc.hero,
          layout: doc.layout,
          meta: doc.meta,
          publishedAt: doc.publishedAt ?? null,
        },
      })
    }

    hasNextPage = result.hasNextPage
    page += 1
  }

  payload.logger.info('Breadcrumb rebuild complete.')
}

run().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error)
  process.exit(1)
})
