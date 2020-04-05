import React from 'react'
import { Plus } from 'react-feather';

export default function NavbarBtns({auth}) {
    return (
        <div>
            {
                auth.loading
                ?
                    <ul>
                        <li className='skeleton-shimmer px-10 py-4 rounded-full'> </li>
                    </ul>
                : !auth.loading && !auth.isauth ?
                    <ul>
                        <li> 
                            <a href='/login' className='inline-block bg-gray-700 text-gray-500 py-2 px-3 rounded-full hover:bg-gray-900 transition-200'> Login </a>
                        </li>
                    </ul>
                :
                    <ul className='flex items-center'>
                        <li className='mx-2'>
                            <a href='/add-project' className='flex p-2 bg-gray-700 rounded-full transition ease-in-out duration-300 hover:bg-gray-900'> <Plus /> </a>
                        </li>
                        <li className='mx-2 border-2 border-gray-500 cursor-pointer object-cover hover:border-gray-600 rounded-full'>
                            <img src='https://s3.amazonaws.com/uifaces/faces/twitter/vocino/128.jpg' className='rounded-full w-10 h-10' />
                        </li>
                    </ul>
            }
        </div>
    )
}
