'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

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
    const router = useRouter();
    const pathname = usePathname();
    const id = pathname.split('/').pop();


    const [motorcycle, setMotorcycle] = useState<Motorcycle | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchMotorcycle = async () => {
            try {
                const response = await fetch(`http://localhost:3000/motorcycles/${id}`, {
                });

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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="motorcycle-detail">
            {motorcycle && (
                <>
                    <img src={motorcycle.imageUrl} alt={motorcycle.name} width={600} height={400} />
                    <h1>{motorcycle.name}</h1>
                    <p>Chassi: {motorcycle.chassi}</p>
                    <p>Price: ${motorcycle.price}</p>
                    <p>Year: {motorcycle.year}</p>
                    <p>Model: {motorcycle.model}</p>
                    <p>Color: {motorcycle.color}</p>
                    <p>Description: {motorcycle.description}</p>
                    <p>Specs: {motorcycle.specs}</p>
                </>
            )}
        </div>
    );
};

export default Page;
