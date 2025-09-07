// 네이버 웹마스터 사이트 소유확인 메타 태그 테스트 스크립트
// 사용법: node test-naver-verification.js

const https = require('https');

const url = 'https://sh-utility-builder.vercel.app/';
const expectedMetaTag = 'c51fc9864b7f6355bb7ec5f67c10d4933ce6e230';

console.log('🔍 네이버 웹마스터 사이트 소유확인 메타 태그 테스트');
console.log('='.repeat(60));

https.get(url, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log(`📡 응답 상태: ${res.statusCode}`);
    console.log(`📄 응답 크기: ${data.length} bytes`);
    console.log('');
    
    // 메타 태그 검색
    const metaTagRegex = /<meta[^>]*name=["']naver-site-verification["'][^>]*content=["']([^"']+)["'][^>]*>/i;
    const match = data.match(metaTagRegex);
    
    if (match) {
      const foundContent = match[1];
      console.log('✅ 네이버 사이트 검증 메타 태그 발견!');
      console.log(`📋 발견된 content: ${foundContent}`);
      console.log(`🎯 예상된 content: ${expectedMetaTag}`);
      
      if (foundContent === expectedMetaTag) {
        console.log('🎉 메타 태그가 올바르게 설정되었습니다!');
        console.log('');
        console.log('📝 다음 단계:');
        console.log('1. 네이버 웹마스터 도구에 접속');
        console.log('2. 사이트 등록 후 "확인" 버튼 클릭');
        console.log('3. 성공 메시지 확인');
      } else {
        console.log('❌ 메타 태그 content가 예상값과 다릅니다!');
        console.log('   배포가 완료되었는지 확인하세요.');
      }
    } else {
      console.log('❌ 네이버 사이트 검증 메타 태그를 찾을 수 없습니다!');
      console.log('');
      console.log('🔍 전체 <head> 섹션 검색 중...');
      
      const headMatch = data.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
      if (headMatch) {
        const headContent = headMatch[1];
        console.log('📄 <head> 섹션 내용:');
        console.log(headContent.substring(0, 500) + '...');
      }
    }
    
    console.log('');
    console.log('🔗 테스트 URL:', url);
    console.log('⏰ 테스트 시간:', new Date().toLocaleString('ko-KR'));
  });
  
}).on('error', (err) => {
  console.error('❌ 요청 실패:', err.message);
  console.log('');
  console.log('🔧 문제 해결 방법:');
  console.log('1. 인터넷 연결 확인');
  console.log('2. Vercel 배포 상태 확인');
  console.log('3. 잠시 후 다시 시도');
});
