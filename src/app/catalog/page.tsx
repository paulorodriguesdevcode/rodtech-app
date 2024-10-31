"use client";

import { useCallback, useEffect, useState } from "react";
import { listProducts } from "../api/ProductsService";
import { toast } from "react-toastify";
import { Product } from "../types/product";
import ItemSale from "../components/catalog/ItemSale";
import { ThreeDots } from "react-loader-spinner";
import NewSaleModal from "../components/catalog/NewSaleModal";
import { listCustomers } from "../api/CustomersService";
import { Customer } from "../types/customer";

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filterValue, setFilterValue] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const fetchNecessaryData = useCallback(async () => {
    try {
      const productsFromDb = await listProducts();
      setProducts(productsFromDb);

      const customersFromDb = await listCustomers();
      setCustomers(customersFromDb);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Erro ao tentar listar produtos ou clientes");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);


  useEffect(() => {
    fetchNecessaryData();
  }, [fetchNecessaryData]);

  useEffect(() => {
    setFilteredProducts(
      products.filter(product =>
        product.name.toLowerCase().includes(filterValue.toLowerCase())
      )
    );
  }, [filterValue, products]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event.target.value);
  };

  const handleOpenModal = (productTarget: Product) => {
    if(!productTarget.quantity){
      toast.error('Quantidade em estoque indisponivel')
      return
    }
    setProduct(productTarget);
    openModal();
  };

  return (
    <div>
      <div className="min-h-screen p-8 text-white xl:ml-80">
        <main className="mt-20">
          <div className="mb-10 flex flex-col sm:flex-row items-center justify-between px-4 py-2 shadow-md rounded-lg bg-gradient-to-r from-indigo-700 via-indigo-800 to-indigo-950 
      dark:from-indigo-900 dark:via-indigo-950 dark:to-black">
            <label htmlFor="filter-name" className="text-lg font-semibold text-white mb-2 sm:mb-0 dark:text-white">
              Digite o nome do produto para pesquisar
            </label>
            <input
              type="text"
              id="filter-name"
              placeholder="Pesquisar..."
              value={filterValue}
              onChange={handleFilterChange}
              className="text-indigo-900 placeholder-indigo-800 w-full sm:w-1/2 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            />

          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(productTarget => (
                <ItemSale
                  key={productTarget.id}
                  isLoading={isLoading}
                  product={productTarget}
                  onClick={() => handleOpenModal(productTarget)}
                />
              ))
            ) : (
              <div className="col-span-full flex items-center justify-center min-h-[100px]">
                {!isLoading && (
                  <p className="text-center text-indigo-900 dark:text-white">
                    {filteredProducts.length > 0 ? "Não há produtos para esse filtro específico" : "Não há produtos disponíveis no momento."}
                  </p>
                )}
              </div>
            )}

            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-opacity-75">
                <div className="loader">
                  <ThreeDots
                    height="80"
                    width="80"
                    radius="9"
                    color="black"
                    ariaLabel="three-dots-loading"
                    visible={true}
                  />
                </div>
              </div>
            )}
          </div>
          <NewSaleModal isOpen={modalOpen} onClose={closeModal} product={product} customers={customers} updateMethod={() => fetchNecessaryData()} />
        </main>
      </div>
    </div>
  );
}
