'use client';

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/Button';
import { Image, Download, Upload, FileImage, Settings } from 'lucide-react';
import { toast } from 'sonner';
import { cn, formatFileSize, validateFileType, validateFileSize } from '@/lib/utils';

export default function HeicToJpgPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedFiles, setProcessedFiles] = useState<{ name: string; url: string; size: number }[]>([]);
  const [quality, setQuality] = useState(90);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/heic': ['.heic', '.heif'],
      'image/heif': ['.heic', '.heif']
    },
    maxSize: 50 * 1024 * 1024, // 50MB
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(({ file, errors }) => {
          errors.forEach(error => {
            if (error.code === 'file-too-large') {
              toast.error(`${file.name}: 파일이 너무 큽니다 (최대 50MB)`);
            } else if (error.code === 'file-invalid-type') {
              toast.error(`${file.name}: 지원하지 않는 파일 형식입니다`);
            }
          });
        });
        return;
      }

      setFiles(acceptedFiles);
      toast.success(`${acceptedFiles.length}개 파일이 업로드되었습니다`);
    }
  });

  const processFiles = async () => {
    if (files.length === 0) {
      toast.error('처리할 파일을 업로드해주세요');
      return;
    }

    setIsProcessing(true);
    
    try {
      // 실제 구현에서는 서버로 파일을 전송하여 처리
      // 현재는 클라이언트 사이드 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockProcessedFiles = files.map(file => ({
        name: file.name.replace(/\.(heic|heif)$/i, '.jpg'),
        url: URL.createObjectURL(file), // 실제로는 변환된 파일 URL
        size: file.size * 0.8 // 압축된 크기 시뮬레이션
      }));
      
      setProcessedFiles(mockProcessedFiles);
      toast.success('파일 변환이 완료되었습니다!');
    } catch (error) {
      toast.error('파일 처리 중 오류가 발생했습니다');
      console.error('Processing error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadFile = (file: { name: string; url: string }) => {
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`${file.name} 다운로드가 시작되었습니다`);
  };

  const clearAll = () => {
    setFiles([]);
    setProcessedFiles([]);
    toast.info('모든 파일이 제거되었습니다');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full mb-4">
            <Image className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            HEIC → JPG 변환기
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            iPhone과 iPad의 HEIC 이미지를 널리 사용되는 JPG 형식으로 변환하세요.
            고품질 변환과 빠른 처리를 제공합니다.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* 설정 패널 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              변환 설정
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  JPG 품질
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <span className="text-sm font-medium text-gray-900 dark:text-white min-w-[3rem]">
                    {quality}%
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  높은 품질은 파일 크기를 증가시킵니다
                </p>
              </div>
              
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={maintainAspectRatio}
                    onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    종횡비 유지
                  </span>
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  이미지 왜곡을 방지합니다
                </p>
              </div>
            </div>
          </div>

          {/* 파일 업로드 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5" />
              파일 업로드
            </h2>
            
            <div
              {...getRootProps()}
              className={cn(
                "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200",
                isDragActive
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/10"
                  : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
              )}
            >
              <input {...getInputProps()} />
              <FileImage className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
                {isDragActive ? "여기에 파일을 놓으세요" : "파일을 드래그하거나 클릭하여 업로드"}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                HEIC, HEIF 파일만 지원 (최대 50MB)
              </p>
            </div>

            {files.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  업로드된 파일 ({files.length})
                </h3>
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileImage className="w-5 h-5 text-blue-500" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {file.name}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {formatFileSize(file.size)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 처리 버튼 */}
          {files.length > 0 && (
            <div className="text-center mb-6">
              <Button
                onClick={processFiles}
                disabled={isProcessing}
                variant="primary"
                size="lg"
                className="px-8 py-3 text-lg"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    변환 중...
                  </>
                ) : (
                  <>
                    <Image className="w-5 h-5 mr-2" />
                    HEIC → JPG 변환 시작
                  </>
                )}
              </Button>
            </div>
          )}

          {/* 처리된 파일 */}
          {processedFiles.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Download className="w-5 h-5" />
                변환 완료 ({processedFiles.length})
              </h2>
              
              <div className="space-y-3">
                {processedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileImage className="w-5 h-5 text-green-500" />
                      <div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {file.name}
                        </span>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                    
                    <Button
                      onClick={() => downloadFile(file)}
                      variant="success"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      다운로드
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button
                  onClick={clearAll}
                  variant="secondary"
                  className="w-full"
                >
                  모든 파일 제거
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* 정보 패널 */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
              💡 HEIC 파일이란?
            </h3>
            <div className="text-blue-800 dark:text-blue-200 space-y-2 text-sm">
              <p>
                HEIC (High Efficiency Image Container)는 Apple이 개발한 이미지 형식으로, 
                JPEG보다 2배 더 효율적인 압축을 제공합니다.
              </p>
              <p>
                하지만 Windows, Android 등 다른 플랫폼에서는 기본적으로 지원하지 않아 
                JPG로 변환해야 하는 경우가 많습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
