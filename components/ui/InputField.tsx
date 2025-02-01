import React from 'react'

const InputField = ({ text }: { text: string }) => {
  return (
   <> 
    <input type="text" className='py-1 border-blue-500/20 rounded-sm text-black justify-center items-center' placeholder={text} />
   </>
  )
}

export default InputField