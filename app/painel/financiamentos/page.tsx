import GetFinancingSection from '@/components/financing/getFinancingSection';
import { Card } from '@/components/ui/card';
import React from 'react';

const Page: React.FC = () => {

    return (
        <div className='p-6 flex flex-col gap-6'>
            <Card className='p-2 border-none bg-shineray-color-dark text-center text-2xl uppercase text-white rounded-sm'>
                Área dos Financiamentos
            </Card>
            <GetFinancingSection />
        </div>
    );
};

export default Page;