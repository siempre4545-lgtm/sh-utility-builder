import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Search, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-md w-full mx-4 text-center">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
          <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
            <Search className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            페이지를 찾을 수 없습니다
          </h1>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => window.history.back()}
              variant="secondary"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              이전 페이지
            </Button>
            
            <Link href="/">
              <Button
                variant="primary"
                className="flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                홈으로
              </Button>
            </Link>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              유용한 도구들을 찾아보세요:
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <Link href="/tools/image-resize" className="text-blue-600 dark:text-blue-400 hover:underline">
                이미지 리사이즈
              </Link>
              <Link href="/tools/heic-to-jpg" className="text-blue-600 dark:text-blue-400 hover:underline">
                HEIC → JPG
              </Link>
              <Link href="/tools/pdf-merge" className="text-blue-600 dark:text-blue-400 hover:underline">
                PDF 병합
              </Link>
              <Link href="/tools/webp-to-jpg" className="text-blue-600 dark:text-blue-400 hover:underline">
                WebP → JPG
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
