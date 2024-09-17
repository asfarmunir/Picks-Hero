export const getAccounts = async () => {
  const response = await fetch("/api/accounts");
  if (!response.ok) {
    throw new Error("Failed to fetch accounts");
  }
  return response.json();
};
// Compare this snippet from app/mutations/get-account.ts:
// export const getAccount = async (id: string) => {
//   const response = await fetch(`/api/accounts/${id}`);
//   if (!response.ok) {
//     throw new Error("Failed to fetch account");
//   }
//   return response.json();
// };
