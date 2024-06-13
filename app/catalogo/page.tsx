'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Motorcycle } from '@/lib/types';
import { Poppins } from 'next/font/google';
import Image from 'next/image';
import { Inter } from 'next/font/google';

const FontPoppins = Poppins({ subsets: ['latin'], weight: ['400'] });
const FontInter = Inter({ subsets: ['latin'], weight: ['200'] });

const Page: React.FC = () => {
    const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMotorcycles = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/motorcycles`, {
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch motorcycles');
                }

                const data = await response.json();
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

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <div className="relative w-full">
                <Image
                    src={'/catalog/hero.svg'}
                    alt="Hero Background"
                    width={1920}
                    height={1080}
                    objectFit="cover"
                    quality={100}
                    className="z-0 md:max-h-[690px] w-full bg-black"
                />
                <div className={`${FontInter.className} absolute inset-0 flex flex-col justify-center items-center text-white z-1`}>
                    <h1 className="text-2xl lg:text-7xl md:text-5xl  uppercase text-center"><span className='font-extrabold'>Escolha a moto</span> dos seus sonhos!</h1>
                    <div className="flex items-center gap-2">
                        <img
                            src={'/base/shinerayLogo.png'}
                            alt='Logomarca Shineray'
                            className='w-40 md:w-60'
                        />
                        <img
                            src={'/base/revisaoLogo.png'}
                            alt='Logomarca Revisão'
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
                        <p className='ml-2'>(81) 98814-5903</p>
                    </div>
                </div>
            </div >
            <div className={` ${FontPoppins.className} grid p-6 grid-flow-row gap-10 md:grid-cols-3`}>
                {motorcycles.map((motorcycle) => (
                    <div key={motorcycle.id} className="motorcycle-card">
                        <Link href={`/catalogo/${motorcycle.id}`}>
                            <img className='w-full' src={motorcycle.imageUrls[0]} alt={motorcycle.name} width={200} height={150} />
                            <div className='relative flex items-center flex-1 justify-between py-3 z-0 bg-gradient-to-r from-black to-[#797979] text-white p-2 shadow-md'>
                                <p className='uppercase'>{motorcycle.name}</p>
                                <p className='absolute right-0 p-3 bg-shineray-color-dark pl-6 max-w-28 min-w-28'>R$ {motorcycle.price}</p>
                                <div className="absolute right-28 top-0 border-corner-catalog-page"></div>
                            </div>
                            <div className='flex flex-1 py-2 w-full gap-1'>
                                <button className='bg-shineray-color-dark w-2/3 text-white p-1 rounded-xl'>Simular Financiamento</button>
                                <button className='bg-black text-white p-1 rounded-xl w-1/3'>Ver Mais</button>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Page;
