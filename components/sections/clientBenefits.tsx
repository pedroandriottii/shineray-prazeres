import React from 'react';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import BuildIcon from '@mui/icons-material/Build';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Link from 'next/link';

const ClientBenefits: React.FC = () => {
    return (
        <div className='bg-shineray-color-dark p-2 text-white'>
            <h1 className='flex justify-center text-white uppercase'>Benefícios para Nossos Clientes!</h1>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>
                        <div className='flex items-center gap-2'>
                            <WorkspacePremiumIcon />
                            <span>Garantia de 1 Ano!</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className='px-2'>
                        Única concessionária Shineray do Brasil com garantia de 1 ano!
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>
                        <div className='flex items-center gap-2'>
                            <BuildIcon />
                            <span>As duas primeiras revisões 100% grátis!</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className='px-2'>
                        As duas primeiras revisões são por nossa conta!
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>
                        <div className='flex items-center gap-2'>
                            <SportsMotorsportsIcon style={{ transform: 'scaleX(-1)' }} />
                            <span>Ganhe um Capacete!</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className='px-2'>
                        Na compra de uma moto, ganhe um capacete!
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>
                        <div className='flex items-center gap-2'>
                            <LocalGasStationIcon />
                            <span>Saia com o tanque cheio!</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className='px-2'>
                        Te garantimos um tanque cheio na sua primeira saída!
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <Link href={'/catalogo'}>
                <div className='p-2 flex justify-center items-center'>
                    <h1 className='flex bg-white w-full text-shineray-color-dark text-center shadow-md p-2 justify-between'>
                        Veja os modelos disponíveis!
                        <ChevronRightIcon />
                    </h1>
                </div>
            </Link>

        </div>
    );
};

export default ClientBenefits;