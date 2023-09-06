import { Request as Req, Response as Res, NextFunction as Next } from 'express';
import { RequestWithUser } from '../models/lib/tsTypes';
import { WalletLimitService } from '../services/walletLimits';

async function updateUserWalletLimit(req: Req, res: Res, next: Next) {
  try {
    const { user } = req as RequestWithUser;
    const { userWalletToAddLimitId, spendingLimit } = req.body;
    await WalletLimitService.getSingleton().updateUserWalletLimit(
      user.id,
      userWalletToAddLimitId,
      spendingLimit
    );

    return res.sendStatus(200);
  } catch (error: any) {
    return next(error);
  }
}

async function getTotalUserWalletLimit(req: Req, res: Res, next: Next) {
  try {
    const { user } = req as RequestWithUser;
    const totalUserWalletLimit =
      await WalletLimitService.getSingleton().getTotalUserWalletLimit(user.id);

    return res.json(totalUserWalletLimit);
  } catch (error: any) {
    return next(error);
  }
}

export { updateUserWalletLimit, getTotalUserWalletLimit };
