import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string().optional(),
		date: z.coerce.date().optional(),
		pubDate: z.coerce.date().optional(),
		coverImage: z.string().optional(),
		heroImage: z.string().optional(),
		categories: z.array(z.string()).optional(),
		tags: z.array(z.string()).optional(),
		draft: z.boolean().optional(),
	}),
});

export const collections = { blog };
