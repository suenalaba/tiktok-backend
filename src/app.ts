import express from 'express';
import cors from 'cors';

const routes = require('../routes');

// const controllers = require('../controllers');

const app = express();

const corsOrigin = 'http://localhost:3000';

app.set('Access-Control-Allow-Origin', corsOrigin);

app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
  })
);

app.use(express.json());

Object.keys(routes).forEach((key) => {
  app.use(routes[key].path, routes[key].router);
});

/**
 * Initiation of modules
 */
// app.init = async () => Promise.all([controllers.init()]);

export default app;
