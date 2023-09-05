import { Stripe } from 'stripe';
import { CustomerEvent, PaymentEvent } from './types';
import { User } from '../../models';
import { WalletService } from '../wallets';
import { UserService } from '../users';

export class EventConsumerService {
  private static singleton: EventConsumerService;

  private constructor() {}

  static createDefault(): EventConsumerService {
    return EventConsumerService.create({});
  }

  static create({}): EventConsumerService {
    return new EventConsumerService();
  }

  static getSingleton(): EventConsumerService {
    if (!EventConsumerService.singleton) {
      EventConsumerService.singleton = EventConsumerService.createDefault();
    }
    return EventConsumerService.singleton;
  }

  static isChargeSuceededEvent(event: PaymentEvent): boolean {
    return event.type === 'charge.succeeded';
  }

  static isCustomerEvent(event: PaymentEvent): event is CustomerEvent {
    return EventConsumerService.isCustomerCreatedEvent(event);
  }

  static isCustomerCreatedEvent(
    event: Stripe.Event
  ): event is CustomerEvent<'customer.created'> {
    return event.type === 'customer.created';
  }

  async consume(event: PaymentEvent): Promise<void> {
    try {
      if (EventConsumerService.isChargeSuceededEvent(event)) {
        // handle charge succeed event
      } else if (EventConsumerService.isCustomerCreatedEvent(event)) {
        // handle customer created event
      } else {
        return;
      }
    } catch (err: any) {
      throw err;
    }
  }

  async getUserByCustomerId(customerId: string): Promise<User | null> {
    const user = await User.findOne({
      where: {
        customerId,
      },
    });
    return user;
  }

  async getUserFromEmail(customerEmail: string): Promise<User> {
    const user = await User.findOrThrow({
      where: { email: customerEmail },
      attributes: ['id'],
    });
    return user;
  }

  async handleCustomerCreatedEvent(event: PaymentEvent) {
    try {
      const customerId = (event.data.object as Stripe.Customer).id;
      const user = await this.getUserByCustomerId(customerId);
      await UserService.getSingleton().updateCustomerIdOfUser(
        user!.id,
        customerId
      );
    } catch (error: any) {
      throw error;
    }
  }

  async handleChargeSucceededEvent(event: PaymentEvent) {
    const chargeObject = event.data.object as Stripe.Charge;
    const customerId = chargeObject.customer as string;
    const amountOfCredits = chargeObject.amount_captured;
    try {
      const user = await this.getUserByCustomerId(customerId);
      if (!user) {
        throw new Error('User not found');
      }
      WalletService.getSingleton().updateWalletBalance(user, amountOfCredits);
    } catch (error: any) {
      throw error;
    }
  }
}
