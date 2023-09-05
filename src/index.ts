// import { reload } from '../utils/initialiseDb';

const main = async () => {
  console.log('Hello Worldss');
  try {
    // await reload();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

main().catch((err) => {
  console.error(err);
});
