import * as express from 'express';
import { User } from '../../models';

export interface RequestWithUser extends express.Request {
  user: User;
}
