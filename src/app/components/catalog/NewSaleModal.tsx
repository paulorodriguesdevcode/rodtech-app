import { useState, useEffect } from "react";
import { Customer } from "@/app/types/customer";
import Button from "../common/Button";
import { Product } from "@/app/types/product";
import { openConfirmationAlert } from "../common/ConfirmationAlert";
import { createOrder } from "@/app/api/OrdersService";
import { toast } from "react-toastify";

interface CustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null
  customers: Customer[]
  updateMethod: any
}

export default function NewSaleModal({ isOpen, onClose, product, customers, updateMethod }: CustomerModalProps) {
  const [customerId, setCustomerId] = useState("");
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (product) {
      setProductId(product.id);
    }
  }, [product]);

  const [productId, setProductId] = useState("");

  const resetModal = () => {
    setProductId(productId || "");
    setCustomerId(customerId || "");
    setQuantity(1);
  };

  const closeAndResetModal = () => {
    resetModal();
    onClose();
  };

  const handleCreateOrder = async () => {
    try {
      await createOrder({ customerId, quantity, productId });
      toast.success("Venda realizada com sucesso");
      closeAndResetModal();
      updateMethod()
    } catch (error) {
      toast.error(String(error));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quantity && customerId && productId) {
      openConfirmationAlert({
        title: "Confirmação de venda",
        question: "Tem certeza que deseja confirmar a venda?",
        classButtonConfirm: "CONFIRM",
        classButtonCancel: "CANCEL",
        confirmMethod: handleCreateOrder
      });
    } else {
      toast.error("Por favor, preencha todos os campos.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-indigo-950 bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl mb-4 text-indigo-950 font-bold uppercase">
          {product?.type + ' - ' + product?.name}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-indigo-950">Cliente</label>
            <select
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-indigo-700 text-indigo-900"
              required
            >
              <option value="" disabled>Selecione um cliente</option>
              {customers.map(customer => (
                <option value={customer.id} key={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-indigo-950">Quantidade</label>
            <input
              value={quantity}
              max={product?.quantity}
              min={1}
              onChange={(e) => setQuantity(Number(e.target.value))}
              type="number"
              className="w-full px-4 py-2 border rounded-lg focus:outline-indigo-700 text-indigo-900"
              required
            />
          </div>
          <p className="text-indigo-900 mb-10 text-center">Total da compra: R$ {(product?.saleValue || 0) * (quantity || 0)}</p>
          <p className="text-indigo-200 border-t-2">Preço: R$ {product?.saleValue}</p>
          <p className="text-indigo-200 mt-1">Quantidade disponível: {product?.quantity}</p>

          <div className="flex gap-4 mt-10">
            <Button text="Vender" action="submit" classType="CONFIRM" />
            <Button text="Cancelar" onClick={closeAndResetModal} classType="INFO" />
          </div>
        </form>
      </div>
    </div>
  );
}
