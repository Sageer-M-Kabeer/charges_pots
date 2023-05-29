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

export class BottomBar extends Component {
  render() {
    return (
      <div className="">
        <div className="z-50 fixed bottom-[0px] left-0 bg-[#fff] flex content-box w-full h-14 ">
            {/* start of tab */}
            <div className="flex flex-1 justify-center flex-col items-center leading-[1] text-[12px] cursor-pointer">
                <div className="mb-[4px] text-[22px] relative inline-block">
                    <img className="h-[32px] block" src={home1} alt="#" />
                </div>
                <div className="text-[] ">
                    <span>Home</span>
                </div>
            </div>
            {/* end of tab */}
             {/* start of tab */}
             <div className="flex flex-1 justify-center flex-col items-center leading-[1] text-[12px] cursor-pointer">
                <div className="mb-[4px] text-[22px] relative inline-block">
                    <img className="h-[32px] block" src={buy2} alt="#" />
                </div>
                <div className="text-[] ">
                    <span>Buy</span>
                </div>
            </div>
            {/* end of tab */}
             {/* start of tab */}
             <div className="flex flex-1 justify-center flex-col items-center leading-[1] text-[12px] cursor-pointer">
                <div className="mb-[4px] text-[22px] relative inline-block">
                    <img className="h-[32px] block" src={lease2} alt="#" />
                </div>
                <div className="text-[] ">
                    <span>Lease</span>
                </div>
            </div>
            {/* end of tab */}
             {/* start of tab */}
             <div className="flex flex-1 justify-center flex-col items-center leading-[1] text-[12px] cursor-pointer">
                <div className="mb-[4px] text-[22px] relative inline-block">
                    <img className="h-[32px] block" src={team2} alt="#" />
                </div>
                <div className="text-[] ">
                    <span>Team</span>
                </div>
            </div>
            {/* end of tab */} {/* start of tab */}
            <div className="flex flex-1 justify-center flex-col items-center leading-[1] text-[12px] cursor-pointer">
                <div className="mb-[4px] text-[22px] relative inline-block">
                    <img className="h-[32px] block" src={mine2} alt="#" />
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
}

export default BottomBar