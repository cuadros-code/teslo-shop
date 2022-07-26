import { db } from 'database';
import { IProduct } from 'interfaces'
import { Product } from 'model';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = 
  | { message: string }
  | { message: string, product: IProduct }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getProductBySlug(req, res);
    default:
      return res.status(405).json({ message: 'Method Not Allowed' })
  }
}

async function getProductBySlug(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    
    await db.connect();
    const product = await Product.findOne({ slug: req.query.slug })
                                 .lean();

    if(!product) return res.status(404).json({ message: 'Product not found' });
  
    return res.status(200).json({ 
      message: 'OK', 
      product
    });

  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error'
    })
  } finally {
    await db.disconnect();
  }
}
