export type BlockReturn = {
  chainId: number,
  hash: string,
  number: number,
  timestamp: number,
  miner: string,
  transaction: TransactionReturn[] | [];
};

export type AccessListReturn = string[]

// NOTE: Remove r, s, v, raw, blockHash, creates fields
export type TransactionReturn = {
  hash: string;
  type: number;
  accessList: string[] | [];
  // blockHash: string;
  blockNumber: number;
  transactionIndex: number;
  confirmations: number;
  from: string;
  gasPrice: string | 0,
  maxPriorityFeePerGas: string;
  maxFeePerGas: string;
  gasLimit: string;
  to: string | '';
  value: string;
  nonce: number;
  data: string;
  // r: string;
  // s: string;
  // v: number;
  // creates: string;
  chainId: number;
  contractAddress: string;
  gasUsed: string;
  log: LogReturn[];
  cumulativeGasUsed: string;
  effectiveGasPrice: string;
  status: number;
  byzantium: boolean;
};
export type LogReturn = {
  transactionIndex: number;
  blockNumber: number;
  transactionHash: string;
  contractAddress: string;
  topics: string[]; // Assuming topics are an array of strings
  data: string;
  logIndex: number;
  blockHash: string;
}

export type Account = {
  tag: AccountTag,
  type: AccountType,
}
export enum AccountType {
  miner,
  EOA_active,
  EOA_inactive,
  EOA_exchange,
  contract_exchange,
  contract_normal,
  router,
}

export enum AccountTag {

}