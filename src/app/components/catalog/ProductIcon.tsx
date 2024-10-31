import React from 'react';
import { BookOpen, Glasses, Shirt } from 'lucide-react';

const ProductIcon = ({ type }:{type:string}) => {
  switch(type) {
    case 'livro':
      return <BookOpen height={100} width={100} color='white' />;
    case 'acessorio':
      return <Glasses height={100} width={100} color='white' />;
    case 'roupa':
      return <Shirt height={100} width={100} color='white' />;
    default:
      return null;
  }
};

export default ProductIcon;
