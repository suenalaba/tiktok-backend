import Stripe from 'stripe';
import {
  CreateCheckoutSessionArgs,
  PaymentService,
  StripeCheckoutSessionArgs,
} from './types';
import IConfig from '../../config/default';

const config: IConfig = require('config');

export default class StripeService {
  stripe: Stripe;

  constructor(apiKey: string) {
    this.stripe = new Stripe(apiKey, {
      apiVersion: '2023-08-16',
      typescript: true,
    });
  }

  async verifyStripeSignature(
    requestBody: any,
    sig: string | string[],
    endpointSecret: string
  ) {
    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        requestBody,
        sig,
        endpointSecret
      );
      return event;
    } catch (error: any) {
      throw error;
    }
  }

  async expireAllCheckoutSessions(customerId: string): Promise<void> {
    const sessions = await this.stripe.checkout.sessions.list({
      customer: customerId,
    });

    // expire all open sessions
    if (sessions.data?.length > 1) {
      const openSessions = sessions.data.filter(
        (session) => session.status === 'open'
      );
      await Promise.all(
        openSessions.map((session) =>
          this.stripe.checkout.sessions.expire(session.id)
        )
      );
    }
  }
}
