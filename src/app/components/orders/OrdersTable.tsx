import { ThreeDots } from "react-loader-spinner";
import { confirmAlert } from "react-confirm-alert";
import { deleteOrder } from "@/app/api/OrdersService";
import { toast } from "react-toastify";
import Button from "../common/Button";
import { Order } from "@/app/types/order";
import { LucideDelete } from "lucide-react";
import { formatToBRDate } from "@/common/datetime";

interface OrdersTableProps {
  orders: Order[];
  isLoading: boolean;
  updateOrders: () => void;
}

const OrdersTable: React.FC<OrdersTableProps> = ({ orders, isLoading, updateOrders }) => {
  const openConfirmationAlert = (id: string | undefined) => {
    if (!id) { return }
    confirmAlert({
      customUI: ({ onClose }) => (
        <div className='bg-white p-6 rounded-lg shadow-lg'>
          <h2 className='text-xl mb-4 text-indigo-950 font-bold uppercase'>Confirmar exclusão</h2>
          <p className='text-red-500'>
            Tem certeza que deseja excluir esta ordem de serviço?
          </p>
          <div className='mt-6 flex justify-end'>
            <Button text='Confirmar' classType={"CANCEL"} onClick={() => { handleDelete(id); onClose(); toast.success("Ordem excluida com sucesso") }} />
            <Button text='Cancelar' classType={"CONFIRM"} onClick={() => onClose()} specialClass='ml-2' />
          </div>
        </div>
      ),
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteOrder(id);
      updateOrders();
    } catch (error) {
      toast.error(`Erro ao excluir ordem de serviço ${error}`);
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
                <p className="block font-sans text-indigo-gray-400 dark:text-white">Produto</p>
              </th>
              <th className="border-b border-indigo-gray-50 dark:border-transparent py-3 px-6 text-center">
                <p className="block font-sans text-indigo-gray-400 dark:text-white">Tipo</p>
              </th>
              <th className="border-b border-indigo-gray-50 dark:border-transparent py-3 px-6 text-center">
                <p className="block font-sans text-indigo-gray-400 dark:text-white">Cliente</p>
              </th>
              <th className="border-b border-indigo-gray-50 dark:border-transparent py-3 px-6 text-center">
                <p className="block font-sans text-indigo-gray-400 dark:text-white">Quantidade</p>
              </th>
              <th className="border-b border-indigo-gray-50 dark:border-transparent py-3 px-6 text-center">
                <p className="block font-sans text-indigo-gray-400 dark:text-white">Data da venda</p>
              </th>
              <th className="border-b border-indigo-gray-50 dark:border-transparent py-3 px-6 text-center">
                <p className="block font-sans text-indigo-gray-400 dark:text-white">Ações</p>
              </th>
            </tr>
          </thead>
          <tbody className='capitalize align-top'>
            {orders.map((order, index) => (
              <tr key={index} className={index % 2 ? " dark:bg-indigo-950" : ""}>
                <td className="py-3 px-5 border-b">
                  <div className="flex items-center gap-4 justify-center">
                    <p className="block font-sans text-sm leading-normal">{order.product?.name}</p>
                  </div>
                </td>
                <td className="py-3 px-5 border-b">
                  <div className="flex items-center gap-4 justify-center">
                    <p className="block font-sans text-sm leading-normal">{order.product?.type}</p>
                  </div>
                </td>
                <td className="py-3 px-5 border-b">
                  <div className="flex items-center gap-4 justify-center">
                    <p className="block font-sans text-sm leading-normal">{order.customer?.name}</p>
                  </div>
                </td>
                <td className="py-3 px-5 border-b">
                  <div className="flex items-center gap-4 justify-center">
                    <p className="block font-sans text-sm leading-normal">{order.quantity}</p>
                  </div>
                </td>

                <td className="py-3 px-5 border-b">
                  <div className="flex items-center gap-4 justify-center">
                    <p className="block font-sans text-sm leading-normal">{formatToBRDate(order.createdAt)}</p>
                  </div>
                </td>
                
                <td className="py-3 px-5 border-b">
                  <div className="flex space-x-2 justify-center">
                    <button onClick={() => openConfirmationAlert(order?.id)} className="text-red-600 hover:text-red-900 focus:outline-none">
                      <LucideDelete />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );

}

export default OrdersTable;
