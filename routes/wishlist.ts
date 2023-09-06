import * as express from 'express';
import { WishlistController } from '../controllers';

const router = express.Router();

router.get('/get-user-wishlist', WishlistController.getUserWishlist);

router.put('/add-wishlist-item', WishlistController.addItemToUserWishlist);

router.put(
  '/delete-wishlist-item',
  WishlistController.deleteItemFromUserWithlist
);

module.exports = {
  path: '/wishlist',
  router,
};
