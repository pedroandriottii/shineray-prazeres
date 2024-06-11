import React from 'react';
import { Poppins } from 'next/font/google';

const Font = Poppins({ subsets: ['latin'], weight: ['400'] });

const CatalogSection: React.FC = () => {
    return (
        <div className={`${Font.className}flex flex-col px-6`}>
            <div className='relative flex flex-1 z-0 justify-between items-center bg-black px-4 py-2 text-white items-center'>
                <h1 className='text-xl'>CATÁLOGO</h1>
                <p className='underline pr-6 text-sm'>Ver mais</p>
                <div className="absolute right-0 bottom-0 border-corner"></div>
            </div>
        </div>
    );
};

export default CatalogSection;
