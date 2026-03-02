import { groq } from 'next-sanity'
import { client } from './client'

// ─── Pillars (Home) ─────────────────────────────────────────
export const pillarsQuery = groq`
  *[_type == "pillar"] | order(order asc) {
    title,
    description,
    icon,
    href
  }
`
export async function getPillars() {
  return client.fetch(pillarsQuery)
}

// ─── Products ───────────────────────────────────────────────
export const productsQuery = groq`
  *[_type == "product"] | order(order asc) {
    title,
    sku,
    "slug": slug.current,
    description,
    "image": image.asset->url,
    category,
    price,
    unit,
    origin,
    stock,
    featured
  }
`
export async function getProducts() {
  return client.fetch(productsQuery)
}

// ─── Single Product by slug ─────────────────────────────────
export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    title,
    sku,
    "slug": slug.current,
    description,
    "image": image.asset->url,
    category,
    price,
    unit,
    origin,
    stock,
    featured
  }
`
export async function getProductBySlug(slug: string) {
  return client.fetch(productBySlugQuery, { slug })
}

export const productSlugsQuery = groq`
  *[_type == "product"] { "slug": slug.current }
`
export async function getProductSlugs() {
  return client.fetch(productSlugsQuery)
}

// ─── Articles (Notizie) ─────────────────────────────────────
export const articlesQuery = groq`
  *[_type == "article"] | order(date desc) {
    title,
    "slug": slug.current,
    date,
    excerpt,
    "image": image.asset->url,
    body
  }
`
export async function getArticles() {
  return client.fetch(articlesQuery)
}

export const latestArticlesQuery = groq`
  *[_type == "article"] | order(date desc) [0...3] {
    title,
    "slug": slug.current,
    excerpt,
    "image": image.asset->url
  }
`
export async function getLatestArticles() {
  return client.fetch(latestArticlesQuery)
}

export const articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    date,
    excerpt,
    "image": image.asset->url,
    body
  }
`
export async function getArticleBySlug(slug: string) {
  return client.fetch(articleBySlugQuery, { slug })
}

export const articleSlugsQuery = groq`
  *[_type == "article"] { "slug": slug.current }
`
export async function getArticleSlugs() {
  return client.fetch(articleSlugsQuery)
}

// ─── Milestones (Chi Siamo) ─────────────────────────────────
export const milestonesQuery = groq`
  *[_type == "milestone"] | order(order asc) {
    year,
    text
  }
`
export async function getMilestones() {
  return client.fetch(milestonesQuery)
}

// ─── Values (Chi Siamo) ─────────────────────────────────────
export const valuesQuery = groq`
  *[_type == "value"] | order(order asc) {
    title,
    text,
    accent
  }
`
export async function getValues() {
  return client.fetch(valuesQuery)
}

// ─── Partners (Chi Siamo) ───────────────────────────────────
export const partnersQuery = groq`
  *[_type == "partner"] | order(order asc) {
    name
  }
`
export async function getPartners() {
  return client.fetch(partnersQuery)
}
