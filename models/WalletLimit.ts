import { Wallet } from './Wallet';
import { DataTypes, ForeignKey, NonAttribute, Sequelize } from 'sequelize';
import { User } from './User';
import { BaseModel } from './lib/BaseModel';

export class WalletLimit extends BaseModel<WalletLimit> {
  UserId!: ForeignKey<string>;

  User?: NonAttribute<User>;

  WalletId!: ForeignKey<string>;

  Wallet?: NonAttribute<Wallet>;

  userSpendingLimit!: number; // the user's spending for a particular wallet

  static associate(models: any) {
    WalletLimit.belongsTo(models.User);
    WalletLimit.belongsTo(models.Wallet);
  }
}

export default (sequelize: Sequelize) => {
  WalletLimit.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      UserId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      WalletId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Wallets',
          key: 'id',
        },
      },
      userSpendingLimit: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    } as any,
    {
      sequelize,
    }
  );

  return WalletLimit;
};
