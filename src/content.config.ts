import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: z
		.object({
			title: z.any().optional().transform((v) => (typeof v === 'string' ? v : 'Sin título')),
			description: z.any().optional().transform((v) => (typeof v === 'string' ? v : '')),
			pubDate: z.any().optional(),
			date: z.any().optional(),
			updatedDate: z.any().optional(),
			heroImage: z.any().optional(),
		})
		.passthrough()
		.transform((data) => {
			const rawDate = data.pubDate || data.date;
			let parsedDate = new Date();
			if (rawDate instanceof Date && !isNaN(rawDate.getTime())) {
				parsedDate = rawDate;
			} else if (typeof rawDate === 'string' || typeof rawDate === 'number') {
				const d = new Date(rawDate);
				if (!isNaN(d.getTime())) parsedDate = d;
			}
			return {
				...data,
				pubDate: parsedDate,
			};
		}),
});

export const collections = { blog };
