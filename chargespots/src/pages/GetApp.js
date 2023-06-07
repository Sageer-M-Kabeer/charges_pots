import React from 'react'
import CustomerService from '../components/CustomerService'
import { FaAngleLeft } from 'react-icons/fa'
import { Link } from "react-router-dom";

const GetApp = () => {
  return (
    <div className="bg-[#f6f8f9] w-full h-screen">
    <div className="px-2 min-h-full">
        <div className="min-h-full">
        <div className="relative z-10 leading-[22px] text-center bg-white">
                        <div className='relative flex items-center justify-between h-20 w-full'>
                            <div className='left-0 top-0 bottom-0 flex  items-center absolute p-[16px] text-[14px] cursor-pointer'>
                                <Link to="/" >
                                    <FaAngleLeft className='text-[#1895b0] text-3xl font-bold mr-2 relative inline-block' />
                                </Link>
                            </div>
                            <div className='max-w-[60%] my-0 mx-auto flex-1 text-center text-[#323232] font-[600] text-[16px]'>
                                Download App
                            </div>
                        </div>
                    </div>

            {/* card */}
            <div className="flex  mt-8 justify-center items-center  mb-8 bg-[#fff]  shadow-sm rounded-2xl">
                <div className="p-8">
                 <div className='text-center'>
                    The App is currently under development
                 </div>
                 <div className='text-center mt-2 text-[#323232] font-medium text-2xl'>
                    App Unavailable
                 </div>
                </div>
            </div>
        </div>
    </div>
</div>

  )
  }

export default GetApp