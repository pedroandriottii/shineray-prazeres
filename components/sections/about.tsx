import React from 'react';
import Image from 'next/image';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

function About() {
  return (
    <div id='sobre-nos' className='flex flex-col items-center'>
      <h1 className='text-shineray-color-dark font-bold uppercase'>Sobre a Revisão Motos</h1>
      <div className='w-full'>
        <Image
          src='/revisao.jpeg'
          layout='responsive'
          width={100}
          height={80}
          alt='Revisão de moto Shineray Prazeres'
          className='w-full'
        />
      </div>
      <div className='w-full p-4'>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className='text-shineray-color-dark'>Saber mais</AccordionTrigger>
            <AccordionContent>
              A revisão motos, há mais de 27 anos se consolida no ramo de duas rodas no estado de Pernambuco, atendendo nesse tempo milhares de clientes com os quais criaram dentro da empresa uma relação de confiança com seus veículos, e é com esse mesmo sentimentos que retornamos a parceria com uma das maiores montadoras do país, a Shineray Motors, fabricando hoje as motos com os melhores custos benefícios do Brasil, sendo referência em tecnologia e entender os seus clientes, valores esses que estão alinhados com a empresa Revisão Motos. Entendendo as dores, sabemos que as concessionárias atuais Shineray carecem de um pós-venda em relação a peças e serviços, o que falta para garantir aos clientes da marca uma ótima experiência na compra de seus produtos. Por isso nosso maior foco sempre será nossos serviços e garantias fornecidas aos nossos clientes, para que assim o mesmo sinta-se  vontade de adquirir hoje um produto de boa qualidade, baixo custo, e agora, com um ótimo suporte.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export default About;
