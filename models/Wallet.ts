import {
  DataTypes,
  ForeignKey,
  Model,
  ModelStatic,
  NonAttribute,
  Sequelize,
} from 'sequelize';
import { User } from './User';
import { BaseModel } from './lib/BaseModel';

export class Wallet extends BaseModel<Wallet> {
  UserId!: ForeignKey<string>;

  User?: NonAttribute<User>;

  balance!: number;

  static associate(models: { User: ModelStatic<Model<any, any>> }) {
    Wallet.belongsTo(models.User);
  }
}

export default (sequelize: Sequelize) => {
  Wallet.init(
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
      balance: {
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

  return Wallet;
};
