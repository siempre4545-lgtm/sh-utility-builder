'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/Button';
import { 
  Upload, 
  Download, 
  Image as ImageIcon, 
  Settings, 
  RotateCcw,
  Info,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { cn, formatFileSize, validateFileType, validateFileSize } from '@/lib/utils';

interface ResizeOptions {
  width: number;
  height: number;
  maintainAspectRatio: boolean;
  quality: number;
  format: 'jpeg' | 'png' | 'webp';
}

export default function ImageResizePage() {
  const [files, setFiles] = useState<File[]>([]);
  const [processedFiles, setProcessedFiles] = useState<{ file: File; url: string }[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [options, setOptions] = useState<ResizeOptions>({
    width: 800,
    height: 600,
    maintainAspectRatio: true,
    quality: 85,
    format: 'jpeg'
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const validFiles = acceptedFiles.filter(file => {
      if (!validateFileType(file, ['.jpeg', '.jpg', '.png', '.webp', '.gif'])) {
        toast.error(`${file.name}은(는) 지원되지 않는 이미지 형식입니다.`);
        return false;
      }
      
      if (!validateFileSize(file, 10)) { // 10MB 제한
        toast.error(`${file.name}은(는) 10MB 이하여야 합니다.`);
        return false;
      }
      
      return true;
    });

    if (validFiles.length > 0) {
      setFiles(prev => [...prev, ...validFiles]);
      toast.success(`${validFiles.length}개 파일이 추가되었습니다.`);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif']
    },
    multiple: true
  });

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const processImages = async () => {
    if (files.length === 0) {
      toast.error('처리할 이미지를 선택해주세요.');
      return;
    }

    setIsProcessing(true);
    
    try {
      // 실제 구현에서는 API 호출
      const processed = await Promise.all(
        files.map(async (file) => {
          // 시뮬레이션된 처리 시간
          await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
          
          // 실제로는 서버에서 이미지 처리 후 URL 반환
          const url = URL.createObjectURL(file);
          return { file, url };
        })
      );
      
      setProcessedFiles(processed);
      toast.success('이미지 처리가 완료되었습니다!');
    } catch (error) {
      toast.error('이미지 처리 중 오류가 발생했습니다.');
      console.error('Processing error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadFile = (file: File, url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `resized_${file.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`${file.name} 다운로드가 시작되었습니다.`);
  };

  const resetAll = () => {
    setFiles([]);
    setProcessedFiles([]);
    toast.info('모든 설정이 초기화되었습니다.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full mb-4">
            <ImageIcon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            이미지 리사이즈 도구
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            이미지 크기를 조정하고 품질을 최적화하세요. 
            드래그 앤 드롭으로 간편하게 여러 이미지를 처리할 수 있습니다.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 왼쪽: 설정 패널 */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-6">
                  <Settings className="w-5 h-5 text-purple-600" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    리사이즈 설정
                  </h2>
                </div>

                <div className="space-y-6">
                  {/* 너비 설정 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      너비 (픽셀)
                    </label>
                    <input
                      type="number"
                      value={options.width}
                      onChange={(e) => setOptions(prev => ({ ...prev, width: parseInt(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      min="1"
                      max="4000"
                    />
                  </div>

                  {/* 높이 설정 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      높이 (픽셀)
                    </label>
                    <input
                      type="number"
                      value={options.height}
                      onChange={(e) => setOptions(prev => ({ ...prev, height: parseInt(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      min="1"
                      max="4000"
                    />
                  </div>

                  {/* 종횡비 유지 */}
                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={options.maintainAspectRatio}
                        onChange={(e) => setOptions(prev => ({ ...prev, maintainAspectRatio: e.target.checked }))}
                        className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        종횡비 유지
                      </span>
                    </label>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      이미지 왜곡을 방지합니다
                    </p>
                  </div>

                  {/* 품질 설정 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      품질: {options.quality}%
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={options.quality}
                      onChange={(e) => setOptions(prev => ({ ...prev, quality: parseInt(e.target.value) }))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    />
                  </div>

                  {/* 출력 형식 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      출력 형식
                    </label>
                    <select
                      value={options.format}
                      onChange={(e) => setOptions(prev => ({ ...prev, format: e.target.value as any }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      <option value="jpeg">JPEG</option>
                      <option value="png">PNG</option>
                      <option value="webp">WebP</option>
                    </select>
                  </div>

                  {/* 처리 버튼 */}
                  <Button
                    onClick={processImages}
                    disabled={files.length === 0 || isProcessing}
                    variant="primary"
                    size="lg"
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        처리 중...
                      </>
                    ) : (
                      <>
                        <ImageIcon className="w-5 h-5 mr-2" />
                        이미지 처리하기
                      </>
                    )}
                  </Button>

                  {/* 리셋 버튼 */}
                  <Button
                    onClick={resetAll}
                    variant="secondary"
                    size="lg"
                    className="w-full"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    모두 초기화
                  </Button>
                </div>
              </div>
            </div>

            {/* 오른쪽: 파일 업로드 및 결과 */}
            <div className="lg:col-span-2 space-y-6">
              {/* 파일 업로드 영역 */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  이미지 업로드
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  드래그 앤 드롭으로 이미지를 업로드하거나 클릭하여 선택하세요.
                </p>
                
                <div
                  {...getRootProps()}
                  className={cn(
                    "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200",
                    isDragActive
                      ? "border-purple-500 bg-purple-50 dark:bg-purple-900/10"
                      : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                  )}
                >
                  <input {...getInputProps()} />
                  <Upload className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    {isDragActive ? '여기에 파일을 놓으세요' : '이미지를 업로드하세요'}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    JPEG, PNG, WebP, GIF 파일을 지원합니다. (최대 10MB)
                  </p>
                </div>

                {/* 파일 목록 */}
                {files.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                      업로드된 파일 ({files.length})
                    </h4>
                    <div className="space-y-2">
                      {files.map((file, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <ImageIcon className="w-5 h-5 text-purple-500" />
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{file.name}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{formatFileSize(file.size)}</p>
                            </div>
                          </div>
                          <Button
                            onClick={() => removeFile(index)}
                            variant="danger"
                            size="sm"
                            className="p-2"
                          >
                            ×
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 처리 결과 */}
              {processedFiles.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700"
                >
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    처리 완료
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    리사이즈된 이미지를 다운로드할 수 있습니다.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {processedFiles.map((item, index) => (
                      <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {item.file.name}
                          </span>
                          <Button
                            onClick={() => downloadFile(item.file, item.url)}
                            variant="success"
                            size="sm"
                            className="flex items-center gap-2"
                          >
                            <Download className="w-4 h-4" />
                            다운로드
                          </Button>
                        </div>
                        <img
                          src={item.url}
                          alt={item.file.name}
                          className="w-full h-32 object-cover rounded"
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* 정보 및 제한사항 */}
              <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">사용 제한 및 주의사항</h4>
                    <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                      <li>• 무료 사용자는 일일 10개 파일까지 처리 가능</li>
                      <li>• 최대 파일 크기: 10MB (Pro: 100MB)</li>
                      <li>• 업로드된 파일은 24시간 후 자동 삭제됩니다</li>
                      <li>• 저작권이 있는 이미지는 업로드하지 마세요</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
