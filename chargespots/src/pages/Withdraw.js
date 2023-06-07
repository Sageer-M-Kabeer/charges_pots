import React from 'react'
import { FaAngleLeft } from 'react-icons/fa'
import { Link } from "react-router-dom";

const Recharge = () => {
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
                                Withdraw
                            </div>
                        </div>
                    </div>
                    {/* card */}
                    <div className="relative mt-8 mb-8 bg-[#fff]  shadow-sm rounded-2xl">
                        <div className="p-8">



                            <div className='flex justify-between flex-col '>
                                <div className='flex justify-between flex-col mb-8'>
                                    <div className='text-lg mt-4 font-'>
                                        Withdraw Amount
                                    </div>
                                    <div className='mt-2 outline-none bg-slate-300 h-[40px] flex items-center py-2 px-4 rounded-md'>
                                        <div className=''>
                                            {/* <font>NAra</font> */}
                                            <input type='text' placeholder='enter amount' className='outline-none text-[#323232] bg-slate-300 px-2 rounded-md h-full w-full'></input>
                                        </div>
                                    </div>
                                    <div className='flex mt-5 justify-center items-center'>
                                        <button className='py-2 px-4 bg-[#1894b0]  text-white rounded-lg font-extralight w-[80%] mx-2 '>Confirm</button>
                                    </div>

                                </div>
                            </div>


                        </div>
                    </div>

                    {/* card */}
                    <div className="relative text-[#323232] mt-8 mb-8 bg-[#fff]  shadow-sm rounded-2xl">
                        <div className="p-8">
                            <div className='flex justify-between flex-col '>
                                <div className='flex justify-between flex-col mb-8'>
                                    <div className='font-light text-sm pb-4'>
                                        <div className='font-[500] mb-2 text-lg'>1.</div>
                                        Minimum withdrawal amount is 1000NGN. Same day withdrawals will be credited to your bank account within 72 hours.

                                    </div>
                                    <div className='font-light text-sm pb-4'>
                                        <div className='font-[500] mb-2 text-lg'>2.</div>
                                        Chargespots is subject to additional taxes and a withdrawal fee of 10% of the withdrawal amount.


                                    </div>
                                    <div className='font-light text-sm pb-4'>
                                        <div className='font-[500] mb-2 text-lg'>3.</div>
                                        Partners who have successfully withdrawn, don't forget to upload the receipt to get rewards
                                    </div>
                                    <div className='font-light text-sm pb-4'>
                                        <div className='font-[500] mb-2 text-lg'>4.</div>
                                        Withdrawal time: From Monday to Sunday, you can withdraw cash every day, and the withdrawal time is from 9:00am to 6:00pm
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

export default Recharge