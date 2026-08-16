import React from 'react'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { LuAsterisk } from "react-icons/lu";
interface IProps<T extends FieldValues> {
    label: string;
    id: string;
    type?: 'text' | 'email' | 'password'
    placeholder: string,
    name: Path<T>
    required?: boolean,
    register: UseFormRegister<T>,
    error?: string

}

function Input<T extends FieldValues>({ error, label, id, placeholder, name, type = 'text', required = false, register }: IProps<T>) {
    return (
        <div className='flex flex-col gap-0.5 w-full'>
            {/* label */}
            <div className='flex'>
                <label htmlFor={id}
                    className='text-base font-semibold'
                >{label}</label>
                {required && <LuAsterisk size={12} className='text-red-500' />}
            </div>
            {/* input */}
            <input
                {...register(name)}
                id={id}
                type={type}
                placeholder={placeholder}
                className={`w-full rounded-xl border bg-[#fffdfb] px-4 py-3 text-sm text-[#251b2b] outline-none transition placeholder:text-[#b7aeb7] focus:ring-4
                ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-[#eadfe2] focus:border-[#b91c4a] focus:ring-[#b91c4a]/10'}
                        `}
            />
            <small className='text-red-500 p-0 m-0 h-5'>{error}</small>
        </div>
    )
}

export default Input
