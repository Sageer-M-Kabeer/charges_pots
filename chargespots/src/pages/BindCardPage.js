import React, { useState, useEffect } from 'react';
import { FaAngleLeft } from 'react-icons/fa'
import { TbCurrencyNaira } from 'react-icons/tb'
import { Link } from "react-router-dom";

const BindCardPage = () => {

    const [isLoggedin, setLoggin] = useState(false);

  useEffect(() => {
    const checkAccessToken = async () => {
      const accessToken = localStorage.getItem('token');
      console.log(accessToken);
      if (accessToken) {
        setLoggin(prevState => !prevState);
      } else {
        setLoggin(false);
        window.location.href = '/login';
      }
    };

    checkAccessToken();
  }, []); 
  
    const [rechargeAmount, setRechargeAmount] = useState('');

    const handleButtonClick = (amount) => {
        setRechargeAmount(amount.toString());
    };

    return (
        <div className="bg-[#f6f8f9] w-full h-screen">
            <div className="px-2 min-h-full">
                <div className="min-h-full">
                    <div className="relative z-10 leading-[22px] text-center bg-white">
                        <div className='relative flex items-center justify-between h-20 w-full'>
                            <div className='left-0 top-0 bottom-0 flex  items-center absolute p-[16px] text-[14px] cursor-pointer'>
                                <Link to="/mine" >
                                    <FaAngleLeft className='text-[#1895b0] text-3xl font-bold mr-2 relative inline-block' />
                                </Link>
                            </div>
                            <div className='max-w-[60%] my-0 mx-auto flex-1 text-center text-[#323232] font-[600] text-[16px]'>
                                Bind bank
                            </div>
                        </div>
                    </div>
                    {/* card */}
                    <div className="relative mt-8 mb-8 bg-[#fff]  shadow-sm rounded-2xl">
                        <div className="p-8">
                            <div className="flex justify-between flex-col">
                                <div>
                                  Account Name
                                </div>
                                <div>
                                    <div className='mt-2 outline-none bg-slate-300 h-[40px] flex items-center py-2 px-4 rounded-md'>
                                        <div className=''>
                                            {/* <font>NAra</font> */}
                                            <input type='text' className='outline-none text-[#323232] bg-slate-300 px-2 rounded-md h-full w-full'></input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between flex-col mt-4">
                                <div>
                                    Bank Account Number
                                </div>
                                <div>
                                    <div className='mt-2 outline-none bg-slate-300 h-[40px] flex items-center py-2 px-4 rounded-md'>
                                        <div className=''>
                                            {/* <font>NAra</font> */}
                                            <input type='text' className='outline-none text-[#323232] bg-slate-300 px-2 rounded-md h-full w-full'></input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between flex-col mt-4">
                                <div>
                                    Bank Name
                                </div>
                                <div>
                                    <div className='mt-2 outline-none bg-slate-300 h-[40px] flex items-center py-2 px-4 rounded-md'>
                                        <div className=''>
                                            {/* <font>NAra</font> */}
                                            <input type='text' className='outline-none text-[#323232] bg-slate-300 px-2 rounded-md h-full w-full'></input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center items-center'>
                        <button className='py-2 px-4 bg-[#1894b0]  text-white rounded-lg font-extralight w-[80%] mx-2 '>Confirm</button>
                    </div>


                </div>
            </div>
        </div>

    )
}

export default BindCardPage