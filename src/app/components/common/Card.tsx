import React from "react";
import { ThreeDots } from "react-loader-spinner";
import { Users } from 'lucide-react'
interface CardProps {
  title: string;
  value: string | JSX.Element;
  isLoading?: boolean;
}

const Card: React.FC<CardProps> = ({ title, value, isLoading }) => {
  return (
    <div className=" flex flex-col rounded-2xl bg-gradient-to-tr  dark:from-indigo-950 dark:to-indigo-700 from-indigo-700 to-indigo-500 text-white">
      <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr dark:from-indigo-950 dark:to-indigo-700 from-indigo-700 to-indigo-500 text-white  shadow-indigo-500/40 shadow-lg -mt-4 grid h-16 w-16 place-items-center">
      <Users />
      </div> 
      <div className="p-4 text-right">
        <p className="block">{title}</p>
        <h4 title="Carregando" className=" block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900 float-right">
          {isLoading ?
            <ThreeDots
              height="80"
              width="20"
              radius="9"
              color="black"
              ariaLabel="three-dots-loading"
              visible={true}
            />
            : value}
        </h4>
      </div>
    </div>
  );
};

export default Card;
