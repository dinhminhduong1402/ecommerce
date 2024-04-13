import jwt from 'jsonwebtoken'
import {getUserByUsername} from '@/mongodb/actions/user.actions'

export async function POST(req) {
  const data = await req.json()
  const { username, password } = data

  try {
    const user = await getUserByUsername(username)
    if (!user) {
      throw new Error('username is not exist')
    }

    const passwordMatch = user.password == password
    if (!passwordMatch) {
      throw new Error("password incorrect")
    }

    const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
      expiresIn: '1h',
      });

    return Response.json({token})

  } catch (error) {
    console.error(error)
    return Response.json({error: error.message})
  }
}
