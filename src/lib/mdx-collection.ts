import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { ComponentType } from 'react'
import { z, ZodSchema, ZodTypeDef } from 'zod'

export interface CollectionEntry<TMeta> {
  slug: string
  meta: TMeta
}

export interface LoadedEntry<TMeta extends BaseMeta> {
  Component?: ComponentType
  meta: TMeta
}

interface LoadEntryOptions<TMeta extends BaseMeta> {
  schema?: ZodSchema<TMeta, ZodTypeDef, unknown>
  dir: string
  importModule?: (slug: string) => Promise<Record<string, unknown> | null>
}

export interface GetAllEntriesOptions<TMeta extends BaseMeta> {
  schema?: ZodSchema<TMeta, ZodTypeDef, unknown>
  includeDrafts?: boolean
  importModule?: (slug: string) => Promise<Record<string, unknown> | null>
}

const BaseMetaSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.string(),
  draft: z.boolean().optional(),
})

export type BaseMeta = z.infer<typeof BaseMetaSchema>

function getCollectionDir(dir: string) {
  return path.join(process.cwd(), 'content', dir)
}

export function getCollectionSlugs(dir: string): string[] {
  const collectionDir = getCollectionDir(dir)
  if (!fs.existsSync(collectionDir)) {
    return []
  }

  return fs
    .readdirSync(collectionDir)
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(fileName => fileName.replace(/\.mdx$/, ''))
}

function readFrontmatterFromFile(dir: string, slug: string) {
  const fullPath = path.join(getCollectionDir(dir), `${slug}.mdx`)
  if (!fs.existsSync(fullPath)) {
    return null
  }
  const source = fs.readFileSync(fullPath, 'utf8')
  const parsed = matter(source)
  return parsed.data as Record<string, unknown>
}

function validateMeta<TMeta>(
  meta: unknown,
  slug: string,
  dir: string,
  schema?: ZodSchema<TMeta, ZodTypeDef, unknown>
) {
  if (!schema) {
    return meta as TMeta
  }

  const result = schema.safeParse(meta)
  if (!result.success) {
    console.warn(`Invalid frontmatter in ${dir}/${slug}.mdx`, result.error.flatten())
    throw result.error
  }
  return result.data
}

export async function loadEntry<TMeta extends BaseMeta = BaseMeta>(
  slug: string,
  options: LoadEntryOptions<TMeta>
): Promise<LoadedEntry<TMeta>> {
  const { schema, dir, importModule } = options

  let mod: Record<string, unknown> | null = null
  if (importModule) {
    mod = await importModule(slug)
  }

  let meta: unknown = mod?.meta ?? mod?.frontmatter ?? mod?.metadata
  if (!meta) {
    meta = readFrontmatterFromFile(dir, slug)
  }

  if (!meta) {
    throw new Error(`Unable to load frontmatter for ${dir}/${slug}.mdx`)
  }

  const validatedMeta = validateMeta(meta, slug, dir, schema)

  return {
    Component: mod?.default as ComponentType | undefined,
    meta: validatedMeta,
  }
}

export async function getAllEntries<TMeta extends BaseMeta = BaseMeta>(
  dir: string,
  options: GetAllEntriesOptions<TMeta>
): Promise<Array<CollectionEntry<TMeta>>> {
  const { schema, includeDrafts = false } = options
  const slugs = getCollectionSlugs(dir)
  const entries: Array<CollectionEntry<TMeta>> = []

  for (const slug of slugs) {
    try {
      const entry = await loadEntry<TMeta>(slug, {
        dir,
        schema,
        importModule: options.importModule,
      })
      const isDraft = (entry.meta as BaseMeta).draft ?? false
      if (!includeDrafts && isDraft) {
        continue
      }
      entries.push({ slug, meta: entry.meta })
    } catch (error) {
      console.warn(`Failed to parse entry ${dir}/${slug}:`, error)
    }
  }

  return entries.sort((a, b) => {
    const aDate = new Date((a.meta as BaseMeta).date).getTime()
    const bDate = new Date((b.meta as BaseMeta).date).getTime()
    return bDate - aDate
  })
}
