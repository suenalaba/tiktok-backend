import { Stripe } from 'stripe';
import { User } from '../../models';

export type CreateCheckoutSessionArgs = {
  cancelUrl: string;
  successUrl: string;
  provider: string;
  providerSubscriptionProductId: string;
  userId: string;
  customerEmail: string;
  customerId?: string;
  dca?: {
    startDate: number;
    amountInUsd: number;
  };
};

export type StripeCheckoutSessionArgs = {
  user: User;
  amountInSgd: number;
};

export interface ICreatePromotionCode {
  coupon: string;
  max_redemptions?: number;
  code?: string;
  expires_at?: number;
}

export interface PaymentService {
  createCheckoutSession(args: CreateCheckoutSessionArgs): Promise<string>;
}

export type PaymentEvent = Stripe.Event;

type GenericEventType = 'created' | 'deleted' | 'updated';
type CustomerEventType = `customer.${GenericEventType}`;
export type CustomerEvent<T extends CustomerEventType = CustomerEventType> =
  Stripe.Event & {
    type: `customer.${T}`;
    data: {
      object: Stripe.Customer;
      previous_attributes?: Stripe.Event.Data.PreviousAttributes;
    };
  };
