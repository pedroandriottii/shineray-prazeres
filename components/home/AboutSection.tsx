import React from 'react';
import { Poppins } from 'next/font/google';

const FontPoppins = Poppins({ subsets: ['latin'], weight: ['400'] });

const AboutSection: React.FC = () => {
    return (
        <div className={`${FontPoppins.className} flex text-black px-6 items-center gap-4`}>
            <div className='bg-shineray-color-dark w-10 h-44'></div>
            <p className='text-justify'>Com mais de 27 anos de experiência no ramo de duas rodas em Pernambuco, a <span className='font-extrabold'>Revisão Motos</span> consolidou-se como uma referência em confiança para seus clientes. Nossa parceria com a <span className='font-extrabold'>Shineray Motors</span> reforça esse compromisso, oferecendo motos com os <span className='font-extrabold'>melhores custos-benefícios do Brasil.</span></p>
        </div>
    );
};

export default AboutSection;