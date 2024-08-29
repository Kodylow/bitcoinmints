import { Nip87MintTypes } from "@/types";
import { Label, Rating, Textarea, TextInput } from "flowbite-react";

interface ReviewModalBodyProps {
  mintUrl?: string;
  setMintUrl?: (url: string) => void;
  rating?: number;
  setRating?: (rating: number) => void;
  review?: string;
  setReview?: (review: string) => void;
  mintType: Nip87MintTypes;
  mintPubkey?: string;
  setMintPubkey?: (pubkey: string) => void;
  inviteCode?: string;
  setInviteCode?: (code: string) => void;
}

export const ReviewModalBody = ({
  mintUrl,
  setMintUrl,
  rating,
  setRating,
  review,
  setReview,
  mintType,
  mintPubkey,
  setMintPubkey,
  inviteCode,
  setInviteCode,
}: ReviewModalBodyProps) => {
  if (mintType === Nip87MintTypes.Cashu) {
    if (mintUrl === undefined || setMintUrl === undefined) {
      throw new Error("mintUrl and setMintUrl are required on type Cashu");
    }
    if (mintPubkey || setMintPubkey) {
      throw new Error(
        "mintPubkey and setMintPubkey are not allowed on type Cashu"
      );
    }
  }
  if (mintType === Nip87MintTypes.Fedimint) {
    if (mintPubkey === undefined || setMintPubkey === undefined) {
      throw new Error(
        "mintPubkey and setMintPubkey are required on type Fedimint"
      );
    }
    if (mintUrl || setMintUrl) {
      throw new Error(
        "mintUrl and setMintUrl are not allowed on type Fedimint"
      );
    }
  }
  return (
    <>
      <div>
        <div className="mb-2 block">
          <Label>
            {mintType === Nip87MintTypes.Cashu ? "Mint URL" : "Federation Id"}
          </Label>
        </div>
        <TextInput
          placeholder={
            mintType === Nip87MintTypes.Cashu
              ? "https://mint.example.com"
              : "fed1..."
          }
          id="mint-url"
          value={mintType === Nip87MintTypes.Cashu ? mintUrl : mintPubkey}
          onChange={
            mintType === Nip87MintTypes.Cashu
              ? (e) => setMintUrl!(e.target.value)
              : (e) => setMintPubkey!(e.target.value)
          }
          required
        />
      </div>
      {rating !== undefined && setRating ? (
        <div>
          <Label>Rating</Label>
          <Rating className="hover:cursor-pointer">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Rating.Star
                key={idx}
                filled={idx < rating}
                onClick={() => setRating(idx + 1)}
              />
            ))}
          </Rating>
          <p className="text-sm text-gray-500">
            On average, how has the mint performed?
          </p>
        </div>
      ) : null}
      {review !== undefined && setReview ? (
        <div>
          <Label>Review</Label>
          <Textarea
            placeholder="I've been using this mint for a while now and it hasn't rugged me!"
            id="review"
            required
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows={3}
          />
        </div>
      ) : null}
    </>
  );
};
