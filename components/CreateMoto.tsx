"use client";
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { Progress } from './ui/progress';

const CreateMoto: React.FC = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [color, setColor] = useState('');
  const [specs, setSpecs] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const router = useRouter();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      if (selectedFiles.length > 10) {
        toast.error('Você pode enviar no máximo 10 imagens.');
      } else {
        setImages(selectedFiles);
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const token = Cookies.get('accessToken');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('color', color);
    formData.append('specs', specs);
    images.forEach((image) => {
      formData.append('images', image);
    });
    formData.append('description', description);

    try {
      setIsLoading(true);
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

      router.push('/painel/motos');
      toast.success('Moto cadastrada com sucesso!');
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
      toast.error('Houve um problema ao cadastrar a moto.');
    } finally {
      setIsLoading(false);
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
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Imagens (máximo 10)</label>
          <Input type="file" id="image" name="images" className="mt-1 block w-full" multiple onChange={handleImageChange} required />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição</label>
          <textarea id="description" name="description" placeholder="Descrição" className="mt-1 block w-full p-2 border rounded-md" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label htmlFor="specs" className="block text-sm font-medium text-gray-700">Ficha Técnica</label>
          <textarea id="specs" name="specs" placeholder="Ficha Técnica" className="mt-1 block w-full p-2 border rounded-md" value={specs} onChange={(e) => setSpecs(e.target.value)} required />
        </div>
        {isLoading && (
          <div className="mb-4">
            <Progress value={uploadProgress} />
          </div>
        )}
        <Button type="submit" className="mt-4 w-full" disabled={isLoading}>Cadastrar Moto</Button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateMoto;
