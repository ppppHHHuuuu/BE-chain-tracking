import { JsonRpcProvider, TransactionResponse } from '@ethersproject/providers';

import { ethers } from 'ethers';
import { TransactionReturn, BlockReturn, LogReturn, AccessListReturn } from './type';
import { parseAccessList, parseBlock, parseTransactions, parseLogs} from './parser';
import {RPC_URLs} from './API'
import { randomAPI, addBlockToFile, randomIntFromInterval } from './utils';
import { appendFileSync, writeFileSync } from 'fs';
import {openSync} from 'fs'
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
  const start_block = 20657629;
  const end_block =   20660000;

  // const end_block =   20667500;
  for (let i = start_block; i < end_block; i += 100) {
    await runBlocks(chainId, i, i + 100);
  }
}

//NOTE: Exclude last block
async function runBlocks(chainId: number, startBlock: number, endBlock: number) {

  let providerRandom: JsonRpcProvider;
  let fd = openSync(__dirname + `/result/test_crawl_${startBlock}_${endBlock - 1}.json`, 'w')
  let prev_no = -1;
  for (let i = startBlock; i < endBlock; i++) {
    let attempts = 0;
    const maxAttempts = 3; // Set max retry attempts
    while (attempts < maxAttempts) {
      try {
        let no = randomIntFromInterval(1, 20);
        if (prev_no == no) {
          no = randomIntFromInterval(1, 20)
        }
        providerRandom = new ethers.providers.JsonRpcProvider(
          RPC_URLs[no]
        )
        const blockResult = await runBlock(providerRandom, chainId, i);
        addBlockToFile(blockResult, __dirname+ `/result/test_crawl_${startBlock}_${endBlock - 1}.json`)
        prev_no = no;
        console.log("Block Done No", blockResult.number)
        break;
      }
      catch (error) {
        attempts++;
        let fd = openSync(__dirname + `/result/report_${startBlock}_${endBlock - 1}.txt`, 'w')
        appendFileSync(__dirname + `/result/report_${startBlock}_${endBlock - 1}.txt`, `Failed after ${attempts} attempts for block ${i}` + '\n')
        console.log("Custom Error PHUDVQ ", error)
        if (attempts == maxAttempts) {
          appendFileSync(__dirname + `/result/report_${startBlock}_${endBlock - 1}.txt`, `Failed after ${maxAttempts} attempts for block ${i}` + '\n' + error + '\n')
        }
      }
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

main()
