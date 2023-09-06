import { sequelizeInstance } from '../models';
import { reload } from '../utils/initialiseDb';
// import IConfig from '../config/default';
import app from './app';

// const config: IConfig = require('config');

// const { stripeEndpointSecret } = config.stripe;

const main = async () => {
  console.log('hello');
  // app.init();

  app.listen(4000, () => {
    console.log('server started on localhost:4000');
  });

  try {
    await sequelizeInstance.sync({ alter: true });
    await reload();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

main().catch((err) => {
  console.error(err);
});
