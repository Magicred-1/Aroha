import { IDKitWidget, VerificationLevel } from "@worldcoin/idkit";
import { useEffect, useState } from "react";
import { useWriteContract } from "wagmi";
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import { AhoraABI } from "../abi/Ahora";
import { useAccount } from "wagmi";

const onSuccess = async (response: any) => {
  console.log({ response });
};

export default function WorldcoinButton() {
  const [isVerified, setIsVerified] = useState(false);
  const { writeContract } = useWriteContract();

  const { address } = useAccount();

  useEffect(() => {
    verify();
  }, []);

  // Function to create a Merkle Tree
  const createMerkleTree = (addresses: string[]) => {
    const tree = StandardMerkleTree.of(addresses.map((addr) => [addr]), ["address"]);
    console.log("Merkle Root:", tree.root);
    console.log("Tree:", tree.dump());
    return tree;
  };

  // Fetch proof for a specific address
  const getProofForAddress = ({ tree, address }: { tree: any; address: string }) => {
    for (const [index, value] of tree.entries()) {
      if (value[0] === address) {
        return tree.getProof(index);
      }
    }
    throw new Error("Address not found in Merkle Tree");
  };

  const handleVerify = async () => {
    if (!address) {
      console.error("Address not found. Please connect your wallet.");
      return;
    }

    try {
      const tree = createMerkleTree([address]); // Use the address from wagmi
      const proof = getProofForAddress({ tree, address });

      writeContract({
        abi: AhoraABI, // Use correct key for ABI
        address: "0x6b175474e89094c44da98b954eedeac495271d0f", // Contract address
        functionName: "whitelist",
        args: [proof, address],
      });

      setIsVerified(true);
    } catch (error) {
      console.error("Verification failed:", error);
    }
  };

  const verify = () => {
    const proof = localStorage.getItem("proof");
    setIsVerified(!!proof);
  };

  return (
    <>
      {isVerified ? (
        <p className="mb-3">You are verified with World ID</p>
      ) : (
        <div>
          <IDKitWidget
            app_id="app_staging_4c2f84b00fbf4b9b3596abd61db917a6"
            action="test"
            onSuccess={onSuccess}
            handleVerify={handleVerify}
            verification_level={VerificationLevel.Device}
          >
            {({ open }: { open: any }) => (
              <button
                className="cursor-pointer border-none px-5 py-2 w-fit mx-auto bg-white hover:opacity-90 hover:bg-black text-black transition rounded-full mb-3"
                onClick={open}
              >
                Verify with World ID
              </button>
            )}
          </IDKitWidget>
        </div>
      )}
    </>
  );
}
