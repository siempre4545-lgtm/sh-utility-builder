/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://sh-utility-builder.vercel.app',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/api/*', '/admin/*'],
  additionalPaths: async (config) => {
    const result = []

    // 도구 페이지들
    const tools = [
      'image-resize',
      'heic-to-jpg',
      'pdf-merge',
      'webp-to-jpg',
      'qr-generator',
      'srt-editor'
    ]

    tools.forEach(tool => {
      result.push({
        loc: `/tools/${tool}`,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      })
    })

    // 정적 페이지들
    result.push({
      loc: '/tools',
      changefreq: 'weekly',
      priority: 0.9,
      lastmod: new Date().toISOString(),
    })

    result.push({
      loc: '/faq',
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    })

    result.push({
      loc: '/contact',
      changefreq: 'monthly',
      priority: 0.6,
      lastmod: new Date().toISOString(),
    })

    result.push({
      loc: '/privacy',
      changefreq: 'monthly',
      priority: 0.5,
      lastmod: new Date().toISOString(),
    })

    result.push({
      loc: '/terms',
      changefreq: 'monthly',
      priority: 0.5,
      lastmod: new Date().toISOString(),
    })

    return result
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    additionalSitemaps: [
      'https://sh-utility-builder.vercel.app/sitemap.xml',
    ],
  },
  transform: async (config, path) => {
    // 특정 페이지별 우선순위 조정
    const priorityMap = {
      '/': 1.0,
      '/tools': 0.9,
      '/tools/image-resize': 0.8,
      '/tools/heic-to-jpg': 0.8,
      '/tools/pdf-merge': 0.8,
      '/tools/webp-to-jpg': 0.8,
      '/tools/qr-generator': 0.8,
      '/tools/srt-editor': 0.8,
      '/faq': 0.7,
      '/contact': 0.6,
      '/privacy': 0.5,
      '/terms': 0.5,
    }

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priorityMap[path] || config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    }
  },
}
