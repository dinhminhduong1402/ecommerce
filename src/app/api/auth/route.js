import jwt from 'jsonwebtoken' 

export async function POST(req) {
  const body = await req.json()
  const token = body.token
  if(!token) {
    return Response.json('')
  }

  const decode = jwt.verify(token, 'your-secret-key')
  if(!decode){
    return Response.json('')
  }

  const {userId} = decode
  const user = {
      userId
  }
  return Response.json({user})
}
