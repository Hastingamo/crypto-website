// "use client";

// import '@rainbow-me/rainbowkit/styles.css';
// import {
//   getDefaultConfig,
//   RainbowKitProvider,
//   darkTheme
// } from '@rainbow-me/rainbowkit';

// import { WagmiProvider } from 'wagmi';
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { mainnet, sepolia } from 'wagmi/chains';

// const config = getDefaultConfig({
//   appName: 'My Crypto App',
//   projectId: "d7e4d0c7e25e01029dd7350f957b5b41", 
//   chains: [mainnet, sepolia],
// });

// const queryClient = new QueryClient();

// export function Providers({ children }) {
//   return (
//     <WagmiProvider config={config}>
//       <QueryClientProvider client={queryClient}>
//         <RainbowKitProvider theme={darkTheme()}>
//           {children}
//         </RainbowKitProvider>
//       </QueryClientProvider>
//     </WagmiProvider>
//   );
// }



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
  name: 'Your App Name',
  description: 'Your App Description',
  url: 'https://yourapp.com',
  icons: ['https://yourapp.com/icon.png']
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