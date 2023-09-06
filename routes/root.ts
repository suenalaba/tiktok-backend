import * as express from 'express';

const router = express.Router();

module.exports = {
  path: '/',
  router,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.get('/', (_, res: express.Response) =>
  res.json({
    data: {
      status: 'okay',
    },
  })
);
