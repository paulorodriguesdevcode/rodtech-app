import React from "react";

interface ButtonProps {
  text?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  classType: "CANCEL" | "CONFIRM" | "WARNING" | "INFO";
  specialClass?: string;
  action?: "submit" | "reset" | "button" | undefined
}

export const ButtonType =  {
  CANCEL : "bg-red-600 text-white font-bold rounded-lg px-4 py-2",
  CONFIRM : "bg-gradient-to-tr  dark:from-indigo-950 dark:to-indigo-700 from-indigo-700 to-indigo-500 hover:from-indigo-500 hover:to-indigo-750 text-white font-bold rounded-lg px-4 py-2",
  WARNING : "bg-yellow-500 hover:bg-yellow-700 text-white font-bold rounded-lg px-4 py-2",
  INFO: "bg-gray-100 hover:bg-gray-200 text-black font-normal rounded-lg px-4 py-2"
}

const Button: React.FC<ButtonProps> = ({ text, onClick, classType, specialClass = "", action }) => {
  return (
    <button
      className={`${ButtonType[classType]} ${specialClass}`}
      onClick={onClick}
      type={action}
    >
      {text}
    </button>
  );
};

export default Button;
