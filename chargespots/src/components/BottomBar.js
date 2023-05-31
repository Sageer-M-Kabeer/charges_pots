import React, { Component } from 'react'
import buy1 from '../assets/buy1.png'
import buy2 from '../assets/buy2.png'
import home1 from '../assets/home1.png'
import home2 from '../assets/home2.png'
import mine1 from '../assets/my1.png'
import mine2 from '../assets/my2.png'
import team1 from '../assets/group1.png'
import team2 from '../assets/group2.png'
import lease1 from '../assets/produce1.png'
import lease2 from '../assets/produce2.png'
import { useState } from 'react'
import {Link} from 'react-router-dom'

const  BottomBar = () => {
const [activeTab,setActiveTab] = useState(1);

const handleTabClick = (tabNumber) =>{
    setActiveTab(tabNumber);
}

    return (
      <div className="">
        <div className="z-50 fixed bottom-[0px] left-0 bg-[#fff] flex content-box w-full h-14 ">
            {/* start of tab */}
            <div className="flex flex-1 justify-center flex-col items-center leading-[1] text-[12px] cursor-pointer">
                <Link to="/" className=" mb-[4px] text-[22px] relative inline-block">
                    <div  className={`tab ${activeTab === 1 ? 'active':''}`}  onClick={() => handleTabClick(1)} >
                        <img className="h-[32px] block" src={activeTab === 1 ? home1:home2} alt="#" />
                    </div>
                  
                </Link>
                <div className="text-[] ">
                    <span>Home</span>
                </div>
            </div>
            {/* end of tab */}
             {/* start of tab */}
             <div className="flex flex-1 justify-center flex-col items-center leading-[1] text-[12px] cursor-pointer">
                <div className=" mb-[4px] text-[22px] relative inline-block">
                    <Link to="buy" className={`tab ${activeTab === 2 ? 'active':''}`}  onClick={() => handleTabClick(2)} >
                        <img className="h-[32px] block" src={activeTab === 2 ? buy1:buy2} alt="#" />
                    </Link>
                  
                </div>
                <div className="text-[] ">
                    <span>Buy</span>
                </div>
            </div>
            {/* end of tab */}
             {/* start of tab */}
             <div className="flex flex-1 justify-center flex-col items-center leading-[1] text-[12px] cursor-pointer">
                <div className=" mb-[4px] text-[22px] relative inline-block">
                    <Link to="lease" className={`tab ${activeTab === 3 ? 'active':''}`}  onClick={() => handleTabClick(3)} >
                        <img className="h-[32px] block" src={activeTab === 3 ? lease1:lease2} alt="#" />
                    </Link>
                  
                </div>
                <div className="text-[] ">
                    <span>Lease</span>
                </div>
            </div>
            {/* end of tab */}
             {/* start of tab */}
             <div className="flex flex-1 justify-center flex-col items-center leading-[1] text-[12px] cursor-pointer">
                <div className=" mb-[4px] text-[22px] relative inline-block">
                    <Link to="team" className={`tab ${activeTab === 4 ? 'active':''}`}  onClick={() => handleTabClick(4)} >
                        <img className="h-[32px] block" src={activeTab === 4 ? team1:team2} alt="#" />
                    </Link>
                  
                </div>
                <div className="text-[] ">
                    <span>Team</span>
                </div>
            </div>
            {/* end of tab */}
             {/* start of tab */}
             <div className="flex flex-1 justify-center flex-col items-center leading-[1] text-[12px] cursor-pointer">
                <div className=" mb-[4px] text-[22px] relative inline-block">
                    <Link to="mine" className={`tab ${activeTab === 5 ? 'active':''}`}  onClick={() => handleTabClick(5)} >
                        <img className="h-[32px] block" src={activeTab === 5 ? mine1:mine2} alt="#" />
                    </Link>
                  
                </div>
                <div className="text-[] ">
                    <span>Mine</span>
                </div>
            </div>
            {/* end of tab */}

        </div>


      </div>
    )
  }

export default BottomBar