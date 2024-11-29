import { useMemo } from "react";
import "./App.css";
import { NavBar } from "./components/nav-bar";
import SwapInterface from "./components/swap";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";

import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
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
            <div className="text-neutral-500 mt-10 flex flex-col items-center justify-center">
              <p>
                This platform is for education purpose, letting people know how
                does LSTs ( Liquid Staking Tokens ) work
              </p>
              <p>The SAK token is of 2x price of SOL</p>
              <p>Therefore, if you gave 1 SOL you will get back 2 SAK</p>
              <p>
                To trade here you need to make sure your wallet is in DevNet
              </p>

              <p>Made by Saksham ❤️</p>
            </div>
            <SwapInterface></SwapInterface>

            <div className="text-neutral-500 flex flex-col items-center justify-center">
              <p>Made by Saksham</p>
            </div>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
}
export default App;
