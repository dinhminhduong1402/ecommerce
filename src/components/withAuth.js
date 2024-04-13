'use client'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { redirect } from 'next/navigation'

export default function withAuth(Component) {
  return function WithAuth(props) {
    const { token, setUser, user } = useContext(AuthContext)
    if (!token) {redirect('/sign-in')}

    useEffect(() => {
      fetch('api/auth', {
        method: 'POST',
        body: JSON.stringify({ token }),
      })
        .then((res) => res.json())
        .then((body) => {
          const _user = body.user
          if (!_user || _user === user) {
            return
          }
          setUser(_user)
        })
        .catch((err) => {
          console.error('Token invalid: ', err.message)
          redirect('../sign-in')
        })
    }, [token])

    return <Component {...props} />
  }
}
