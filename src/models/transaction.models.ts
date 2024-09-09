import mongoose from 'mongoose';
const { Schema } = mongoose;

const TransactionSchema = new Schema({
  sourceAddress: { type: String, required: true },
  destinationAddress: { type: String, required: true },
  amount: { type: Number, required: true },
  function: { type: String, required: true },
  timestamp: {type: Number, required: true},
});

const Transaction = mongoose.model('Transaction', TransactionSchema);
export {Transaction} ;