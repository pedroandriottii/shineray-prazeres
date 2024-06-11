import React from 'react';
import Image from 'next/image';

const HeroSection: React.FC = () => {
    return (
        <div className="relative w-full max-h-[25vh]">
            <Image
                src={'/home/hero.png'}
                alt="Hero Background"
                width={1920}
                height={1080}
                objectFit="cover"
                quality={100}
                className="z-0"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10">
                <h1 className="text-2xl"><span className='font-bold'>CONQUISTE</span> SUA SHINERAY</h1>
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
                <div className="absolute bottom-0 bg-shineray-color-dark text-white text-center py-2 text-sm">
                    <p>Precisa de ajuda? Liga para a gente: <span className="font-bold">(81) 98814-5906</span></p>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
