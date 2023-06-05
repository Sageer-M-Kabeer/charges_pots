import React from 'react'
import {FaAngleLeft} from 'react-icons/fa'
import { Link } from "react-router-dom";
import {AiFillPicture} from 'react-icons/ai'
import {RiFileUserLine,RiBankLine} from 'react-icons/ri'
import {FaRegCommentAlt} from 'react-icons/fa'

const Recharge = () => {
  return (
    <div className="bg-[#f6f8f9] w-full h-screen">
        <div className="px-2 min-h-full">
            <div className="min-h-full">
                <div className="relative z-10 leading-[22px] text-center bg-white">
                    <div className='relative flex items-center justify-between h-20 w-full'>
                        <div className='left-0 top-0 bottom-0 flex  items-center absolute p-[16px] text-[14px] cursor-pointer'>
                            <Link to="/" >
                            <FaAngleLeft className='text-[#1989fa] text-3xl font-bold mr-2 relative inline-block'/>
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
                            <form>
                                  {/* input start */}
                                    <div className="relative overflow-visible mb-6  text-right text-[#969799] align-middle break-word ">
                                        <h4 className='text-center py-2 text-lg font-medium mb-4'>Upload Deposit Image Proof</h4>
                                        <div className="flex border-[#122149] items-center bg-[#1894b0] 
                                                    h-[85px] leading-[40px] py-0 px-[20px] rounded-[10px] text-[#]">
                                            <AiFillPicture className="mr-[1px] text-[#fff] my-[auto]" size={32}/>
                                            <input name="invite" type='file'
                                            className=" pl-[10px] w-[100%] pt-5 h-[85px] text-white bg-[#1895B0] border-none rounded-[10px] focus:outline-none" input/>
                                        </div>
                                    </div>
                                    {/* input end */}
                                     {/* input start */}
                                     <div className="relative overflow-visible mb-6  text-right text-[#969799] align-middle break-word ">
                                        <div className="flex border-[#122149] items-center bg-[#1894b0] 
                                                    h-[65px] leading-[40px] py-0 px-[20px] rounded-[10px] text-[#]">
                                            <RiFileUserLine className="mr-[1px] text-[#fff] my-[auto]" size={32}/>
                                            <input name="fullName" type='text' placeholder='Please enter full name' autoComplete="off"
                                        className=" pl-[10px] w-[100%] h-[45px] text-white bg-[#1895B0] border-none rounded-[10px] focus:outline-none"input/>
                                        </div>
                                    </div>
                                    {/* input end */}
                                    {/* input start */}
                                    <div className="relative overflow-visible mb-6  text-right text-[#969799] align-middle break-word ">
                                        <div className="flex border-[#122149] items-center bg-[#1894b0] 
                                                    h-[65px] leading-[40px] py-0 px-[20px] rounded-[10px] text-[#]">
                                            <RiBankLine className="mr-[1px] text-[#fff] my-[auto]" size={32}/>
                                            <input name="bankName" type='text' placeholder='bank name' autoComplete="off"
                                        className=" pl-[10px] w-[100%] h-[45px] text-white bg-[#1895B0] border-none rounded-[10px] focus:outline-none"input/>
                                        </div>
                                    </div>
                                    {/* input end */}
                                    {/* input start */}
                                    <div className="relative overflow-visible mb-6  text-right text-[#969799] align-middle break-word ">
                                        <div className="flex border-[#122149] items-center bg-[#1894b0] 
                                                    h-[65px] leading-[40px] py-0 px-[20px] rounded-[10px] text-[#]">
                                            <FaRegCommentAlt className="mr-[1px] text-[#fff] my-[auto]" size={32}/>
                                            <input name="fullName" type='text' placeholder='Please enter narration' autoComplete="off"
                                        className=" pl-[10px] w-[100%] h-[45px] text-white bg-[#1895B0] border-none rounded-[10px] focus:outline-none"input/>
                                        </div>
                                    </div>
                                    {/* input end */}

                                <div className="w-full bottom-2 left-auto right-auto">
                                    <button type='button' className="text-white block w-full h-14 bg-[rgb(24,149,176)] border-[rgb(24,149,176)] border-solid rounded-3xl text-lg py-2 px-20 ">Upload Proof</button>
                                </div>
                            </form>
                        </div>
                          
                </div>
            </div>





                {/* <div className='mt-[10px]'>
                    <div className='box-border  bg-white rounded-lg outline-none overflow-hidden my-0 mx-4'>
                        <div className='flex flex-wrap w-full box-border py-[10px] px-6 text-[14px] leading-[24px] bg-[#fff] outline-none'>
                            <div className='block m-0 p-0'>
                                <label className='text-[#323232] text-left mr-4  break-words'>Recharge Amount</label>
                            </div>
                            <div className='relative text-right flex-1 box-border break-words outline-none'>
                                <input type='text' inputMode='decimal' className='w-full min-w-0 box-border m-0 p-0 text-[#323232] bg-[#] outline-none '/>
                            </div>

                        </div>

                    </div>

                </div> */}
                

            </div>
        </div>
    </div>

  )
}

export default Recharge