import React from 'react'
import {FaAngleLeft} from 'react-icons/fa'
import { Link } from "react-router-dom";

const RechargeRecordPage = () => {
  return (
    <div className="bg-[#f6f8f9] w-full h-full">
    <div className="">
        <div className="min-h-full">
            <div className="relative z-10 leading-[22px] text-center bg-white">
                <div className='relative flex items-center justify-between h-20 w-full'>
                    <div className='left-0 top-0 bottom-0 flex  items-center absolute p-[16px] text-[14px] cursor-pointer'>
                        <Link to="/mine" >
                        <FaAngleLeft className='text-[#1989fa] text-3xl font-bold mr-2 relative inline-block'/>
                        </Link>
                    </div>
                    <div className='max-w-[60%] my-0 mx-auto flex-1 text-center text-[#323232] font-[600] text-[16px]'>
                        Recharge Records
                    </div>
                </div>
            </div>
            <div className='py-8 px-4 min-h-full'>
                <ul className='pt-10 font-[100] text-sm'>
                    <div className='flex justify-between gap-3'>
                        <li>08147354770-N1000-12-27-29:29 <span className='ml-4 rounded-md text-[#323232] bg-[rgba(37,176,24,0.1)] py-1 px-2 '>Success</span></li>
                    </div>
                    <div className='flex mt-4 justify-between gap-3'>
                        <li>08147354770-N1000-12-27-29:29 <span className='ml-4 rounded-md text-[#323232] bg-[rgba(176,24,24,0.1)] py-1 px-2 '>Failed</span></li>
                    </div>
                    
                </ul>
            </div>
            









        </div>
    </div>
</div>

  )
}

export default RechargeRecordPage