import { Button } from "@/components/ui/button";

interface TokenSelectorProps {
  token: {
    symbol: string;
    icon: string;
  };
  amount: number;
  label: string;
  balance?: number;
  onAmountChange: (newAmount: number) => void; 
}

export function TokenSelector({
  token,
  amount,
  label,
  balance,
  onAmountChange,
}: TokenSelectorProps) {
  return (
    <div className="rounded-lg p-4 text-white bg-black">
      <div className="mb-2 flex items-center justify-between bg-black">
        <span className="text-sm text-muted-foreground text-white">{label}</span>
        {balance && (
          <span className="text-sm text-muted-foreground text-white">
            <span className="mr-1 opacity-50 text-white">Balance:</span>
            {balance} {token.symbol}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2 bg-zinc-900 rounded-2xl">
        <Button variant="ghost" className="h-10 gap-2 rounded-lg pl-2 pr-3">
          <img
            src={token.icon}
            alt={token.symbol}
            className="size-6 rounded-full"
          />
          {token.symbol}
        </Button>
        <input
          onChange={(e) => onAmountChange(parseFloat(e.target.value) || 0)} // Call handler with new value
          type="number"
          placeholder="0.00"
          value={amount}
          className="flex-1 bg-transparent text-2xl outline-none placeholder:text-muted-foreground/50"
        />
      </div>
    </div>
  );
}
