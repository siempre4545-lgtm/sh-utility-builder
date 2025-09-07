/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://sh-utility-builder.vercel.app',
  generateRobotsTxt: false, // 수동으로 생성하므로 비활성화
  generateIndexSitemap: false,
  exclude: ['/api/*', '/admin/*', '/success', '/cancel'],
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  autoLastmod: true,
  // 사이트맵 자동 생성 완전 비활성화
  generateSitemap: false,
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
    additionalSitemaps: [
      'https://sh-utility-builder.vercel.app/sitemap.xml',
    ],
    host: 'https://sh-utility-builder.vercel.app',
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

    // script 태그나 잘못된 경로 제외
    if (path.includes('<script') || path.includes('script>') || path.includes('</script>')) {
      return null
    }

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priorityMap[path] || config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    }
  },
}
