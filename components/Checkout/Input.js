import React from 'react'

export default function Input({type,label,name,placeholder,error,inputVal,setValue,node}) 
{   
    return (
    <div className='relative mt-[1rem] grow'>
        <label 
            htmlFor={name}
            className='absolute z-[2] text-[.8rem] text-[#6e6d66] left-[.5rem] top-[.2rem]'
        >{label}</label>
        <input 
            type={type} 
            id={name}
            className={`pt-[1.2rem] pb-[.5rem] pl-[.5rem] w-[100%] rounded-[.3rem] bg-[#f5f2e3] border border-border outline-none relative z-[1] 
            ${!error ? 
            'focus:border-[transparent] focus:shadow-[0px_0px_0px_2px_#000] transition-[box-shadow] duration-300' 
            : 
            'shadow-[0px_0px_0px_2px_#e22120] border-[transparent]'}`}
            placeholder={placeholder}
            value={inputVal}    
            onInput={
                setValue && (e=>{
                    setValue(e.target.value);
                })
            }
            ref={node}
        />
        {
            error && <div className='text-[.9rem] mt-[.5rem] text-[#e22120] text-[500]'>{error}</div>
        }        
    </div>
  )
}
