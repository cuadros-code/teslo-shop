import * as jwt from 'jose'

export const signToken = async ( _id: string, email: string ) => {

  if( !process.env.JWT_SECRET_SEED ){
    throw new Error("secret no found")
  }
  const token = await new jwt.SignJWT({ _id, email })
                      .setProtectedHeader({ alg: 'HS256' })
                      .setExpirationTime('48h')
                      .sign( new TextEncoder().encode(process.env.JWT_SECRET_SEED) )
  return token
}

export const isValidToken = async ( token: string ): Promise<string> => {
  if( !process.env.JWT_SECRET_SEED ){
    throw new Error("secret no found")
  }
  try {
    const { payload } = await jwt.jwtVerify( token, new TextEncoder().encode(process.env.JWT_SECRET_SEED) );
    return `${payload._id}`;
  } catch (error) {
    return 'Token no válido';
  }
}