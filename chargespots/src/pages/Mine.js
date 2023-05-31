import React from 'react'
import logo from '../assets/logo2.png'
import ButtomBar from '../components/BottomBar'
import {AiOutlineRight} from 'react-icons/ai'


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
                                <div className="mb-[10px]text-md font-bold text-[#333] w-full overflow-hidden justify-between items-center">
                                    <div>
                                        8147354770
                                        <div>
                                        <button type="button" className="text-white bg-[rgb(24,149,176)] h-[24px] p-2 text-center flex justify-center items-center text-[10px] rounded-md ">
                                            refresh
                                        </button>
                                    </div>
                                    </div>
                                    

                                </div>
                                <div className="flex justify-between h-6 leading-[24px] font-bold">
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
                            <div className="flex relative box-border w-full p-[10px,16px] text-[#323232] mb-2 text-[18px] leading-[24px]">
                                <div className="flex-1 "> <span>balance</span></div>
                                <div className="relative text-right text-[#969799] mb-2 overflow-hidden "> <span>0</span></div>
                            </div>
                            <div className="flex relative box-border w-full p-[10px,16px] text-[#323232]  mb-2 text-[18px] leading-[24px]">
                                <div className="flex-1 "> <span>Total income</span></div>
                                <div className="relative text-right text-[#969799] mb-2 overflow-hidden "> <span>0</span></div>
                            </div>
                            <div className="flex relative box-border w-full p-[10px,16px] text-[#323232] mb-2 text-[18px] leading-[24px]">
                                <div className="flex-1 "> <span>Today's income</span></div>
                                <div className="relative text-right text-[#969799] overflow-hidden "> <span>0</span></div>
                            </div>


                        </div>
                    
                    </div>
                </div>
                {/* card */}
                <div className="relative  mb-8 bg-[#fff]  shadow-sm rounded-2xl">
                    <div className="p-8">
                        <div className="m-[0,16px] pt-3 overflow-hidden bg-white">
                            <div className="flex relative box-border w-full p-[10px,16px] text-[#323232] text-[14px] leading-[24px]">
                                <div className="flex-1 "> <span className="text-lg">Contact Customer Service</span></div>
                                <div className="relative text-right text-[#969799] overflow-hidden "> <span className="text-lg"><AiOutlineRight/></span></div>
                            </div>

                        </div>
                        <div className="m-[0,16px] pt-3 overflow-hidden bg-white">
                            <div className="flex relative box-border w-full p-[10px,16px] text-[#323232] text-[14px] leading-[24px]">
                                <div className="flex-1 "> <span className="text-lg">Recharge record</span></div>
                                <div className="relative text-right text-[#969799] overflow-hidden "> <span className="text-lg"><AiOutlineRight/></span></div>
                            </div>

                        </div>
                        <div className="m-[0,16px] pt-3 overflow-hidden bg-white">
                            <div className="flex relative box-border w-full p-[10px,16px] text-[#323232] text-[14px] leading-[24px]">
                                <div className="flex-1 "> <span className="text-lg">Withdrawal Record</span></div>
                                <div className="relative text-right text-[#969799] overflow-hidden "> <span className="text-lg"><AiOutlineRight/></span></div>
                            </div>

                        </div>

                        <div className="m-[0,16px] pt-3 overflow-hidden bg-white">
                            <div className="flex relative box-border w-full p-[10px,16px] text-[#323232] text-[14px] leading-[24px]">
                                <div className="flex-1 "> <span className="text-lg">Check-in record</span></div>
                                <div className="relative text-right text-[#969799] overflow-hidden "> <span className="text-lg"><AiOutlineRight/></span></div>
                            </div>

                        </div>
                        <div className="m-[0,16px] pt-3 overflow-hidden bg-white">
                            <div className="flex relative box-border w-full p-[10px,16px] text-[#323232] text-[14px] leading-[24px]">
                                <div className="flex-1 "> <span className="text-lg">Bind bank card</span></div>
                                <div className="relative text-right text-[#969799] overflow-hidden "> <span className="text-lg"><AiOutlineRight/></span></div>
                            </div>

                        </div>
                        <div className="m-[0,16px] pt-3 overflow-hidden bg-white">
                            <div className="flex relative box-border w-full p-[10px,16px] text-[#323232] text-[14px] leading-[24px]">
                                <div className="flex-1 "> <span className="text-lg">language</span></div>
                                <div className="relative text-right text-[#969799] overflow-hidden "> <span className="text-lg"><AiOutlineRight/></span></div>
                            </div>

                        </div>
                        <div className="m-[0,16px] pt-3 overflow-hidden bg-white">
                            <div className="flex relative box-border w-full p-[10px,16px] text-[#323232] text-[14px] leading-[24px]">
                                <div className="flex-1 "> <span className="text-lg">Sign out</span></div>
                                <div className="relative text-right text-[#969799] overflow-hidden "> <span className="text-lg"><AiOutlineRight/></span></div>
                            </div>
                        </div>
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