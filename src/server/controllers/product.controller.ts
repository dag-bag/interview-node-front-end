import { Request, Response } from 'express';
import { Product } from '../models/product.js';
import { catchAsync } from '../utils/catchAsync.js';
import { ApiError } from '../utils/ApiError.js';

export const getProducts = catchAsync(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const [products, total] = await Promise.all([
    Product.find()
      .skip(skip)
      .limit(limit)
      .lean(),
    Product.countDocuments(),
  ]);

  res.json({
    status: 'success',
    data: {
      products,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    },
  });
});

export const getProduct = catchAsync(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);
  
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  res.json({
    status: 'success',
    data: { product },
  });
});

export const searchProducts = catchAsync(async (req: Request, res: Response) => {
  const { q, category } = req.query;
  const query: any = {};

  if (q) {
    query.$or = [
      { title: { $regex: q, $options: 'i' } },
      { description: { $regex: q, $options: 'i' } },
    ];
  }

  if (category) {
    query.category = category;
  }

  const products = await Product.find(query).lean();

  res.json({
    status: 'success',
    data: { products },
  });
});