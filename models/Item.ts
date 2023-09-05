import { DataTypes, Sequelize } from 'sequelize';
import { BaseModel } from './lib/BaseModel';

export class Item extends BaseModel<Item> {
  name!: string;

  description?: string | null;

  price!: number;
}

export default (sequelize: Sequelize) => {
  Item.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      priceInUsd: {
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

  return Item;
};
