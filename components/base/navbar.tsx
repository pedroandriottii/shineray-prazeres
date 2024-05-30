'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Navbar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className='relative'>
            <div className='flex bg-white p-4 items-center justify-between'>
                <Image
                    src={'/logo.png'}
                    width={180}
                    height={40}
                    alt='Shineray Prazeres Logo'
                />
                <button onClick={toggleMenu}>
                    {menuOpen ? (
                        <span className='text-red-500'>
                            <CloseIcon fontSize='large' />
                        </span>
                    ) : (
                        <MenuIcon fontSize='large' />
                    )}
                </button>
            </div>
            {menuOpen && (
                <div className='fixed w-full inset-0 top-0 left-0 bg-black bg-opacity-50 z-40 flex justify-center items-start'>
                    <div className='w-full max-w-md bg-white p-8 z-50 flex flex-col items-center'>
                        <button onClick={toggleMenu} className='absolute top-4 right-4 text-red-500'>
                            <CloseIcon fontSize='large' />
                        </button>
                        <div className='flex flex-col items-center gap-4'>
                            <a href="#" className='text-2xl'>Início</a>
                            <a href="#" className='text-2xl'>Produtos</a>
                            <a href="#" className='text-2xl'>Sobre Nós</a>
                            <a href="#" className='text-2xl'>Contato</a>
                            <a href="#" className='py-2 px-4 text-2xl bg-red-500 text-white rounded-xl'>Login</a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;