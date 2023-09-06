import { Item, Wishlist } from '../../models';

export class WishlistService {
  private static singleton: WishlistService;

  private constructor() {}

  static createDefault(): WishlistService {
    return WishlistService.create({});
  }

  static create({}): WishlistService {
    return new WishlistService();
  }

  static getSingleton(): WishlistService {
    if (!WishlistService.singleton) {
      WishlistService.singleton = WishlistService.createDefault();
    }
    return WishlistService.singleton;
  }

  async getWishlistByUserId(userId: string) {
    return await Wishlist.findAll({
      where: {
        UserId: userId,
      },
      include: [
        {
          model: Item,
          required: true,
        },
      ],
    });
  }

  async addItemToWishlist(userId: string, itemId: string) {
    const [wishlistItem, created] = await Wishlist.findOrCreate({
      where: {
        UserId: userId,
        ItemId: itemId,
      },
      defaults: {
        UserId: userId,
        ItemId: itemId,
      },
    });
    return {
      wishlistItem,
      created, // true if we created a new instance, false if item already present
    };
  }

  async deleteItemFromWishlist(userId: string, itemId: string) {
    try {
      const rowsAffected = await Wishlist.destroy({
        where: {
          UserId: userId,
          ItemId: itemId,
        },
      });

      if (rowsAffected === 0) {
        // no matching wishlist item
        throw new Error('WishlistItemNotFound');
      } else {
        return true;
      }
    } catch (error: any) {
      return false;
    }
  }
}
