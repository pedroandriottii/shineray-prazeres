'use client';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Motorcycle } from '@/lib/types';

const Page: React.FC = () => {
    const pathname = usePathname();
    const id = pathname.split('/').pop();

    const [motorcycle, setMotorcycle] = useState<Motorcycle | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchMotorcycle = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/motorcycles/${id}`, {
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
        <div className="motorcycle-detail text-white">
            {motorcycle && (
                <>
                    <img src={motorcycle.imageUrls[0]} alt={motorcycle.name} width={600} height={400} />
                    <h1>{motorcycle.name}</h1>
                    <p>Price: ${motorcycle.price}</p>
                    <p>Color: {motorcycle.color}</p>
                    <p>Description: {motorcycle.description}</p>
                    <p>Specs: {motorcycle.specs}</p>
                </>
            )}
        </div>

    );
};

export default Page;
