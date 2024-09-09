import express from 'express';
import { getAddressTransactions, getUserBalance } from '../controllers/address.controller'

const router = express.Router();

// Route for getting user balance
router.get('/balance/:address', getUserBalance);

// Route for getting address transactions
router.get('/transactions/:address', getAddressTransactions);

export default router;