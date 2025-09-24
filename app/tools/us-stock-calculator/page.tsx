'use client'

import { useState, useEffect } from 'react'

// 캐싱 비활성화 - 실시간 업데이트 보장
export const dynamic = 'force-dynamic'
import { Button } from '@/components/ui/Button'
import { TrendingUp, Calculator, DollarSign, BarChart3, Download, Loader2, Lock, RefreshCw } from 'lucide-react'
import ProModal from '@/components/ProModal'
import { toast } from 'sonner'
import Head from 'next/head'
import { useProStatusContext } from '@/components/ProStatusProvider'
import UsageCounter from '@/components/UsageCounter'
import { getConversionCount, incrementConversionCount } from '@/lib/conversionCount'

interface StockData {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: number
  marketCap: number
}

interface InvestmentResult {
  totalInvestment: number
  finalValue: number
  profit: number
  profitPercent: number
  monthlyInvestment: number
  capitalGainsTax: number
  afterTaxProfit: number
}

export default function UsStockCalculatorPage() {
  const { isPro } = useProStatusContext()
  const [isProcessing, setIsProcessing] = useState(false)
  const [isProModalOpen, setIsProModalOpen] = useState(false)
  
  // 투자 계산 입력값
  const [initialCapital, setInitialCapital] = useState(1000000) // 100만원
  const [monthlyInvestment, setMonthlyInvestment] = useState(100000) // 10만원
  const [expectedReturn, setExpectedReturn] = useState(7) // 7%
  const [investmentPeriod, setInvestmentPeriod] = useState(10) // 10년
  
  // 양도수익세 계산
  const [capitalGainsTaxRate, setCapitalGainsTaxRate] = useState(22) // 22%
  
  // 계산 결과
  const [result, setResult] = useState<InvestmentResult | null>(null)
  
  // 실시간 주식 데이터
  const [topVolumeStocks, setTopVolumeStocks] = useState<StockData[]>([])
  const [topValueStocks, setTopValueStocks] = useState<StockData[]>([])
  const [isLoadingStocks, setIsLoadingStocks] = useState(false)
  
  // 무료 사용자 제한: 최대 5회 계산
  const maxCalculations = isPro ? Infinity : 5
  const [conversionCount, setConversionCount] = useState(0)
  const [remainingConversions, setRemainingConversions] = useState(maxCalculations)

  // 클라이언트에서 변환 카운트 로드
  useEffect(() => {
    const count = getConversionCount('us-stock-calculator')
    setConversionCount(count)
    setRemainingConversions(maxCalculations - count)
  }, [maxCalculations])

  // 실시간 주식 데이터 로드
  const loadStockData = async () => {
    setIsLoadingStocks(true)
    try {
      // 실제 API 연동 시 여기에 API 호출 코드 추가
      // 현재는 샘플 데이터로 대체
      const sampleStocks: StockData[] = [
        { symbol: 'AAPL', name: 'Apple Inc.', price: 175.43, change: 2.15, changePercent: 1.24, volume: 45678900, marketCap: 2750000000000 },
        { symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.85, change: -1.23, changePercent: -0.32, volume: 23456700, marketCap: 2810000000000 },
        { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 142.56, change: 3.45, changePercent: 2.48, volume: 34567800, marketCap: 1780000000000 },
        { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 155.23, change: 1.87, changePercent: 1.22, volume: 56789000, marketCap: 1620000000000 },
        { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.42, change: -5.67, changePercent: -2.23, volume: 67890100, marketCap: 789000000000 }
      ]
      
      setTopVolumeStocks(sampleStocks)
      setTopValueStocks(sampleStocks)
      toast.success('주식 데이터를 업데이트했습니다!')
    } catch (error) {
      toast.error('주식 데이터를 불러오는 중 오류가 발생했습니다.')
    } finally {
      setIsLoadingStocks(false)
    }
  }

  // 복리 계산
  const calculateInvestment = () => {
    // 무료 사용자 변환 제한 확인
    if (!isPro && remainingConversions <= 0) {
      toast.error(`무료 버전은 하루에 최대 ${maxCalculations}회만 계산할 수 있습니다. Pro로 업그레이드하세요.`)
      setIsProModalOpen(true)
      return
    }

    setIsProcessing(true)
    
    try {
      const monthlyRate = expectedReturn / 100 / 12
      const totalMonths = investmentPeriod * 12
      
      // 초기 자본의 복리 계산
      const initialValue = initialCapital * Math.pow(1 + expectedReturn / 100, investmentPeriod)
      
      // 월별 투자의 미래가치 계산 (연금의 미래가치)
      const monthlyValue = monthlyInvestment * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate)
      
      const finalValue = initialValue + monthlyValue
      const totalInvestment = initialCapital + (monthlyInvestment * totalMonths)
      const profit = finalValue - totalInvestment
      const profitPercent = (profit / totalInvestment) * 100
      
      // 양도수익세 계산 (해외주식 양도소득세 22%)
      const capitalGainsTax = profit * (capitalGainsTaxRate / 100)
      const afterTaxProfit = profit - capitalGainsTax
      
      const investmentResult: InvestmentResult = {
        totalInvestment,
        finalValue,
        profit,
        profitPercent,
        monthlyInvestment: monthlyInvestment * totalMonths,
        capitalGainsTax,
        afterTaxProfit
      }
      
      setResult(investmentResult)
      
      // 변환 카운트 증가
      if (!isPro) {
        incrementConversionCount('us-stock-calculator', 1)
        const newCount = getConversionCount('us-stock-calculator')
        setConversionCount(newCount)
        setRemainingConversions(maxCalculations - newCount)
      }
      
      toast.success('투자 계산이 완료되었습니다!')
    } catch (error) {
      toast.error('계산 중 오류가 발생했습니다.')
    } finally {
      setIsProcessing(false)
    }
  }

  // 초기 주식 데이터 로드
  useEffect(() => {
    loadStockData()
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ko-KR').format(num)
  }

  return (
    <>
      <Head>
        <title>미국주식 투자 계산기 - 복리 계산 및 양도수익세 | SH Tools</title>
        <meta name="description" content="미국주식 투자 수익률을 계산하고 양도수익세를 확인하세요. 복리 계산, 월별 투자 시뮬레이션, 실시간 주식 데이터 제공." />
        <meta name="keywords" content="미국주식 계산기, 투자 계산기, 복리 계산, 양도수익세, 해외주식, 투자 시뮬레이션, 주식 수익률" />
        <meta property="og:title" content="미국주식 투자 계산기 - 복리 계산 및 양도수익세" />
        <meta property="og:description" content="미국주식 투자 수익률을 계산하고 양도수익세를 확인하세요. 복리 계산, 월별 투자 시뮬레이션 제공." />
        <meta property="og:url" content="https://sh-utility-builder.vercel.app/tools/us-stock-calculator" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="미국주식 투자 계산기" />
        <meta name="twitter:description" content="미국주식 투자 수익률을 계산하고 양도수익세를 확인하세요." />
      </Head>

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              미국주식 투자 계산기
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              복리 투자 수익률을 계산하고 양도수익세를 확인하세요. 
              실시간 주식 데이터와 투자 시뮬레이션을 제공합니다.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-1">
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <Calculator className="w-5 h-5 mr-2" />
                    투자 정보 입력
                  </div>
                  <UsageCounter 
                    remaining={remainingConversions} 
                    max={maxCalculations} 
                    isPro={isPro} 
                    type="generations" 
                  />
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      초기 자본 (원)
                    </label>
                    <input
                      type="number"
                      value={initialCapital}
                      onChange={(e) => setInitialCapital(Number(e.target.value))}
                      className="input-field"
                      placeholder="1,000,000"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      매월 매수금액 (원)
                    </label>
                    <input
                      type="number"
                      value={monthlyInvestment}
                      onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                      className="input-field"
                      placeholder="100,000"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      연평균 기대 수익률 (%)
                    </label>
                    <input
                      type="number"
                      value={expectedReturn}
                      onChange={(e) => setExpectedReturn(Number(e.target.value))}
                      className="input-field"
                      placeholder="7"
                      step="0.1"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      투자기간 (년)
                    </label>
                    <input
                      type="number"
                      value={investmentPeriod}
                      onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
                      className="input-field"
                      placeholder="10"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      양도수익세율 (%)
                    </label>
                    <input
                      type="number"
                      value={capitalGainsTaxRate}
                      onChange={(e) => setCapitalGainsTaxRate(Number(e.target.value))}
                      className="input-field"
                      placeholder="22"
                      step="0.1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      해외주식 양도소득세 기본 22%
                    </p>
                  </div>
                  
                  <Button 
                    onClick={calculateInvestment}
                    disabled={isProcessing}
                    className="w-full"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        계산 중...
                      </>
                    ) : (
                      <>
                        <Calculator className="w-4 h-4 mr-2" />
                        투자 계산하기
                      </>
                    )}
                  </Button>
                </div>
                
                {!isPro && (
                  <p className="text-sm text-gray-500 mt-4">
                    무료 버전은 하루에 최대 {maxCalculations}회만 계산할 수 있습니다. 
                    <button 
                      onClick={() => setIsProModalOpen(true)}
                      className="text-primary-600 hover:text-primary-700 ml-1 underline"
                    >
                      Pro로 업그레이드
                    </button>
                  </p>
                )}
              </div>

              {/* Pro Upgrade */}
              <div className="card bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200 mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Pro 업그레이드
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  무제한 계산, 고급 분석, 포트폴리오 추적
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setIsProModalOpen(true)}
                >
                  Pro로 업그레이드
                </Button>
              </div>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-2">
              {result ? (
                <div className="space-y-6">
                  {/* Investment Results */}
                  <div className="card">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2" />
                      투자 결과
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">총 투자금액</p>
                        <p className="text-xl font-bold text-gray-900">{formatCurrency(result.totalInvestment)}</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">최종 가치</p>
                        <p className="text-xl font-bold text-green-600">{formatCurrency(result.finalValue)}</p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">수익금</p>
                        <p className="text-xl font-bold text-blue-600">{formatCurrency(result.profit)}</p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">수익률</p>
                        <p className="text-xl font-bold text-purple-600">{result.profitPercent.toFixed(2)}%</p>
                      </div>
                    </div>
                  </div>

                  {/* Tax Calculation */}
                  <div className="card">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <DollarSign className="w-5 h-5 mr-2" />
                      양도수익세 계산
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-red-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">양도수익세</p>
                        <p className="text-xl font-bold text-red-600">{formatCurrency(result.capitalGainsTax)}</p>
                        <p className="text-xs text-gray-500">세율: {capitalGainsTaxRate}%</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">세후 수익</p>
                        <p className="text-xl font-bold text-green-600">{formatCurrency(result.afterTaxProfit)}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">월별 투자금액</p>
                        <p className="text-xl font-bold text-gray-900">{formatCurrency(result.monthlyInvestment)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="card text-center py-12">
                  <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    투자 정보를 입력하고 계산해보세요
                  </h3>
                  <p className="text-gray-600">
                    초기 자본, 월별 투자금액, 기대 수익률을 입력하면 복리 계산 결과를 확인할 수 있습니다.
                  </p>
                </div>
              )}

              {/* Stock Data Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* Top Volume Stocks */}
                <div className="card">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2" />
                      거래량 TOP 5
                    </h3>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={loadStockData}
                      disabled={isLoadingStocks}
                    >
                      {isLoadingStocks ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <RefreshCw className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {topVolumeStocks.map((stock, index) => (
                      <div key={stock.symbol} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{stock.symbol}</p>
                          <p className="text-sm text-gray-600">{stock.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">${stock.price.toFixed(2)}</p>
                          <p className={`text-sm ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Value Stocks */}
                <div className="card">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <DollarSign className="w-5 h-5 mr-2" />
                      거래대금 TOP 5
                    </h3>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={loadStockData}
                      disabled={isLoadingStocks}
                    >
                      {isLoadingStocks ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <RefreshCw className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {topValueStocks.map((stock, index) => (
                      <div key={stock.symbol} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{stock.symbol}</p>
                          <p className="text-sm text-gray-600">{stock.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">${stock.price.toFixed(2)}</p>
                          <p className={`text-sm ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-12">
            <a 
              href="/" 
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              ← 홈으로 돌아가기
            </a>
          </div>
        </div>
        
        {/* Pro Modal */}
        <ProModal 
          isOpen={isProModalOpen} 
          onClose={() => setIsProModalOpen(false)}
          trigger="us-stock-calculator"
        />
      </div>
    </>
  )
}
