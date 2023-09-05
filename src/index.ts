import { reload } from '../utils/initialiseDb';
import IConfig from '../config/default';

const config: IConfig = require('config');

const { stripeEndpointSecret } = config.stripe;

const main = async () => {
  console.log('Hello Wsorlsffdsszszs');
  console.log(stripeEndpointSecret);
  try {
    await reload();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

main().catch((err) => {
  console.error(err);
});
