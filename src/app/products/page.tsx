"use client";

import { useCallback, useEffect, useState } from "react";
import ProductsTable from "@/app/components/products/ProductsTable";
import Card from "../components/common/Card";
import { listProducts } from "../api/ProductsService";
import { exportProductsToExcel } from "../services/export-products-excel";
import { toast } from "react-toastify";
import ProductModal from "../components/products/ProductsModal";
import Button from "../components/common/Button";
import { Product } from "../types/product";

export default function Page() {
  const [modalOpen, setModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [totals, setTotals] = useState({
    totalProfit: 0,
    totalQuantity: 0,
    totalInvested: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const calculateTotals = (products: Product[]) => {
    return products.reduce(
      (acc, product) => {
        acc.totalProfit += product.quantity * (product.saleValue || 0);
        acc.totalQuantity += product.quantity;
        acc.totalInvested += (product.quantity * (product.purchaseValue || 0) );
        return acc;
      },
      { totalProfit: 0, totalQuantity: 0, totalInvested: 0 }
    );
  };

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const productsFromDb = await listProducts();
      setProducts(productsFromDb);
      setTotals(calculateTotals(productsFromDb));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao tentar listar produtos";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="p-4 xl:ml-80">
      <div className="mt-20">
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
          <Card isLoading={isLoading} title="Quantidade de produtos" value={totals.totalQuantity.toString()} />
          <Card isLoading={isLoading} title="Total Investido" value={`R$ ${totals.totalInvested.toFixed(2)}`} />
          <Card isLoading={isLoading} title="Faturamento bruto" value={`R$ ${totals.totalProfit.toFixed(2)}`} />
          <Card isLoading={isLoading} title="Faturamento líquido" value={`R$ ${(totals.totalProfit - totals.totalInvested).toFixed(2)}`} />
        </div>

        <div className="flex-wrap">
          <div className="flex">
            <Button text="Cadastrar Novo Produto" classType="CONFIRM" onClick={openModal} />
            <Button text="Exportar em Excel" classType="CONFIRM" onClick={() => exportProductsToExcel(products)} specialClass="ml-6" />
          </div>

          <ProductsTable products={products} isLoading={isLoading} updateProducts={fetchProducts} />
        </div>
      </div>

      <ProductModal isOpen={modalOpen} onClose={closeModal} updateProducts={fetchProducts} />
    </div>
  );
}
