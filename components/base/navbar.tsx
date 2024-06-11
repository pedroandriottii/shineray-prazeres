'use client';
import React, { useState, useEffect, useRef } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import InstagramIcon from '@mui/icons-material/Instagram';
import PhoneIcon from '@mui/icons-material/Phone';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import { Inter } from 'next/font/google';

const font = Inter({ subsets: ['latin'], weight: ['400'] });

const Navbar: React.FC = () => {
    return (
        <div className={`${font.className} bg-shineray-black text-white flex justify-between text-xs items-center p-2`}>
            <MenuIcon />
            <div className='flex items-center gap-4'>
                <div className='flex items-center gap-1'>
                    <PhoneIcon style={{ color: 'transparent', stroke: 'white', strokeWidth: 2 }} />
                    <span>(81) 98814-5906</span>
                </div>
                <div className='flex items-center gap-1'>
                    <InstagramIcon />
                    <span>@shinerayprazeres</span>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
