import React from 'react'
import CustomerService from '../components/CustomerService'

const GetApp = () => {
  return (
<div className="flex justify-center items-center bg-[#f6f8f9] w-full h-full">
    <div className="">
        <div className="py-8 px-4 min-h-full">

            {/* card */}
            <div className="flex  mt-auto mx-auto justify-center items-center  mb-8 bg-[#fff]  shadow-sm rounded-2xl">
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
        <CustomerService/>

    </div>
</div>

  )
  }

export default GetApp