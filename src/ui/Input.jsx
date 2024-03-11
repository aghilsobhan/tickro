import React, { forwardRef } from "react";
const Input=forwardRef((props,ref)=>{
  return  <input className="block border border-gray-300 bg-gray-0 rounded-md py-1 px-2 shadow-sm max-w-56" {...props} ref={ref}/>
  
})
export default Input;
