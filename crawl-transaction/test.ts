import {getTransactionByHash} from './transaction'
import { JsonRpcProvider, TransactionResponse } from '@ethersproject/providers';
import {RPC_URLs} from './API'
import { ethers } from "ethers";
import {openSync} from 'fs'
const provider: JsonRpcProvider = new ethers.providers.JsonRpcProvider(
  //NOTE: API-0
  // 'https://lb.drpc.org/ogrpc?network=ethereum&dkey=AvFHGgG8vUoprYSFl1RGV32Q2QWkZC8R74NCmjoJxwjg'
  RPC_URLs[2]
);
async function run_test(start: number, end: number) {
  let fd = openSync(__dirname + `/result/test_crawl_${start}_${end}.json`, 'w')

  console.log('fd ==> ', fd)
}
run_test(0, 5)