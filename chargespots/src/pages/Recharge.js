import React from 'react'
import { FaAngleLeft } from 'react-icons/fa'
import { Link } from "react-router-dom";
import CountdownTimer from '../components/CountdownTimer';
import { IoMdAdd } from 'react-icons/io'

const Recharge = () => {
    return (
        <div className="bg-[#f6f8f9] w-full h-screen">
            <div className="px-2 min-h-full">
                <div className="min-h-full">
                    <div className="relative z-10 leading-[22px] text-center bg-white">
                        <div className='relative flex items-center justify-between h-20 w-full'>
                            <div className='left-0 top-0 bottom-0 flex  items-center absolute p-[16px] text-[14px] cursor-pointer'>
                                <Link to="/pre-recharge" >
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
                                {/* Other components */}
                                <CountdownTimer />
                            </div>
                            <div className='flex justify-center items-center'>
                                <button className='py-2 px-4 bg-[#1894b0]  text-white rounded-lg z-[999] font-extralight fixed bottom-4 w-[80%] left-auto right-auto'>Send Request</button>
                            </div>
                            <div className='text-[#cc1313]'>
                                <p>*Tip: Please pay in strict accordance with the details provided below</p>
                            </div>


                        </div>
                    </div>
                    {/* card */}
                    <div className="relative mt-8 mb-8 bg-[#fff]  shadow-sm rounded-2xl">
                        <div className="p-8">
                            <div className='text-md font-light py-2  w-full'>
                                <h4> <span>Step1:</span> Long press and copy the bank details below</h4>
                            </div>
                            <div className='flex justify-between flex-col '>
                                <div className='flex justify-between flex-col mb-4'>
                                    <div className='text-sm font-thin'>
                                        Bank Name
                                    </div>
                                    <div className='flex justify-between items-center '>
                                        <span>Example bank ng</span>
                                        <button className='py-2 px-4 bg-[#1894b0]  text-white rounded-lg font-extralight'>copy</button>
                                    </div>

                                </div>
                                <div className='flex justify-between flex-col mb-4'>
                                    <div className='text-sm font-thin'>
                                        Account Name
                                    </div>
                                    <div className='flex justify-between items-center '>
                                        <span>example org hy629</span>
                                        <button className='py-2 px-4 bg-[#1894b0]  text-white rounded-lg font-extralight'>copy</button>
                                    </div>

                                </div>
                                <div className='flex justify-between flex-col mb-4'>
                                    <div className='text-sm font-thin'>
                                        Account Number
                                    </div>
                                    <div className='flex justify-between items-center '>
                                        <span>8545765855</span>
                                        <button className='py-2 px-4 bg-[#1894b0]  text-white rounded-lg font-extralight'>copy</button>
                                    </div>

                                </div>

                            </div>

                            <div className='text-md font-light py-2  w-full'>
                                <h4> <span>Step2:</span>Upload transfer alert screenshot</h4>
                            </div>
                            <div className='flex justify-between flex-col '>
                                <div className='flex justify-between flex-col mb-8'>
                                    <div className='text-sm font-thin'>
                                        Upload Proof
                                    </div>
                                    <div className='flex justify-between items-center mt mt-4'>

                                        <label className='bg-[#00000011] text-[#323232] text-lg p-12 rounded-lg' for="upload-photo"><IoMdAdd /></label>
                                        <input className='opacity-0 absolute z-[-1] ' type="file" name="photo" id="upload-photo" />
                                    </div>
                                    <div className='text-sm mt-4 font-thin'>
                                        Write narration that will help us to recognize your transaction easily.
                                    </div>
                                    <div className='mt-2 outline-none bg-slate-300 h-[40px] flex items-center py-2 px-4 rounded-md'>
                                        <div className=''>
                                            {/* <font>NAra</font> */}
                                            <input type='text' placeholder='write narration name' className='outline-none text-[#323232] bg-slate-300 px-2 rounded-md h-full w-full'></input>
                                        </div>
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