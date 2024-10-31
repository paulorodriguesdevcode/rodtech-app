import { Product } from '@/app/types/product';
import { Tooltip } from 'react-tooltip';
import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import ProductIcon from './ProductIcon';

interface ItemSaleProps {
  isLoading: boolean;
  product: Product
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined
}

const ItemSale: React.FC<ItemSaleProps> = ({ isLoading, onClick, product: { name, saleValue, description, quantity, id, type } }) => {
  return isLoading ? (
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
  ) : (
    <div onClick={onClick} className='cursor-pointer  ' data-tooltip-id="my-tooltip" data-tooltip-content={description} key={id}>
      <div
        className='bg-gradient-to-r from-indigo-950 via-indigo-800 to-indigo-700 
      dark:from-black dark:via-indigo-950 dark:to-indigo-900 flex flex-col items-center text-left p-4 rounded-lg shadow-lg w-full h-full
      transition-transform duration-300 hover:scale-110'
      >
        <ProductIcon type={type} />
        <h6 className='text-white dark:text-white mt-2 truncate w-full'>{name}</h6>
        <h6 className='text-white dark:text-white truncate w-full'>
          <span className='font-semibold'>Valor: </span>{saleValue}
        </h6>
        <h6 className='text-white dark:text-white truncate w-full'>
          <span className='font-semibold'>Quantidade: </span>{quantity}
        </h6>
      </div>
      <Tooltip place='bottom' id="my-tooltip" />
    </div>
  )
};

export default ItemSale;
