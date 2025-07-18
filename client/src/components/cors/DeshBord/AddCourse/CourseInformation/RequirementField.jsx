import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";

const RequirementField = ({ name, label, register, setValue, getValues, errors }) => {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);

  
  useEffect(() => {
    register(name, {
      required: true,
      validate: (value) => value.length > 0,
    });
  }, [name, register]);

 
  useEffect(() => {
    const existing = getValues(name);
    if (Array.isArray(existing)) setItems(existing);
  }, [getValues, name]);


  useEffect(() => {
    setValue(name, items);
  }, [items, name, setValue]);

  const addItem = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setItems((prev) => [...prev, trimmed]);
    setInput("");
  };

  const removeItem = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <label className="text-[#E5E7EB] font-medium">
        {label} <sup className="text-red-500">*</sup>
      </label>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter course requirements"
        className="w-full rounded-md bg-[#2C333F] px-4 py-2 text-[#F1F2FF] placeholder:text-[#999DAA] border border-[#424854] focus:outline-none"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addItem();
          }
        }}
      />

   
      {items.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {items.map((item, index) => (
            <span key={index} className="flex items-center gap-2 rounded-full bg-[#1F2430] px-3 py-1 text-xs text-gray-200">
              {item}
              <AiOutlineClose onClick={() => removeItem(index)} className="cursor-pointer hover:text-red-400 text-sm" />
            </span>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={addItem}
        className="flex items-center gap-1 text-[#FFD60A] text-sm hover:underline cursor-pointer"
      >
        <AiOutlinePlus />
        Add
      </button>

      {errors[name] && <span className="text-sm text-[#FF6B6B]">{label} is required</span>}
    </div>
  );
};

export default RequirementField;
