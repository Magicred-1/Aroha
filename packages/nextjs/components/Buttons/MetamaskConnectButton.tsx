import Image from "next/image";
import MetamaskLogo from "../assets/socialsLogo/MetamaskIcon.svg";
import { useConnect } from "wagmi";

const MetamaskConnectButton = () => {
  const { connectors } = useConnect();

  return (
    <button
      className="bg-[#d4761e] text-white py-3 rounded-full flex flex-row justify-center items-center gap-2"
      onClick={() => connectors[0].connect()}
    >
      <Image src={MetamaskLogo} width={20} height={20} alt="social icon" />
      MetaMask
    </button>
  );
};

export default MetamaskConnectButton;
