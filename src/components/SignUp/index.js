'use client'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from "yup"

const schema = yup
  .object({
    username: yup.string().required("This fill is required!"),
    password: yup.string().required("This fill is required!"),
    password_confirm: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
  })

export default function SignUp({onSubmit}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <div>
        <label htmlFor='username'>User name: </label>
        <input id='username' {...register('username')} />
        {errors.username && <span>{errors.username.message}</span>}
      </div>

      <div>
        <label htmlFor='password' >Passwork: </label>
        <input id='password' type='password' {...register('password')} />
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      <div>
        <label htmlFor='password_confirm'>Passwork confirm: </label>
        <input id='password_confirm' type='password' {...register('password_confirm')} />
        {errors.password_confirm && <span>{errors.password_confirm.message}</span>}
      </div>

      <input type="submit" />
    </form>
  )
}
