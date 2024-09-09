import { Request, Response } from 'express';
import CustomError from '../errors/CustomError.errors';
import codes from '../errors/codes.errors';
import { getUserBalance as getUserBalanceService, getAddressTransactions as getAddressTransactionService } from '../services/address.services';
import { AssetTransfersCategory, SortingOrder } from 'alchemy-sdk';

async function getUserBalance(req: Request, res: Response) {
  try {
    const { address } = req.params;

    if (!address) {
      return res.status(400).json({ error: 'Address is required' });
    }

    const balance = await getUserBalanceService(address);
    res.json({ address, balance });
  } catch (error) {
    console.error('Error fetching user balance:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getAddressTransactions(req: Request, res: Response) {
  try {
    const { address } = req.params;
    const { fromBlock, toAddress, category, order } = req.query;

    if (!address) {
      return res.status(400).json({ error: 'Address is required' });
    }
    const fromBlockString = typeof fromBlock === 'string' ? fromBlock : undefined;

    const toAddressString = typeof toAddress === 'string' ? toAddress : undefined;
    // Parse and validate the category
    let parsedCategory: AssetTransfersCategory[] | undefined;
    if (category) {
      try {
        parsedCategory = JSON.parse(category as string) as AssetTransfersCategory[];
      } catch (e) {
        return res.status(400).json({ error: 'Invalid category format' });
      }
    }

    // Parse and validate the order
    let parsedOrder: SortingOrder | undefined;
    if (order) {
      if (order === SortingOrder.ASCENDING || order === SortingOrder.DESCENDING) {
        parsedOrder = order;
      } else {
        return res.status(400).json({ error: 'Invalid order value' });
      }
    }

    const transactions = await getAddressTransactionService(
      address,
      fromBlockString,
      toAddressString,
      parsedCategory,
      parsedOrder
    );

    res.json(transactions);
  } catch (error) {
    console.error('Error fetching address transactions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export { getAddressTransactions, getUserBalance };
