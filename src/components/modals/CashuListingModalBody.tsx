import { Label, TextInput } from "flowbite-react";

interface CashuListingModalBodyProps {
  mintUrl: string;
  setMintUrl: (url: string) => void;
}

export const CashuListingModalBody = ({
  mintUrl,
  setMintUrl,
}: CashuListingModalBodyProps) => (
  <div className="space-y-6">
    <div>
      <div className="mb-2 block">
        <Label>Mint URL</Label>
      </div>
      <TextInput
        placeholder="https://mint.example.com"
        id="mint-url"
        value={mintUrl}
        onChange={(e) => setMintUrl(e.target.value)}
        required
      />
    </div>
  </div>
);
