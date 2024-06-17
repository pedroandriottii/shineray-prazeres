'use client';
import { Button } from '@/components/ui/button';
import { FinancingItem } from '@/lib/types';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

import { Select } from '../ui/select';


const PostFinancingSection: React.FC<FinancingItem> = ({ motorcycleId }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [hasDriverLicense, setHasDriverLicense] = useState(false);
  const [method, setMethod] = useState('COM_ENTRADA');
  const [value, setValue] = useState('');

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
        toast.success('Simulação de Financiamento Enviada para Análise!');
      } else {
        toast.error('Falha ao enviar a simulação de financiamento. Tente novamente mais tarde.');
      }
    } catch (error) {
      toast.error('Falha ao enviar a simulação de financiamento. Tente novamente mais tarde.');
    }
  };

  return (
    <div className='w-full flex p-4 items-center flex-col bg-shineray-color-dark'>
      <ToastContainer />
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
          <Input
            id='phone'
            type="phone"
            placeholder="81 99999-9999"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border rounded-full"
            required
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='cpf' className='text-white'>CPF</Label>
          <Input
            id='cpf'
            type="cpf"
            placeholder="123.456.789-00"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            className="border rounded-full"
            required
          />
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
              className="border rounded-md p-2"
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
