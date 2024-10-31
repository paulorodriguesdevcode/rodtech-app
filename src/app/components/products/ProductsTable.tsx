import { ThreeDots } from "react-loader-spinner";
import { confirmAlert } from "react-confirm-alert";
import { deleteProduct } from "@/app/api/ProductsService";
import { useState } from "react";
import { toast } from "react-toastify";
import Button from "../common/Button";
import ProductsModal from "./ProductsModal"; 
import { Product } from "@/app/types/product";
import { LucideDelete } from "lucide-react";

interface ProductsTableProps {
  products: Product[];
  isLoading: boolean;
  updateProducts: () => void;
}

const ProductsTable: React.FC<ProductsTableProps> = ({ products, isLoading, updateProducts }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => setModalOpen(false);

  const openConfirmationAlert = (id: string) => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <div className='bg-white p-6 rounded-lg shadow-lg'>
          <h2 className='text-xl mb-4 text-indigo-950 font-bold uppercase'>Confirmar exclusão</h2>
          <p className='text-red-500'>
            Tem certeza que deseja excluir este produto?
          </p>
          <div className='mt-6 flex justify-end'>
            <Button text='Confirmar' classType={"CANCEL"} onClick={() => { handleDelete(id); onClose(); toast.success("Produto excluído com sucesso") }} />
            <Button text='Cancelar' classType={"CONFIRM"} onClick={() => onClose()} specialClass='ml-2' />
          </div>
        </div>
      ),
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      updateProducts();
    } catch (error) {
      toast.error(`Erro ao excluir produto ${error}`);
    }
  };

  return (
    isLoading ? (
      <div className='flex justify-center'>
        <ThreeDots
          height="80"
          width="20"
          radius="9"
          color="black"
          ariaLabel="three-dots-loading"
          visible={true}
        />
      </div>
    ) : (
      <div className="mt-10 flex flex-col bg-clip-border rounded-xl bg-indigo-50 shadow-md xl:col-span-2 overflow-y-auto scrollbar-thumb-indigo-500 dark:text-white dark:bg-black ">
        <table className="w-full h-full">
        <thead className='bg-gradient-to-tr  dark:from-indigo-950 dark:to-indigo-700 from-indigo-700 to-indigo-500'>
        <tr className='text-white text-[15px]'>
              <th className="border-b border-indigo-gray-50 dark:border-transparent py-3 px-6 text-center">
                <p className="block font-sans text-indigo-gray-400 dark:text-white">Nome</p>
              </th>
              <th className="border-b border-indigo-gray-50 dark:border-transparent py-3 px-6 text-center">
                <p className="block font-sans text-indigo-gray-400 dark:text-white">Descrição</p>
              </th>
              <th className="border-b border-indigo-gray-50 dark:border-transparent py-3 px-6 text-center">
                <p className="block font-sans text-indigo-gray-400 dark:text-white">Tipo</p>
              </th>
              <th className="border-b border-indigo-gray-50 dark:border-transparent py-3 px-6 text-center">
                <p className="block font-sans text-indigo-gray-400 dark:text-white">Estoque</p>
              </th>
              <th className="border-b border-indigo-gray-50 dark:border-transparent py-3 px-6 text-center">
                <p className="block font-sans text-indigo-gray-400 dark:text-white">Valor de Compra</p>
              </th>
              <th className="border-b border-indigo-gray-50 dark:border-transparent py-3 px-6 text-center">
                <p className="block font-sans text-indigo-gray-400 dark:text-white">Valor de Venda</p>
              </th>
              <th className="border-b border-indigo-gray-50 dark:border-transparent py-3 px-6 text-center">
                <p className="block font-sans text-indigo-gray-400 dark:text-white">Ações</p>
              </th>
            </tr>
          </thead>
          <tbody className='capitalize align-top'>
            {products.length ? (
              products.map((product, index) => (
                <tr key={index} className={index % 2 ? " dark:bg-indigo-950" : ""}>
                  
                  <td className="py-3 px-5 border-b">
                    <div className="flex items-center gap-4 justify-center">
                      <p className="block font-sans text-sm leading-normal">{product.name}</p>
                    </div>
                  </td>
                  <td className="py-3 px-5 border-b">
                    <div className="flex items-center gap-4 justify-center">
                      <p className="block font-sans text-sm leading-normal">{product.description}</p>
                    </div>
                  </td>
                  <td className="py-3 px-5 border-b">
                    <div className="flex items-center gap-4 justify-center">
                      <p className="block font-sans text-sm leading-normal">{product.type}</p>
                    </div>
                  </td>
                  <td
                   className="py-3 px-5 border-b">
                    <p className="block font-sans text-xs font-medium text-blue-gray-600 text-center">{product.quantity}</p>
                  </td>
                  <td className="py-3 px-5 border-b">
                    <p className="font-sans mb-1 block text-xs font-medium text-blue-gray-600 text-center">{'R$ ' + product?.purchaseValue?.toFixed(2)}</p>
                  </td>
                  <td className="py-3 px-5 border-b">
                    <p className="font-sans mb-1 block text-xs font-medium text-blue-gray-600 text-center">{'R$ ' + product.saleValue.toFixed(2)}</p>
                  </td>
                  <td className="py-3 px-5 border-b">
                    <div className="flex space-x-2 justify-center">
                      <button onClick={() => openConfirmationAlert(product.id)} className="text-red-600 hover:text-red-900 focus:outline-none">
                        <LucideDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ):('')}
          </tbody>
        </table>

        {modalOpen && (
          <ProductsModal
            isOpen={modalOpen}
            onClose={closeModal}
            updateProducts={updateProducts}
          />
        )}

        
      </div>
    )
  );
}

export default ProductsTable;
