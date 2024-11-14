"use client"

import { useCallback, useEffect, useState } from "react";
import OrdersTable from "@/app/components/orders/OrdersTable";
import { listOrders } from "../api/OrdersService";
import { exportOrdersToExcel } from "../services/export-orders-excel";
import { toast } from "react-toastify";
import Button from "../components/common/Button";
import { Order } from "../types/order";
import Card from "../components/common/Card";

export default function Page() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true);
  const [totals, setTotals] = useState(
    { totalQuantity: 0, totalValue: 0 }
  );

  const fetchOrders = useCallback(async () => {
    try {
      const ordersFromDb = await listOrders();
      setOrders(ordersFromDb);
      setTotals(calculateTotals(ordersFromDb));
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

  const calculateTotals = (orders: Order[]) => {
    return orders?.reduce(
      (acc, order) => {
        acc.totalQuantity += order.quantity;
        acc.totalValue += order?.totalValue || 0;
        return acc;
      },
      { totalQuantity: 0, totalValue: 0 }
    );
  };

  return (
    <div>
      <div className="p-4 xl:ml-80 ">
        <div className="mt-20">
          <div className="mb-12 grid">
            <Button text='Exportar em excel' classType={"CONFIRM"} onClick={() => exportOrdersToExcel(orders)} specialClass="h-20" />
          </div>
          <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-2">
            <Card isLoading={isLoading} title="Quantidade de produtos" value={(totals.totalQuantity.toString()).toString()} />
            <Card isLoading={isLoading} title="Total em R$ vendido" value={totals.totalValue.toString()} />
          </div>
          <div className='flex-wrap'>
            <OrdersTable orders={orders} isLoading={isLoading} updateOrders={() => fetchOrders()} />
          </div>
        </div>
      </div>
    </div>
  );
} 
