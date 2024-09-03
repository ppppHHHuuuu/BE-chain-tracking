import { readFileSync, writeFileSync } from "fs";
import { BlockReturn } from "./type";

export function randomIntFromInterval(min: number, max: number) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}
export function randomAPI() {
  console.log("Get into randomAPI")
  let number = randomIntFromInterval(1, 20);
  const API_KEY = process.env[`RPC_URL_BLOCKCHAIN_${number}`]!;
  return API_KEY
}
export const wait = (ms: number) => new Promise(
  (resolve, reject) => setTimeout(resolve, ms)
);
export function addBlockToFile(data: BlockReturn, block_file: string) {
  let blocksJson = readFileSync(block_file, 'utf8');
  if (blocksJson == '') {
    blocksJson = '[]';
  }
  let blocksObject: any[] = [];
  blocksObject = JSON.parse(blocksJson);

  blocksObject.push(data);

  blocksJson = JSON.stringify(blocksObject);
  writeFileSync(block_file, blocksJson);
}