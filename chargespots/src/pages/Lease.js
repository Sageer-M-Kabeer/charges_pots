import React from 'react'
import ivip from '../assets/1st.jpg'
import ButtomBar from '../components/BottomBar'

const Lease = () => {
  return (
<div className="bg-[#f6f8f9] w-full h-full">
    <div className="">
        <div className="py-8 px-4 min-h-full">

            {/* card */}
            <div className="relative  mb-8 bg-[#fff]  shadow-sm rounded-2xl">
                <div className="p-8">
                    <div className="flex mb-8">
                        <div className="w-24 h-20 mr-2">
                            <img src={ivip} alt="" />
                        </div>
                        <div className="flex-1 relative mb-3">
                            <div className="text-lg font-bold text-[#333] leading-relaxed overflow-hidden break-words ">
                                Vip level 1
                                <div className="flex mb-2 text-sm">
                                    <div className="bg-[rgba(24,149,176,0.1)] mt-8 mr-2 px-2 py-1 rounded-xl text-sm font-bold text-[#1895b0] leading-loose">Cycle sky 1</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="py-0 px-4">
                        <div className="text-lg text-[#b7b4c0] font-bold leading-3">Put in material</div>
                        <div className="p-1 text-md font-bold leading-2 text-[#333] ">raw material</div>
                        <div className="flex justify-around p-2 ">
                            <div className="border-solid leading-3 pt-3 w-full flex justify-between">
                                <div>Delivery Quantity</div>
                                <div>1</div>
                            </div>
                        </div>
                        <div className="flex justify-around p-2 ">
                            <div className="border-solid leading-3 pt-3 w-full flex justify-between">
                                <div>Production progress</div>
                                <div className="text-[#1895b0]">vip 1</div>
                            </div>
                        </div>
                        <div className="flex justify-around p-2 ">
                            <div className="border-solid leading-3 pt-3 w-full flex justify-between">
                                <div className="mb-4 relative rounded-md h-3 bg-[#ebebf0]">
                                    <div className="bg-green-500 py-2 px-4 rounded-md font-bold text-white">
                                        Done
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between">


                    <div className="flex mx-auto text-left justify-center p-3 rounded-md border-solid border-[#f1edfe] border-2">
                                            <div className="">
                                                <div className="text-lg text-[#333] font-semibold">Daily Return</div>
                                                <div className="text-md text-[#333] font-semibold">N500</div>
                                            </div>                       
                                            </div>
                                            <div className="flex mx-auto text-left justify-center p-3 rounded-md border-solid border-[#f1edfe] border-2">
                                            <div className="">
                                            <div className="text-lg text-[#333] font-semibold">Total Revenue</div>
                                                <div className="text-md text-[rgb(24,142,176)] font-semibold">N500</div>
                                            </div>                       
                                            </div>

                        </div>
                        

                    
                        
                    </div>
                    
                    {/* border-[#f1edfe] border-4  */}

                </div>
            </div>
        </div>
        <ButtomBar/>
    </div>
</div>

  )
  }

export default Lease