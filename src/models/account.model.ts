import mongoose from 'mongoose';
const { Schema } = mongoose;

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
  fraud,
  money_laundering
}

const AccountSchema = new Schema({
  address: {
    type: String,
    required: true,
    unique: true
  },
  balance: {
    type: String,
    required: [true, 'To address is required'],
    min: ["0", 'Balance must be non-negative']
  },
  accountType :{
    type: String,
    enum: AccountType
  },
  tag: {
    type: String,
    enum: AccountTag
  }
});

const Account = mongoose.model('Account', AccountSchema);
export default Account;