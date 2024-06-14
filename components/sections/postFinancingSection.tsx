'use client';
import { Button } from '@/components/ui/button';
import { FinancingItem } from '@/lib/types';
import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
    <div className='w-full flex items-center flex-col bg-shineray-color-dark'>
      <ToastContainer />
      <h1 className="text-center text-lg p-2 bg-white text-shineray-color-dark rounded-b-xl">Simular Financiamento</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 p-4">
        <div className='flex flex-col'>
          <label className='text-sm text-white'>Nome</label>
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-md p-2"
            required
          />
        </div>
        <div className='flex flex-col'>
          <label className='text-sm text-white'>Telefone</label>
          <InputMask mask="+5\5 (99) 99999-9999" value={phone} onChange={(e) => setPhone(e.target.value)} className="border rounded-md p-2" placeholder='+55 (99) 99999-9999' />
        </div>
        <div className='flex flex-col'>
          <label className='text-sm text-white'>CPF</label>
          <InputMask mask="999.999.999-99" value={cpf} onChange={(e) => setCpf(e.target.value)} className="border rounded-md p-2" placeholder='CPF' />
        </div>
        <div className='flex flex-col flex-1'>
          <label htmlFor="" className='text-sm text-white'>Data de Nascimento</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="flex flex-1 border rounded-md p-2 w-full"
            required
          />
        </div>
        <div className='flex items-center gap-2 text-white'>
          <input
            type="checkbox"
            checked={hasDriverLicense}
            onChange={(e) => setHasDriverLicense(e.target.checked)}
          />
          <label htmlFor="">Possui Habilitação?</label>
        </div>

        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="border rounded-md p-2 w-full"
        >
          <option value="COM_ENTRADA">Com Entrada</option>
          <option value="SEM_ENTRADA">Sem Entrada</option>
        </select>

        {method === 'COM_ENTRADA' && (
          <div className='flex flex-col'>
            <label className='text-sm text-white'>Valor da Entrada</label>
            <input
              type="number"
              placeholder="R$"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="border rounded-md p-2"
              required={method === 'COM_ENTRADA'}
            />
          </div>
        )}

        <Button type="submit" variant='outline' className='flex w-full'>Enviar</Button>
      </form>
    </div>
  );
}

export default PostFinancingSection;
