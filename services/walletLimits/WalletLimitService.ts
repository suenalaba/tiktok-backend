import { Wallet, WalletLimit } from '../../models';

export class WalletLimitService {
  private static singleton: WalletLimitService;

  private constructor() {}

  static createDefault(): WalletLimitService {
    return WalletLimitService.create({});
  }

  static create({}): WalletLimitService {
    return new WalletLimitService();
  }

  static getSingleton(): WalletLimitService {
    if (!WalletLimitService.singleton) {
      WalletLimitService.singleton = WalletLimitService.createDefault();
    }
    return WalletLimitService.singleton;
  }

  async updateUserWalletLimit(
    userWithNewLimitId: string,
    userWalletToAddLimitId: string,
    spendingLimit: number
  ) {
    try {
      const userWallet = await Wallet.findOne({
        where: {
          UserId: userWalletToAddLimitId, // this is the wallet we want to add a spending limit
        },
      });
      if (!userWallet) {
        throw new Error('User wallet not found');
      }

      const walletLimit = await WalletLimit.findOne({
        where: {
          UserId: userWithNewLimitId,
          WalletId: userWallet.id,
        },
      });

      if (walletLimit) {
        // update
        const [rowsUpdated] = await WalletLimit.update(
          {
            userSpendingLimit: spendingLimit,
          },
          {
            where: {
              UserId: userWithNewLimitId,
              WalletId: userWallet.id,
            },
          }
        );
        if (rowsUpdated === 0) {
          throw new Error('Wallet limit not updated');
        }
      } else {
        const newWalletLimit = await WalletLimit.create({
          UserId: userWithNewLimitId,
          WalletId: userWallet.id,
          userSpendingLimit: spendingLimit,
        });
        if (!newWalletLimit) {
          throw new Error('Wallet limit not created');
        }
      }
    } catch (error: any) {
      throw error;
    }
  }

  async getTotalUserWalletLimit(userId: string) {
    try {
      const sum = await WalletLimit.sum('userSpendingLimit', {
        where: {
          UserId: userId,
        },
      });
      return sum ?? 0;
    } catch (error) {
      throw error;
    }
  }
}
