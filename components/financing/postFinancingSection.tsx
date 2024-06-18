'use client';
import { Button } from '@/components/ui/button';
import { FinancingItem } from '@/lib/types';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import relampago from '@/public/catalog/relampago.svg'
import zap from '@/public/catalog/zap.svg'
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';
import Image from 'next/image';
import InputMask from 'react-input-mask';


const PostFinancingSection: React.FC<FinancingItem> = ({ motorcycleId }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [hasDriverLicense, setHasDriverLicense] = useState(false);
  const [method, setMethod] = useState('COM_ENTRADA');
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);


  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const newItem = {
      name,
      phone,
      cpf,
      birthDate: new Date(birthDate).toISOString(),
      hasDriverLicense,
      method,
      isConcluded: false,
      motorcycleId,
      value: method === 'COM_ENTRADA' ? parseFloat(value) : null,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/financing`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      console.log(response)
      console.log(newItem)

      if (response.ok) {
        setOpen(true);
        toast.success('Simulação de Financiamento Enviada para Análise!');
      } else {
        toast.error('Falha ao enviar a simulação de financiamento. Tente novamente mais tarde.');
      }
    } catch (error) {
      toast.error('Falha ao enviar a simulação de financiamento. Tente novamente mais tarde.');
    }
  };

  return (
    <div className='w-full flex p-4 lg:py-12 items-center flex-col bg-shineray-color-dark'>
      <ToastContainer />
      <AlertDialog onOpenChange={() => setOpen(!open)} open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className='self-center'><Image alt="teste" src={relampago} width={60} height={60} /></AlertDialogTitle>
            <AlertDialogDescription className='font-bold text-2xl self-center text-black'>
              Sua simulação foi enviada
            </AlertDialogDescription>
            <p className='uppercase text-xl self-center mt-4'>Nome da moto</p>
            <p className='text-center self-center mt-4'>Não se preoucupe, um de nossos vendedores irá entrar em contato com você o mais breve possível!</p>
            <p className=' text-center self-center mt-4'>Surgiu alguma dúvida? Entre em contato conosco através do whatsapp!</p>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <a href="https://api.whatsapp.com/send?phone=5581999564461" className='w-full'>
              <AlertDialogAction className='w-full bg-red-600 hover:bg-red-700 rounded-full' asChild>
                <Image alt="teste" src={zap} width={30} height={30} />
              </AlertDialogAction>
            </a>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <h3 className="text-center py-3 text-white uppercase font-bold text-2xl">Simule seu financiamento</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-[800px]">
        <div className='flex flex-col gap-2'>
          <Label htmlFor='name' className=' text-white'>Nome</Label>
          <Input
            id='name'
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-full"
            required
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='phone' className=' text-white'>Telefone</Label>
          <InputMask mask="+5\5 (99) 99999-9999" value={phone} onChange={(e) => setPhone(e.target.value)} className="border rounded-full p-2" placeholder='+55 (99) 99999-9999' required />
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='cpf' className='text-white'>CPF</Label>
          <InputMask mask="999.999.999-99" value={cpf} onChange={(e) => setCpf(e.target.value)} className="border rounded-full p-2" placeholder='CPF' />
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor="date" className='text-sm text-white'>Data de Nascimento</Label>
          <Input
            id='date'
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="border rounded-full"
            required
          />
        </div>
        <div className='flex items-center gap-2 text-white'>
          <input
            id="cnh"
            type="checkbox"
            checked={hasDriverLicense}
            onChange={(e) => setHasDriverLicense(e.target.checked)}
            className='border rounded-full p-2 w-5 h-5'
          />
          <label htmlFor="cnh">Possui Habilitação?</label>
        </div>

        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="border rounded-full p-2 w-full"
        >
          <option value="COM_ENTRADA">Com Entrada</option>
          <option value="SEM_ENTRADA">Sem Entrada</option>
        </select>

        {method === 'COM_ENTRADA' && (
          <div className='flex flex-col gap-2'>
            <Label htmlFor="value" className='text-sm text-white'>Valor da entrada</Label>
            <Input
              id='value'
              type="number"
              placeholder="R$"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="border rounded-full p-2 w-full"
              required={method === 'COM_ENTRADA'}
            />
          </div>
        )}
        <Button type="submit" variant='default' className='flex w-full rounded-full mt-4 bg-black'>Enviar</Button>
      </form>
    </div>
  );
}

export default PostFinancingSection;
