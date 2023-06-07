import { Link } from '@mui/material'
import {BsWhatsapp} from 'react-icons/bs'
import {FaTelegramPlane} from 'react-icons/fa'
import React from 'react'

function CustomerService() {
  return (
    <div className='bg-[#f6f8f9] w-full h-full py-8 px-4'>
        <div className="mt-auto mx-auto p-4 justify-center gap-3 flex-row mb-8 bg-[#fff]  shadow-sm rounded-2xl">
         <div className='flex flex-re  justify-between '>
         <div>
            <Link>
            
            <div className=' w-28 flex justify-center bg-[#24ff1c] py-10 px-8 rounded-lg'>
                <i className='text-white px-0'><BsWhatsapp size={48}/></i>
            </div>
            </Link>
        </div>
        <div>
        <Link>
            <div className='w-28 flex justify-center  bg-[#1c77ff] py-10 px-8 rounded-lg'>
                <i className='text-white px-0'><FaTelegramPlane size={48}/></i>
            </div>
            </Link>
        </div>
       
         </div>
            
        </div>
        
    </div>
  )
}

export default CustomerService