'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Motorcycle } from '@/lib/types';
import { Poppins } from 'next/font/google';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const Font = Poppins({ subsets: ['latin'], weight: ['400'] });

const CatalogSection: React.FC = () => {
    const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [haveMotorcycles, setHaveMotorcycles] = useState(true);

    useEffect(() => {
        const fetchMotorcycles = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/motorcycles`, {});
                if (!response.ok) {
                    throw new Error('Failed to fetch motorcycles');
                }
                const data = await response.json();
                if (data.length === 0) {
                    setHaveMotorcycles(false);
                }
                setMotorcycles(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchMotorcycles();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={`${Font.className} flex flex-col px-6 w-full pb-6`}>
            <div className='relative flex flex-1 z-0 justify-between items-center bg-black px-4 py-2 text-white'>
                <h2 className='text-xl'>CATÁLOGO</h2>
                <Link href={'/catalogo'}>
                    <p className='underline pr-6 text-sm'>Ver mais</p>
                </Link>
                <div className="absolute right-0 bottom-0 border-corner"></div>
            </div>
            {haveMotorcycles === true && (
                <div>
                    <Carousel className='pb-6'>
                        <CarouselContent>
                            {motorcycles.slice(0, 3).map((motorcycle) => (
                                <CarouselItem key={motorcycle.id} className="lg:basis-1/3 flex flex-col">
                                    <Link href={`catalogo/${motorcycle.id}`}>
                                        <Image
                                            className='w-full'
                                            src={motorcycle.coverImageUrl}
                                            alt={motorcycle.name}
                                            width={400}
                                            height={300}
                                            layout="responsive"
                                        />
                                        <div className='relative flex items-center flex-1 justify-between z-0 bg-gradient-to-r from-black to-[#797979] text-white p-2'>
                                            <p className=''>{motorcycle.name}</p>
                                            <p className='absolute right-0 p-2 bg-shineray-color-dark pl-6 max-w-28 min-w-28'>R$ {motorcycle.price}</p>
                                            <div className="absolute right-28 top-0 border-corner-catalog"></div>
                                        </div>
                                    </Link>
                                </CarouselItem>
                            ))}
                            <CarouselItem className="lg:basis-1/3 flex flex-col relative bg-gradient-to-br from-black to-[#797979] items-center justify-center mx-4">
                                <Link href={'/catalogo'}>
                                    <p className='underline text-white font-bold'>Visite nosso catálogo</p>
                                </Link>
                            </CarouselItem>
                        </CarouselContent>
                    </Carousel>
                </div>
            )}
            <div className='flex justify-center'>
                <Link href={'/catalogo'}>
                    <button className={`font-bold flex justify-center bg-shineray-color-dark text-white p-2 rounded-full w-80 md:mt-4`}>Solicite seu Financiamento!</button>
                </Link>
            </div>
        </div>
    );
};

export default CatalogSection;