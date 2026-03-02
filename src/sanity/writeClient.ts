import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from './env'

/**
 * Sanity client with write permissions.
 * Uses the server-only SANITY_API_WRITE_TOKEN env var.
 * NEVER import this on the client side.
 */
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
})
