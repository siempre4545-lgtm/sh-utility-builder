#!/usr/bin/env node

/**
 * LemonSqueezy 프로덕션 설정 스크립트
 * 
 * 이 스크립트는 LemonSqueezy 정식 승인 후 프로덕션 설정을 도와줍니다.
 * 
 * 사용법:
 * node scripts/lemonsqueezy-production-setup.js
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 LemonSqueezy 프로덕션 설정 도우미');
console.log('=====================================\n');

// 환경 변수 파일 경로
const envExamplePath = path.join(__dirname, '..', 'env.example');
const envLocalPath = path.join(__dirname, '..', '.env.local');

console.log('📋 프로덕션 설정 체크리스트:');
console.log('');

const checklist = [
  {
    step: '1. LemonSqueezy 정식 승인 확인',
    description: 'LemonSqueezy 대시보드에서 계정이 승인되었는지 확인',
    action: 'https://app.lemonsqueezy.com/dashboard'
  },
  {
    step: '2. 테스트 모드 비활성화',
    description: 'LemonSqueezy 대시보드에서 Test Mode를 OFF로 변경',
    action: 'https://app.lemonsqueezy.com/settings'
  },
  {
    step: '3. 프로덕션 Buy Link 생성',
    description: '월간/연간 플랜의 Live Buy Link 생성',
    action: 'https://app.lemonsqueezy.com/products'
  },
  {
    step: '4. 프로덕션 웹훅 설정',
    description: '새로운 프로덕션 웹훅 생성 및 시크릿 복사',
    action: 'https://app.lemonsqueezy.com/settings/webhooks'
  },
  {
    step: '5. Vercel 환경 변수 업데이트',
    description: 'Vercel 대시보드에서 환경 변수 업데이트',
    action: 'https://vercel.com/dashboard'
  },
  {
    step: '6. 프로덕션 테스트',
    description: '실제 결제 플로우 테스트',
    action: 'https://sh-utility-builder.vercel.app'
  }
];

checklist.forEach((item, index) => {
  console.log(`${item.step}`);
  console.log(`   📝 ${item.description}`);
  console.log(`   🔗 ${item.action}`);
  console.log('');
});

console.log('📄 환경 변수 설정 가이드:');
console.log('');

if (fs.existsSync(envExamplePath)) {
  const envContent = fs.readFileSync(envExamplePath, 'utf8');
  const lemonSqueezySection = envContent.split('\n').filter(line => 
    line.includes('LEMONSQUEEZY') || line.includes('LemonSqueezy')
  ).join('\n');
  
  console.log(lemonSqueezySection);
  console.log('');
}

console.log('⚠️  주의사항:');
console.log('- 테스트 모드를 비활성화하기 전에 모든 설정이 완료되었는지 확인하세요');
console.log('- 프로덕션 Buy Link는 테스트 모드 비활성화 후에만 생성할 수 있습니다');
console.log('- 웹훅 시크릿은 프로덕션과 테스트에서 다를 수 있습니다');
console.log('- 환경 변수 업데이트 후 Vercel 재배포가 필요할 수 있습니다');
console.log('');

console.log('✅ 설정 완료 후 다음 명령어로 테스트:');
console.log('npm run dev');
console.log('');
console.log('🔍 웹훅 테스트:');
console.log('curl -X GET https://sh-utility-builder.vercel.app/api/webhooks/lemonsqueezy');
console.log('');

// .env.local 파일이 있는지 확인
if (fs.existsSync(envLocalPath)) {
  console.log('📁 .env.local 파일이 발견되었습니다.');
  console.log('프로덕션 설정을 위해 다음 변수들을 업데이트하세요:');
  console.log('- NEXT_PUBLIC_LEMONSQUEEZY_MONTHLY_BUY_LINK');
  console.log('- NEXT_PUBLIC_LEMONSQUEEZY_YEARLY_BUY_LINK');
  console.log('- LEMONSQUEEZY_WEBHOOK_SECRET');
  console.log('');
} else {
  console.log('📁 .env.local 파일이 없습니다.');
  console.log('env.example을 복사하여 .env.local을 생성하세요:');
  console.log('cp env.example .env.local');
  console.log('');
}

console.log('🎉 프로덕션 설정이 완료되면 실제 결제가 가능합니다!');
