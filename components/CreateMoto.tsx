"use client";
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';


const CreateMoto: React.FC = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [color, setColor] = useState('');
  const [specs, setSpecs] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const token = Cookies.get('accessToken');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('color', color);
    formData.append('specs', specs);
    if (image) {
      formData.append('image', image);
    }
    formData.append('description', description);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/motorcycles`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      router.push('/painel/motos')
      toast.success('Moto cadastrada com sucesso!');
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
      toast.error('Houve um problema ao cadastrar a moto.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Cadastrar Moto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Modelo</label>
          <Input type="text" id="name" name="name" placeholder="Nome" className="mt-1 block w-full" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Preço</label>
          <Input type="text" id="price" name="price" placeholder="Preço" className="mt-1 block w-full" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label htmlFor="color" className="block text-sm font-medium text-gray-700">Cor</label>
          <Input type="text" id="color" name="color" placeholder="Cor" className="mt-1 block w-full" value={color} onChange={(e) => setColor(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Imagem</label>
          <Input type="file" id="image" name="image" className="mt-1 block w-full" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} required />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição</label>
          <textarea id="description" name="description" placeholder="Descrição" className="mt-1 block w-full p-2 border rounded-md" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label htmlFor="specs" className="block text-sm font-medium text-gray-700">Ficha Técnica</label>
          <textarea id="specs" name="specs" placeholder="Ficha Técnica" className="mt-1 block w-full p-2 border rounded-md" value={specs} onChange={(e) => setSpecs(e.target.value)} required />
        </div>
        <Button type="submit" className="mt-4 w-full">Cadastrar Moto</Button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateMoto;
