import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/success', '/cancel'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/success', '/cancel'],
      },
      {
        userAgent: 'Yeti', // 네이버 검색로봇
        allow: '/',
        disallow: ['/api/', '/admin/', '/success', '/cancel'],
      },
    ],
    sitemap: 'https://sh-utility-builder.vercel.app/sitemap.xml',
    host: 'https://sh-utility-builder.vercel.app',
  }
}
