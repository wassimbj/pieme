import React from 'react'

export default function Input({name, changeEvent, submitRes, type, className, placeholder}) {

    return (
        <input onChange={changeEvent(name)}
            className={`bg-gray-700 appearance-none border-2 border-gray-400 rounded w-full py-2 px-4 text-gray-200 leading-tight focus:outline-none focus:bg-gray-800 focus:border-gray-500 ${className}
                        ${submitRes.error && submitRes.error[name] ? 'border-red-500' : null}`}
            type={type} placeholder={placeholder}
        />
    )
}
