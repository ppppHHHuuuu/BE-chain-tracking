import { ethers } from "ethers";
import { BlockWithTransactions } from '@ethersproject/abstract-provider';

export async function getBlockByNumber(
  provider: ethers.providers.JsonRpcProvider,
  block_number: number
): Promise<BlockWithTransactions> {
  const network = await provider.getNetwork();
  const chainId = network.chainId;
  const block = await provider.getBlockWithTransactions(block_number);
  return block;
}
