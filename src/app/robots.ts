import type { MetadataRoute } from 'next'
import { config } from '@/lib/config'
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    ...(config.site
      ? { sitemap: new URL('/sitemap.xml', config.site).href }
      : {}),
  }
}
