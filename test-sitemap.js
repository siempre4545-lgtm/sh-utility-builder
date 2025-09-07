// 사이트맵 테스트 스크립트
// 사용법: node test-sitemap.js

const https = require('https');
const fs = require('fs');
const path = require('path');

const siteUrl = 'https://sh-utility-builder.vercel.app';
const sitemapUrl = `${siteUrl}/sitemap.xml`;
const robotsUrl = `${siteUrl}/robots.txt`;

console.log('🔍 사이트맵 연결 상태 테스트');
console.log('='.repeat(60));

// 사이트맵 테스트
function testSitemap() {
  return new Promise((resolve, reject) => {
    console.log(`📡 사이트맵 테스트: ${sitemapUrl}`);
    
    https.get(sitemapUrl, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log(`📄 응답 상태: ${res.statusCode}`);
        console.log(`📄 응답 크기: ${data.length} bytes`);
        console.log(`📄 Content-Type: ${res.headers['content-type']}`);
        
        if (res.statusCode === 200) {
          // XML 형식 검증
          if (data.includes('<?xml') && data.includes('<urlset')) {
            console.log('✅ 사이트맵 XML 형식 올바름');
            
            // URL 개수 확인
            const urlMatches = data.match(/<loc>/g);
            const urlCount = urlMatches ? urlMatches.length : 0;
            console.log(`📊 포함된 URL 개수: ${urlCount}`);
            
            // 주요 URL 확인
            const expectedUrls = [
              '/',
              '/tools',
              '/tools/image-resize',
              '/tools/heic-to-jpg',
              '/tools/pdf-merge',
              '/tools/webp-to-jpg',
              '/faq',
              '/contact'
            ];
            
            let foundUrls = 0;
            expectedUrls.forEach(url => {
              if (data.includes(`${siteUrl}${url}`)) {
                foundUrls++;
              }
            });
            
            console.log(`📊 예상 URL 중 발견된 개수: ${foundUrls}/${expectedUrls.length}`);
            
            if (foundUrls === expectedUrls.length) {
              console.log('✅ 모든 예상 URL이 포함됨');
            } else {
              console.log('⚠️ 일부 URL이 누락됨');
            }
            
            resolve({ success: true, data, urlCount });
          } else {
            console.log('❌ 사이트맵 XML 형식 오류');
            resolve({ success: false, error: 'Invalid XML format' });
          }
        } else {
          console.log(`❌ 사이트맵 접근 실패: ${res.statusCode}`);
          resolve({ success: false, error: `HTTP ${res.statusCode}` });
        }
      });
      
    }).on('error', (err) => {
      console.log(`❌ 사이트맵 요청 실패: ${err.message}`);
      resolve({ success: false, error: err.message });
    });
  });
}

// robots.txt 테스트
function testRobotsTxt() {
  return new Promise((resolve, reject) => {
    console.log(`\n📡 robots.txt 테스트: ${robotsUrl}`);
    
    https.get(robotsUrl, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log(`📄 응답 상태: ${res.statusCode}`);
        console.log(`📄 응답 크기: ${data.length} bytes`);
        
        if (res.statusCode === 200) {
          if (data.includes('Sitemap:') && data.includes('sitemap.xml')) {
            console.log('✅ robots.txt에 사이트맵 참조 포함됨');
            resolve({ success: true, data });
          } else {
            console.log('❌ robots.txt에 사이트맵 참조 누락');
            resolve({ success: false, error: 'Missing sitemap reference' });
          }
        } else {
          console.log(`❌ robots.txt 접근 실패: ${res.statusCode}`);
          resolve({ success: false, error: `HTTP ${res.statusCode}` });
        }
      });
      
    }).on('error', (err) => {
      console.log(`❌ robots.txt 요청 실패: ${err.message}`);
      resolve({ success: false, error: err.message });
    });
  });
}

// 로컬 사이트맵 파일 테스트
function testLocalSitemap() {
  return new Promise((resolve) => {
    console.log('\n📁 로컬 사이트맵 파일 테스트');
    
    const sitemapPath = path.join(__dirname, 'public', 'sitemap.xml');
    const robotsPath = path.join(__dirname, 'public', 'robots.txt');
    
    if (fs.existsSync(sitemapPath)) {
      const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
      console.log('✅ 로컬 sitemap.xml 파일 존재');
      console.log(`📄 파일 크기: ${sitemapContent.length} bytes`);
      
      if (sitemapContent.includes('<?xml') && sitemapContent.includes('<urlset')) {
        console.log('✅ 로컬 사이트맵 XML 형식 올바름');
      } else {
        console.log('❌ 로컬 사이트맵 XML 형식 오류');
      }
    } else {
      console.log('❌ 로컬 sitemap.xml 파일 없음');
    }
    
    if (fs.existsSync(robotsPath)) {
      const robotsContent = fs.readFileSync(robotsPath, 'utf8');
      console.log('✅ 로컬 robots.txt 파일 존재');
      console.log(`📄 파일 크기: ${robotsContent.length} bytes`);
    } else {
      console.log('❌ 로컬 robots.txt 파일 없음');
    }
    
    resolve();
  });
}

// 메인 테스트 실행
async function runTests() {
  try {
    // 로컬 파일 테스트
    await testLocalSitemap();
    
    // 원격 사이트맵 테스트
    const sitemapResult = await testSitemap();
    
    // 원격 robots.txt 테스트
    const robotsResult = await testRobotsTxt();
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 테스트 결과 요약');
    console.log('='.repeat(60));
    
    console.log(`사이트맵 접근: ${sitemapResult.success ? '✅ 성공' : '❌ 실패'}`);
    console.log(`robots.txt 접근: ${robotsResult.success ? '✅ 성공' : '❌ 실패'}`);
    
    if (sitemapResult.success && robotsResult.success) {
      console.log('\n🎉 사이트맵 연결 상태 정상!');
      console.log('구글 서치 콘솔에서 사이트맵을 다시 제출해보세요.');
    } else {
      console.log('\n⚠️ 사이트맵 연결 문제 발견');
      console.log('다음 단계를 시도해보세요:');
      console.log('1. npm run sitemap (사이트맵 재생성)');
      console.log('2. git add . && git commit && git push (배포)');
      console.log('3. 잠시 후 다시 테스트');
    }
    
  } catch (error) {
    console.error('❌ 테스트 실행 실패:', error.message);
  }
}

// 테스트 실행
runTests();
