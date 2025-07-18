import React from 'react'
import IconButton from './iconButton'

export default function ConfirmationModal({ modalData }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
  
      <div className="w-[90%] max-w-md rounded-md bg-[#161D29]  border border-[#424854] px-6 py-8 text-center shadow-lg space-y-6">
        

        <div>
          <p className="text-2xl font-semibold text-[#F1F2FF]">
            {modalData?.text1}
          </p>
          <p className="mt-2 text-sm text-[#838894]">
            {modalData?.text2}
          </p>
        </div>

      
        <div className="flex justify-center gap-4">
          <IconButton
            onClick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
            customClasses="bg-yellow-300 text-[#000814] px-6 py-2 rounded-md font-semibold hover:bg-yellow-400"
          />
          <button
            onClick={modalData?.btn2Handler}
            className="px-6 py-2 rounded-md bg-[#424854] text-[#999DAA] hover:bg-[#424854] font-medium transition-all cursor-pointer"
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  )
}
