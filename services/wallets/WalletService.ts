import { User, Wallet, sequelizeInstance } from '../../models';
import { GetWalletWithLockParams } from './types';

export class WalletService {
  private static singleton: WalletService;

  private constructor() {}

  static createDefault(): WalletService {
    return WalletService.create({});
  }

  static create({}): WalletService {
    return new WalletService();
  }

  static getSingleton(): WalletService {
    if (!WalletService.singleton) {
      WalletService.singleton = WalletService.createDefault();
    }
    return WalletService.singleton;
  }

  async updateWalletBalance(user: User, balanceChange: number): Promise<void> {
    const userWallet = await Wallet.findOne({
      where: {
        UserId: user.id,
      },
    });
    const dbTransaction = await sequelizeInstance.transaction();
    try {
      const wallet = await this.getWalletWithLock({
        dbTransaction,
        walletId: userWallet!.id,
      });
      await wallet.update(
        {
          balance: wallet.balance + balanceChange,
        },
        {
          transaction: dbTransaction,
        }
      );
      dbTransaction.commit();
      return;
    } catch (error: any) {
      dbTransaction.rollback();
      throw error;
    }
  }

  async getWalletWithLock(params: GetWalletWithLockParams): Promise<Wallet> {
    const walletIdToLock = params.walletId!;
    return Wallet.findByPkOrThrow(walletIdToLock, {
      transaction: params.dbTransaction,
      lock: params.dbTransaction.LOCK.NO_KEY_UPDATE,
    });
  }
}
