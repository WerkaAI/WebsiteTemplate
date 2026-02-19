import { z } from 'zod';

export const BaseFrontmatterSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
    draft: z.boolean().default(false),
    cover: z.string().url().optional(),
    tags: z.array(z.string()).nullable().optional().transform(val => val ?? []),
});

export const BlogPostSchema = BaseFrontmatterSchema.extend({
    readTime: z.string().optional(),
});

export const TutorialSchema = BaseFrontmatterSchema.extend({
    description: z.string().optional().default(""),
    persona: z.array(z.string()).nullable().optional().transform(val => val ?? []),
    difficulty: z.string().optional().default("podstawowy"),
    durationMinutes: z.number().optional().default(0),
    relatedTutorials: z.array(z.string()).nullable().optional().transform(val => val ?? []),
});

export type BaseFrontmatter = z.infer<typeof BaseFrontmatterSchema>;
export type BlogPostFrontmatter = z.infer<typeof BlogPostSchema>;
export type TutorialFrontmatter = z.infer<typeof TutorialSchema>;
