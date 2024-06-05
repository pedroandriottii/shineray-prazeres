'use client'
import GetFinancingSection from '@/components/sections/getFinancingSection';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import React from 'react';
import Cookies from 'js-cookie';

const Page: React.FC = () => {
    const role = Cookies.get('role');
    const userId = Cookies.get('userId');
    return (
        <div>
            <h1 className='bg-green-500'>ROLE - {role}</h1>
            <h1 className='bg-purple-200'>ID - {userId}</h1>
            {role === 'ADMIN' && (
                <div>
                    <h1>Gestão</h1>
                    <div>
                        <h1>Últimos Financiamentos</h1>
                        <GetFinancingSection />
                    </div>
                </div>
            )}
            {role === 'CLIENT' && (
                <div>
                    <h1>PAGINA DO CLIENTE</h1>
                </div>
            )}

        </div>
    );
};

export default Page;