import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import MetamaskConnectButton from "./Buttons/MetamaskConnectButton";
import SocialButton from "./Buttons/SocialButton";
import Logo from "./assets/Logo-Aroha.svg";
import DotPattern from "./ui/dot-pattern";
import { useAccount } from "wagmi";
import { Web3AuthProvider } from "@/hooks/useWeb3AuthConnectorInstance";
import { cn } from "@/lib/utils";

export const Login = () => {
  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (isConnected) {
      router.push("/dashboard");
    }
  }, [isConnected]);

  return (
    <div className="bg-black p-2 w-1/2 h-screen p-32">
      <Image src={Logo} width={250} height={250} alt="Logo" />

      <div className="flex flex-col justify-center h-full">
        <div className="flex flex-col">
          <p className="text-3xl">Login in to your account</p>
        </div>

        <div className="flex flex-col gap-4 mt-8">
          <SocialButton provider={Web3AuthProvider.GOOGLE} />
          <SocialButton provider={Web3AuthProvider.APPLE} />
          <MetamaskConnectButton />
          <DotPattern
            className={cn(" -left-72 [mask-image:radial-gradient(450px_circle_at_center,white,transparent)]")}
          />
          {/* <button onClick={() => disconnect()}>Disconnect</button> */}
        </div>
      </div>
    </div>
  );
};
