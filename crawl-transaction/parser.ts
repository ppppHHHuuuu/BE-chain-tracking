import { ethers, BigNumber} from "ethers";
import { TransactionResponse } from '@ethersproject/providers';
import { BlockWithTransactions } from '@ethersproject/abstract-provider';
import { TransactionReturn, BlockReturn, LogReturn, AccessListReturn } from './type';
import { AccessList } from "ethers/lib/utils";
import {wait } from './utils'
export function parseBlock(
  chainId: number,
  block: BlockWithTransactions,
  transactions: TransactionReturn[] | []
): BlockReturn {
  const blockObject = {
    chainId: chainId,
    hash: block.hash,
    timestamp: block.timestamp,
    number: block.number,
    miner: block.miner,
    transaction: transactions
  };
  return blockObject;
}

export function parseTransaction(
  transaction: TransactionResponse,
  transactionWait: ethers.providers.TransactionReceipt,
  logs: LogReturn[] | []
): TransactionReturn {
  const accessList: AccessListReturn = parseAccessList(transaction.accessList);
  const transactionObject: TransactionReturn = {
    hash: transaction.hash,
    type: transaction.type ?? -1,
    accessList: accessList,
    // blockHash: transaction.blockHash,
    blockNumber: transaction.blockNumber ?? -1,
    transactionIndex: transactionWait.transactionIndex,
    confirmations: transaction.confirmations,
    from: transaction.from,
    gasPrice: transaction.gasPrice?.toString() ?? '',
    maxPriorityFeePerGas: transaction.maxPriorityFeePerGas?.toString() ?? '',
    maxFeePerGas: transaction.maxFeePerGas?.toString() ?? '',
    gasLimit: transaction.gasLimit.toString(),
    to: transaction.to ?? '',
    value: transaction.value.toString(),
    nonce: transaction.nonce,
    data: transaction.data,
    // creates: transaction.;
    chainId: transaction.chainId,
    contractAddress: transactionWait.contractAddress,
    gasUsed: transactionWait.gasUsed.toString(),
    log: logs,
    cumulativeGasUsed: transactionWait.cumulativeGasUsed.toString(),
    effectiveGasPrice: transactionWait.effectiveGasPrice.toString(),
    status: transactionWait.status || -1,
    byzantium: transactionWait.byzantium
  };
  return transactionObject;
}

export async function parseTransactions(
  transactions: TransactionResponse[],
  callbackFn: (logs: ethers.providers.Log[]) => LogReturn[]
): Promise<TransactionReturn[]> {
  const transactionObjects: TransactionReturn[] = [];
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")

  for (let i = 0; i < transactions.length; i++) {

    console.log("transaction No ", i)
    console.log("----------------------------------------------")

    try {
      const transaction: TransactionResponse = transactions[i];
  
      const transactionWait: ethers.providers.TransactionReceipt = await transaction.wait();
  
      const logResponse: ethers.providers.Log[] = transactionWait.logs;
      const logObjects = callbackFn(logResponse);
  
      const transactionObject: TransactionReturn = parseTransaction(
        transaction,
        transactionWait,
        logObjects
      );
      transactionObjects.push(transactionObject);      
    } catch {
      transactionObjects.push({} as TransactionReturn)
    }
  }

  return transactionObjects;
}

export function parseLog(logs: ethers.providers.Log): LogReturn {
  const logObject: LogReturn = {
    transactionIndex: logs.transactionIndex,
    blockNumber: logs.blockNumber,
    transactionHash: logs.transactionHash,
    contractAddress: logs.address,
    topics: logs.topics,
    data: logs.data,
    logIndex: logs.logIndex,
    blockHash: logs.blockHash
  };
  return logObject;
}

export function parseLogs(logs: ethers.providers.Log[]): LogReturn[] {
  const logObjects: LogReturn[] = [];
  for (let i = 0; i < logs.length; i++) {
    const logObject: LogReturn = parseLog(logs[i]);
    logObjects.push(logObject);
  }
  return logObjects;
}

export function parseAccessList(accessList: AccessList | undefined): AccessListReturn {
  if (!accessList) {
    return []
  }
  const accessListReturn: AccessListReturn = [];
  accessList.map(item => (accessListReturn.push(item.address)))
  return accessListReturn;
}
export function parseBigNumber(number: BigNumber) {
  return number.toString()
}