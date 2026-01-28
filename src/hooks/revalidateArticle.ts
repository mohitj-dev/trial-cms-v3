import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'
import type { Article } from '../payload-types'

export const revalidateArticle: CollectionAfterChangeHook<Article> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (context.disableRevalidate) return doc

  if (doc._status === 'published') {
    payload.logger.info(`Revalidating article: ${doc.slug}`)
    revalidatePath(`/articles/${doc.slug}`)
    revalidateTag('articles')
  }

  if (previousDoc?._status === 'published' && doc._status !== 'published') {
    revalidatePath(`/articles/${previousDoc.slug}`)
    revalidateTag('articles')
  }

  if (!doc?.slug) return doc

  return doc
}

export const revalidateArticleDelete: CollectionAfterDeleteHook<Article> = ({
  doc,
  req: { context },
}) => {
  if (context.disableRevalidate) return doc

  revalidatePath(`/articles/${doc.slug}`)
  revalidateTag('articles')

  if (!doc?.slug) return doc

  return doc
}
