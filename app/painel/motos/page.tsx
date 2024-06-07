'use client'
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

interface Motorcycle {
    id: number;
    name: string;
    chassi: string;
    price: number;
    year: number;
    model: string;
    color: string;
    imageUrl: string;
    description: string;
    specs: string;
    createdAt: string;
    updatedAt: string;
}

const Page: React.FC = () => {
    const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMotorcycles = async () => {
            try {
                const response = await fetch('http://localhost:3000/motorcycles', {
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
            <Link href={'/painel/motos/cadastrar'}>
                <Button>
                    BUTÂUM
                </Button>
            </Link>
            <div className='grid grid-flow-row gap-10 lg:grid-cols-6'>
                {motorcycles.map((motorcycle) => (
                    <div key={motorcycle.id} className="motorcycle-card">
                        <Link href={`/painel/motos/${motorcycle.id}`}>
                            <Card className='flex p-2 flex-col'>
                                <img className='w-full rounded-md' src={motorcycle.imageUrl} alt={motorcycle.name} width={200} height={150} />
                                <div className='flex justify-between items-center'>
                                    <p className='flex items-center gap-2'>
                                        <h2 className='flex text-center py-2 uppercase justify-center font-bold text-shineray-color-dark'>{motorcycle.name}</h2>
                                        <p>{motorcycle.year}</p>
                                    </p>
                                    <p>R${motorcycle.price}</p>
                                </div>
                                <p>{motorcycle.description}</p>
                                <p>{motorcycle.model}</p>
                                <p><span className='text-shineray-color-dark uppercase'>Cor: </span>{motorcycle.color}</p>
                                <span className='text-shineray-color-dark uppercase flex justify-center pt-2'>Ficha Técnica:</span>
                                <p className='flex text-center justify-center'>{motorcycle.specs}</p>
                            </Card>
                        </Link>

                    </div>
                ))}
            </div>
        </div >
    );
};

export default Page;
