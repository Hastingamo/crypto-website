'use client'

import { useAccount, useDisconnect } from 'wagmi'

export default function ConnectButton() {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  return (
    <div>
      {isConnected ? (
        <div className="flex items-center gap-2">
          <p className="text-sm">Connected: {address.slice(0, 6)}...{address.slice(-4)}</p>
          <button
            onClick={() => disconnect()}
            className="bg-red-500 text-white px-2 py-1 rounded text-sm"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <appkit-button />
      )}
    </div>
  )
}
