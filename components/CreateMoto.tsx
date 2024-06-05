"use client";

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const CreateMoto: React.FC = () => {
  const [name, setName] = useState('');
  const [chassi, setChassi] = useState('');
  const [price, setPrice] = useState('');
  const [year, setYear] = useState('');
  const [model, setModel] = useState('');
  const [color, setColor] = useState('');
  const [specs, setSpecs] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('chassi', chassi);
    formData.append('price', price);
    formData.append('year', year);
    formData.append('model', model);
    formData.append('color', color);
    formData.append('specs', specs);
    if (image) {
      formData.append('image', image);
    }
    formData.append('description', description);

    try {
      const response = await fetch('http://localhost:3000/motorcycles', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5ZTQ0MmU5My0wMTBhLTRlYjQtOGQ1MS1kYjE3YmE1MDIyMTEiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MTc2MTU3MzYsImV4cCI6MTcyNjI1NTczNn0.9aZvlAkQ_9rx7CPppwopuzMWVEs099ZWMELSDAnEOfY'
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Handle the response as needed
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Cadastrar Moto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
          <Input type="text" id="name" name="name" placeholder="Nome" className="mt-1 block w-full" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label htmlFor="chassi" className="block text-sm font-medium text-gray-700">Chassi</label>
          <Input type="text" id="chassi" name="chassi" placeholder="Chassi" className="mt-1 block w-full" value={chassi} onChange={(e) => setChassi(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Preço</label>
          <Input type="text" id="price" name="price" placeholder="Preço" className="mt-1 block w-full" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label htmlFor="year" className="block text-sm font-medium text-gray-700">Ano</label>
          <Input type="text" id="year" name="year" placeholder="Ano" className="mt-1 block w-full" value={year} onChange={(e) => setYear(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label htmlFor="model" className="block text-sm font-medium text-gray-700">Modelo</label>
          <Input type="text" id="model" name="model" placeholder="Modelo" className="mt-1 block w-full" value={model} onChange={(e) => setModel(e.target.value)} required />
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
          <label htmlFor="specs" className="block text-sm font-medium text-gray-700">Specs</label>
          <textarea id="specs" name="specs" placeholder="specs" className="mt-1 block w-full p-2 border rounded-md" value={specs} onChange={(e) => setSpecs(e.target.value)} required />
        </div>
        <Button type="submit" className="mt-4 w-full">Cadastrar Moto</Button>
      </form>
    </div>
  );
};

export default CreateMoto;
