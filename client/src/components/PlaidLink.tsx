import { useEffect, useState } from "react";
import { usePlaidLink } from "react-plaid-link";
import { plaidService } from "@/services/plaid";

export function PlaidLink({ onSuccess }: { onSuccess: () => void }) {
  const [linkToken, setLinkToken] = useState(null);

  useEffect(() => {
    const getLinkToken = async () => {
      const token = await plaidService.createLinkToken();
      setLinkToken(token);
    };
    getLinkToken();
  }, []);

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: async (public_token) => {
      await plaidService.exchangeToken(public_token);
      onSuccess();
    },
  });

  return (
    <button
      onClick={() => open()}
      disabled={!ready}
      className="bg-blue-600 text-white px-4 py-2 rounded-md"
    >
      Connect Bank Account
    </button>
  );
}
