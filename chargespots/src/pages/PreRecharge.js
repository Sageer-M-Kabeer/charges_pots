import React, { useState } from 'react';
import { FaAngleLeft } from 'react-icons/fa'
import { TbCurrencyNaira } from 'react-icons/tb'
import { Link } from "react-router-dom";

const PreRecharge = () => {

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
                                <Link to="/" >
                                    <FaAngleLeft className='text-[#1895b0] text-3xl font-bold mr-2 relative inline-block' />
                                </Link>
                            </div>
                            <div className='max-w-[60%] my-0 mx-auto flex-1 text-center text-[#323232] font-[600] text-[16px]'>
                                Recharge
                            </div>
                        </div>
                    </div>
                    {/* card */}
                    <div className="relative mt-8 mb-8 bg-[#fff]  shadow-sm rounded-2xl">
                        <div className="p-8">

                            <div>
                                <p>My current available balance <span className='text-[#cc1313]'>N30</span></p>
                            </div>


                        </div>
                    </div>
                    {/* card */}
                    <div className="relative mt-8 mb-8 bg-[#fff]  shadow-sm rounded-2xl">
                        <div className="p-8">
                            <div className='text-md font-thin py-2  w-full'>
                                <h4>Minimum deposit amount: <span className='text-[#1895b0]'>N5,000</span></h4>
                            </div>
                            <div>

                                <div className="flex flex-col p-4 gap-2">
                                    <div className='flex justify-center gap-2 p-2 md:justify-between'>
                                        <div onClick={() => handleButtonClick(3000)}  className="w-24 cursor-pointer flex justify-center items-center rounded-md border-solid border-[#23232317] border-2  text-[#1895b0] py-2 px-5 hover:bg-[#1895b0] hover:border-0 hover:text-white">
                                            3000
                                        </div>
                                        <div className="w-24 cursor-pointer  flex justify-center items-center rounded-md border-solid border-[#23232317] border-2  text-[#1895b0] py-2 px-5 hover:bg-[#1895b0] hover:border-0 hover:text-white">
                                            5000
                                        </div>
                                        <div className="w-24 cursor-pointer  flex justify-center items-center rounded-md border-solid border-[#23232317] border-2  text-[#1895b0] py-2 px-5 hover:bg-[#1895b0] hover:border-0 hover:text-white">
                                            10000
                                        </div>

                                    </div>
                                    <div className='flex justify-center gap-2 p-2 md:justify-between'>
                                        <div className="w-24 cursor-pointer flex justify-center items-center rounded-md border-solid border-[#23232317] border-2  text-[#1895b0] py-2 px-5 hover:bg-[#1895b0] hover:border-0 hover:text-white">
                                            30000
                                        </div>
                                        <div className="w-24 cursor-pointer  flex justify-center items-center rounded-md border-solid border-[#23232317] border-2  text-[#1895b0] py-2 px-5 hover:bg-[#1895b0] hover:border-0 hover:text-white">
                                            50000
                                        </div>
                                        <div className="w-24 cursor-pointer flex justify-center items-center rounded-md border-solid border-[#23232317] border-2  text-[#1895b0] py-2 px-5 hover:bg-[#1895b0] hover:border-0 hover:text-white">
                                            100000
                                        </div>

                                    </div>
                                    <div className='flex justify-center  md:justify-between gap-2 p-2'>
                                        <div className="w-24 cursor-pointer flex justify-center items-center rounded-md border-solid border-[#23232317] border-2  text-[#1895b0] py-2 px-5 hover:bg-[#1895b0] hover:border-0 hover:text-white">
                                            200000
                                        </div>
                                        <div className="w-24 cursor-pointer flex justify-center items-center rounded-md border-solid border-[#23232317] border-2  text-[#1895b0] py-2 px-5 hover:bg-[#1895b0] hover:border-0 hover:text-white">
                                            500000
                                        </div>
                                        <div className="w-24 cursor-pointer flex justify-center items-center rounded-md border-solid border-[#23232317] border-2  text-[#1895b0] py-2 px-5 hover:bg-[#1895b0] hover:border-0 hover:text-white">
                                            1500000
                                        </div>

                                    </div>

                                    <div className="flex justify-center items-center mt-2 w-full  rounded-md border-solid border-[#23232317] border-2">
                                        <i className='p-2 text-[#1895b0]'><TbCurrencyNaira /></i>
                                        <input className='w-full py-2 pl-4  text-[#1895b0] outline-none'></input>
                                    </div>
                                    <div className='flex justify-center items-center'>
                                        <Link to="/recharge" className='flex justify-center items-center py-4 px-5 bg-[#1895b0] text-white rounded-lg font-light w-[80%]'>
                                            <button type="number"
                                                value={rechargeAmount}
                                                typeof='decimal' 
                                                onChange={(e) => setRechargeAmount(e.target.value)}
                                                required>Confirm</button>
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>

    )
}

export default PreRecharge