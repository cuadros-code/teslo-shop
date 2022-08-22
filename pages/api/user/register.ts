import { db } from 'database';
import { User } from 'model/User';
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs';
import { signToken } from 'utils/jwt';
import { isValidEmail } from 'utils/validations';

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
      return registerUser(req, res);
    default:
      return res.status(405).json({ message: 'Method Not Allowed' })
  }
}

async function registerUser(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    
    const { name = '', email = '', password = '' } = req.body
    await db.connect();

    const user = await User.findOne({ email })

    if( !isValidEmail(email) ){
      return res.status(400).json({
        message: 'El correo es inválido'
      })
    }

    if(password.length < 6){
      return res.status(400).json({
        message: 'La contraseña debe tener 6 o mas caracteres'
      })
    }

    if(name.length < 2){
      return res.status(400).json({
        message: 'Ingrese el nombre completo'
      })
    }

    if( user ){
      return res.status(400).json({
        message: 'El correo ya está registrado'
      })
    }

    const newUser = new User({
      name,
      email: email.toLocaleLowerCase(),
      password: bcrypt.hashSync(password),
      role: 'client',
    })

    await newUser.save({ validateBeforeSave: true })

    const { _id, role} = newUser;

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
