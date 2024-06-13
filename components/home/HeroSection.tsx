import React from 'react';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import { Poppins } from 'next/font/google';

const FontInter = Inter({ subsets: ['latin'], weight: ['200'] });
const FontPoppins = Poppins({ subsets: ['latin'], weight: ['200'] });

const HeroSection: React.FC = () => {
    return (
        <div className="relative w-full">
            <Image
                src={'/home/hero.svg'}
                alt="Hero Background"
                width={1920}
                height={1080}
                objectFit="cover"
                quality={100}
                className="z-0 max-h-[689px] w-full"
            />
            <div className={`${FontInter.className} absolute inset-0 flex flex-col justify-center items-center text-white z-1`}>
                <h1 className="text-2xl lg:text-7xl md:text-5xl"><span className='font-extrabold'>CONQUISTE</span> SUA SHINERAY</h1>
                <div className="flex items-center gap-2">
                    <img
                        src={'/base/shinerayLogo.png'}
                        alt='Logomarca Shineray'
                        className='w-60'
                    />
                    <img
                        src={'/base/revisaoLogo.png'}
                        alt='Logomarca Revisão'
                        className='w-20'
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
                    <p className='ml-2'>(81) 98814-5903</p>
                </div>
            </div>
        </div >
    );
};

export default HeroSection;
