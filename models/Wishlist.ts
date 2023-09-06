import { DataTypes, ForeignKey, NonAttribute, Sequelize } from 'sequelize';
import { BaseModel } from './lib/BaseModel';
import { Item } from './Item';
import { User } from './User';

export class Wishlist extends BaseModel<Wishlist> {
  ItemId!: ForeignKey<string>;

  Item?: NonAttribute<Item>;

  UserId!: ForeignKey<string>;

  User?: NonAttribute<User>;

  static associate(models: any) {
    Wishlist.belongsTo(models.User);
    Wishlist.hasOne(models.Item);
  }
}

export default (sequelize: Sequelize) => {
  Wishlist.init(
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
      ItemId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Items',
          key: 'id',
        },
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
    }
  );

  return Wishlist;
};
