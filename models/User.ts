import { DataTypes, Sequelize } from 'sequelize';
import { BaseModel } from './lib/BaseModel';
import { hashPasswordHook } from '../utils/hashPassword';

export class User extends BaseModel<User> {
  username!: string;

  email!: string;

  password!: string;
}

export default (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: 'InvalidEmailAddress',
          },
        },
      },
      password: {
        type: DataTypes.STRING, // password hash
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      hooks: {
        beforeCreate: hashPasswordHook,
        beforeUpdate: hashPasswordHook,
      },
    }
  );

  return User;
};
