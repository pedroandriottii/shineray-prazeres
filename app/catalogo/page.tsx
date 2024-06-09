'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Motorcycle } from '@/lib/types';

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
        <div className='p-6'>
            <div className='grid grid-flow-row gap-10'>
                {motorcycles.map((motorcycle) => (
                    <div key={motorcycle.id} className="motorcycle-card">
                        <Link href={`/catalogo/${motorcycle.id}`}>
                            <Card className='flex p-2 flex-col'>
                                <img className='w-full rounded-md' src={motorcycle.imageUrls[0]} alt={motorcycle.name} width={200} height={150} />
                                <div className='flex justify-between items-center'>
                                    <h2 className='flex text-center py-2 uppercase justify-center font-bold text-shineray-color-dark'>{motorcycle.name}</h2>
                                    <p>R${motorcycle.price}</p>
                                </div>
                                <Button className='bg-shineray-color-dark'>
                                    Ver Mais
                                </Button>
                            </Card>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Page;
