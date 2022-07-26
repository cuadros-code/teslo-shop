import { db } from 'database';
import { IProduct } from 'interfaces'
import { Product } from 'model';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = 
  | { message: string}
  | { message: string, products: IProduct[] }

export default function handler(
  req: NextApiRequest, 
  res: NextApiResponse<Data>
) { 
  switch (req.method) {
    case 'GET':
      return searchProducts(req, res);
    default:
      return res.status(405).json({ message: 'Method Not Allowed' })
  }
}

async function searchProducts(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const { q = '' } = req.query;
    if(!q) return res.status(400).json({ message: 'Bad Request' });

    await db.connect();
    const products = await Product.find({
      $text: { $search: q.toString().toLowerCase() }
    }).lean();

    if(!products) return res.status(404).json({ message: 'Products not found' });

    return res.status(200).json({ 
      message: 'OK', 
      products
    });

  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error'
    })
  } finally {
    await db.disconnect();
  }
}

