'use client';
import GetFinancingSection from '@/components/financing/getFinancingSection';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import ClientPanel from '@/components/ClientPanel';
import { Avaliation } from '@/lib/types';
import { Card } from '@/components/ui/card';
import GetAvaliacoes from '@/components/rating/GetAvaliacoes';


const Page: React.FC = () => {
    const role = Cookies.get('role');
    return (
        <div>
            {role === 'ADMIN' && (
                <div className='p-6 flex flex-col gap-6'>
                    <Card className='p-2 border-none bg-shineray-color-dark text-center text-2xl uppercase text-white rounded-sm'>
                        Painel
                    </Card>
                    <div className='flex gap-6'>
                        <span className='w-2/4 custom-scroll'>
                            <GetFinancingSection isConcluded={false} />
                        </span>
                        <span className='w-2/3'>
                            <GetAvaliacoes />
                        </span>
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
