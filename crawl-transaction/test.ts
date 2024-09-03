import {getTransactionByHash} from './transaction'
import { JsonRpcProvider, TransactionResponse } from '@ethersproject/providers';
import {RPC_URLs} from './API'
import { ethers } from "ethers";

const provider: JsonRpcProvider = new ethers.providers.JsonRpcProvider(
  //NOTE: API-0
  // 'https://lb.drpc.org/ogrpc?network=ethereum&dkey=AvFHGgG8vUoprYSFl1RGV32Q2QWkZC8R74NCmjoJxwjg'
  RPC_URLs[2]
);
async function run_test() {
  // const block = await getBlockByNumber(20452632);
  // console.log(parseBlock(1, block, block.transactions))
  // console.log(block.transactions);
  // const transaction await getTransactionByHash("")
  const transaction = await getTransactionByHash(provider, "0x5eb954e30459f106aacd66216beab91b987587b13b32dca591a5ddc709dbf354");
  console.log(transaction)
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
  let status = -1;

  try {
    const transacitonWait = await transaction.wait();
    status = transacitonWait.status ?? -1; 
    console.log(transacitonWait)

  }
  catch {
    status = 0
    console.log("failed to wait ", status)
  }
}
run_test()