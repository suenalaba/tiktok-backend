import Stripe from 'stripe';
import { Request as Req, Response as Res, NextFunction as Next } from 'express';
import { RequestWithUser } from '../models/lib/tsTypes';
import IConfig from '../config/default';
import { stripeService } from '../services/payment-integration';
import { EventConsumerService } from '../services/payment-integration/EventConsumerService';
import { User } from '../models';

const config: IConfig = require('config');

const { stripeEndpointSecret } = config.stripe;

async function handleStripeWebhook(req: Req, res: Res, next: Next) {
  try {
    const sig = req.headers['stripe-signature'];
    if (!sig) return res.sendStatus(400);

    // Verify if request is indeed from stripe. Has to be the rawbody or it will fail.
    const event: Stripe.Event = await stripeService.verifyStripeSignature(
      (req as any).rawBodyStripe,
      sig,
      stripeEndpointSecret
    );

    // Send the event to Subscription Service
    await EventConsumerService.getSingleton().consume(event);

    return res.sendStatus(200);
  } catch (error: any) {
    return next(error);
  }
}

async function createStripeCheckoutSession(req: Req, res: Res, next: Next) {
  try {
    const { user } = req as RequestWithUser;
    const { productId, amountInSgd } = req.body;
    const checkoutSessionUrl = await stripeService.createCheckoutSession({
      user,
      amountInSgd,
    });

    return res.status(200).json({ url: checkoutSessionUrl });
  } catch (error: any) {
    return next(error);
  }
}

export { handleStripeWebhook };
