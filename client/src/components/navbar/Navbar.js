import React from 'react';
import { AuthConsumer } from '../../helpers/AuthContext';
import NavbarBtns from './NavbarBtns';


export default function Navbar() {
    return (
        <div>
            <AuthConsumer>
                {(value) => {
                    return (
                    <header className='bg-gray-800 p-1 px-4 border-b-2 border-gray-700 fixed w-full top-0 left-0'>
                        <nav className='container'>
                            <div className='flex items-center justify-between'>

                                <b className='text-lg'> <a href='/' className='hover:text-gray-500'> Pieme </a> </b>

                                {/* Display the right btns for the right user status (auth) */}
                                <NavbarBtns auth={value} />
                                    
                            </div>
                        </nav>
                    </header>
                    )
                }}
            </AuthConsumer>
        </div>
    );
}

