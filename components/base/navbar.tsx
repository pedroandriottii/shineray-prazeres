'use client';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import Image from 'next/image';
import { Inter } from 'next/font/google';

const font = Inter({ subsets: ['latin'], weight: ['400'] });

const Navbar: React.FC = () => {
    return (
        <div className={`${font.className} bg-shineray-black text-white flex justify-between text-xs items-center p-2`}>
            <MenuIcon />
            <div className='flex items-center gap-4'>
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
    );
};

export default Navbar;
