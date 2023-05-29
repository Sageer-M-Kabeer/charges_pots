import React from 'react'
import ivip from '../assets/1st.jpg'
import ButtomBar from '../components/BottomBar'

const Mine = () => {
  return (
<div className="bg-[#f6f8f9] w-full h-full">
    <div className="">
        <div className="py-8 px-4 min-h-full">
            <div className="flex justify-between bg-[#1895b0] p-6 mb-4 rounded-3xl">
                <div className="text-[#1895b0] bg-white flex items-center justify-center font-bold w-32 text-lg rounded-xl py-3 px-2">
                    My invitation
                </div>
                <div className="text-white ml-8 mx-auto flex items-center justify-center font-bold w-32 text-lg rounded-xl py-3 px-2">
                    Invite friends
                </div>
            </div>
            <div>
                {/* card */}
                <div className="relative  mb-8 bg-[#fff]  shadow-sm rounded-2xl">
                    <div className="p-8">
                        <div className="flex justify-around">
                            <div className="border-solid border-2 mx-2 border-[#f1edfe] rounded-md text-center flex w-32 flex-col justify-between mt-3 py-3 px-2">
                                <div className="flex-1 text-md font-semibold leading-3 text-[#333]">
                                    Number of invites
                                </div>
                                <div className="mt-3 text-center text-[#1895b0] font-bold leading-3 ">
                                    0
                                </div>

                            </div>
                            <div className="border-solid border-2 mx-2 border-[#f1edfe] rounded-md flex w-32 flex-col justify-between mt-3 py-3 px-2">
                                <div className="flex-1 text-center text-md font-semibold leading-3 text-[#333]">
                                    invitation reward
                                </div>
                                <div className="mt-3 text-[#1895b0] text-center font-bold leading-3 ">
                                    0
                                </div>

                            </div>
                        </div>
                    
                    </div>
                </div>
                 {/* card */}
                 <div className="relative  mb-8 bg-[#fff]  shadow-sm rounded-2xl">
                    <div className="p-8">
                        <div className="flex justify-around">
                            <div className="mx-2 border-[#f1edfe] rounded-md text-center flex w-32 flex-col justify-between mt-3 py-3 px-2">
                                <div className="flex-1 text-md font-semibold leading-3 text-[#333]">
                                team recharge
                                </div>
                                <div className="mt-3 text-center text-[#1895b0] font-bold leading-3 ">
                                    N0
                                </div>

                            </div>
                            <div className=" mx-2 border-[#f1edfe] rounded-md flex w-32 flex-col justify-between mt-3 py-3 px-2">
                                <div className="flex-1 text-center text-md font-semibold leading-3 text-[#333]">
                                    commissions
                                </div>
                                <div className="mt-3 text-[#1895b0] text-center font-bold leading-3 ">
                                    N0
                                </div>

                            </div>
                        </div>
                    
                    </div>
                </div>
                {/* card */}
                <div className="relative  mb-8 bg-[#fff]  shadow-sm rounded-2xl">
                    <div className="p-8">
                        <div className="font-bold text-[#333] text-lg ">
                            Level one
                        </div>
                        <div className="m-[0,16px] pt-3 overflow-hidden bg-white">
                            <div className="flex relative box-border w-full p-[10px,16px] text-[#323232] text-[14px] leading-[24px]">
                                <div className="flex-1 "> <span>Number of invites</span></div>
                                <div className="relative text-right text-[#969799] overflow-hidden "> <span>0</span></div>
                            </div>

                        </div>
                        <div className="m-[0,16px] pt-3 overflow-hidden bg-white">
                            <div className="flex relative box-border w-full p-[10px,16px] text-[#323232] text-[14px] leading-[24px]">
                                <div className="flex-1 "> <span>Recharge number</span></div>
                                <div className="relative text-right text-[#969799] overflow-hidden "> <span>0</span></div>
                            </div>

                        </div>
                        <div className="m-[0,16px] pt-3 overflow-hidden bg-white">
                            <div className="flex relative box-border w-full p-[10px,16px] text-[#323232] text-[14px] leading-[24px]">
                                <div className="flex-1 "> <span>Comissions</span></div>
                                <div className="relative text-right text-[#969799] overflow-hidden "> <span>N0</span></div>
                            </div>
                        </div>
                    
                    
                    </div>
                    <div className="p-8">
                        <div className="font-bold text-[#333] text-lg ">
                            Secondary
                        </div>
                        <div className="m-[0,16px] pt-3 overflow-hidden bg-white">
                            <div className="flex relative box-border w-full p-[10px,16px] text-[#323232] text-[14px] leading-[24px]">
                                <div className="flex-1 "> <span>Number of invites</span></div>
                                <div className="relative text-right text-[#969799] overflow-hidden "> <span>0</span></div>
                            </div>

                        </div>
                        <div className="m-[0,16px] pt-3 overflow-hidden bg-white">
                            <div className="flex relative box-border w-full p-[10px,16px] text-[#323232] text-[14px] leading-[24px]">
                                <div className="flex-1 "> <span>Recharge number</span></div>
                                <div className="relative text-right text-[#969799] overflow-hidden "> <span>0</span></div>
                            </div>

                        </div>
                        <div className="m-[0,16px] pt-3 overflow-hidden bg-white">
                            <div className="flex relative box-border w-full p-[10px,16px] text-[#323232] text-[14px] leading-[24px]">
                                <div className="flex-1 "> <span>Comissions</span></div>
                                <div className="relative text-right text-[#969799] overflow-hidden "> <span>N0</span></div>
                            </div>
                        </div>
                    
                    
                    </div>
                    <div className="p-8">
                        <div className="font-bold text-[#333] text-lg ">
                            Level 3
                        </div>
                        <div className="m-[0,16px] pt-3 overflow-hidden bg-white">
                            <div className="flex relative box-border w-full p-[10px,16px] text-[#323232] text-[14px] leading-[24px]">
                                <div className="flex-1 "> <span>Number of invites</span></div>
                                <div className="relative text-right text-[#969799] overflow-hidden "> <span>0</span></div>
                            </div>

                        </div>
                        <div className="m-[0,16px] pt-3 overflow-hidden bg-white">
                            <div className="flex relative box-border w-full p-[10px,16px] text-[#323232] text-[14px] leading-[24px]">
                                <div className="flex-1 "> <span>Recharge number</span></div>
                                <div className="relative text-right text-[#969799] overflow-hidden "> <span>0</span></div>
                            </div>

                        </div>
                        <div className="m-[0,16px] pt-3 overflow-hidden bg-white">
                            <div className="flex relative box-border w-full p-[10px,16px] text-[#323232] text-[14px] leading-[24px]">
                                <div className="flex-1 "> <span>Comissions</span></div>
                                <div className="relative text-right text-[#969799] overflow-hidden "> <span>N0</span></div>
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