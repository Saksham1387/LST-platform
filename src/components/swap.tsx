"use client";
import { ArrowDownUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TokenSelector } from "./token-selector";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import {
  SystemProgram,
  LAMPORTS_PER_SOL,
  Transaction,
  PublicKey,
} from "@solana/web3.js";

const tokens = {
  USDC: {
    symbol: "SOL",
    icon: "/sol-icon.png",
  },
  SOL: {
    symbol: "SAK",
    icon: "/SAK-icon.jpeg",
  },
};

export default function SwapInterface() {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [solAmount, setSolAmount] = useState(0);
  const [sakAmount, setSakAmount] = useState(0);
  const [balance, SetBalance] = useState(0);
  const [isTransactionOn, setIsTransactionOn] = useState(false);

  async function sendSOL() {
    setIsTransactionOn(true);
    console.log("transaction initiated");
    const transferTransaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey!,
        toPubkey: new PublicKey("6bEWYx8e7KgLHDGg65xfThZeDTBjZjFepnQvVmo6deBi"),
        lamports: solAmount * LAMPORTS_PER_SOL,
      })
    );

    await wallet.sendTransaction(transferTransaction, connection);
    setIsTransactionOn(false);
  }

  useEffect(() => {
    async function getBalance1() {
      const res = await connection.getBalance(wallet.publicKey!);
      const sol = res / LAMPORTS_PER_SOL;
      SetBalance(sol);
    }

    getBalance1();
  });

  const handleSolAmountChange = (newAmount: number) => {
    setSolAmount(newAmount);
    setSakAmount(newAmount * 2);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <main className="flex flex-1 items-start justify-center px-4 py-8 ">
        <Card className="w-full max-w-md border-none bg-card/50 p-4 bg-zinc-900">
          <div className="mb-6 space-y-4 bg-black"></div>

          <div className="space-y-2">
            <TokenSelector
              token={tokens.USDC}
              amount={solAmount}
              label="You're Selling"
              balance={balance}
              onAmountChange={handleSolAmountChange}
            />
            <div className="flex justify-center ">
              <Button variant="ghost" size="icon" className="size-8">
                <ArrowDownUp className="size-4 text-white" />
              </Button>
            </div>
            <TokenSelector
              token={tokens.SOL}
              amount={sakAmount}
              label="You're Buying"
              //@ts-ignore
              balance=""
              onAmountChange={() => {}}
            />
          </div>
          {isTransactionOn ? (
            <Button className="mt-4 w-full bg-[#95B884] font-medium bg-[#95B884]/90  cursor-not-allowed text-primary-foreground shadow ">
              Sending....
            </Button>
          ) : (
            <Button
              className="mt-4 w-full bg-[#95B884] font-medium hover:bg-[#95B884]/90"
              onClick={sendSOL}
            >
              Send Sol
            </Button>
          )}
        </Card>
       
      </main>
      
    </div>
  );
}
