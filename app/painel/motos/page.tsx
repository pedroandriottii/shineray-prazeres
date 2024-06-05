'use client'
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
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
                <Button>Cadastrar Moto</Button>
            </Link>
            <div className='grid grid-cols-5 gap-10'>
                {motorcycles.map((motorcycle) => (
                    <div key={motorcycle.id} className="motorcycle-card">
                        <Card>
                            <img className='w-full rounded-md' src={motorcycle.imageUrl} alt={motorcycle.name} width={200} height={150} />
                            <h2>{motorcycle.name}</h2>
                            <p>{motorcycle.description}</p>
                            <p>Model: {motorcycle.model}</p>
                            <p>Year: {motorcycle.year}</p>
                            <p>Color: {motorcycle.color}</p>
                            <p>Price: ${motorcycle.price}</p>
                        </Card>
                    </div>
                ))}
            </div>
        </div >
    );
};

export default Page;
