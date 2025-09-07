// 수동 사이트맵 생성 스크립트
// 사용법: node generate-sitemap.js

const fs = require('fs');
const path = require('path');

const siteUrl = 'https://sh-utility-builder.vercel.app';
const currentDate = new Date().toISOString();

// 사이트맵에 포함할 페이지들
const pages = [
  {
    loc: '/',
    changefreq: 'daily',
    priority: 1.0,
    lastmod: currentDate,
  },
  {
    loc: '/tools',
    changefreq: 'weekly',
    priority: 0.9,
    lastmod: currentDate,
  },
  {
    loc: '/tools/image-resize',
    changefreq: 'weekly',
    priority: 0.8,
    lastmod: currentDate,
  },
  {
    loc: '/tools/heic-to-jpg',
    changefreq: 'weekly',
    priority: 0.8,
    lastmod: currentDate,
  },
  {
    loc: '/tools/pdf-merge',
    changefreq: 'weekly',
    priority: 0.8,
    lastmod: currentDate,
  },
  {
    loc: '/tools/webp-to-jpg',
    changefreq: 'weekly',
    priority: 0.8,
    lastmod: currentDate,
  },
  {
    loc: '/tools/qr-generator',
    changefreq: 'weekly',
    priority: 0.8,
    lastmod: currentDate,
  },
  {
    loc: '/tools/srt-editor',
    changefreq: 'weekly',
    priority: 0.8,
    lastmod: currentDate,
  },
  {
    loc: '/faq',
    changefreq: 'monthly',
    priority: 0.7,
    lastmod: currentDate,
  },
  {
    loc: '/contact',
    changefreq: 'monthly',
    priority: 0.6,
    lastmod: currentDate,
  },
  {
    loc: '/privacy',
    changefreq: 'monthly',
    priority: 0.5,
    lastmod: currentDate,
  },
  {
    loc: '/terms',
    changefreq: 'monthly',
    priority: 0.5,
    lastmod: currentDate,
  },
];

// XML 사이트맵 생성
function generateSitemap() {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  pages.forEach(page => {
    sitemap += `
  <url>
    <loc>${siteUrl}${page.loc}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  });

  sitemap += `
</urlset>`;

  return sitemap;
}

// robots.txt 생성
function generateRobotsTxt() {
  return `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /success
Disallow: /cancel

User-agent: Googlebot
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /success
Disallow: /cancel

User-agent: Yeti
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /success
Disallow: /cancel

Sitemap: ${siteUrl}/sitemap.xml
Host: ${siteUrl}`;
}

// 파일 생성
try {
  // public 디렉토리 확인
  const publicDir = path.join(__dirname, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // 사이트맵 생성
  const sitemap = generateSitemap();
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
  console.log('✅ sitemap.xml 생성 완료');

  // robots.txt 생성
  const robotsTxt = generateRobotsTxt();
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt);
  console.log('✅ robots.txt 생성 완료');

  console.log('');
  console.log('📋 생성된 파일:');
  console.log(`- ${path.join(publicDir, 'sitemap.xml')}`);
  console.log(`- ${path.join(publicDir, 'robots.txt')}`);
  console.log('');
  console.log('🔗 사이트맵 URL:');
  console.log(`${siteUrl}/sitemap.xml`);
  console.log('');
  console.log('🔗 robots.txt URL:');
  console.log(`${siteUrl}/robots.txt`);

} catch (error) {
  console.error('❌ 사이트맵 생성 실패:', error.message);
  process.exit(1);
}
