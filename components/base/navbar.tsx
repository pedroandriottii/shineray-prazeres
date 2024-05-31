'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';

const Navbar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        if (menuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuOpen]);

    return (
        <div className='relative'>
            <div className='flex bg-white p-4 items-center justify-between'>
                <Image
                    src={'/logo.png'}
                    width={180}
                    height={40}
                    alt='Shineray Prazeres Logo'
                />
                <div className='hidden md:flex space-x-8 items-center'>
                    <Link href={'/'} className='text-lg'>Início</Link>
                    <Link href={'/#sobre-nos'} className='text-lg'>Sobre Nós</Link>
                    <Link href={'/catalogo'} className='text-lg'>Catálogo</Link>
                    <Link href={'/login'} className='py-2 px-4 text-lg bg-red-500 text-white rounded-xl'>Login</Link>
                </div>
                <div className='md:hidden'>
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
            </div>
            {menuOpen && (
                <div className='fixed w-full inset-0 top-0 left-0 bg-black bg-opacity-50 z-40 flex justify-center items-start'>
                    <div ref={menuRef} className='w-full max-w-md bg-white p-8 z-50 flex flex-col items-center'>
                        <button onClick={toggleMenu} className='absolute top-4 right-4 text-red-500'>
                            <CloseIcon fontSize='large' />
                        </button>
                        <div className='flex flex-col items-center gap-4'>
                            <Link href={'/'} className='text-2xl' onClick={() => setMenuOpen(false)}>Início</Link>
                            <Link href={'/#sobre-nos'} className='text-2xl' onClick={() => setMenuOpen(false)}>Sobre Nós</Link>
                            <Link href={'/catalogo'} className='text-2xl' onClick={() => setMenuOpen(false)}>Catálogo</Link>
                            <Link href={'/login'} className='py-2 px-4 text-2xl bg-red-500 text-white rounded-xl' onClick={() => setMenuOpen(false)}>Login</Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
