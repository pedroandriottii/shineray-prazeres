'use client';
import React from 'react';
import GetAvaliacoes from '@/components/rating/GetAvaliacoes';
import Cookies from 'js-cookie';
import { Card } from '@/components/ui/card';

const AdminAvaliationsPage: React.FC = () => {
    const role = Cookies.get('role');

    if (role !== 'ADMIN') {
        return <div>Access Denied</div>;
    }

    return (
        <div className='p-6 flex flex-col gap-6'>
            <Card className='p-2 border-none bg-shineray-color-dark text-center text-2xl uppercase text-white rounded-sm'>
                Área das Avaliações
            </Card>
            <GetAvaliacoes />
        </div>
    );
};

export default AdminAvaliationsPage;
