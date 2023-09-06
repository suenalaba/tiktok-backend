import { Request as Req, Response as Res, NextFunction as Next } from 'express';
import { RequestWithUser } from '../models/lib/tsTypes';
import { WishlistService } from '../services/wishlists';

async function getUserWishlist(req: Req, res: Res, next: Next) {
  try {
    const { user } = req as RequestWithUser;

    const wishlist = await WishlistService.getSingleton().getWishlistByUserId(
      user.id
    );

    return res.json(wishlist);
  } catch (error: any) {
    return next(error);
  }
}

async function addItemToUserWishlist(req: Req, res: Res, next: Next) {
  try {
    const { user } = req as RequestWithUser;
    const { itemId } = req.body;

    const { wishlistItem, created } =
      await WishlistService.getSingleton().addItemToWishlist(user.id, itemId);

    return res.json({
      wishlistItem,
      created,
    });
  } catch (error: any) {
    return next(error);
  }
}

async function deleteItemFromUserWithlist(req: Req, res: Res, next: Next) {
  try {
    const { user } = req as RequestWithUser;
    const { itemId } = req.body;

    const isDeleted =
      await WishlistService.getSingleton().deleteItemFromWishlist(
        user.id,
        itemId
      );

    return res.json({
      isDeleted,
    });
  } catch (error: any) {
    return next(error);
  }
}

export { getUserWishlist, addItemToUserWishlist, deleteItemFromUserWithlist };
