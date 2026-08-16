'use client'
import React from 'react'
import Input from '../ui/input'
import Button from '../ui/button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { signUpSchema } from '@/schemas/auth.schema'
import { TRegister, TSignUpForm } from '@/types/auth.types'
import { register as registerUser } from '@/api/auth.api'
import { useMutation } from '@tanstack/react-query'

const SignUpForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<TSignUpForm>({
        defaultValues: {
            full_name: '',
            user_name: '',
            email: '',
            password: '',
            c_password: '',
            profile_image: undefined,
        },
        resolver: yupResolver(signUpSchema),
        mode: 'all'
    })

    const { mutate, isPending, error, isSuccess } = useMutation({
        mutationFn: (data: TRegister) => registerUser(data),
    })

    const onSubmit = (data: TSignUpForm) => {
        const { c_password, ...payload } = data
        void c_password
        mutate(payload)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
            <div className='grid gap-1 sm:grid-cols-2 sm:gap-4'>
            <Input
                name='full_name'
                required
                id='full_name'
                placeholder='John Doe'
                label='Full Name'
                type='text'
                register={register}
                error={errors?.full_name?.message}
            />
            <Input
                name='user_name'
                required
                id='user_name'
                placeholder='john_doe'
                label='User Name'
                type='text'
                register={register}
                error={errors?.user_name?.message}
            />
            </div>
            {/* email input  */}
            <Input
                name='email'
                required
                id='email'
                placeholder='johndoe@gmail.com'
                label='Email'
                type='email'
                register={register}
                error={errors?.email?.message}


            />
            <div className='grid gap-1 sm:grid-cols-2 sm:gap-4'>
            <Input
                required={true}
                name='password'
                id='password'
                placeholder='enter password'
                label='Password'
                type='password'
                register={register}
                error={errors?.password?.message}


            />
            {/* confirm password input */}
            <Input
                required={true}
                name='c_password'
                id='c_password'
                placeholder='retype  password'
                label='Confirm Password'
                type='password'
                register={register}
                error={errors?.c_password?.message}


            />
            </div>

            <div className='mt-1 rounded-2xl border border-dashed border-[#e4cbd2] bg-[#fffafc] p-4'>
                <label htmlFor='profile_image' className='mb-1 block text-sm font-bold text-[#443442]'>Profile image <span className='font-normal text-[#9a8e98]'>(optional)</span></label>
                <p className='mb-3 text-xs text-[#9a8e98]'>JPG, PNG or GIF · maximum 5MB</p>
                <input id='profile_image' type='file' accept='image/png,image/jpeg,image/gif' {...register('profile_image')} className='block w-full cursor-pointer rounded-xl border border-[#eadfe2] bg-white text-sm text-[#756875] file:mr-4 file:border-0 file:bg-[#f7e8ed] file:px-4 file:py-2.5 file:font-bold file:text-[#b91c4a] hover:file:bg-[#f2dce4]' />
            </div>

            {/* button */}
            <div className='mt-4'>
                <Button
                    label={isPending ? 'Creating...' : 'Create Account'}
                    type={'submit'}
                />
            </div>
            {error && <p className='text-sm text-red-600'>{(error as { message?: string })?.message ?? 'Unable to create account'}</p>}
            {isSuccess && <p className='text-sm text-green-600'>Account created successfully. You can now log in.</p>}
        </form>
    )
}

export default SignUpForm
