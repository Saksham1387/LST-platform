import { useMemo } from "react";
import "./App.css";
import { NavBar } from "./components/nav-bar";
import SwapInterface from "./components/swap";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";

import {
  WalletModalProvider
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";

function App() {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  return (
    <div className="bg-black">
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <NavBar></NavBar>
          <SwapInterface></SwapInterface>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
    </div>
  );
}

export default App;
