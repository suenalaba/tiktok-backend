import { Request, Response } from 'express';
import argon2 from 'argon2';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';

export class AuthController {
    static async register(req: Request, res: Response) {
        try {
            const hashedPassword = await argon2.hash(req.body.password);
            const user = new User({ ...req.body, password: hashedPassword });
            await user.save();
            res.status(201).send({ message: 'User registered successfully' });
        } catch (error) {
            res.status(400).send(error);
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user || !(await argon2.verify(user.password, req.body.password))) {
                return res.status(401).send({ message: 'Invalid credentials' });
            }
            const token = jwt.sign({ _id: user.id }, 'YOUR_SECRET_KEY', { expiresIn: '7d' });
            res.send({ token });
        } catch (error) {
            res.status(500).send(error);
        }
    }
}
