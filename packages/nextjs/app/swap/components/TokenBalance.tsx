export const TokenBalance = ({ token }:any) => {
  const formattedBalance = token.balance / 10n ** BigInt(token.decimals);

  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
          {token.symbol.charAt(0)}
        </div>
        <div>
          <div className="font-medium">{token.symbol}</div>
          <div className="text-sm text-gray-400">{token.name}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="font-medium">{Number(formattedBalance).toFixed(6)}</div>
        <div className="text-sm text-gray-400">${(Number(formattedBalance) * 1).toFixed(2)}</div>
      </div>
    </div>
  );
};
