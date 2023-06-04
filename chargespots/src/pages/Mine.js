import React from 'react'
import logo from '../assets/logo2.png'
import ButtomBar from '../components/BottomBar'
import {AiOutlineRight} from 'react-icons/ai'
import {AiOutlineCreditCard} from 'react-icons/ai'
import {TbReportMoney,TbReport} from 'react-icons/tb'
import {RiCustomerService2Line} from 'react-icons/ri'
import {MdOutlineLanguage} from 'react-icons/md'
import {GoSignOut} from 'react-icons/go'
import { Link } from 'react-router-dom'


const Mine = () => {
  return (
<div className="bg-[#f6f8f9] w-full h-full">
    <div className="">
        <div className="py-8 px-4 min-h-full">
            
            <div>
                {/* card */}
                <div className="relative  mb-8 bg-[#fff]  shadow-sm rounded-2xl">
                    <div className="p-8">
                        <div className="flex p-2">
                            <div className=" w-14 h-14 ">
                                <img className="w-full h-full" src={logo} alt="" />
                            </div>
                            <div className="flex-1 pl-3 flex-col justify-center">
                                <div className="mb-[10px]text-md font-medium flex-1 text-[#333] gap-10  flex-row w-full overflow-hidden justify-between items-center">
                                    <div>
                                        8147354770
                                        <div>
                                        <button type="button" className="text-white bg-[rgb(24,149,176)] h-[24px] p-2 text-center flex justify-center items-center text-[10px] rounded-md ">
                                            refresh
                                        </button>
                                    </div>
                                    </div>
                                    

                                </div>
                                <div className="flex justify-between h-6 leading-[24px] font-medium">
                                    <div>invitation code</div>
                                    <div className="text-[#1895b0] p-[4px,8px] w-[40%] rounded-md text-center bg-[rgb(24,149,176,.1)] ">
                                    FJDYJS
                                </div>
                                </div>
                                

                            </div>

                        </div>
                    
                    </div>
                </div>
                 {/* card */}
                 <div className="relative  mb-8 bg-[#fff]  shadow-sm rounded-2xl">
                    <div className="p-8">
                        <div className="m-[0,16px] pt-3 overflow-hidden bg-white">
                            <div className="flex relative box-border w-full p-[10px,16px] font-[500] text-[#323232] mb-2 text-[18px] leading-[24px]">
                                <div className="flex-1 "> <span>Main Balance</span></div>
                                <div className="relative text-right text-[#969799] mb-2 overflow-hidden "> <span>0</span></div>
                            </div>
                            <div className="flex relative box-border w-full p-[10px,16px] font-[500]  text-[#323232]  mb-2 text-[18px] leading-[24px]">
                                <div className="flex-1 "> <span>Total income</span></div>
                                <div className="relative text-right text-[#969799] mb-2 overflow-hidden "> <span>0</span></div>
                            </div>
                            <div className="flex relative box-border w-full p-[10px,16px] font-[500]  text-[#323232] mb-2 text-[18px] leading-[24px]">
                                <div className="flex-1 "> <span>Today income</span></div>
                                <div className="relative text-right text-[#969799] overflow-hidden "> <span>0</span></div>
                            </div>


                        </div>
                    
                    </div>
                </div>
                {/* card */}
                <div className="relative  mb-10 bg-[#fff]  shadow-sm rounded-2xl">
                    <div className="p-8 flex justify-between flex-col gap-4">
                        <Link className="m-[0,16px] pt-3 overflow-hidden bg-white">
                            <div className="flex relative box-border w-full p-[10px,16px] text-[#323232] text-[14px] leading-[24px]">
                                <div className='text-2xl items-center mr-2'> <TbReportMoney/> </div>
                                <div className="flex-1 "> <span className="text-lg">Recharge Record</span></div>
                                <div className="relative text-right text-[#969799] overflow-hidden "> <span className="text-lg"><AiOutlineRight/></span></div>
                            </div>
                            <hr className="w- text-gray-100 h-1 mt-2"/>

                        </Link>
                        <Link className="m-[0,16px] pt-2 overflow-hidden bg-white">
                            <div className="flex relative box-border w-full p-[10px,16px] text-[#323232] text-[14px] leading-[24px]">
                                <div className='text-2xl items-center mr-2'> <TbReportMoney/> </div>
                                <div className="flex-1 "> <span className="text-lg">Withdrawal Record</span></div>
                                <div className="relative text-right text-[#969799] overflow-hidden "> <span className="text-lg"><AiOutlineRight/></span></div>
                            </div>

                        </Link>
                        <hr className="w- text-gray-100 h-1 mt-2"/>

                        <Link className="m-[0,16px] pt-2 overflow-hidden bg-white">
                            <div className="flex relative box-border w-full p-[10px,16px] text-[#323232] text-[14px] leading-[24px]">
                                <div className='text-2xl items-center mr-2'> <TbReport/> </div>
                                <div className="flex-1 "><span className="text-lg">Check in Record</span></div>
                                <div className="relative text-right text-[#969799] overflow-hidden "> <span className="text-lg"><AiOutlineRight/></span></div>
                            </div>

                        </Link>
                        <hr className="w- text-gray-100 h-1 mt-2"/>

                        <Link className="m-[0,16px] pt-2 overflow-hidden bg-white">
                            <div className="flex relative box-border w-full p-[10px,16px] text-[#323232] text-[14px] leading-[24px]">
                            <div className='text-2xl items-center mr-2'> <AiOutlineCreditCard/> </div>
                                <div className="flex-1 "> <span className="text-lg">Blind Bank Card</span></div>
                                <div className="relative text-right text-[#969799] overflow-hidden "> <span className="text-lg"><AiOutlineRight/></span></div>
                            </div>

                        </Link>
                        <hr className="w- text-gray-100 h-1 mt-2"/>

                        <Link className="m-[0,16px] pt-2 overflow-hidden bg-white">
                            <div className="flex relative box-border w-full p-[10px,16px] text-[#323232] text-[14px] leading-[24px]">
                                <div className='text-2xl items-center mr-2'> <RiCustomerService2Line/> </div>
                                <div className="flex-1 "> <span className="text-lg">Customer Service</span></div>
                                <div className="relative text-right text-[#969799] overflow-hidden "> <span className="text-lg"><AiOutlineRight/></span></div>
                            </div>

                        </Link>
                        <hr className="w- text-gray-100 h-1 mt-2"/>

                        <Link className="m-[0,16px] pt-2 overflow-hidden bg-white">
                            <div className="flex relative box-border w-full p-[10px,16px] text-[#323232] text-[14px] leading-[24px]">
                            <div className='text-2xl items-center mr-2'> <MdOutlineLanguage/> </div>
                                <div className="flex-1 "> <span className="text-lg">Modern Language</span></div>
                                <div className="relative text-right text-[#969799] overflow-hidden "> <span className="text-lg"><AiOutlineRight/></span></div>
                            </div>

                        </Link>
                        <hr className="w- text-gray-100 h-1 mt-2"/>

                        <Link className="m-[0,16px] pt-2 overflow-hidden bg-white">
                            <div className="flex relative box-border w-full p-[10px,16px] text-[#323232] text-[14px] leading-[24px]">
                            <div className='text-2xl items-center mr-2'> <GoSignOut/> </div>
                                <div className="flex-1 "> <span className="text-lg">Sign Out</span></div>
                                <div className="relative text-right text-[#969799] overflow-hidden "> <span className="text-lg"><AiOutlineRight/></span></div>
                            </div>
                        </Link>
                        <hr className="w- text-gray-100 h-1 mt-2"/>
                        
                    </div>
                </div>
            </div>
        </div>
        <ButtomBar/>
    </div>
</div>

  )
  }

export default Mine