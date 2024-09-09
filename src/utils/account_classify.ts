import { Network, Alchemy, AssetTransfersCategory, Utils } from 'alchemy-sdk';
enum AccountType {
  EOA_ACTIVE,
  EOA_INACTIVE,
  EOA_EXCHANGE,
  MINER,
  CONTRACT_NORMAL,
  CONTRACT_EXCHANGE,
  UNKNOWN,
  INVALID
}

const settings = {
  apiKey: 'MKvBAJsZLrRwfyXqgLavDif9Ba6xs9eo',
  network: Network.ETH_MAINNET
};

const alchemy = new Alchemy(settings);

const exchangeAddresses = ['0x28C6c06298d514Db089934071355E5743bf21d60'];
const inactiveAddresses = [0x0000000000000000000000000000000000000000];
async function classfifyAccount(address: string): Promise<AccountType> {
  if (isValidAddress(address) == false) {
    return AccountType.INVALID;
  }
  if (await isEOA_ACTIVE(address)) {
    return AccountType.EOA_ACTIVE;
  } else if (await isEOA_EXCHANGE(address)) {
    return AccountType.EOA_EXCHANGE;
  } else if (await isEOA_ACTIVE(address)) {
    return AccountType.EOA_ACTIVE;
  } else if (await isEOA_INACTIVE(address)) {
    return AccountType.EOA_INACTIVE;
  } else if (await isMINER(address)) {
    return AccountType.MINER;
  } else if (await isCONTRACT_EXCHANGE(address)) {
    return AccountType.CONTRACT_EXCHANGE;
  } else if (await isCONTRACT_NORMAL(address)) {
    return AccountType.CONTRACT_NORMAL;
  }
  return AccountType.UNKNOWN;
}
async function isEOA_ACTIVE(address: string): Promise<Boolean> {
  const checkEOA: Boolean = await alchemy.core.isContractAddress(address);
  if (checkEOA) {
    return false;
  }
  const checkActive: number = await alchemy.core.getTransactionCount(address);
  if (checkActive == 0) {
    return false;
  }
  return true;
}

//TODO: Implement the isValidAddress function
function isValidAddress(address: string): Boolean {
  return true;
}

async function isEOA_INACTIVE(address: string): Promise<Boolean> {
  const isEOA: Boolean = await alchemy.core.isContractAddress(address);
  if (isEOA) {
    return false;
  }
  const isActive: number = await alchemy.core.getTransactionCount(address);
  if (isActive == 0) {
    //NOTE: Add the inactive address to the list
    inactiveAddresses.push(address);
    return true;
  }
  return false;
}
//TODO: Fill the exchangeAddress
async function isEOA_EXCHANGE(address: string): Promise<Boolean> {
  const isEOA: Boolean = await alchemy.core.isContractAddress(address);
  if (isEOA) {
    return false;
  }
  if (address in exchangeAddresses) {
    return true;
  }
  return false;
}

//TODO: 
async function isMINER(address: string): Promise<Boolean> {
  return false;
}

async function isCONTRACT_NORMAL(address: string): Promise<Boolean> {
  const isContract = await alchemy.core.isContractAddress(address);
  if (isContract) {
    return true;
  }  
  return false;
}

async function isCONTRACT_EXCHANGE(address: string): Promise<Boolean> {
  if (address in exchangeAddresses) {
    return true;
  }
  return false;
}

async function main() {
  const checkActive: number = await alchemy.core.getTransactionCount(
    '0xed5dd27b1a11fb0f7c0a9630aaf982657c27cdbb'
  );
  console.log(checkActive);
}

main();
