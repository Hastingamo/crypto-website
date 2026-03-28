"use client";

import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, arbitrum, polygon } from '@reown/appkit/networks'
import { QueryClient } from '@tanstack/react-query'

// Get projectId from https://cloud.reown.com
const projectId = 'd7e4d0c7e25e01029dd7350f957b5b41'

// Create wagmiAdapter
const wagmiAdapter = new WagmiAdapter({
  networks: [mainnet, arbitrum, polygon],
  projectId,
})

// Configure metadata
const metadata = {
  name: 'Dams Crypto',
  description: 'Dams Crypto Wallet Connection',
  url: 'https://dams-crypto.com', // Placeholder URL
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

// Create the AppKit
createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [mainnet, arbitrum, polygon],
  metadata,
  features: {
    analytics: true,
  }
})

// Export for use in provider
export const queryClient = new QueryClient()
export const wagmiConfig = wagmiAdapter.wagmiConfig
