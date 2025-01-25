import { Router } from 'express';
import { getProducts, getProduct, searchProducts } from '../controllers/product.controller.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { productQuerySchema } from '../schemas/product.schema.js';

const router = Router();

router.use(authenticate);

router.get('/', validate(productQuerySchema), getProducts);
router.get('/search', searchProducts);
router.get('/:id', getProduct);

export default router;