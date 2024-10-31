"use client"

import { useState } from "react";
import { createProduct } from "@/app/api/ProductsService";
import { toast } from "react-toastify";
import Button from "../common/Button";

interface ProductsModalProps {
  isOpen: boolean;
  onClose: () => void;
  updateProducts: () => void;
}

export default function ProductsModal({ isOpen, onClose, updateProducts }: ProductsModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [purchaseValue, setPurchaseValue] = useState("");
  const [saleValue, setSaleValue] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const resetModal = () => {
    setName("");
    setDescription("");
    setType("");
    setQuantity("");
    setPurchaseValue("");
    setSaleValue("");
    setPurchaseDate("");
  };

  const closeAndResetModal = () => {
    resetModal();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (isNaN(Number(quantity)) || isNaN(Number(purchaseValue)) || isNaN(Number(saleValue))) {
      setError("Quantidades e valores devem ser numéricos.");
      setLoading(false);
      return;
    }

    try {
      await createProduct({
        name,
        description,
        type,
        quantity: Number(quantity),
        purchaseValue: Number(purchaseValue),
        saleValue: Number(saleValue),
        purchaseDate: new Date(purchaseDate),
      });
      toast.success("Produto criado com sucesso!");
      updateProducts();
      resetModal();
      onClose();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Erro ao salvar produto");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-1 flex items-center justify-center z-50 bg-indigo-950 bg-opacity-50 overflow-y-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full">
        <h2 className="text-xl mb-4 text-indigo-950 font-bold uppercase">Cadastrar Novo Produto</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="mb-4">
            <label className="block text-indigo-950">Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-indigo-700"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-indigo-950">Descrição</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-indigo-700"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-indigo-950">Tipo</label>
            <select onChange={(e) => setType(e.target.value)} name="" id="" className="w-full px-4 py-2 border rounded-lg focus:outline-indigo-700">
              <option value="camisa">Camisa</option>
              <option value="calça">Calça</option>
              <option value="blusa">Blusa</option>
              <option value="intima">Peça intima</option>
              <option value="jaqueta">Jaqueta</option>
              <option value="calçado">Calçado</option>
              <option value="acessório">Acessório</option>
            </select>
          </div>


          <div className="mb-4">
            <label className="block text-indigo-950">Quantidade</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-indigo-700"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-indigo-950">Valor de Compra</label>
            <input
              type="number"
              value={purchaseValue}
              onChange={(e) => setPurchaseValue(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-indigo-700"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-indigo-950">Valor de Venda</label>
            <input
              type="number"
              value={saleValue}
              onChange={(e) => setSaleValue(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-indigo-700"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-indigo-950">Data de Compra</label>
            <input
              type="date"
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-indigo-700"
              required
            />
          </div>

          {error && <p className="text-red-500 flex justify-start mb-4">* {error}</p>}

          <div className="flex justify-end">
            <button type="submit" className="mr-4 px-4 py-2 bg-indigo-500 text-white font-bold rounded-lg" disabled={loading}>
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white inline-block"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Cadastrar"
              )}
            </button>
            <Button text="Cancelar" onClick={closeAndResetModal} classType="INFO" specialClass="" />
          </div>
        </form>
      </div>
    </div>
  );
}
