import { Transaction as SequelizeTransaction } from 'sequelize';
type GetWalletWithLockByWalletIdParams = { walletId: string };
type GetWalletWithLockByWalletDetailsParams = {
  userId: string;
  walletId: undefined;
};
export type GetWalletWithLockParams = { dbTransaction: SequelizeTransaction } & (
  | GetWalletWithLockByWalletDetailsParams
  | GetWalletWithLockByWalletIdParams
);
