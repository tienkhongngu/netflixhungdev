import React from "react";

interface inputProps{
    id: string;
    onChange: any;
    value: string;
    label: string;
    type: string;
}

const Input: React.FC<inputProps> = ({
    id,
    onChange,
    value,
    label,
    type
}) =>{

    return (
      <div className="relative">
        <input
         onChange={onChange}
         type={type}
         id={id}
          value={value}
          name="email"
          className="block rounded-md px-6 pt-6 pb-1 w-full text-white bg-neutral-700 appearance-none focus:outline-none focus:ring-0 peer"
          placeholder=" "
        />
        <label
          className="
              absolute 
              text-sm
              text-zinc-400 
              duration-150 
              transform 
              -translate-y-2
              scale-100
              top-4 
              z-10 
              left-6 
              peer-placeholder-shown:scale-100 
              peer-placeholder-shown:translate-y-0
              peer-focus:scale-75
              peer-focus:-translate-y-3
              origin-[0]"
          htmlFor={id}
        >
          {label}
        </label>
      </div>
    );
  };
  
  export default Input;
  