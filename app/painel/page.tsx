'use client';
import GetFinancingSection from '@/components/sections/getFinancingSection';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import ClientPanel from '@/components/ClientPanel';
import { Avaliation } from '@/lib/types';


const Page: React.FC = () => {
    const role = Cookies.get('role');
    const token = Cookies.get('accessToken');
    const [avaliations, setAvaliations] = useState<Avaliation[]>([]);
    const [averageRating, setAverageRating] = useState<Avaliation | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (role === 'ADMIN') {
            fetchAvaliations();
            fetchAverageRating();
        }
    }, [role]);

    const fetchAvaliations = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/avaliations`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch avaliations');
            }

            const data = await response.json();
            setAvaliations(data);
        } catch (error) {
            console.error('Failed to fetch avaliations', error);
            setError('Failed to fetch avaliations');
        } finally {
            setLoading(false);
        }
    };

    const fetchAverageRating = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/avaliations/average`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch average rating');
            }

            const data = await response.json();
            setAverageRating(data);
        } catch (error) {
            console.error('Failed to fetch average rating', error);
            setError('Failed to fetch average rating');
        }
    };

    return (
        <div>
            {role === 'ADMIN' && (
                <div>
                    <GetFinancingSection isConcluded={false} />
                    <div className="p-6 text-white">
                        <h2 className="text-2xl font-bold mb-4">Avaliações de Serviços</h2>
                        {loading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p className="text-red-500">{error}</p>
                        ) : (
                            <div>
                                {averageRating && (
                                    <div className="mb-4">
                                        <p><strong>Média das Avaliações:</strong> {averageRating.rating}</p>
                                    </div>
                                )}
                                <ul>
                                    {avaliations.map(avaliation => (
                                        <li key={avaliation.id} className="mb-4 border-b pb-4">
                                            <p><strong>Avaliação:</strong> {avaliation.rating}</p>
                                            <p><strong>Mensagem:</strong> {avaliation.message}</p>
                                            <p><strong>ID do Serviço:</strong> {avaliation.serviceId}</p>
                                            <p><strong>Data:</strong> {new Date(avaliation.createdAt).toLocaleString()}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}
            {role === 'CLIENT' && (
                <ClientPanel />
            )}
        </div>
    );
};

export default Page;
