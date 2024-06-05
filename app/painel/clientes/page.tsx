'use client'
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface Client {
    id: number;
    name: string;
    email: string;
}

const Page: React.FC = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const token = Cookies.get('accessToken');
                if (!token) {
                    setError('Token not found');
                    setLoading(false);
                    return;
                }

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch clients');
                }

                const data = await response.json();
                setClients(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchClients();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Clients</h1>
            <ul>
                {clients.map((client) => (
                    <li key={client.id}>
                        {client.name} - {client.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Page;
