"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Pause, RotateCcw, Home, ChevronUp, ChevronDown, Apple, Timer, Check, Menu, X } from "lucide-react"

function CircularProgress({ progress, size = 400 }: { progress: number; size?: number }) {
  const strokeWidth = 16
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
        className="text-secondary"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className="text-primary transition-all duration-300 ease-linear"
        strokeLinecap="round"
      />
    </svg>
  )
}

function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 transition-opacity" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-card border-r border-border z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 space-y-6">
          {/* Close button */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-foreground">メニュー</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Privacy Policy Content */}
          <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-120px)]">
            <h2 className="text-xl font-semibold text-foreground">プライバシーポリシー</h2>
            <div className="text-sm text-muted-foreground space-y-3">
              <p>
                本アプリケーション（以下「本アプリ」）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めます。
              </p>

              <h4 className="font-semibold text-foreground mt-4">1. 収集する情報</h4>
              <p>
                本アプリは、タイマー機能の提供のみを目的としており、個人を特定できる情報を収集することはありません。
              </p>

              <h4 className="font-semibold text-foreground mt-4">2. 情報の利用目的</h4>
              <p>
                本アプリは、ブラウザのローカルストレージを使用してタイマーの設定を保存する場合がありますが、
                これらの情報は外部に送信されることはありません。
              </p>

              <h4 className="font-semibold text-foreground mt-4">3. 通知機能</h4>
              <p>
                本アプリは、タイマー終了時にブラウザ通知を表示する機能を提供しています。
                通知機能の使用には、ユーザーの許可が必要です。
              </p>

              <h4 className="font-semibold text-foreground mt-4">4. Cookie</h4>
              <p>
                本アプリは、Cookieを使用してユーザーの設定を保存する場合があります。
                Cookieは、ブラウザの設定で無効にすることができます。
              </p>

              <h4 className="font-semibold text-foreground mt-4">5. 第三者への提供</h4>
              <p>本アプリは、ユーザーの情報を第三者に提供することはありません。</p>

              <h4 className="font-semibold text-foreground mt-4">6. プライバシーポリシーの変更</h4>
              <p>
                本プライバシーポリシーは、必要に応じて変更される場合があります。
                変更後のプライバシーポリシーは、本アプリ上に掲載された時点で効力を生じるものとします。
              </p>

              <p className="mt-4">最終更新日: 2025年11月</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function HomeScreen({ setActiveTab, onMenuOpen }: { setActiveTab: (tab: string) => void; onMenuOpen: () => void }) {
  return (
    <div className="min-h-[300px] md:min-h-[400px] flex flex-col justify-center space-y-6 md:space-y-8 text-center relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={onMenuOpen}
        className="absolute top-0 left-0 h-8 w-8 md:h-10 md:w-10"
      >
        <Menu className="h-5 w-5 md:h-6 md:w-6" />
      </Button>

      <div className="space-y-3 md:space-y-4">
        <h1 className="text-2xl md:text-5xl font-bold text-foreground">タイマーアプリへようこそ</h1>
        <p className="text-base md:text-2xl text-muted-foreground">
          生産性を高めるための3つのタイマーモードをご用意しています
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mt-8 md:mt-12">
        <Card
          className="p-6 md:p-8 bg-card border-border hover:border-primary transition-colors cursor-pointer"
          onClick={() => setActiveTab("pomodoro")}
        >
          <div className="space-y-3 md:space-y-4">
            <div className="w-12 h-12 md:w-16 md:h-16 mx-auto bg-primary rounded-lg flex items-center justify-center">
              <Apple className="h-6 w-6 md:h-8 md:w-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-foreground">ポモドーロ</h3>
            <p className="text-sm md:text-base text-muted-foreground">
              25分の作業と5分の休憩を繰り返す、集中力を高める時間管理術
            </p>
          </div>
        </Card>

        <Card
          className="p-6 md:p-8 bg-card border-border hover:border-primary transition-colors cursor-pointer"
          onClick={() => setActiveTab("tabata")}
        >
          <div className="space-y-3 md:space-y-4">
            <div className="w-12 h-12 md:w-16 md:h-16 mx-auto bg-primary rounded-lg flex items-center justify-center">
              <span className="text-2xl md:text-3xl font-bold text-primary-foreground">T</span>
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-foreground">タバタ式</h3>
            <p className="text-sm md:text-base text-muted-foreground">
              20秒の運動と10秒の休憩を8ラウンド。高強度インターバルトレーニング
            </p>
          </div>
        </Card>

        <Card
          className="p-6 md:p-8 bg-card border-border hover:border-primary transition-colors cursor-pointer"
          onClick={() => setActiveTab("task")}
        >
          <div className="space-y-3 md:space-y-4">
            <div className="w-12 h-12 md:w-16 md:h-16 mx-auto bg-primary rounded-lg flex items-center justify-center">
              <span className="text-2xl md:text-3xl font-bold text-primary-foreground">⏱</span>
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-foreground">タイマー</h3>
            <p className="text-sm md:text-base text-muted-foreground">
              自由に時間を設定できるシンプルなカウントダウンタイマー
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}

function PomodoroTimer({ setNavigatorMessage }: { setNavigatorMessage: (message: string) => void }) {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [breakMinutes, setBreakMinutes] = useState(5)
  const [breakSeconds, setBreakSeconds] = useState(0)
  const [totalRounds, setTotalRounds] = useState(4)
  const [currentRound, setCurrentRound] = useState(1)
  const [totalSeconds, setTotalSeconds] = useState(0)
  const [initialSeconds, setInitialSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [endTime, setEndTime] = useState<number | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const endSoundRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    endSoundRef.current = new Audio("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%87%BA%E9%A1%8C3-GIdRWbOSyocdNEd0DUmmij0e6d0XEu.mp3")
    endSoundRef.current.loop = true
    return () => {
      if (endSoundRef.current) {
        endSoundRef.current.pause()
        endSoundRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (isRunning && endTime) {
      intervalRef.current = setInterval(() => {
        const now = Date.now()
        const remaining = Math.max(0, Math.ceil((endTime - now) / 1000))

        setTotalSeconds(remaining)

        if (remaining <= 0) {
          if (isBreak) {
            if (currentRound < totalRounds) {
              setCurrentRound((r) => r + 1)
              setIsBreak(false)
              const workTotal = minutes * 60 + seconds
              setInitialSeconds(workTotal)
              setEndTime(Date.now() + workTotal * 1000)
              if (typeof window !== "undefined" && "Notification" in window) {
                Notification.requestPermission().then((permission) => {
                  if (permission === "granted") {
                    const notification = new Notification("休憩終了！", {
                      body: `ラウンド ${currentRound + 1}/${totalRounds} を始めましょう`,
                    })
                    notification.onclick = () => {
                      window.focus()
                      notification.close()
                    }
                  }
                })
              }
            } else {
              setIsRunning(false)
              setEndTime(null)
              if (intervalRef.current) clearInterval(intervalRef.current)
              if (typeof window !== "undefined" && "Notification" in window) {
                Notification.requestPermission().then((permission) => {
                  if (permission === "granted") {
                    const notification = new Notification("ポモドーロ完了！", { body: "お疲れ様でした！" })
                    notification.onclick = () => {
                      window.focus()
                      notification.close()
                    }
                  }
                })
              }
            }
          } else {
            if (currentRound === totalRounds) {
              setIsRunning(false)
              setEndTime(null)
              if (intervalRef.current) clearInterval(intervalRef.current)
              if (endSoundRef.current) {
                endSoundRef.current.play().catch(() => {}) // Silent error handling
              }
              if (typeof window !== "undefined" && "Notification" in window) {
                Notification.requestPermission().then((permission) => {
                  if (permission === "granted") {
                    const notification = new Notification("ポモドーロ完了！", { body: "全てのセットが完了しました！" })
                    notification.onclick = () => {
                      window.focus()
                      notification.close()
                    }
                  }
                })
              }
            } else {
              setIsBreak(true)
              const breakTotal = breakMinutes * 60 + breakSeconds
              setInitialSeconds(breakTotal)
              setEndTime(Date.now() + breakTotal * 1000)
              if (typeof window !== "undefined" && "Notification" in window) {
                Notification.requestPermission().then((permission) => {
                  if (permission === "granted") {
                    const notification = new Notification("作業時間終了！", { body: "休憩時間です" })
                    notification.onclick = () => {
                      window.focus()
                      notification.close()
                    }
                  }
                })
              }
            }
          }
        }
      }, 100) // 100msごとにチェックして、より正確な表示
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning, endTime, isBreak, minutes, seconds, breakMinutes, breakSeconds, currentRound, totalRounds])

  const handleStart = () => {
    if (totalSeconds === 0 && !isRunning) {
      const total = minutes * 60 + seconds
      if (total > 0) {
        if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "default") {
          Notification.requestPermission()
        }

        const audio = new Audio("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6426315113212040-bNvj2vcrY8eYBF5IGmlBCPn8KJYhYx.mp3")
        audio.play().catch(() => {}) // Silent error handling

        setTotalSeconds(total)
        setInitialSeconds(total)
        setEndTime(Date.now() + total * 1000)
        setIsRunning(true)
        setCurrentRound(1)
        setIsBreak(false)
        setNavigatorMessage("タイマーが開始されました！")
      }
    } else {
      if (!isRunning && endSoundRef.current) {
        endSoundRef.current.pause()
        endSoundRef.current.currentTime = 0
      }
      if (isRunning) {
        setEndTime(null)
      } else if (totalSeconds > 0) {
        setEndTime(Date.now() + totalSeconds * 1000)
      }
      setIsRunning(!isRunning)
      setNavigatorMessage(isRunning ? "タイマーが停止しました！" : "タイマーが開始されました！")
    }
  }

  const handleReset = () => {
    if (endSoundRef.current) {
      endSoundRef.current.pause()
      endSoundRef.current.currentTime = 0
    }
    setIsRunning(false)
    setEndTime(null)
    setTotalSeconds(0)
    setInitialSeconds(0)
    setMinutes(25)
    setSeconds(0)
    setCurrentRound(1)
    setIsBreak(false)
    setNavigatorMessage("タイマーがリセットされました！")
  }

  const progress = initialSeconds > 0 ? ((initialSeconds - totalSeconds) / initialSeconds) * 100 : 0

  const displayMinutes = Math.floor(totalSeconds / 60)
  const displaySeconds = totalSeconds % 60
  const formatTime = (num: number) => String(num).padStart(2, "0")

  const incrementMinutes = () => setMinutes((m) => Math.min(59, m + 1))
  const decrementMinutes = () => setMinutes((m) => Math.max(0, m - 1))
  const incrementSeconds = () => setSeconds((s) => Math.min(59, s + 1))
  const decrementSeconds = () => setSeconds((s) => Math.max(0, s - 1))

  const incrementBreakMinutes = () => setBreakMinutes((m) => Math.min(59, m + 1))
  const decrementBreakMinutes = () => setBreakMinutes((m) => Math.max(0, m - 1))
  const incrementBreakSeconds = () => setBreakSeconds((s) => Math.min(59, s + 1))
  const decrementBreakSeconds = () => setBreakSeconds((s) => Math.max(0, s - 1))

  const isCompleted = totalSeconds === 0 && !isRunning && currentRound === totalRounds && !isBreak && initialSeconds > 0

  const handleComplete = () => {
    if (endSoundRef.current) {
      endSoundRef.current.pause()
      endSoundRef.current.currentTime = 0
    }
    setIsRunning(false)
    setEndTime(null)
    setTotalSeconds(0)
    setInitialSeconds(0)
    setMinutes(25)
    setSeconds(0)
    setCurrentRound(1)
    setIsBreak(false)
    setNavigatorMessage("タイマーが完了しました！")
  }

  return (
    <div className="space-y-6 md:space-y-8">
      {!isRunning && totalSeconds === 0 && (
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-3">
              <label className="text-base md:text-lg font-medium text-muted-foreground block text-center">
                作業時間
              </label>
              <div className="flex justify-center gap-4 md:gap-8">
                <div className="flex flex-col items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={incrementMinutes} className="h-10 w-10 md:h-12 md:w-12">
                    <ChevronUp className="h-6 w-6 md:h-8 md:w-8" />
                  </Button>
                  <div className="text-3xl md:text-5xl font-mono font-bold w-16 md:w-24 text-center">
                    {formatTime(minutes)}
                  </div>
                  <Button variant="ghost" size="icon" onClick={decrementMinutes} className="h-10 w-10 md:h-12 md:w-12">
                    <ChevronDown className="h-6 w-6 md:h-8 md:w-8" />
                  </Button>
                </div>
                <div className="flex items-center text-3xl md:text-5xl font-bold">:</div>
                <div className="flex flex-col items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={incrementSeconds} className="h-10 w-10 md:h-12 md:w-12">
                    <ChevronUp className="h-6 w-6 md:h-8 md:w-8" />
                  </Button>
                  <div className="text-3xl md:text-5xl font-mono font-bold w-16 md:w-24 text-center">
                    {formatTime(seconds)}
                  </div>
                  <Button variant="ghost" size="icon" onClick={decrementSeconds} className="h-10 w-10 md:h-12 md:w-12">
                    <ChevronDown className="h-6 w-6 md:h-8 md:w-8" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-base md:text-lg font-medium text-muted-foreground block text-center">
                休憩時間
              </label>
              <div className="flex justify-center gap-4 md:gap-8">
                <div className="flex flex-col items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={incrementBreakMinutes}
                    className="h-10 w-10 md:h-12 md:w-12"
                  >
                    <ChevronUp className="h-6 w-6 md:h-8 md:w-8" />
                  </Button>
                  <div className="text-3xl md:text-5xl font-mono font-bold w-16 md:w-24 text-center">
                    {formatTime(breakMinutes)}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={decrementBreakMinutes}
                    className="h-10 w-10 md:h-12 md:w-12"
                  >
                    <ChevronDown className="h-6 w-6 md:h-8 md:w-8" />
                  </Button>
                </div>
                <div className="flex items-center text-3xl md:text-5xl font-bold">:</div>
                <div className="flex flex-col items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={incrementBreakSeconds}
                    className="h-10 w-10 md:h-12 md:w-12"
                  >
                    <ChevronUp className="h-6 w-6 md:h-8 md:w-8" />
                  </Button>
                  <div className="text-3xl md:text-5xl font-mono font-bold w-16 md:w-24 text-center">
                    {formatTime(breakSeconds)}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={decrementBreakSeconds}
                    className="h-10 w-10 md:h-12 md:w-12"
                  >
                    <ChevronDown className="h-6 w-6 md:h-8 md:w-8" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3 mt-6">
            <label className="text-base md:text-lg font-medium text-muted-foreground block text-center">セット数</label>
            <div className="flex justify-center">
              <Input
                type="number"
                min="1"
                value={totalRounds}
                onChange={(e) => setTotalRounds(Math.max(1, Number(e.target.value)))}
                className="text-center text-xl md:text-2xl font-mono h-12 md:h-16 bg-secondary border-border text-foreground w-32 md:w-40"
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center">
        <div className="relative">
          <div className="block md:hidden">
            <CircularProgress progress={progress} size={250} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="font-mono text-4xl font-bold tracking-tight text-foreground">
                  {formatTime(displayMinutes)}:{formatTime(displaySeconds)}
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  {isBreak ? "休憩時間" : "作業時間"} - {currentRound}/{totalRounds}
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <CircularProgress progress={progress} size={400} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="font-mono text-8xl font-bold tracking-tight text-foreground">
                  {formatTime(displayMinutes)}:{formatTime(displaySeconds)}
                </div>
                <div className="mt-3 text-2xl text-muted-foreground">
                  {isBreak ? "休憩時間" : "作業時間"} - {currentRound}/{totalRounds}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 md:gap-6 justify-center">
        {isCompleted ? (
          <Button onClick={handleComplete} size="lg" className="h-12 md:h-16 px-8 md:px-12 text-base md:text-xl">
            <Check className="mr-2 h-5 w-5 md:h-6 md:w-6" />
            完了
          </Button>
        ) : (
          <Button onClick={handleStart} size="lg" className="h-12 md:h-16 px-8 md:px-12 text-base md:text-xl">
            {isRunning ? (
              <>
                <Pause className="mr-2 h-5 w-5 md:h-6 md:w-6" />
                一時停止
              </>
            ) : (
              <>
                <Play className="mr-2 h-5 w-5 md:h-6 md:w-6" />
                スタート
              </>
            )}
          </Button>
        )}
        <Button
          onClick={handleReset}
          size="lg"
          variant="outline"
          className="h-12 md:h-16 px-8 md:px-12 text-base md:text-xl bg-transparent"
        >
          <RotateCcw className="mr-2 h-5 w-5 md:h-6 md:w-6" />
          リセット
        </Button>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {[
            { label: "25分", value: 25 },
            { label: "15分", value: 15 },
            { label: "5分", value: 5 },
          ].map((preset) => (
            <Button
              key={preset.label}
              onClick={() => {
                setMinutes(preset.value)
                setSeconds(0)
              }}
              variant="outline"
              disabled={isRunning}
              className="h-12 md:h-14 text-base md:text-lg"
            >
              {preset.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

function TabataTimer({ setNavigatorMessage }: { setNavigatorMessage: (message: string) => void }) {
  const [workTime, setWorkTime] = useState(20)
  const [restTime, setRestTime] = useState(10)
  const [rounds, setRounds] = useState(8)
  const [currentRound, setCurrentRound] = useState(1)
  const [totalSeconds, setTotalSeconds] = useState(0)
  const [initialSeconds, setInitialSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [isWorkPhase, setIsWorkPhase] = useState(true)
  const [endTime, setEndTime] = useState<number | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const endSoundRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    endSoundRef.current = new Audio("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%87%BA%E9%A1%8C3-GIdRWbOSyocdNEd0DUmmij0e6d0XEu.mp3")
    endSoundRef.current.loop = true
    return () => {
      if (endSoundRef.current) {
        endSoundRef.current.pause()
        endSoundRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (isRunning && endTime) {
      intervalRef.current = setInterval(() => {
        const now = Date.now()
        const remaining = Math.max(0, Math.ceil((endTime - now) / 1000))

        if (remaining <= 3 && remaining > 0 && totalSeconds > remaining) {
          if (remaining === 3) {
            const audio = new Audio("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6426315113211882-6Kzza9z51l5S73BH1x3korVo2h3G2a.mp3")
            audio.play().catch(() => {}) // Silent error handling
          } else if (remaining === 2) {
            const audio = new Audio("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6426315113211859-tpQtQL1W1B2ICKznRMKB4ksuHdC3gy.mp3")
            audio.play().catch(() => {}) // Silent error handling
          } else if (remaining === 1) {
            const audio = new Audio("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6426315113211829-YQvoQgmAkl8rhzT4qQZnd0lcAa6ITd.mp3")
            audio.play().catch(() => {}) // Silent error handling
          }
        }

        setTotalSeconds(remaining)

        if (remaining <= 0) {
          if (isWorkPhase) {
            if (currentRound === rounds) {
              setIsRunning(false)
              setEndTime(null)
              if (intervalRef.current) clearInterval(intervalRef.current)
              if (endSoundRef.current) {
                endSoundRef.current.play().catch(() => {}) // Silent error handling
              }
              if (typeof window !== "undefined" && "Notification" in window) {
                Notification.requestPermission().then((permission) => {
                  if (permission === "granted") {
                    const notification = new Notification("タバタ完了！", { body: "全てのラウンドが完了しました！" })
                    notification.onclick = () => {
                      window.focus()
                      notification.close()
                    }
                  }
                })
              }
            } else {
              if (restTime === 0) {
                setCurrentRound((r) => r + 1)
                setIsWorkPhase(true)
                setInitialSeconds(workTime)
                setEndTime(Date.now() + workTime * 1000)
              } else {
                setIsWorkPhase(false)
                setInitialSeconds(restTime)
                setEndTime(Date.now() + restTime * 1000)
              }
            }
          } else {
            if (currentRound < rounds) {
              setCurrentRound((r) => r + 1)
              setIsWorkPhase(true)
              setInitialSeconds(workTime)
              setEndTime(Date.now() + workTime * 1000)
            } else {
              setIsRunning(false)
              setEndTime(null)
              if (intervalRef.current) clearInterval(intervalRef.current)
              if (typeof window !== "undefined" && "Notification" in window) {
                Notification.requestPermission().then((permission) => {
                  if (permission === "granted") {
                    const notification = new Notification("タバタ完了！", { body: "お疲れ様でした！" })
                    notification.onclick = () => {
                      window.focus()
                      notification.close()
                    }
                  }
                })
              }
            }
          }
        }
      }, 100) // 100msごとにチェックして、より正確な表示
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning, endTime, isWorkPhase, currentRound, rounds, workTime, restTime, totalSeconds])

  const handleStart = () => {
    if (!isRunning && totalSeconds === 0) {
      if (rounds === 0) {
        return
      }
      if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "default") {
        Notification.requestPermission()
      }

      const audio = new Audio("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6426315113212040-bNvj2vcrY8eYBF5IGmlBCPn8KJYhYx.mp3")
      audio.play().catch(() => {}) // Silent error handling

      setTotalSeconds(workTime)
      setInitialSeconds(workTime)
      setEndTime(Date.now() + workTime * 1000)
      setIsWorkPhase(true)
      setCurrentRound(1)
      setNavigatorMessage("運動頑張って！")
    } else {
      if (!isRunning && endSoundRef.current) {
        endSoundRef.current.pause()
        endSoundRef.current.currentTime = 0
      }
      if (isRunning) {
        setEndTime(null)
      } else if (totalSeconds > 0) {
        setEndTime(Date.now() + totalSeconds * 1000)
      }
    }
    setIsRunning(!isRunning)
    if (isRunning) {
      setNavigatorMessage("タバタが停止しました！")
    } else if (totalSeconds > 0) {
      setNavigatorMessage("タバタが開始されました！")
    }
  }

  const handleReset = () => {
    if (endSoundRef.current) {
      endSoundRef.current.pause()
      endSoundRef.current.currentTime = 0
    }
    setIsRunning(false)
    setEndTime(null)
    setTotalSeconds(0)
    setInitialSeconds(0)
    setCurrentRound(1)
    setIsWorkPhase(true)
    setNavigatorMessage("タバタがリセットされました！")
  }

  const progress = initialSeconds > 0 ? ((initialSeconds - totalSeconds) / initialSeconds) * 100 : 0

  const isCompleted = totalSeconds === 0 && !isRunning && currentRound === rounds && isWorkPhase && initialSeconds > 0

  const handleComplete = () => {
    if (endSoundRef.current) {
      endSoundRef.current.pause()
      endSoundRef.current.currentTime = 0
    }
    setIsRunning(false)
    setEndTime(null)
    setTotalSeconds(0)
    setInitialSeconds(0)
    setCurrentRound(1)
    setIsWorkPhase(true)
    setNavigatorMessage("タバタが完了しました！")
  }

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex justify-center">
        <div className="relative">
          <div className="block md:hidden">
            <CircularProgress progress={progress} size={250} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="font-mono text-5xl font-bold tracking-tight text-foreground">{totalSeconds}</div>
                <div className="mt-2 text-sm text-muted-foreground">
                  ラウンド {currentRound}/{rounds}
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <CircularProgress progress={progress} size={400} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="font-mono text-8xl font-bold tracking-tight text-foreground">{totalSeconds}</div>
                <div className="mt-3 text-2xl text-muted-foreground">
                  ラウンド {currentRound}/{rounds}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!isRunning && totalSeconds === 0 && (
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="space-y-3">
              <label className="text-base md:text-lg font-medium text-muted-foreground block text-center">
                運動(秒)
              </label>
              <Input
                type="number"
                min="1"
                value={workTime}
                onChange={(e) => setWorkTime(Math.max(1, Number(e.target.value)))}
                className="text-center text-xl md:text-2xl font-mono h-12 md:h-16 bg-secondary border-border text-foreground"
              />
            </div>
            <div className="space-y-3">
              <label className="text-base md:text-lg font-medium text-muted-foreground block text-center">
                休憩(秒)
              </label>
              <Input
                type="number"
                min="0"
                value={restTime}
                onChange={(e) => setRestTime(Math.max(0, Number(e.target.value)))}
                className="text-center text-xl md:text-2xl font-mono h-12 md:h-16 bg-secondary border-border text-foreground"
              />
            </div>
            <div className="space-y-3">
              <label className="text-base md:text-lg font-medium text-muted-foreground block text-center">
                ラウンド
              </label>
              <Input
                type="number"
                min="0"
                value={rounds}
                onChange={(e) => setRounds(Math.max(0, Number(e.target.value)))}
                className="text-center text-xl md:text-2xl font-mono h-12 md:h-16 bg-secondary border-border text-foreground"
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-4 md:gap-6 justify-center">
        {isCompleted ? (
          <Button onClick={handleComplete} size="lg" className="h-12 md:h-16 px-8 md:px-12 text-base md:text-xl">
            <Check className="mr-2 h-5 w-5 md:h-6 md:w-6" />
            完了
          </Button>
        ) : (
          <Button onClick={handleStart} size="lg" className="h-12 md:h-16 px-8 md:px-12 text-base md:text-xl">
            {isRunning ? (
              <>
                <Pause className="mr-2 h-5 w-5 md:h-6 md:w-6" />
                一時停止
              </>
            ) : (
              <>
                <Play className="mr-2 h-5 w-5 md:h-6 md:w-6" />
                スタート
              </>
            )}
          </Button>
        )}
        <Button
          onClick={handleReset}
          size="lg"
          variant="outline"
          className="h-12 md:h-16 px-8 md:px-12 text-base md:text-xl bg-transparent"
        >
          <RotateCcw className="mr-2 h-5 w-5 md:h-6 md:w-6" />
          リセット
        </Button>
      </div>
    </div>
  )
}

function TaskTimer({ setNavigatorMessage }: { setNavigatorMessage: (message: string) => void }) {
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [totalSeconds, setTotalSeconds] = useState(0)
  const [initialSeconds, setInitialSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [endTime, setEndTime] = useState<number | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const endSoundRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    endSoundRef.current = new Audio("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%87%BA%E9%A1%8C3-GIdRWbOSyocdNEd0DUmmij0e6d0XEu.mp3")
    endSoundRef.current.loop = true
    return () => {
      if (endSoundRef.current) {
        endSoundRef.current.pause()
        endSoundRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (isRunning && endTime) {
      intervalRef.current = setInterval(() => {
        const now = Date.now()
        const remaining = Math.max(0, Math.ceil((endTime - now) / 1000))

        setTotalSeconds(remaining)

        if (remaining <= 0) {
          setIsRunning(false)
          setEndTime(null)
          if (intervalRef.current) clearInterval(intervalRef.current)
          if (endSoundRef.current) {
            endSoundRef.current.play().catch(() => {}) // Silent error handling
          }
          if (typeof window !== "undefined" && "Notification" in window) {
            Notification.requestPermission().then((permission) => {
              if (permission === "granted") {
                const notification = new Notification("タイマー完了！", { body: "設定した時間が経過しました。" })
                notification.onclick = () => {
                  window.focus()
                  notification.close()
                }
              }
            })
          }
        }
      }, 100) // 100msごとにチェックして、より正確な表示
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning, endTime])

  const handleStart = () => {
    if (totalSeconds === 0 && !isRunning) {
      const total = hours * 3600 + minutes * 60 + seconds
      if (total > 0) {
        if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "default") {
          Notification.requestPermission()
        }

        setTotalSeconds(total)
        setInitialSeconds(total)
        setEndTime(Date.now() + total * 1000)
        setIsRunning(true)
        setNavigatorMessage("タイマーが開始されました！")
      }
    } else {
      if (endSoundRef.current) {
        endSoundRef.current.pause()
        endSoundRef.current.currentTime = 0
      }
      if (isRunning) {
        setEndTime(null)
      } else if (totalSeconds > 0) {
        setEndTime(Date.now() + totalSeconds * 1000)
      }
      setIsRunning(!isRunning)
      setNavigatorMessage(isRunning ? "タイマーが停止しました！" : "タイマーが開始されました！")
    }
  }

  const handleReset = () => {
    if (endSoundRef.current) {
      endSoundRef.current.pause()
      endSoundRef.current.currentTime = 0
    }
    setIsRunning(false)
    setEndTime(null)
    setTotalSeconds(0)
    setInitialSeconds(0)
    setHours(0)
    setMinutes(0)
    setSeconds(0)
    setNavigatorMessage("タイマーがリセットされました！")
  }

  const progress = initialSeconds > 0 ? ((initialSeconds - totalSeconds) / initialSeconds) * 100 : 0

  const displayHours = Math.floor(totalSeconds / 3600)
  const displayMinutes = Math.floor((totalSeconds % 3600) / 60)
  const displaySeconds = totalSeconds % 60
  const formatTime = (num: number) => String(num).padStart(2, "0")

  const incrementHours = () => setHours((h) => Math.min(23, h + 1))
  const decrementHours = () => setHours((h) => Math.max(0, h - 1))
  const incrementMinutes = () => setMinutes((m) => Math.min(59, m + 1))
  const decrementMinutes = () => setMinutes((m) => Math.max(0, m - 1))
  const incrementSeconds = () => setSeconds((s) => Math.min(59, s + 1))
  const decrementSeconds = () => setSeconds((s) => Math.max(0, s - 1))

  const isCompleted = totalSeconds === 0 && !isRunning && initialSeconds > 0

  const handleComplete = () => {
    if (endSoundRef.current) {
      endSoundRef.current.pause()
      endSoundRef.current.currentTime = 0
    }
    setIsRunning(false)
    setEndTime(null)
    setTotalSeconds(0)
    setInitialSeconds(0)
    setHours(0)
    setMinutes(0)
    setSeconds(0)
    setNavigatorMessage("タイマーが完了しました！")
  }

  return (
    <div className="space-y-6 md:space-y-8">
      {!isRunning && totalSeconds === 0 && (
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-center gap-6 md:gap-10">
            <div className="flex flex-col items-center gap-2">
              <Button variant="ghost" size="icon" onClick={incrementHours} className="h-10 w-10 md:h-12 md:w-12">
                <ChevronUp className="h-6 w-6 md:h-8 md:w-8" />
              </Button>
              <div className="text-3xl md:text-5xl font-mono font-bold w-16 md:w-24 text-center">
                {formatTime(hours)}
              </div>
              <Button variant="ghost" size="icon" onClick={decrementHours} className="h-10 w-10 md:h-12 md:w-12">
                <ChevronDown className="h-6 w-6 md:h-8 md:w-8" />
              </Button>
            </div>
            <div className="flex items-center text-3xl md:text-5xl font-bold">:</div>
            <div className="flex flex-col items-center gap-2">
              <Button variant="ghost" size="icon" onClick={incrementMinutes} className="h-10 w-10 md:h-12 md:w-12">
                <ChevronUp className="h-6 w-6 md:h-8 md:w-8" />
              </Button>
              <div className="text-3xl md:text-5xl font-mono font-bold w-16 md:w-24 text-center">
                {formatTime(minutes)}
              </div>
              <Button variant="ghost" size="icon" onClick={decrementMinutes} className="h-10 w-10 md:h-12 md:w-12">
                <ChevronDown className="h-6 w-6 md:h-8 md:w-8" />
              </Button>
            </div>
            <div className="flex items-center text-3xl md:text-5xl font-bold">:</div>
            <div className="flex flex-col items-center gap-2">
              <Button variant="ghost" size="icon" onClick={incrementSeconds} className="h-10 w-10 md:h-12 md:w-12">
                <ChevronUp className="h-6 w-6 md:h-8 md:w-8" />
              </Button>
              <div className="text-3xl md:text-5xl font-mono font-bold w-16 md:w-24 text-center">
                {formatTime(seconds)}
              </div>
              <Button variant="ghost" size="icon" onClick={decrementSeconds} className="h-10 w-10 md:h-12 md:w-12">
                <ChevronDown className="h-6 w-6 md:h-8 md:w-8" />
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center">
        <div className="relative">
          <div className="block md:hidden">
            <CircularProgress progress={progress} size={250} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="font-mono text-3xl font-bold tracking-tight text-foreground">
                  {formatTime(displayHours)}:{formatTime(displayMinutes)}:{formatTime(displaySeconds)}
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <CircularProgress progress={progress} size={400} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="font-mono text-7xl font-bold tracking-tight text-foreground">
                  {formatTime(displayHours)}:{formatTime(displayMinutes)}:{formatTime(displaySeconds)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 md:gap-6 justify-center">
        {isCompleted ? (
          <Button onClick={handleComplete} size="lg" className="h-12 md:h-16 px-8 md:px-12 text-base md:text-xl">
            <Check className="mr-2 h-5 w-5 md:h-6 md:w-6" />
            完了
          </Button>
        ) : (
          <Button onClick={handleStart} size="lg" className="h-12 md:h-16 px-8 md:px-12 text-base md:text-xl">
            {isRunning ? (
              <>
                <Pause className="mr-2 h-5 w-5 md:h-6 md:w-6" />
                一時停止
              </>
            ) : (
              <>
                <Play className="mr-2 h-5 w-5 md:h-6 md:w-6" />
                スタート
              </>
            )}
          </Button>
        )}
        <Button
          onClick={handleReset}
          size="lg"
          variant="outline"
          className="h-12 md:h-16 px-8 md:px-12 text-base md:text-xl bg-transparent"
        >
          <RotateCcw className="mr-2 h-5 w-5 md:h-6 md:w-6" />
          リセット
        </Button>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
          {[
            { label: "1分", value: 60 },
            { label: "3分", value: 180 },
            { label: "5分", value: 300 },
            { label: "10分", value: 600 },
            { label: "30分", value: 1800 },
          ].map((preset) => (
            <Button
              key={preset.label}
              onClick={() => {
                const h = Math.floor(preset.value / 3600)
                const m = Math.floor((preset.value % 3600) / 60)
                const s = preset.value % 60
                setHours(h)
                setMinutes(m)
                setSeconds(s)
              }}
              variant="outline"
              disabled={isRunning}
              className="h-12 md:h-14 text-base md:text-lg"
            >
              {preset.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

function Navigator({ message }: { message: string }) {
  return (
    <div className="relative">
      <div className="absolute bottom-[30px] left-1/2 transform -translate-x-1/2 bg-primary/80 text-primary-foreground px-4 py-2 rounded-lg shadow-lg text-sm md:text-base max-w-[350px] text-center">
        {message}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-primary/80" />
      </div>
    </div>
  )
}

export default function TimerApp() {
  const [activeTab, setActiveTab] = useState("home")
  const [navigatorMessage, setNavigatorMessage] = useState("タイマーを選んでね！")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false) // 自動再生用
  const [isClickAnimating, setIsClickAnimating] = useState(false) // クリック用
  const clickSoundRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setIsAnimating(false)
      }, 300) // 0.3秒後に静止画に戻す
    }, 5000) // 5秒ごとに実行

    return () => clearInterval(interval)
  }, [])

  const handleCharacterClick = () => {
    // クリック用のGIFを0.1秒間再生
    setIsClickAnimating(true)
    setTimeout(() => {
      setIsClickAnimating(false)
    }, 100) // 0.1秒後に静止画に戻す

    // サウンドを再生
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0 // 最初から再生
      clickSoundRef.current.play().catch(() => {}) // Silent error handling
    }
  }

  const handleMenuOpen = () => {
    setIsMenuOpen(true)
  }

  useEffect(() => {
    if (activeTab === "home") {
      setNavigatorMessage("タイマーを選んでね！")
    } else if (activeTab === "pomodoro") {
      setNavigatorMessage("集中して頑張ろう！")
    } else if (activeTab === "tabata") {
      setNavigatorMessage("みっちりトレーニング！")
    } else if (activeTab === "task") {
      setNavigatorMessage("時間を設定してね！")
    }
  }, [activeTab])

  return (
    <div className="w-full pb-24 md:pb-0">
      <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <div className="grid lg:grid-cols-[1fr_400px] gap-8">
        {/* Main Timer Area */}
        <div className="space-y-4 md:space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {activeTab !== "home" && (
              <TabsList className="grid w-full grid-cols-4 h-12 md:h-16 bg-secondary text-xs md:text-lg">
                <TabsTrigger
                  value="home"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Home className="mr-1 md:mr-2 h-4 w-4 md:h-5 md:w-5" />
                  <span className="hidden sm:inline">ホーム</span>
                </TabsTrigger>
                <TabsTrigger
                  value="pomodoro"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Apple className="mr-1 md:mr-2 h-4 w-4 md:h-5 md:w-5" />
                  <span className="hidden sm:inline">ポモドーロ</span>
                </TabsTrigger>
                <TabsTrigger
                  value="tabata"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <span className="mr-1 md:mr-2 text-sm md:text-base font-bold">T</span>
                  <span className="hidden sm:inline">タバタ式</span>
                </TabsTrigger>
                <TabsTrigger
                  value="task"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Timer className="mr-1 md:mr-2 h-4 w-4 md:h-5 md:w-5" />
                  <span className="hidden sm:inline">タイマー</span>
                </TabsTrigger>
              </TabsList>
            )}

            <Card className="p-6 md:p-8 bg-card border-border mt-4 md:mt-6 min-h-[500px] md:min-h-[700px]">
              <TabsContent value="home" className="mt-0">
                <HomeScreen setActiveTab={setActiveTab} onMenuOpen={() => setIsMenuOpen(true)} />
              </TabsContent>

              <TabsContent value="pomodoro" className="mt-0">
                <PomodoroTimer setNavigatorMessage={setNavigatorMessage} />
              </TabsContent>

              <TabsContent value="tabata" className="mt-0">
                <TabataTimer setNavigatorMessage={setNavigatorMessage} />
              </TabsContent>

              <TabsContent value="task" className="mt-0">
                <TaskTimer setNavigatorMessage={setNavigatorMessage} />
              </TabsContent>
            </Card>
          </Tabs>

          {/* Ad Area */}
          <Card className="p-6 md:p-8 bg-secondary/50 border-border">
            <div className="text-center text-muted-foreground text-base md:text-lg">広告エリア</div>
          </Card>
        </div>

        {/* Character Area - Desktop only */}
        <div className="hidden lg:block">
          <Card
            className="p-6 bg-card border-border flex items-start justify-center overflow-hidden"
            style={{ height: "700px" }}
          >
            <div className="text-center space-y-4 w-full relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleMenuOpen}
                className="absolute top-2 left-2 h-8 w-8 md:h-10 md:w-10 z-10"
              >
                <Menu className="h-5 w-5 md:h-6 md:w-6" />
              </Button>
              <div
                className="w-full h-[600px] flex items-start justify-center overflow-hidden cursor-pointer"
                onClick={handleCharacterClick}
              >
                <img
                  src={isClickAnimating ? "/character-click.gif" : isAnimating ? "/character.gif" : "/character.jpeg"}
                  alt="キャラクター"
                  className="w-full h-full object-contain"
                />
              </div>
              <Navigator message={navigatorMessage} />
            </div>
          </Card>
        </div>

        {/* Mobile version of the character area */}
        <div className="fixed bottom-4 right-4 lg:hidden z-50">
          <div className="relative">
            {navigatorMessage && (
              <div className="absolute bottom-full right-0 mb-2 bg-primary/80 text-primary-foreground px-3 py-1 rounded-lg shadow-lg whitespace-nowrap text-xs">
                {navigatorMessage}
                <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-primary/80" />
              </div>
            )}
            <div
              className="w-20 h-20 rounded-full overflow-hidden bg-card border-2 border-border shadow-lg cursor-pointer"
              onClick={handleCharacterClick}
            >
              <img
                src={isClickAnimating ? "/character-click.gif" : isAnimating ? "/character.gif" : "/character.jpeg"}
                alt="キャラクター"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
