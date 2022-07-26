import mongoose, { Schema, model, Model } from 'mongoose'
import { IProduct } from '../interfaces/products';

const productSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  images: [{ type: String }],
  inStock: {
    type: Number,
    require: true,
    default: 0,
  },
  price: {
    type: Number,
    require: true,
    default: 0,
  },
  sizes: [
    {
      type: String,
      enum: {
        values: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
        message: '{VALUES} invalid size',
      }
    }
  ],
  slug: {
    type: String,
    require: true,
    unique: true,
  },
  tags: [{
    type: String,
  }],
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: {
      values: ['shirts', 'pants', 'hoodies', 'hats'],
      message: '{VALUES} invalid type',
    }
  },
  gende: {
    type: String,
    enum: {
      values: ['men', 'women', 'kid', 'unisex'],
      message: '{VALUES} invalid gender',
    }
  },
}, {
  timestamps: true,
})


export const Product: Model<IProduct> = mongoose.models.Product || model('Product', productSchema);