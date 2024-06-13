'use client';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '../ui/sheet';
import home from '@/public/home/home.svg'
import motorcycle from '@/public/home/motorcycle.svg'
import profile from '@/public/home/profile.svg'
import folheto from '@/public/home/folheto.svg'
const font = Inter({ subsets: ['latin'], weight: ['400'] });

const Navbar: React.FC = () => {
    return (
        <div className={`${font.className} bg-shineray-black text-white flex justify-between text-xs items-center p-2`}>
            <Sheet >
                <SheetTrigger className='md:hidden'><MenuIcon /></SheetTrigger>
                <SheetContent side="left" className='bg-black border-black p-0 py-4'>
                    <SheetHeader className='border-b-2 border-b-white w-full text-white h-10'>
                    </SheetHeader>
                    <div className='mt-6 px-5 flex flex-col gap-4'>
                        <div className='flex text-white text-lg'>
                            <a href="#" className='flex items-center gap-3'>
                                <Image 
                                    src={home}
                                    width={25}
                                    height={25}
                                    alt='Home'
                                />
                                Início
                            </a>
                        </div>
                        <div className='flex text-white text-lg'>
                            <a href="#" className='flex items-center gap-3'>
                                <Image 
                                    src={motorcycle}
                                    width={25}
                                    height={25}
                                    alt='sore nós'
                                />
                                Sobre nos
                            </a>
                        </div>
                        <div className='flex text-white text-lg'>
                            <a href="#" className='flex items-center gap-3'>
                                <Image 
                                    src={folheto}
                                    width={25}
                                    height={25}
                                    alt='Catalogo'
                                />
                                Catalogo
                            </a>
                        </div>
                        <div className='flex text-white text-lg'>
                            <a href="#" className='flex items-center gap-3'>
                                <Image 
                                    src={profile}
                                    width={25}
                                    height={25}
                                    alt='ver perfil'
                                />
                                Login
                            </a>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
            {/* DESKTOP */}
            <div className='flex items-center justify-between max-md:justify-end w-full gap-4'>
                <div className=' px-5 flex flex-col md:flex-row gap-4 max-md:hidden'>
                    <div className='flex text-white text-lg'>
                        <a href="#" className='flex items-center gap-3'>
                            <Image 
                                src={home}
                                width={25}
                                height={25}
                                alt='Home'
                            />
                            Início
                        </a>
                    </div>
                    <div className='flex text-white text-lg'>
                        <a href="#" className='flex items-center gap-3'>
                            <Image 
                                src={motorcycle}
                                width={25}
                                height={25}
                                alt='sore nós'
                            />
                            Sobre nos
                        </a>
                    </div>
                    <div className='flex text-white text-lg'>
                        <a href="#" className='flex items-center gap-3'>
                            <Image 
                                src={folheto}
                                width={25}
                                height={25}
                                alt='Catalogo'
                            />
                            Catalogo
                        </a>
                    </div>
                    <div className='flex text-white text-lg'>
                        <a href="#" className='flex items-center gap-3'>
                            <Image 
                                src={profile}
                                width={25}
                                height={25}
                                alt='ver perfil'
                            />
                            Login
                        </a>
                    </div>
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
        </div>
    );
};

export default Navbar;
