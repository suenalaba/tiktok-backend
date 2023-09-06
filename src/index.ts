import { Item } from '../models';
import { reload } from '../utils/initialiseDb';
// import IConfig from '../config/default';
import app from './app';

// const config: IConfig = require('config');

// const { stripeEndpointSecret } = config.stripe;

const main = async () => {
  console.log('hello');
  app.init();

  app.listen(4000, () => {
    console.log('server started on localhost:4000');
  });

  const itemsToCreate = [
    {
      name: 'Item1',
      description: 'Item1 description',
      priceInSgd: 10,
    },
    {
      name: 'Item2',
      description: 'Item2 description',
      priceInSgd: 20,
    },
    {
      name: 'Item3',
      description: 'Item3 description',
      priceInSgd: 30,
    },
  ];

  await Item.bulkCreate(itemsToCreate);

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
