import jwt from 'jsonwebtoken'

export const signToken = ( _id: string, email: string ) => {

  if( !process.env.JWT_SECRET_SEED ){
    throw new Error("secret no found")
  }

  return jwt.sign(
    // Payload
    { _id, email },
    // Seed
    process.env.JWT_SECRET_SEED,
    // Options
    { expiresIn: '5d' }
  )

}