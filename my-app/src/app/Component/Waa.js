"use client";
import { WagmiProvider, createConfig, http } from "wagmi";
import { sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";      

const config = createConfig(
  getDefaultConfig({
    chains: [sepolia],
    transports: {
      [sepolia.id]: http(
        `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
      ),
    },

    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,

    appName: "Your App Name",

    appDescription: "Your App Description",
    appUrl: "https://crypto-website-sand-eight.vercel.app", 
    appIcon: "https://family.co/logo.png",
       enableFamily: false, 
 
  }),
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider theme>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};