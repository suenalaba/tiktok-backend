import IConfig from '../../config/default';
import StripeService from './StripeService';

const config: IConfig = require('config');

const stripeService = new StripeService(config.stripe.stripeApiKey);

export { stripeService };
