import { IDKitWidget, VerificationLevel } from "@worldcoin/idkit";
import { useEffect, useState } from "react";
import { useTransaction  } from "wagmi";

const onSuccess = async (response: any) => {
  console.log({ response });
};

export default function WorldcoinButton() {
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    verify();
  }, []);

  const handleVerify = async (proof: any) => {
    localStorage.setItem("proof", JSON.stringify(proof));
    setIsVerified(true);
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
            app_id="app_staging_4c2f84b00fbf4b9b3596abd61db917a6" // obtained from the Developer Portal
            action="test" // this is your action id from the Developer Portal
            onSuccess={onSuccess} // callback when the modal is closed
            handleVerify={handleVerify} // optional callback when the proof is received
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