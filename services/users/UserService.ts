import { User } from '../../models';

export class UserService {
  private static singleton: UserService;

  private constructor() {}

  static createDefault(): UserService {
    return UserService.create({});
  }

  static create({}): UserService {
    return new UserService();
  }

  static getSingleton(): UserService {
    if (!UserService.singleton) {
      UserService.singleton = UserService.createDefault();
    }
    return UserService.singleton;
  }

  async updateCustomerIdOfUser(userId: string, customerId: string) {
    await User.updateById(userId, {
      customerId,
    });
  }
}
