'use client';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import PostFinancingSection from '@/components/financing/postFinancingSection';
import { Motorcycle } from '@/lib/types';
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import Image from 'next/image';
import Footer from '@/components/base/footer';
import { ArrowLeft, ArrowRight } from 'lucide-react'; // Importing arrow icons from Lucide

const Page: React.FC = () => {
    const pathname = usePathname();
    const id = pathname.split('/').pop();

    const [api, setApi] = React.useState<CarouselApi | undefined>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)

    const [motorcycle, setMotorcycle] = useState<Motorcycle>();
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

    return (
        <div className="">
            <h1 className='w-full text-center text-2xl md:text-4xl uppercase font-extrabold text-shineray-color-dark my-8'>{motorcycle!.name}</h1>
            <div className='px-4 flex justify-center'>
                <Carousel setApi={setApi} className='w-full'>
                    <CarouselContent>
                        {motorcycle!.imageUrls.map((url, index) => (
                            <CarouselItem key={index} className='md:basis-1/2 lg:basis-1/3'>
                                <Image
                                    src={url}
                                    width={400}
                                    height={300}
                                    alt={motorcycle!.name}
                                    className="w-full h-full object-contain"
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <ArrowLeft className="h-8 w-8 text-white bg-black rounded-full p-2" />
                    </CarouselPrevious>
                    <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <ArrowRight className="h-8 w-8 text-white bg-black rounded-full p-2" />
                    </CarouselNext>
                </Carousel>
            </div>
            <div className="py-2 text-center text-sm text-muted-foreground">
                {current} de {count}
            </div>
            <p className='w-full text-center text-xl md:text-2xl mt-3 text-shineray-color-dark font-semibold'>R$ {motorcycle!.price}</p>
            <div className='px-4 md:px-8 text-[#2C2C2C] md:leading-9 text-lg md:text-xl my-5'>
                <p className=''><span className='font-bold text-gray-700'>Nome:</span> {motorcycle!.name}</p>
                <p className=''><span className='font-bold text-gray-700'>Cor:</span> {motorcycle!.color}</p>
                <p><span className='font-bold text-gray-700'>Preço:</span> {motorcycle!.price}</p>
                <p className=''><span className='font-bold text-gray-700'>Descrição:</span> {motorcycle!.description}</p>
                <p><span className='font-bold text-gray-700'>Ficha Técnica:</span> {motorcycle!.specs}</p>
            </div>

            <PostFinancingSection motorcycleId={motorcycle!.id} motorcycleName={motorcycle?.name || ''} id={0} name={''} phone={''} cpf={''} birthDate={''} hasDriverLicense={false} method={''} isConcluded={false} createdAt={''} updatedAt={''} value={0} />
            <Footer />
        </div>
    );
};

export default Page;
