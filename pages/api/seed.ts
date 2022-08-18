import { db } from 'database'
import { initialData } from 'database/seed-data'
import { Product } from 'model'
import { User } from 'model/User'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
}

export default async function handle(req: NextApiRequest, res: NextApiResponse<Data>) {

  try {
    if( process.env.NODE_ENV === 'production' ){
      res.status(404).json({ message: 'No tiene acceso' })
    }

    await db.connect();

    await User.deleteMany();
    await User.insertMany(initialData.users)

    await Product.deleteMany();
    await Product.insertMany(initialData.products)
    res.status(200).json({ message: 'OK' })

  }catch ( error ) {
    console.error(error)
    res.status(500).json({ message: 'Error' })
  } finally {
    await db.disconnect();
  }
}