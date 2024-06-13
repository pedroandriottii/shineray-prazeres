import React from 'react';
import { Poppins } from 'next/font/google';

import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import Link from 'next/link';

const Font = Poppins({ subsets: ['latin'], weight: ['400'] });

const CatalogSection: React.FC = () => {
    return (
        <div className={`${Font.className}flex flex-col px-6 max-w-[1700px]`}>
            <div className='relative flex flex-1 z-0 justify-between items-center bg-black px-4 py-2 text-white'>
                <h2 className='text-xl'>CATÁLOGO</h2>
                <Link href={'/catalogo'}>
                    <p className='underline pr-6 text-sm'>Ver mais</p>
                </Link>
                <div className="absolute right-0 bottom-0 border-corner"></div>
            </div>
            <div>
                <Carousel className='py-6'>
                    <CarouselContent>
                        <CarouselItem className="lg:basis-1/3 flex flex-col">
                            <img src={'/jef.jpg'} alt="" />
                            <div className='relative flex items-center flex-1 justify-between z-0 bg-gradient-to-r from-black to-[#797979] text-white p-2'>
                                <p className=''>Urban 150 EFI</p>
                                <p className='absolute right-0 p-2 bg-shineray-color-dark pl-6 max-w-28 min-w-28'>R$ 12.000</p>
                                <div className="absolute right-28 top-0 border-corner-catalog"></div>
                            </div>
                        </CarouselItem>
                        <CarouselItem className="lg:basis-1/3 flex flex-col">
                            <img src={'/jef.jpg'} alt="" />
                            <div className='relative flex items-center flex-1 justify-between z-0 bg-gradient-to-r from-black to-[#797979] text-white p-2'>
                                <p className=''>Urban 150 EFI</p>
                                <p className='absolute right-0 p-2 bg-shineray-color-dark pl-6 max-w-28 min-w-28'>R$ 12.000</p>
                                <div className="absolute right-28 top-0 border-corner-catalog"></div>
                            </div>
                        </CarouselItem>
                        <CarouselItem className="lg:basis-1/3 flex flex-col">
                            <img src={'/jef.jpg'} alt="" />
                            <div className='relative flex items-center flex-1 justify-between z-0 bg-gradient-to-r from-black to-[#797979] text-white p-2'>
                                <p className=''>Urban 150 EFI</p>
                                <p className='absolute right-0 p-2 bg-shineray-color-dark pl-6 max-w-28 min-w-28'>R$ 12.000</p>
                                <div className="absolute right-28 top-0 border-corner-catalog"></div>
                            </div>
                        </CarouselItem>
                        <CarouselItem className="lg:basis-1/3 flex flex-col">
                            <img src={'/jef.jpg'} alt="" />
                            <div className='relative flex items-center flex-1 justify-between z-0 bg-gradient-to-r from-black to-[#797979] text-white p-2'>
                                <p className=''>Urban 150 EFI</p>
                                <p className='absolute right-0 p-2 bg-shineray-color-dark pl-6 max-w-28 min-w-28'>R$ 12.000</p>
                                <div className="absolute right-28 top-0 border-corner-catalog"></div>
                            </div>
                        </CarouselItem>
                    </CarouselContent>
                </Carousel>
            </div>
            <div className='flex justify-center'>
                <Link href={'/catalogo'}>
                    <button className={`font-bold flex justify-center bg-shineray-color-dark text-white p-2 rounded-full w-80 md:mt-4`}>Solicite seu Financiamento!</button>
                </Link>
            </div>
        </div>
    );
};

export default CatalogSection;
