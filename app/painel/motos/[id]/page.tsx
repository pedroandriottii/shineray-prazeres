'use client';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Motorcycle } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Image from 'next/image';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';

const Page: React.FC = () => {
    const pathname = usePathname();
    const id = pathname.split('/').pop();
    const router = useRouter();

    const [api, setApi] = useState<CarouselApi | undefined>()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)

    const [motorcycle, setMotorcycle] = useState<Motorcycle | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchMotorcycle = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/motorcycles/${id}`, {});

                if (!response.ok) {
                    throw new Error('Failed to fetch motorcycle details');
                }

                const data = await response.json();
                setMotorcycle(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchMotorcycle();
    }, [id]);

    useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price);
    };

    return (
        <div className='p-6 flex flex-col gap-6'>
            <Card className='flex items-center justify-between p-2 border-none bg-shineray-color-dark text-2xl uppercase text-white rounded-sm'>
                <ArrowBackIcon
                    className='cursor-pointer'
                    onClick={() => router.back()}
                />
                <span className='flex-1 text-center'>Detalhes da Moto</span>
                <div className='w-6' />
            </Card>
            <Card className='bg-[#373737] border-none p-6 text-white'>
                {motorcycle && (
                    <>
                        <div className='px-4 flex justify-center'>
                            <Carousel setApi={setApi} className='flex-1 p-8'>
                                <CarouselContent>
                                    {motorcycle.imageUrls.map((url, index) => (
                                        <CarouselItem key={index} className='md:basis-1/2 lg:basis-1/3'>
                                            <div className="relative w-full h-[300px]">
                                                <Image
                                                    src={url}
                                                    layout="fill"
                                                    objectFit="contain"
                                                    alt={motorcycle.name}
                                                />
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </div>
                        <div className="py-2 text-center text-sm text-white">
                            {current} de {count}
                        </div>
                        <div className='grid grid-cols-3 gap-4'>
                            <p className='border border-shineray-color-dark rounded-md p-1'>Modelo: {motorcycle.name}</p>
                            <p className='border border-shineray-color-dark rounded-md p-1'>Preço: {formatPrice(motorcycle.price)}</p>
                            <p className='border border-shineray-color-dark rounded-md p-1'>Cor: {motorcycle.color}</p>
                        </div>
                        <p className='border border-shineray-color-dark rounded-md p-1 mt-4'>Descrição: {motorcycle.description}</p>
                        <p className='border border-shineray-color-dark rounded-md p-1 my-4'>Ficha Técnica: {motorcycle.specs}</p>
                    </>
                )}
            </Card>
        </div>
    );
};

export default Page;
