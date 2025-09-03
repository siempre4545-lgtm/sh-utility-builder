// 파일 관련 타입
export interface FileInfo {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: Date;
  expiresAt: Date;
  path: string;
  originalName: string;
}

export interface FileUploadResponse {
  success: boolean;
  file?: FileInfo;
  error?: string;
  message?: string;
}

export interface FileProcessRequest {
  fileId: string;
  operation: string;
  options?: Record<string, any>;
}

export interface FileProcessResponse {
  success: boolean;
  result?: {
    downloadUrl: string;
    fileName: string;
    fileSize: number;
  };
  error?: string;
  message?: string;
}

// 사용자 관련 타입
export interface User {
  id: string;
  email: string;
  plan: 'free' | 'pro' | 'enterprise';
  usage: {
    uploads: number;
    downloads: number;
    storage: number;
  };
  limits: {
    maxFileSize: number;
    maxUploads: number;
    maxStorage: number;
  };
}

// 유틸리티 도구 타입
export interface Utility {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  route: string;
  isPro: boolean;
  maxFileSize: number;
  supportedFormats: string[];
  features: string[];
}

// API 응답 타입
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

// 에러 타입
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
}

// 설정 타입
export interface AppConfig {
  maxFileSize: number;
  allowedFileTypes: string[];
  uploadTimeout: number;
  processingTimeout: number;
  retentionPeriod: number; // 시간 단위
}

// 파일 처리 옵션 타입
export interface ImageProcessOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'jpeg' | 'png' | 'webp' | 'avif';
  resize?: 'fit' | 'fill' | 'crop';
}

export interface PDFProcessOptions {
  pages?: number[];
  password?: string;
  watermark?: string;
  merge?: boolean;
}

export interface ArchiveProcessOptions {
  password?: string;
  compression?: 'store' | 'deflate' | 'bzip2';
  level?: number;
}

// 결제 관련 타입
export interface Subscription {
  id: string;
  plan: 'free' | 'pro' | 'enterprise';
  status: 'active' | 'canceled' | 'expired';
  startDate: Date;
  endDate: Date;
  price: number;
  currency: string;
}

// 로그 타입
export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  details: any;
  timestamp: Date;
  ipAddress?: string;
  userAgent?: string;
}
