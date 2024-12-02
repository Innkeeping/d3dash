import React from 'react'
import WClock from './WClock'
import Social from './Social'
import Wallets from './Wallets'
import Lexicon from './Lexicon'
import Music from './Music'
import Help from './Help'
import Modalvate from './Modalvate'
import Prices from './Prices'
import Gov from './Gov'
import Lens from './Lens'
import IPFS from './IPFS'
import GameB from './GameB'
import Defi from './Defi'
import Refi from './Refi'
import Networks from './Networks'
import Pomodoro from './Pomodoro'
import {
  ModalsProps,
  MusicProps,
  GameBProps,
  PomodoroProps,
  ModalProps } from '../types'
import Docs from './Docs'

const Modals: React.FC<ModalsProps> = ({
  theme,
  // setTheme,
  // openModal,
  closeModal,
  // toggleModal,
  // toggleTheme,
  onTimerUpdate,
  timerTimeLeft,
  setTimerTimeLeft,
  isTimerRunning,
  setIsTimerRunning,
  isOpen,
  startTimer,
}) => {

  const {
    isWClockOpen,
    isSocialOpen,
    isWalletsOpen,
    isLexiconOpen,
    isMusicOpen,
    isHelpOpen,
    isModalvateOpen,
    isPricesOpen,
    isGovOpen,
    isDocsOpen,
    isLensOpen,
    isGameBOpen,
    isIpfsOpen,
    isDefiOpen,
    isRefiOpen,
    isNetworksOpen,
    isPomodoroOpen,
  } = isOpen


  const modalConfigurations: { component: React.FC<ModalProps>; props: ModalProps }[] = [
    { component: WClock, props: { isOpen: isWClockOpen, onClose: () => closeModal('isWClockOpen'), theme } },
    { component: Social, props: { isOpen: isSocialOpen, onClose: () => closeModal('isSocialOpen'), theme } },
    { component: Wallets, props: { isOpen: isWalletsOpen, onClose: () => closeModal('isWalletsOpen'), theme } },
    { component: Lexicon, props: { isOpen: isLexiconOpen, onClose: () => closeModal('isLexiconOpen'), theme } },
    { component: Help, props: { isOpen: isHelpOpen, onClose: () => closeModal('isHelpOpen'), theme } },
    { component: Modalvate, props: { isOpen: isModalvateOpen, onClose: () => closeModal('isModalvateOpen'), theme } },
    { component: Prices, props: { isOpen: isPricesOpen, onClose: () => closeModal('isPricesOpen'), theme } },
    { component: Gov, props: { isOpen: isGovOpen, onClose: () => closeModal('isGovOpen'), theme } },
    { component: Lens, props: { isOpen: isLensOpen, onClose: () => closeModal('isLensOpen'), theme } },
    { component: IPFS, props: { isOpen: isIpfsOpen, onClose: () => closeModal('isIpfsOpen'), theme } },
    { component: Defi, props: { isOpen: isDefiOpen, onClose: () => closeModal('isDefiOpen'), theme } },
    { component: Refi, props: { isOpen: isRefiOpen, onClose: () => closeModal('isRefiOpen'), theme } },
    { component: Networks, props: { isOpen: isNetworksOpen, onClose: () => closeModal('isNetworksOpen'), theme } },
    { component: Docs, props: { isOpen: isDocsOpen, onClose: () => closeModal('isDocsOpen'), theme}},
  ]


  const musicProps: MusicProps = {
    isOpen: isMusicOpen,
    onClose: () => closeModal('isMusicOpen'),
    theme,
    onOpen: () => {},
  }


  const gameBProps: GameBProps = {
    isOpen: isGameBOpen,
    onClose: () => closeModal('isGameBOpen'),
    theme,
  }


  const pomodoroProps: PomodoroProps = {
    isOpen: isPomodoroOpen,
    onClose: () => closeModal('isPomodoroOpen'),
    theme,
    onTimerUpdate,
    timerTimeLeft,
    setTimerTimeLeft,
    isTimerRunning,
    setIsTimerRunning,
    startTimer,
  }

  return (
    <>
      {modalConfigurations.map((config, index) => {
        const { component: ModalComponent, props } = config;
        return (
          <ModalComponent
            key={index}
            {...props}
          />
        )
      })}


      <Music {...musicProps} />

      <GameB {...gameBProps} />


      <Pomodoro {...pomodoroProps} />
    </>
  )
}

export default Modals