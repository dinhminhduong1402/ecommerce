'use client'
import {SignIn} from '@/components'
import './sign-in.scss'
import { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'

const SignInPage = () => {
  const {setToken} = useContext(AuthContext)
  
  const onsubmit = (data)=> {
    const user = {
      username: data.username,
      password: data.password
    }
    fetch('/api/auth/sign-in', {
      method: "POST",
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(body => {
      const {token} = body
      if (!token) {return}
      setToken(token)
      cookieStore.set({
        name: 'accessToken',
        value: token,
        expires: Date.now() + 60*60*1000,
      })
    })
  }
  
  return (
    <div className="sign-in-container">
      <div className="sign-in-wrapper">
        <SignIn onsubmit={onsubmit}/>
      </div>
    </div>
  )
}

export default SignInPage
