import { Nip87MintTypes } from "@/types";
import {
  Button,
  Modal,
  TextInput,
  Label,
  Rating,
  Textarea,
  Tabs,
} from "flowbite-react";
import { ReviewModalBody } from "./ReviewModalBody";
import { CashuListingModalBody } from "./CashuListingModalBody";
import { FedimintListingModalBody } from "./FedimintListingModalBody";

interface ListReviewModalProps {
  show: boolean;
  onClose: () => void;
  mintType: Nip87MintTypes;
  mintUrl: string;
  setMintUrl: (url: string) => void;
  mintPubkey: string;
  setMintPubkey: (pubkey: string) => void;
  handleSubmit: () => void;
  type: "review" | "claim";
  rating?: number;
  setRating?: (rating: number) => void;
  review?: string;
  setReview?: (review: string) => void;
  isProcessing: boolean;
  inviteCode?: string;
  setInviteCode?: (code: string) => void;
}

const ListReviewModal = ({
  show,
  onClose,
  mintType,
  mintUrl,
  setMintUrl,
  mintPubkey,
  setMintPubkey,
  handleSubmit,
  type,
  rating,
  setRating,
  review,
  setReview,
  isProcessing,
  inviteCode,
  setInviteCode,
}: ListReviewModalProps) => {
  const title = type === "review" ? "Review Mint" : "List Mint";
  const submitText = type === "review" ? "Publish Review" : "Publish Listing";
  return (
    <Modal show={show} onClose={onClose} size="md" popup>
      <Modal.Header className="m-3">
        <h3 className="text-2xl font-medium">{title}</h3>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          {mintType === "cashu" ? (
            type === "review" ? (
              <ReviewModalBody
                mintUrl={mintUrl}
                setMintUrl={setMintUrl}
                rating={rating}
                setRating={setRating}
                review={review}
                setReview={setReview}
                mintType={mintType}
              />
            ) : (
              <CashuListingModalBody
                mintUrl={mintUrl}
                setMintUrl={setMintUrl}
              />
            )
          ) : // Fedimint
          type === "review" ? (
            <ReviewModalBody
              rating={rating}
              setRating={setRating}
              review={review}
              setReview={setReview}
              mintType={mintType}
              mintPubkey={mintPubkey}
              setMintPubkey={setMintPubkey}
              inviteCode={inviteCode}
              setInviteCode={setInviteCode}
            />
          ) : (
            <FedimintListingModalBody
              mintPubkey={mintPubkey}
              setMintPubkey={setMintPubkey}
              inviteCode={inviteCode}
              setInviteCode={setInviteCode}
            />
          )}
        </div>
        <div className="w-full">
          <Button
            isProcessing={isProcessing}
            onClick={handleSubmit}
            disabled={!inviteCode && !mintUrl && !mintPubkey}
          >
            {submitText}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ListReviewModal;
