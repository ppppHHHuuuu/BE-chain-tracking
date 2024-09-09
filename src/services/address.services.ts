import { BigNumber, ethers } from 'ethers';
import { JsonRpcProvider } from '@ethersproject/providers';
import { Alchemy, Network, AssetTransfersCategory, SortingOrder } from 'alchemy-sdk';

import { getRandomDrpcAPI, getRandomAlchemyAPI } from '../configs/provider.configs';
import { BigNumbertoEther } from '~/utils/convertEther';
import { ProviderType } from '~/types/providers.type';
async function getUserBalance(address: string) {
  const provider: JsonRpcProvider = getRandomDrpcAPI();
  const balance: BigNumber = await provider.getBalance(address);
  const balanceETH = BigNumbertoEther(balance);
  return balanceETH;
}
async function getAddressTokenBalance(address: string) {
  const provider: JsonRpcProvider = getRandomDrpcAPI();
  const balance: BigNumber = await provider.getBalance(address);
  const balanceETH = BigNumbertoEther(balance);
  return balanceETH;
}

async function getAddressTransactions(
  fromAddress: string,
  fromBlock: string = '0x0',
  toAddress: string | undefined ='',
  category: AssetTransfersCategory[] = [      
      AssetTransfersCategory.EXTERNAL,
      AssetTransfersCategory.ERC1155,
      AssetTransfersCategory.INTERNAL,
      AssetTransfersCategory.ERC20,
      AssetTransfersCategory.ERC721,
      AssetTransfersCategory.SPECIALNFT
    ],
  order: SortingOrder = SortingOrder.ASCENDING, // latest transaction last
) {
  if (toAddress == '') {
    toAddress = undefined;
  }
  const alchemy: Alchemy = getRandomAlchemyAPI();
  const params = {
    fromBlock: fromBlock,
    fromAddress: fromAddress,
    category: category,
    order: order,
    toAddress: toAddress,
  }
  console.log("params", params)

  const transactionHistory = await alchemy.core.getAssetTransfers(params);
  return transactionHistory;
}
export { getUserBalance, getAddressTransactions};
