import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import { User } from '../models/user.js';
import { ApiError } from '../utils/ApiError.js';
import { catchAsync } from '../utils/catchAsync.js';

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const token = jwt.sign(
    { id: user._id },
    config.jwtSecret,
    { expiresIn: config.jwtExpiresIn }
  );

  res.json({
    status: 'success',
    data: {
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
      },
    },
  });
});

export const register = catchAsync(async (req: Request, res: Response) => {
  const { email, password, firstName } = req.body;

  if (await User.findOne({ email })) {
    throw new ApiError(400, 'Email already exists');
  }

  const user = await User.create({
    email,
    password,
    firstName,
  });

  const token = jwt.sign(
    { id: user._id },
    config.jwtSecret,
    { expiresIn: config.jwtExpiresIn }
  );

  res.status(201).json({
    status: 'success',
    data: {
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
      },
    },
  });
});