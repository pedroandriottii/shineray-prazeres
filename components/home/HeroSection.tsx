import React from 'react';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import { Poppins } from 'next/font/google';
import Link from 'next/link';

const FontInter = Inter({ subsets: ['latin'], weight: ['200'] });
const FontPoppins = Poppins({ subsets: ['latin'], weight: ['200'] });

const HeroSection: React.FC = () => {
    return (
        <div className="relative w-full">
            <div className="block md:hidden">
                <Image
                    src={'/home/hero.jpg'}
                    alt="Hero Background Mobile"
                    width={1920}
                    height={1080}
                    objectFit="cover"
                    quality={100}
                    className="z-0 w-full"
                />
            </div>
            <div className="hidden md:block">
                <Image
                    src={'/home/heroDesk.jpg'}
                    alt="Hero Background Desktop"
                    width={1920}
                    height={1080}
                    objectFit="cover"
                    quality={100}
                    className="z-0 w-full"
                />
            </div>
            <div className={`${FontInter.className} absolute inset-0 flex flex-col justify-center items-center text-white z-1`}>
                <h1 className="text-2xl lg:text-7xl text-center md:text-5xl"><span className='font-extrabold'>CONQUISTE</span> SUA SHINERAY</h1>
                <div className="flex items-center gap-2">
                    <Image
                        src={'/base/shinerayLogo.png'}
                        alt='Logomarca Shineray'
                        width={160}
                        height={60}
                        className='w-40 md:w-60'
                    />
                    <Image
                        src={'/base/revisaoLogo.png'}
                        alt='Logomarca Revisão'
                        width={40}
                        height={40}
                        className='w-10 md:w-20'
                    />
                </div>
            </div>
            <div className={`${FontPoppins.className} flex items-center p-2 bottom-0 bg-shineray-color-dark text-white text-center py-2 px-6 text-xs justify-around md:text-xl`}>
                <p className='mr-4'>Precisa de ajuda? Liga para a gente:</p>
                <div className='flex items-center'>
                    <Image
                        src={'/home/phone.svg'}
                        alt='Telefone'
                        width={16}
                        height={16}
                    />
                    <a href='https://api.whatsapp.com/send?phone=5581999564461' target='__blank' className='ml-2'>(81) 99956-4461</a>
                </div>
            </div>
        </div >
    );
};

export default HeroSection;
