import type { MetadataRoute } from 'next'
import { config, routes } from '@/lib/config'
export default function sitemap(): MetadataRoute.Sitemap {
  const site = config.site
  return site
    ? ['/', ...routes.map(([path]) => path)].map((path) => ({
        url: new URL(path, site).href,
      }))
    : []
}
