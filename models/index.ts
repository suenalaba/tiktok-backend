import UserModel, { User } from './User';
import ItemModel, { Item } from './Item';
import WalletModel, { Wallet } from './Wallet';
import WishlistModel, { Wishlist } from './Wishlist';
import WalletLimitModel, { WalletLimit } from './WalletLimit';
import { Sequelize } from 'sequelize';

// TODO: abstract to .env
const dbName = 'tiktok';
const user = 'postgres';
const password = 'postgres';
const host = 'localhost';
const dialect = 'postgres';

const sequelizeInstance = new Sequelize(dbName, user, password, {
  host,
  dialect,
});

const newModels = {
  User: UserModel(sequelizeInstance),
  Wallet: WalletModel(sequelizeInstance),
  Item: ItemModel(sequelizeInstance),
  Wishlist: WishlistModel(sequelizeInstance),
  WalletLimit: WalletLimitModel(sequelizeInstance),
};

Object.values(newModels).forEach((model) => {
  if ((model as any).associate) {
    (model as any).associate(newModels);
  }
});

async function terminate() {
  return sequelizeInstance.close();
}

export default newModels;

export {
  User,
  Wallet,
  Item,
  Wishlist,
  WalletLimit,
  sequelizeInstance,
  terminate,
};
