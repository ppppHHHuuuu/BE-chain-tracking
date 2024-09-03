import { ethers } from "ethers";
export async function getTransactionByHash(
  provider: ethers.providers.JsonRpcProvider,
  transactionHash: string
) {
  const network = await provider.getNetwork();
  const chainId = network.chainId;
  const transaction = await provider.getTransaction(transactionHash);
  return transaction;
}
