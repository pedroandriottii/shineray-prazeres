'use client';
import React, { useState, useRef, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '../ui/sheet';
import home from '@/public/home/home.svg'
import motorcycle from '@/public/home/motorcycle.svg'
import profile from '@/public/home/profile.svg'
import folheto from '@/public/home/folheto.svg'
import Link from 'next/link';

const font = Inter({ subsets: ['latin'], weight: ['400'] });

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
        <div className={`${font.className} bg-shineray-black text-white flex justify-between text-xs items-center p-2`}>
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
                <SheetTrigger className='md:hidden'><MenuIcon /></SheetTrigger>
                <SheetContent side="left" className='bg-black border-black p-0 py-4'>
                    <SheetHeader className='border-b-2 border-b-white w-full text-white h-10'>
                    </SheetHeader>
                    <div className='mt-6 px-5 flex flex-col gap-4'>
                        <div className='flex text-white text-lg '>
                            <Link href={'/'} onClick={() => setMenuOpen(false)}>
                                <span className='flex items-center gap-3 hover:text-shineray-color-dark' >
                                    <Image
                                        src={home}
                                        width={25}
                                        height={25}
                                        alt='Home'
                                    />
                                    Início
                                </span>
                            </Link>
                        </div>
                        <div className='flex text-white text-lg'>
                            <Link href={'/#sobre-nos'} onClick={() => setMenuOpen(false)}>
                                <span className='flex items-center gap-3 hover:text-shineray-color-dark'>
                                    <Image
                                        src={motorcycle}
                                        width={25}
                                        height={25}
                                        alt='sore nós'
                                    />
                                    Sobre nos
                                </span>
                            </Link>
                        </div>
                        <div className='flex text-white text-lg'>
                            <Link href={'/catalogo'} onClick={() => setMenuOpen(false)}>
                                <span className='flex items-center gap-3 hover:text-shineray-color-dark'>
                                    <Image
                                        src={folheto}
                                        width={25}
                                        height={25}
                                        alt='Catalogo'
                                    />
                                    Catalogo
                                </span>
                            </Link>
                        </div>
                        <div className='flex text-white text-lg'>
                            <Link href={'/login'} onClick={() => setMenuOpen(false)}>
                                <span className='flex items-center gap-3 hover:text-shineray-color-dark'>
                                    <Image
                                        src={profile}
                                        width={25}
                                        height={25}
                                        alt='ver perfil'
                                    />
                                    Login
                                </span>
                            </Link>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
            {/* DESKTOP */}
            <div className='flex items-center justify-between max-md:justify-end w-full gap-4'>
                <div className=' px-5 flex flex-col md:flex-row gap-4 max-md:hidden'>
                    <Link href={'/'}>
                        <div className='flex text-white text-lg'>
                            <span className='flex items-center gap-3 hover:text-shineray-color-dark'>
                                <Image
                                    src={home}
                                    width={25}
                                    height={25}
                                    alt='Home'
                                />
                                Início
                            </span>
                        </div>
                    </Link>
                    <Link href={'/#sobre-nos'}>
                        <div className='flex text-white text-lg'>
                            <span className='flex items-center gap-3 hover:text-shineray-color-dark'>
                                <Image
                                    src={motorcycle}
                                    width={25}
                                    height={25}
                                    alt='sore nós'
                                />
                                Sobre nos
                            </span>
                        </div>
                    </Link>
                    <Link href={'/catalogo'}>
                        <div className='flex text-white text-lg'>
                            <span className='flex items-center gap-3 hover:text-shineray-color-dark'>
                                <Image
                                    src={folheto}
                                    width={25}
                                    height={25}
                                    alt='Catalogo'
                                />
                                Catalogo
                            </span>
                        </div>
                    </Link>
                    <Link href={'/login'}>
                        <div className='flex text-white text-lg'>
                            <span className='flex items-center gap-3 hover:text-shineray-color-dar'>
                                <Image
                                    src={profile}
                                    width={25}
                                    height={25}
                                    alt='ver perfil'
                                />
                                Login
                            </span>
                        </div>
                    </Link>
                </div>
                <div className=' flex'>
                    <div className='flex items-center gap-1'>
                        <Image
                            src={'/home/phone.svg'}
                            alt='Telefone'
                            width={20}
                            height={20}
                        />
                        <span>(81) 98814-5906</span>
                    </div>
                    <div className='flex items-center gap-1'>
                        <Image
                            src={'/home/instagram.svg'}
                            alt='Instagram'
                            width={35}
                            height={35}
                        />
                        <span>@shinerayprazeres</span>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Navbar;
