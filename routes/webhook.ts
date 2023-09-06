import * as express from 'express';
import { StripeController } from '../controllers';

const router = express.Router();

router.post(
  '/stripe-sg/stripe-events',
  express.raw({ type: 'application/json' }),
  StripeController.handleStripeWebhook
);

