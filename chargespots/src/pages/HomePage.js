import React, { Component,useState } from 'react'
import BottomBar from '../components/BottomBar'
import Popup from '../components/PopUp'
import te from '../assets/te.png'
import notice from '../assets/notice.png'
import thropy from '../assets/trophy.png'
import flg1 from '../assets/1.jpg'
import {FiDownload} from 'react-icons/fi'
import {TbCurrencyNaira} from 'react-icons/tb'
import {RiLuggageDepositFill} from 'react-icons/ri'
import {SlBulb} from 'react-icons/sl'
import { Link } from "react-router-dom";
import AlertDialog from '../components/Dialog'




export default function HomePage() {
   
    return (
      <div className="bg-[#f6f8f9] w-full h-full">
        <AlertDialog/>
        <div className="py-8 px-4 min-h-full">
          <div className="swipper h-[170px] rounded-[20px] overflow-hidden translate-z-0 cursor-grab">
            <div className="flex h-full "><img className="w-full h-full" src={te} alt=''/></div>
          </div>
          {/* swipper end */}
          <div className="indicators absolute left-[50%] flex -translate-y-2/4">
            <i className="w-[6px] h-[6px]  text-[#ebedf4] opacity-[.3] rounded-[100%]"></i>
            <i className="w-[6px] h-[6px] bg-[#1989fa] text-[#ebedf4] opacity-[.3] rounded-[100%]"></i>
            <i className="w-[6px] h-[6px]  text-[#ebedf4] opacity-[.3] rounded-[100%]"></i>
            <i className="w-[6px] h-[6px]  text-[#ebedf4] opacity-[.3] rounded-[100%]"></i>

          </div>
          {/* alert icon */}
          <div className="mx-2 h-[50px] mt-[20px] rounded-[16px] relative flex 
          items-center leading-[24px] text-[16px] bg-[#fff]">
            <i className="min-w-[24px] h-[24px] w-[24px] text-[20px] relative inline-block "><img src={notice} alt="" /> </i>
            <div className="flex flex-1 relative overflow-hidden items-center h-full">
              <marquee className="text-[#000] whitespace-nowrap transition-linear">Hello welcome to our flatform</marquee>
            </div>
          </div>

          {/* trophy */}
          <Link >
            <div className="p-[6px] mt-[10px] w-full h-[60px] bg-white rounded-[10px] flex items-center">
              <div className="ml-[10px] mt-[10px] "> <img  className="w-[40px] 
            h-[40px] aspect-[auto, 40/40]" src={thropy} alt="#" />
              
            </div>
            <div className="ml-[10px] font-xl text-sm "> Paid users</div>
            </div>
          </Link>
        
          {/* btn */}
          <div className="mt-[30px] ">
            
              <div className="title text-[24px] text-[#333] font-lg">Profit Member</div>
            <Link to="withdrawal-proofs">
              <button className="block w-full rounded-xl py-2 h-[50%] text-[16px] relative text-white bg-[rgb(24,149,176)]">Upload cashout proof</button>
            </Link>
          </div>
          
          {/* menu */}
          <div className="mt-[50px]">
            <ul className="flex justify-between flex-wrap">
              <Link to="recharge" className="w-[48%] h-10 rounded-[10px] bg-white flex mt-[14px] p-[10px] items-center">
                <div className="w-[40%] h-[98%] rounded-lg text-white py-4 bg-[#1895b0] flex items-center justify-center">
                 <TbCurrencyNaira/>
                </div>
                <div className="flex flex-1 item-center pl-2 text-sm">
                  Recharge
                </div>
              </Link>

              <Link className="w-[48%] h-10 rounded-[10px] bg-white flex mt-[14px] p-[14px] items-center">
                <div className="w-[40%] h-[98%] rounded-lg py-4 text-white bg-[#1895b0] flex items-center justify-center">
                  <RiLuggageDepositFill />
                </div>
                <div className="flex flex-1 item-center pl-2 text-sm">
                <a href="">Withdraw</a>
                </div>
              </Link>

              <Link className="w-[48%] h-10 rounded-[10px] bg-white flex mt-[14px] p-[10px] items-center">
                <div className="w-[40%] h-[98%] rounded-lg py-4 text-white bg-[#1895b0] flex items-center justify-center">
                <SlBulb/>
                </div>
                <div className="flex flex-1 item-center pl-2 text-sm">
                  Precautions
                </div>
              </Link>

              <Link className="w-[48%] h-10 rounded-[10px] bg-white flex mt-[14px] p-[10px] items-center">
                <div className="w-[40%] h-[98%] rounded-lg py-4 bg-[#1895b0] text-white flex items-center justify-center">
                    <FiDownload/>
                </div>
                <div className="flex flex-1 item-center pl-2 text-sm">
                  Get app
                </div>
              </Link>

            </ul>
          </div>

          {/* other btn */}
          <div className="mt-[30px] ">
            <div className="title text-[24px] text-[#333] font-lg">User checkin</div>
            <button className="block w-full rounded-xl py-2 h-[50%] text-[16px] relative text-white bg-[rgb(24,149,176)]">Check in</button>
          </div>

          {/* videos box */}
          <div className="mt-[20px] mb-[20px] w-full">
            <div className="text-[#333] p-[20px] text-[24px]">Video</div>
            <div className="my-[20px] w-full bg-white rounded-[20px] ">
              <div className="p-[20px] font-xl text-md">Brand Test</div>
              <div className="p-[20px]">
                <div className="max-w-full h-0 pt-[52.6px] xgplayer xgplayer-skin">
                  <video src="">hhbhb</video>
                </div>
              </div>
            </div>
          </div>
       
          <div className="mt-[20px] mb-[20px] w-full">
            <div className="text-[#333] p-[20px] text-[24px]">Video</div>
            {/* video card  */}
            <div className="my-[20px] w-full bg-white rounded-[20px] ">
              <div className="p-[20px] font-xl text-md">Brand Test</div>
              <div className="p-[20px]">
                <div className="max-w-full h-0 pt-[52.6px] xgplayer xgplayer-skin">
                  <video src="">hhbhb</video>
                </div>
              </div>
            </div>

            {/* video card  */}
            <div className="my-[20px] w-full bg-white rounded-[20px] ">
              <div className="p-[20px] font-xl text-md">Brand Test</div>
              <div className="p-[20px]">
                <div className="max-w-full h-0 pt-[52.6px] xgplayer xgplayer-skin">
                  <video src="">hhbhb</video>
                </div>
              </div>
            </div>

            {/* video card  */}
            <div className="my-[20px] w-full bg-white rounded-[20px] ">
              <div className="p-[20px] font-xl text-md">Brand Test</div>
              <div className="p-[20px]">
                <div className="max-w-full h-0 pt-[52.6px] xgplayer xgplayer-skin">
                  <video src="">hhbhb</video>
                </div>
              </div>
            </div>

            {/* video card  */}
            <div className="my-[20px] w-full bg-white rounded-[20px] ">
              <div className="p-[20px] font-xl text-md">Brand Test</div>
              <div className="p-[20px]">
                <div className="max-w-full h-0 pt-[52.6px] xgplayer xgplayer-skin">
                  <video src="">hhbhb</video>
                </div>
              </div>
            </div>

          </div>
          {/* Global Agency */}
          <div className="text-[24px] font-xl">
            Global Agency
          </div>
          {/* flag */}
          
          <div className="flex my-10 flex-wrap px-8 rounded-md gap-5 bg-white relative">
            {/* flag card */}
            <div className="basis-1/4 border-box relative ml2">
              <div className="flex justify-center items-center flex-col h-full p-[16px,8px] bg-white">
                <div className="mb-[10px] text-[12px]">50k</div>
                <div className="h-[48px] relative inline-block"><img className="block w-full h-full" src={flg1} alt="" /></div>
                <div className="mt-[10px] text-[12px]">
                chaina
              </div>
              </div>
             
            </div>
             {/* flag card */}
             <div className="basis-1/4 border-box relative ml2">
              <div className="flex justify-center items-center flex-col h-full p-[16px,8px] bg-white">
                <div className="mb-[10px] text-[12px]">50k</div>
                <div className="h-[48px] relative inline-block"><img className="block w-full h-full" src={flg1} alt="" /></div>
                <div className="mt-[10px] text-[12px]">
                chaina
              </div>
              </div>
             
            </div>
             {/* flag card */}
             <div className="basis-1/4 border-box relative ml2">
              <div className="flex justify-center items-center flex-col h-full p-[16px,8px] bg-white">
                <div className="mb-[10px] text-[12px]">50k</div>
                <div className="h-[48px] relative inline-block"><img className="block w-full h-full" src={flg1} alt="" /></div>
                <div className="mt-[10px] text-[12px]">
                chaina
              </div>
              </div>
             
            </div>
            <div className="basis-1/4 border-box relative ml2">
              <div className="flex justify-center items-center flex-col h-full p-[16px,8px] bg-white">
                <div className="mb-[10px] text-[12px]">50k</div>
                <div className="h-[48px] relative inline-block"><img className="block w-full h-full" src={flg1} alt="" /></div>
                <div className="mt-[10px] text-[12px]">
                chaina
              </div>
              </div>
             
            </div>

          </div>

        </div>

     

      <BottomBar/>
      </div>
    )
}

