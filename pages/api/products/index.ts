import type { NextApiRequest, NextApiResponse } from 'next'
import { db, SHOP_CONSTANTS } from 'database'
import { IProduct } from 'interfaces'
import { Product } from 'model'

type Data = 
| { message: string }
| { message: string, products: IProduct[] }

export default function handler (
  req: NextApiRequest, 
  res: NextApiResponse<Data>
) {
    switch (req.method) {
      case 'GET':
        return getProducts(req, res)
      default:
        return res.status(405).json({ message: 'Method Not Allowed' })
    }
}

async function getProducts( req: NextApiRequest, res: NextApiResponse<Data> ) {
  try {

    const { gender = 'all' } = req.query

    let condition = {}

    if( gender !== 'all' && SHOP_CONSTANTS.validGenders.includes(`${gender}`) ) {
      condition = { gender };
    }

    await db.connect();
    const products = await Product.find(condition)
                                  .select('title images price inStock slug')
                                  .lean();

    return res.status(200).json({
      message: 'Success',
      products
    }) 
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error'
    })
  } finally {
    await db.disconnect();
  }
}
