'use client';
import GetFinancingSection from '@/components/sections/getFinancingSection';
import React from 'react';
import Cookies from 'js-cookie';
import ClientPanel from '@/components/ClientPanel';

const Page: React.FC = () => {
    const role = Cookies.get('role');

    return (
        <div>
            {role === 'ADMIN' && (
                <GetFinancingSection isConcluded={false} />
            )}
            {role === 'CLIENT' && (
                <ClientPanel />
            )};
        </div>
    );
};

export default Page;
