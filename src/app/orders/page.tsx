"use client"

import { useCallback, useEffect, useState } from "react";
import OrdersTable from "@/app/components/orders/OrdersTable";
import { listOrders } from "../api/OrdersService";
import { exportOrdersToExcel } from "../services/export-orders-excel";
import { toast } from "react-toastify";
import Button from "../components/common/Button";
import { Order } from "../types/order";

export default function Page() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    try {
      const ordersFromDb = await listOrders();
      setOrders(ordersFromDb);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Erro ao tentar listar ordens");
      }
    } finally {
      setIsLoading(false);
    }
  }, [])

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div>
      <div className="p-4 xl:ml-80 ">
        <div className="mt-20">
          <div className="mb-12 grid">
            <Button text='Exportar em excel' classType={"CONFIRM"} onClick={() => exportOrdersToExcel(orders)} specialClass="h-20" />
          </div>
          <div className='flex-wrap'>
            <OrdersTable orders={orders} isLoading={isLoading} updateOrders={() => fetchOrders()} />
          </div>
        </div>
      </div>
    </div>
  );
} 
