import { useWriteContract } from "wagmi";
import { ABI_AROHA } from "@/app/data/ABI_AROHA";

const useBuyToken = () => {
  const { writeContract } = useWriteContract();

  const buy = () => {
    writeContract({
      abi: ABI_AROHA,
      address: "0x1234567890123456789012345678901234567890",
      functionName: "buy",
      args: ["0x8B3200C0e21f121df60EF717A74617Df4Fa367af", BigInt(1000000), false],
    });
  };
};
