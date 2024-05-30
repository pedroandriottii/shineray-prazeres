'use client';
import { useEffect, useState } from 'react';
import { FinancingItem } from '@/lib/types';

const GetFinancingSection: React.FC = () => {
    const [financingItems, setFinancingItems] = useState<FinancingItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFinancingItems = async () => {
            try {
                const response = await fetch('http://localhost:3000/financing');
                const data = await response.json();
                setFinancingItems(data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch financing items', error);
                setLoading(false);
            }
        };

        fetchFinancingItems();
    }, []);

    return (
        <div className="p-6 w-full flex flex-col items-center">
            <h1 className="text-xl font-bold mb-4">Financing Items</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul className="w-full max-w-4xl bg-white rounded-lg shadow-md p-4">
                    {financingItems.map(item => (
                        <li key={item.id} className="mb-4 border-b pb-4">
                            <p><strong>Name:</strong> {item.name}</p>
                            <p><strong>Email:</strong> {item.email}</p>
                            <p><strong>Phone:</strong> {item.phone}</p>
                            <p><strong>CPF:</strong> {item.cpf}</p>
                            <p><strong>Birth Date:</strong> {new Date(item.birthDate).toLocaleDateString()}</p>
                            <p><strong>Has Driver License:</strong> {item.hasDriverLicense ? 'Yes' : 'No'}</p>
                            <p><strong>Method:</strong> {item.method}</p>
                            <p><strong>Is Concluded:</strong> {item.isConcluded ? 'Yes' : 'No'}</p>
                            <p><strong>Created At:</strong> {new Date(item.createdAt).toLocaleString()}</p>
                            <p><strong>Updated At:</strong> {new Date(item.updatedAt).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default GetFinancingSection;
