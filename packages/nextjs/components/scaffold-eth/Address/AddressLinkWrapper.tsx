import Link from "next/link";
import { useTargetNetwork } from "@/hooks/scaffold-eth";
import { hardhat } from "viem/chains";

type AddressLinkWrapperProps = {
  children: React.ReactNode;
  disableAddressLink?: boolean;
  blockExplorerAddressLink: string;
};

export const AddressLinkWrapper = ({
  children,
  disableAddressLink,
  blockExplorerAddressLink,
}: AddressLinkWrapperProps) => {
  const { targetNetwork } = useTargetNetwork();

  return disableAddressLink ? (
    <>{children}</>
  ) : (
    <Link
      href={blockExplorerAddressLink}
      target={targetNetwork.id === hardhat.id ? undefined : "_blank"}
      rel={targetNetwork.id === hardhat.id ? undefined : "noopener noreferrer"}
    >
      {children}
    </Link>
  );
};