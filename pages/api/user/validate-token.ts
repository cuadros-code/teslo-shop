import { db } from 'database';
import { User } from 'model/User';
import type { NextApiRequest, NextApiResponse } from 'next'
import { isValidToken, signToken } from '../../../utils/jwt';

type Data = 
  | { message: string }
  | { message: string, 
      token: string, 
      user : {
        email: string,
        name: string,
        role: string,
      }
    }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return validateToken(req, res);
    default:
      return res.status(405).json({ message: 'Method Not Allowed' })
  }
}

async function validateToken(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    
    const { token = '' } = req.cookies

    const userId = await isValidToken(token)

    await db.connect();

    const user = await User.findById( userId ).lean();

    if(!user){
      return res.status(400).json({
        message: 'Correo o Contraseña no válidos - Email'
      })
    }

    const { _id, name, role, email } = user;

    return res.status(200).json({ 
      message: 'OK',
      token: signToken( _id, email ),
      user: {
        email,
        name,
        role,
      }
    });

  } catch (error) {
    return res.status(500).json({
      message: 'Token de autorización no es válido'
    })
  } finally {
    await db.disconnect();
  }
}
