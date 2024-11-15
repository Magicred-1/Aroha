import Image from "next/image";
import MetamaskConnectButton from "./Buttons/MetamaskConnectButton";
import SocialButton from "./Buttons/SocialButton";
import Logo from "./assets/Logo-Aroha.svg";
import { Web3AuthProvider } from "@/hooks/useWeb3AuthConnectorInstance";

export const Login = () => {
  return (
    <div className="bg-black p-2 w-1/2 h-screen p-32">
      <Image src={Logo} width={250} height={250} alt="Logo" />
      <div className="flex flex-col justify-center h-full">
        <div className="flex flex-col">
          <p className="text-3xl">Login in to your account</p>
          <p className="text-xs">Don't have an account ? Signup</p>
        </div>
        <div className="flex flex-col gap-4 mt-8">
          <SocialButton provider={Web3AuthProvider.GOOGLE} />
          <SocialButton provider={Web3AuthProvider.APPLE} />
          <MetamaskConnectButton />
          {/* <button onClick={() => disconnect()}>Disconnect</button> */}
        </div>
      </div>
    </div>
  );
};
