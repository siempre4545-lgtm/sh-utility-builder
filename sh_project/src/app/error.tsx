'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // 에러 로깅 (개발 환경에서만)
    if (process.env.NODE_ENV === 'development') {
      console.error('Error:', error);
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-md w-full mx-4 text-center">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
          <div className="w-16 h-16 mx-auto mb-6 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            문제가 발생했습니다
          </h1>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            예상치 못한 오류가 발생했습니다. 다시 시도하거나 홈으로 돌아가주세요.
          </p>
          
          {process.env.NODE_ENV === 'development' && (
            <details className="mb-6 text-left">
              <summary className="cursor-pointer text-sm text-gray-500 dark:text-gray-400 mb-2">
                개발자 정보
              </summary>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-xs font-mono text-gray-700 dark:text-gray-300 overflow-auto">
                <div>Error: {error.message}</div>
                {error.digest && <div>Digest: {error.digest}</div>}
                <div>Stack: {error.stack}</div>
              </div>
            </details>
          )}
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={reset}
              variant="primary"
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              다시 시도
            </Button>
            
            <Button
              onClick={() => window.location.href = '/'}
              variant="secondary"
              className="flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              홈으로
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
