import { JsonRpcProvider, TransactionResponse } from '@ethersproject/providers';

import { ethers } from 'ethers';
import { TransactionReturn, BlockReturn, LogReturn, AccessListReturn } from './type';
import { parseAccessList, parseBlock, parseTransactions, parseLogs} from './parser';
import {RPC_URLs} from './API'
import { randomAPI, addBlockToFile, randomIntFromInterval } from './utils';
import { appendFileSync, writeFileSync } from 'fs';


//NOTE: Exclude last block
async function runBlocks(chainId: number, startBlock: number, endBlock: number) {
  let providerRandom: JsonRpcProvider;
  for (let i = startBlock; i < endBlock; i++) {
    try {
      let no = randomIntFromInterval(1, 20)
      providerRandom = new ethers.providers.JsonRpcProvider(
        RPC_URLs[no]
      )
      console.log("API Chosen ", no)
      const blockResult = await runBlock(providerRandom, chainId, i);
      addBlockToFile(blockResult, "test_crawl_20657529.json")
      console.log("Block Done No", blockResult.number)
    }
    catch (error) {
      appendFileSync("report.txt", error + '\n')
      console.log("Custom Error PHUDVQ", error)
      runBlocks(chainId, i, endBlock)
    }
  }
}
async function runBlock(provider: JsonRpcProvider, chainId: number, block_number: number): Promise<BlockReturn> {
  const block = await provider.getBlockWithTransactions(block_number);

  const transactionsResponse: TransactionResponse[] = block.transactions;
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
  // console.log(transactionsResponse)
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")


  const transactionReturns: TransactionReturn[] = await parseTransactions(
    transactionsResponse,
    parseLogs
  );
  // console.log(transactionReturns)

  const blockReturn: BlockReturn = parseBlock(chainId, block, transactionReturns);
  return blockReturn;
}

async function main() {
  const provider: JsonRpcProvider = new ethers.providers.JsonRpcProvider(
    //NOTE: API-0
    // 'https://lb.drpc.org/ogrpc?network=ethereum&dkey=AvFHGgG8vUoprYSFl1RGV32Q2QWkZC8R74NCmjoJxwjg'
    RPC_URLs[0]
  );
  
  const network = await provider.getNetwork();
  const chainId = network.chainId;

  // const start_block = 20657450;
  // const start_block = 20657484;
  // const start_block = 20657529;
  const start_block = 20657599;

  const end_block =   20667500;
  await runBlocks(chainId, start_block, end_block);
}
main()
