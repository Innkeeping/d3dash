import {
  Github, Code, Wallet, Blocks, Heart, Globe, Gem,
  Coins, BookOpen, Radio, Terminal, Boxes
} from 'lucide-react'
import { Shortcut } from '../types'

export const shortcuts: Shortcut[] = [
  { id: '1', name: 'GitHub', icon: <Github size={32} />, url: 'https://github.com', category: 'dev' },
  { id: '2', name: 'CodeSandbox', icon: <Boxes size={32} />, url: 'https://codesandbox.io', category: 'dev' },
  { id: '3', name: 'CodePen', icon: <Code size={32} />, url: 'https://codepen.io', category: 'dev' },
  { id: '4', name: 'Etherscan', icon: <Blocks size={32} />, url: 'https://etherscan.io', category: 'web3' },
  { id: '5', name: 'Gitcoin', icon: <Coins size={32} />, url: 'https://gitcoin.co', category: 'web3' },
  { id: '6', name: 'Karma', icon: <Gem size={32} />, url: 'https://gap.karmahq.xyz', category: 'web3' },
  { id: '7', name: 'Giveth', icon: <Heart size={32} />, url: 'https://giveth.io', category: 'refi' },
  { id: '8', name: 'Snapshot', icon: <Radio size={32} />, url: 'https://snapshot.org', category: 'dao' },
  { id: '9', name: 'Safe', icon: <Wallet size={32} />, url: 'https://safe.global', category: 'web3' },
  { id: '10', name: 'ENS', icon: <Globe size={32} />, url: 'https://app.ens.domains', category: 'web3' },
  { id: '11', name: 'Charmverse', icon: <BookOpen size={32} />, url: 'https://app.charmverse.io', category: 'docs' },
  { id: '12', name: 'Remix', icon: <Terminal size={32} />, url: 'https://remix.ethereum.org', category: 'dev' },
];