// Setup: npm install alchemy-sdk
import { Alchemy, Network, AssetTransfersCategory, SortingOrder } from 'alchemy-sdk';
import { writeFileSync } from 'fs';
import { describe } from 'node:test';

const config = {
  apiKey: 'MKvBAJsZLrRwfyXqgLavDif9Ba6xs9eo',
  network: Network.ETH_MAINNET
};
const alchemy: Alchemy = new Alchemy(config);
async function test() {
  const data = await alchemy.core.getAssetTransfers({
    fromBlock: '0x0',
    fromAddress: '0x5c43B1eD97e52d009611D89b74fA829FE4ac56b1',
    order: SortingOrder.ASCENDING,
    category: [
      AssetTransfersCategory.EXTERNAL,
      AssetTransfersCategory.ERC1155,
      AssetTransfersCategory.INTERNAL,
      AssetTransfersCategory.ERC20,
      AssetTransfersCategory.ERC721,
      AssetTransfersCategory.SPECIALNFT
    ]
  });
  console.log(JSON.stringify(data));
  const dataObject = JSON.stringify(data);
  writeFileSync('test.json', dataObject);
}

test();
