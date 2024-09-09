import { Transaction } from '../models/transaction.models';
import { ETHERSCAN_KEY, ETHERSCAN_URL } from '../configs/api.configs';
import axios, { isCancel, AxiosError } from 'axios';


async function getTransactionsByBlock(
  address: string,
  startBlock: number,
  endBlock: number
): Promise<(typeof Transaction)[]> {
  const API_URL =
    ETHERSCAN_URL +
    `api?module=account&action=txlist&address=${address}&startblock=${startBlock}&endblock=${endBlock}&sort=asc&apikey=` +
    ETHERSCAN_KEY;
  const response = await axios.get(API_URL);
  const transaction: (typeof Transaction)[] = response.data.result.map(
    (txData: any) => {
      return new Transaction({
        sourceAddress: txData.from,
        destinationAddress: txData.to,
        amount: txData.value,
        function: txData.input,
        timestamp: txData.timeStamp
      });
    }
  );

  return transaction;
}