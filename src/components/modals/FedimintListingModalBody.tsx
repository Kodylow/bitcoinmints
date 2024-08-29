import { Button, Label, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";

interface FedimintListingModalBodyProps {
  mintPubkey?: string;
  setMintPubkey: (pubkey: string) => void;
  inviteCode?: string;
  setInviteCode?: (code: string) => void;
}

export const FedimintListingModalBody = ({
  mintPubkey,
  setMintPubkey,
  inviteCode,
  setInviteCode,
}: FedimintListingModalBodyProps) => {
  const [federationMeta, setFederationMeta] = useState<any>(null); // New state for federation meta
  const [showFederationMeta, setShowFederationMeta] = useState<boolean>(false);

  useEffect(() => {
    // Function to fetch federation ID and meta
    const fetchFederationInfo = async (code: string) => {
      try {
        let response = await fetch(`https://fmo.sirion.io/config/${code}/id`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        let data = await response.text();
        setMintPubkey(data.replace(/"/g, "")); // Set the mint pubkey as the federation ID, need to remove quotes

        response = await fetch(`https://fmo.sirion.io/config/${code}/meta`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        data = await response.json();
        setFederationMeta(data); // Set the entire meta JSON for inspection
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };
    if (inviteCode) {
      fetchFederationInfo(inviteCode);
    }
  }, [inviteCode, setMintPubkey, setFederationMeta]);

  // Function to view formatted federation meta
  const toggleFederationMeta = () => {
    setShowFederationMeta(!showFederationMeta);
  };

  return (
    <>
      <div>
        <div className="mb-2 block">
          <Label>Invite Code</Label>
        </div>
        <Textarea
          placeholder="fedxyz..."
          id="invite-code"
          value={inviteCode}
          onChange={(e) => {
            const newCode = e.target.value;
            setInviteCode!(newCode);
          }}
        />
        {mintPubkey && (
          <div className="mt-2">
            <Label>Federation ID:</Label>
            <div className="text-sm">{mintPubkey}</div>
          </div>
        )}
        {federationMeta?.federation_name && ( // Display federation name if available
          <div className="mt-2">
            <Label>Federation Name:</Label>
            <div>{federationMeta.federation_name}</div>
          </div>
        )}
        {federationMeta && !showFederationMeta && (
          <div className="mt-2">
            <Button onClick={toggleFederationMeta}>View Federation Meta</Button>
          </div>
        )}
        {showFederationMeta && (
          <div>
            <div className="mt-2">
              <Label>Federation Meta:</Label>
            </div>
            <div
              className="mt-2 p-4 bg-gray-800 rounded text-sm text-white overflow-auto"
              style={{ maxHeight: "400px" }}
            >
              <pre>{JSON.stringify(federationMeta, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
