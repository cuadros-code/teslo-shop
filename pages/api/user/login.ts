import { db } from 'database';
import { User } from 'model/User';
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs';
import { signToken } from 'utils/jwt';

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
    case 'POST':
      return loginUser(req, res);
    default:
      return res.status(405).json({ message: 'Method Not Allowed' })
  }
}

async function loginUser(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    
    const { email = '', password = '' } = req.body
    await db.connect();

    const user = await User.findOne({ email })

    if(!user){
      return res.status(400).json({
        message: 'Correo o Contraseña no válidos'
      })
    }

    if( !bcrypt.compareSync(password, user.password!) ){
      return res.status(400).json({
        message: 'Correo o Contraseña no válidos'
      })
    }

    const { _id, name, role } = user;

    const newToken = await signToken( _id, email );

    return res.status(200).json({ 
      message: 'OK',
      token: newToken,
      user: {
        email,
        name,
        role,
      }
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal Server Error'
    })
  } finally {
    await db.disconnect();
  }
}
