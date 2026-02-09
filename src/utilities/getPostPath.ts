import type { Category, Post } from '@/payload-types'

const getCategoryPath = (category: Category | number | string | null | undefined) => {
  if (!category || typeof category !== 'object') return null
  const breadcrumbsUrl = category.breadcrumbs?.at(-1)?.url
  if (breadcrumbsUrl) return breadcrumbsUrl
  if (category.slug) return `/${category.slug}`
  return null
}

export const getPostPath = (post: Post | null | undefined) => {
  if (!post?.slug) return null
  const categories = Array.isArray(post.categories) ? post.categories : []
  const firstCategory = categories.find((category) => typeof category === 'object') as Category | undefined
  const categoryPath = getCategoryPath(firstCategory)
  if (categoryPath) return `/insights${categoryPath}/${post.slug}`
  return `/insights/${post.slug}`
}
