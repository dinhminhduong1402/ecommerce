'use client'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object({
  username: yup.string().required('This fill is required!'),
  password: yup.string().required('This fill is required!'),
})

const SignIn = ({onsubmit}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      <div>
        <label>User name: </label>
        <input {...register('username')} />
        {errors.username && <span>{errors.username.message}</span>}
      </div>

      <div>
        <label htmlFor="password">Password: </label>
        <input id="password" type='password' {...register('password')} />
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      <input type="submit" />
    </form>
  )
}
export default SignIn
