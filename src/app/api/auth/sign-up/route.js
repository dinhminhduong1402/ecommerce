import { createUser, getUserByUsername } from '@/mongodb/actions/user.actions'

export async function POST(req) {
  const user = await req.json()
  const { username } = user

  // save user info to database
  try {
    const userExist = await getUserByUsername(username)
    if (userExist) {
      throw new Error('username already exist')
    }
    
    const res = await createUser(user)
    return Response.json(res)
  } catch (error) {
    return Response.json({ Error: error.message })
  }
}
