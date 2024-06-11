import React from 'react';
import Image from 'next/image';
import PhoneIcon from '@mui/icons-material/Phone';
import { Inter } from 'next/font/google';

const FontInter = Inter({ subsets: ['latin'], weight: ['400'] });

const HeroSection: React.FC = () => {
    return (
        <div className="relative">
            <Image
                src={'/home/hero.png'}
                alt="Hero Background"
                width={1920}
                height={1080}
                objectFit="cover"
                quality={100}
                className="z-0"
            />
            <div className={`${FontInter.className} absolute inset-0 flex flex-col justify-center items-center text-white z-1`}>
                <h1 className="text-2xl"><span className='font-extrabold'>CONQUISTE</span> SUA SHINERAY</h1>
                <div className="flex items-center gap-2">
                    <img
                        src={'/base/shinerayLogo.png'}
                        alt='Logomarca Shineray'
                        className='w-40'
                    />
                    <img
                        src={'/base/revisaoLogo.png'}
                        alt='Logomarca Revisão'
                        className='w-10'
                    />
                </div>
            </div>
            <div className="flex items-center p-2 bottom-0 bg-shineray-color-dark text-white text-center py-2 px-6 text-xs">
                <p className='mr-4'>Precisa de ajuda? Liga para a gente:</p>
                <PhoneIcon style={{ color: 'transparent', stroke: 'white', strokeWidth: 2 }} />
                <p className='ml-2'>(81) 98814-5903</p>
            </div>
        </div >
    );
};

export default HeroSection;
