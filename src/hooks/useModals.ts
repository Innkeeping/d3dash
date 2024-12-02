import { useState, useCallback, useEffect } from 'react'
import { ModalsState, Theme, TimerUpdateHandler } from '../types'

const useModals = (initialTheme: Theme): ModalsState => {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [isOpen, setIsOpen] = useState<ModalsState['isOpen']>({
    isWClockOpen: false,
    isSocialOpen: false,
    isWalletsOpen: false,
    isLexiconOpen: false,
    isMusicOpen: false,
    isHelpOpen: false,
    isModalvateOpen: false,
    isPricesOpen: false,
    isGovOpen: false,
    isDocsOpen: false,
    isLensOpen: false,
    isGameBOpen: false,
    isIpfsOpen: false,
    isDefiOpen: false,
    isRefiOpen: false,
    isNetworksOpen: false,
    isPomodoroOpen: false,
  })

  const [timerTimeLeft, setTimerTimeLeft] = useState<number>(25 * 60)
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false)

  const openModal = useCallback((modalKey: keyof ModalsState['isOpen']) => {
    setIsOpen(prev => ({ ...prev, [modalKey]: true }))
  }, [])

  const closeModal = useCallback((modalKey: keyof ModalsState['isOpen']) => {
    setIsOpen(prev => ({ ...prev, [modalKey]: false }))
  }, [])

  const toggleModal = useCallback((modalKey: keyof ModalsState['isOpen']) => {
    setIsOpen(prev => ({ ...prev, [modalKey]: !prev[modalKey] }))
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'purple' ? 'green' : prev === 'green' ? 'teal' : 'purple'))
  }, [])

  const onTimerUpdate = useCallback<TimerUpdateHandler>((isRunning: boolean, timeLeft: number) => {
    if (isRunning) {
      if (timeLeft > 0) {
        setTimerTimeLeft(timeLeft - 1)
      } else {
        setIsTimerRunning(false)
      }
    }
  }, [])

  const startTimer = useCallback(() => {
    if (isTimerRunning) return
    setIsTimerRunning(true)
  }, [isTimerRunning])

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined

    if (isTimerRunning) {
      interval = setInterval(() => {
        onTimerUpdate(isTimerRunning, timerTimeLeft)
      }, 1000)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [timerTimeLeft, isTimerRunning, onTimerUpdate])

  return {
    theme,
    setTheme,
    openModal,
    closeModal,
    toggleModal,
    toggleTheme,
    onTimerUpdate,
    timerTimeLeft,
    setTimerTimeLeft,
    isTimerRunning,
    setIsTimerRunning,
    isOpen,
    startTimer,
  }
}

export default useModals