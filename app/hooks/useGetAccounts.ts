import { useMutation } from "@tanstack/react-query";
import { getAccounts } from "../mutations/get-accounts";

export const useGetAccounts = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: any) => void;
  onError: (error: any) => void;
}) => {
  return useMutation({
    mutationFn: getAccounts,
    onSuccess,
    onError,
  });
};
