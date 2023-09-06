import * as express from 'express';
import { WalletLimitController } from '../controllers';

const router = express.Router();

router.put(
  '/update-user-wallet-limit',
  WalletLimitController.updateUserWalletLimit
);

router.get('/get-user-total', WalletLimitController.getTotalUserWalletLimit);

module.exports = {
  path: '/wallet-limit',
  router,
};
