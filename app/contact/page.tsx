'use client'

import { useState } from 'react'

// 캐싱 비활성화 - 실시간 업데이트 보장
export const dynamic = 'force-dynamic'
export const revalidate = 0
import { Button } from '@/components/ui/Button'
import { Mail, MessageSquare, Send, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // 실제로는 API 엔드포인트로 전송
      await new Promise(resolve => setTimeout(resolve, 1000)) // 시뮬레이션
      
      setIsSubmitted(true)
      toast.success('문의가 성공적으로 전송되었습니다!')
    } catch (error) {
      toast.error('문의 전송 중 오류가 발생했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              문의가 전송되었습니다!
            </h1>
            <p className="text-gray-600 mb-8">
              문의해 주셔서 감사합니다. 24시간 이내에 답변드리겠습니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/" 
                className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
              >
                홈으로 돌아가기
              </a>
              <button 
                onClick={() => {
                  setIsSubmitted(false)
                  setFormData({ name: '', email: '', subject: '', message: '', category: 'general' })
                }}
                className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
              >
                새 문의 작성
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            문의하기
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            SH Tools에 대한 문의사항이나 제안사항이 있으시면 언제든지 연락해 주세요.
            빠른 시일 내에 답변드리겠습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                문의 양식
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      이름 *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="홍길동"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      이메일 *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="example@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    문의 유형 *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="input-field"
                  >
                    <option value="general">일반 문의</option>
                    <option value="bug">버그 신고</option>
                    <option value="feature">기능 제안</option>
                    <option value="billing">결제 문의</option>
                    <option value="privacy">개인정보 문의</option>
                    <option value="other">기타</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    제목 *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="문의 제목을 입력해 주세요"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    내용 *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="input-field resize-none"
                    placeholder="문의 내용을 자세히 입력해 주세요. 문제가 발생한 도구, 오류 메시지, 재현 단계 등을 포함해 주시면 더 빠른 해결이 가능합니다."
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      전송 중...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      문의 전송
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {/* Contact Methods */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                연락처 정보
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-primary-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">이메일</p>
                    <p className="text-sm text-gray-600">support@shtools.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="w-5 h-5 text-primary-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">응답 시간</p>
                    <p className="text-sm text-gray-600">24시간 이내</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Link */}
            <div className="card bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                자주 묻는 질문
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                문의하기 전에 FAQ를 확인해 보세요. 
                빠른 해결책을 찾을 수 있습니다.
              </p>
              <a 
                href="/faq" 
                className="text-primary-600 hover:text-primary-700 font-medium text-sm"
              >
                FAQ 보기 →
              </a>
            </div>

            {/* Privacy Notice */}
            <div className="card bg-blue-50 border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                개인정보 보호
              </h3>
              <p className="text-blue-800 text-sm">
                문의 시 제공해 주신 개인정보는 문의 처리 목적으로만 사용되며, 
                처리 완료 후 즉시 삭제됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
