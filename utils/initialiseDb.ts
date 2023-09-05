import { execSync } from 'child_process';
import { sequelizeInstance, terminate } from '../models';

async function reload() {
  await sequelizeInstance.query('DROP SCHEMA IF EXISTS public CASCADE;');
  await sequelizeInstance.query('CREATE SCHEMA public;');

  execSync('./node_modules/.bin/sequelize db:migrate > /dev/null');

  return await terminate();
}

export { reload };
