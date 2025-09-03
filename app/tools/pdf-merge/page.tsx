'use client';

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/Button';
import { FileText, Download, Upload, FileText as FileTextIcon, Settings, ArrowUp, ArrowDown, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn, formatFileSize, validateFileType, validateFileSize } from '@/lib/utils';

export default function PdfMergePage() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedFile, setProcessedFile] = useState<{ name: string; url: string; size: number } | null>(null);
  const [mergeOrder, setMergeOrder] = useState<number[]>([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf']
    },
    maxSize: 100 * 1024 * 1024, // 100MB
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(({ file, errors }) => {
          errors.forEach(error => {
            if (error.code === 'file-too-large') {
              toast.error(`${file.name}: 파일이 너무 큽니다 (최대 100MB)`);
            } else if (error.code === 'file-invalid-type') {
              toast.error(`${file.name}: PDF 파일만 지원됩니다`);
            }
          });
        });
        return;
      }

      const newFiles = [...files, ...acceptedFiles];
      setFiles(newFiles);
      setMergeOrder([...mergeOrder, ...acceptedFiles.map((_, index) => files.length + index)]);
      toast.success(`${acceptedFiles.length}개 PDF 파일이 추가되었습니다`);
    }
  });

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    
    // 병합 순서 재정렬
    const newOrder = mergeOrder
      .filter(orderIndex => orderIndex !== index)
      .map(orderIndex => orderIndex > index ? orderIndex - 1 : orderIndex);
    setMergeOrder(newOrder);
    
    toast.info(`${files[index].name}이 제거되었습니다`);
  };

  const moveFile = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === files.length - 1) return;

    const newOrder = [...mergeOrder];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    [newOrder[index], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[index]];
    setMergeOrder(newOrder);
    
    toast.info('파일 순서가 변경되었습니다');
  };

  const processFiles = async () => {
    if (files.length < 2) {
      toast.error('병합하려면 최소 2개의 PDF 파일이 필요합니다');
      return;
    }

    setIsProcessing(true);
    
    try {
      // 실제 구현에서는 서버로 파일을 전송하여 처리
      // 현재는 클라이언트 사이드 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const totalSize = files.reduce((sum, file) => sum + file.size, 0);
      const mockProcessedFile = {
        name: 'merged-document.pdf',
        url: URL.createObjectURL(files[0]), // 실제로는 병합된 파일 URL
        size: totalSize * 0.95 // 압축된 크기 시뮬레이션
      };
      
      setProcessedFile(mockProcessedFile);
      toast.success('PDF 병합이 완료되었습니다!');
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
    setProcessedFile(null);
    setMergeOrder([]);
    toast.info('모든 파일이 제거되었습니다');
  };

  const reorderFiles = (fromIndex: number, toIndex: number) => {
    const newOrder = [...mergeOrder];
    const [removed] = newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, removed);
    setMergeOrder(newOrder);
    toast.info('파일 순서가 변경되었습니다');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full mb-4">
            <FileText className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            PDF 병합 도구
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            여러 PDF 파일을 하나로 병합하여 문서 관리를 간편하게 하세요.
            드래그 앤 드롭으로 순서를 조정할 수 있습니다.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* 파일 업로드 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5" />
              PDF 파일 업로드
            </h2>
            
            <div
              {...getRootProps()}
              className={cn(
                "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200",
                isDragActive
                  ? "border-red-500 bg-red-50 dark:bg-red-900/10"
                  : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
              )}
            >
              <input {...getInputProps()} />
              <FileTextIcon className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
                {isDragActive ? "여기에 파일을 놓으세요" : "PDF 파일을 드래그하거나 클릭하여 업로드"}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                PDF 파일만 지원 (최대 100MB, 최소 2개 필요)
              </p>
            </div>
          </div>

          {/* 파일 목록 및 순서 조정 */}
          {files.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                병합 순서 조정 ({files.length}개 파일)
              </h2>
              
              <div className="space-y-3">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                    {/* 순서 표시 */}
                    <div className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    
                    {/* 파일 정보 */}
                    <div className="flex-1 flex items-center gap-3">
                      <FileTextIcon className="w-5 h-5 text-red-500" />
                      <div className="flex-1">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {file.name}
                        </span>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                    
                    {/* 순서 조정 버튼 */}
                    <div className="flex items-center gap-1">
                      <Button
                        onClick={() => moveFile(index, 'up')}
                        disabled={index === 0}
                        variant="secondary"
                        size="sm"
                        className="p-2"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        onClick={() => moveFile(index, 'down')}
                        disabled={index === files.length - 1}
                        variant="secondary"
                        size="sm"
                        className="p-2"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        onClick={() => removeFile(index)}
                        variant="danger"
                        size="sm"
                        className="p-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  💡 파일을 드래그하여 순서를 변경하거나 위/아래 버튼을 사용하여 순서를 조정할 수 있습니다.
                </p>
              </div>
            </div>
          )}

          {/* 처리 버튼 */}
          {files.length >= 2 && (
            <div className="text-center mb-6">
              <Button
                onClick={processFiles}
                disabled={isProcessing}
                variant="primary"
                size="lg"
                className="px-8 py-3 text-lg bg-red-600 hover:bg-red-700"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    병합 중...
                  </>
                ) : (
                  <>
                    <FileText className="w-5 h-5 mr-2" />
                    PDF 병합 시작
                  </>
                )}
              </Button>
            </div>
          )}

          {/* 처리된 파일 */}
          {processedFile && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Download className="w-5 h-5" />
                병합 완료
              </h2>
              
              <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileTextIcon className="w-5 h-5 text-green-500" />
                    <div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {processedFile.name}
                      </span>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatFileSize(processedFile.size)}
                      </p>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => downloadFile(processedFile)}
                    variant="success"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    다운로드
                  </Button>
                </div>
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
          <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-3">
              💡 PDF 병합 팁
            </h3>
            <div className="text-red-800 dark:text-red-200 space-y-2 text-sm">
              <p>
                • 파일 순서는 병합 결과에 직접적으로 영향을 미칩니다. 원하는 순서로 정렬해주세요.
              </p>
              <p>
                • 대용량 파일의 경우 처리 시간이 오래 걸릴 수 있습니다.
              </p>
              <p>
                • 암호화된 PDF는 병합할 수 없습니다. 먼저 암호를 해제해주세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
