import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  rating: {
    rate: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    count: {
      type: Number,
      required: true,
      min: 0,
    },
  },
}, {
  timestamps: true,
});

export const Product = mongoose.model('Product', productSchema);