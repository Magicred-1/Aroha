import React from "react";
import Image from "next/image";
import AppleIcon from "../assets/socialsLogo/login-apple.svg";
import GoogleIcon from "../assets/socialsLogo/login-google.svg";
import { Web3AuthProvider, useWeb3AuthConnectorInstance } from "@/hooks/useWeb3AuthConnectorInstance";

type SocialButtonProps = {
  provider: Web3AuthProvider;
};

const SocialButton = ({ provider }: SocialButtonProps) => {
  const { web3AuthLogin } = useWeb3AuthConnectorInstance();
  const buttonStyle = provider === Web3AuthProvider.APPLE ? "bg-white text-black" : "bg-[#0f89ce] text-white";
  const logo = provider === Web3AuthProvider.APPLE ? AppleIcon : GoogleIcon;

  return (
    <button
      className={`${buttonStyle} rounded-full py-3 flex flex-row justify-center items-center gap-2`}
      onClick={() => web3AuthLogin(provider)}
    >
      <Image src={logo} width={20} height={20} alt="social icon" />
      {provider === Web3AuthProvider.APPLE ? "Continue with Apple" : "Continue with Google"}
    </button>
  );
};

export default SocialButton;
