const { Network, Alchemy, Utils } = require("alchemy-sdk");

const settings = {
  apiKey: "MKvBAJsZLrRwfyXqgLavDif9Ba6xs9eo", // Replace with your API key
  network: Network.ETH_MAINNET, // Replace with your Network
};

const alchemy = new Alchemy(settings);

async function main() {
  const gasEstimate = await alchemy.core.estimateGas({
    to: "vitalik.eth",
    // parsing 1 ETH to wei using Utils
    value: Utils.parseEther("1.0"),
  });
  console.log(gasEstimate);
}

main();