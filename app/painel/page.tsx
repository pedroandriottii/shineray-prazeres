'use client'
import GetFinancingSection from '@/components/sections/getFinancingSection';
import React from 'react';
import Cookies from 'js-cookie';

const Page: React.FC = () => {
    const role = Cookies.get('role');
    return (
        <div>
            {role === 'ADMIN' && (
                <div>
                    <h1>FINANCIAMENTOS NÃO CONCLUÍDOS</h1>
                    <GetFinancingSection isConcluded={false} />
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
