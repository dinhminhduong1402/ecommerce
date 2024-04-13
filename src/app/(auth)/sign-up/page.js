'use client'
import { SignUp } from '@/components'
// import bcrypt from 'bcrypt'
import './sign-up.scss'

const SignUpPage = () => {

  const onSubmit = (data) => {
    console.log(data)
    // const hashedPassword = bcrypt.hash(data.password, 10)
    const user = {
      username: data.username,
      password: data.password
    }
    fetch('/api/auth/sign-up', {
      method: 'POST',
      body: JSON.stringify(user)
    })
  }

  return (
    <div className="sign-up-containner">
      <div className="sign-up-wrapper">
        <SignUp onSubmit={onSubmit}/>
      </div>
    </div>
  )
}

export default SignUpPage
