import React, {useState,useEffect  } from 'react'
import BottomBar from '../components/BottomBar'
import Popup from '../components/PopUp'
import te from '../assets/te.png'
import te1 from '../assets/te1.jpeg'
import te2 from '../assets/te2.jpeg'
import te3 from '../assets/te3.jpeg'
import te4 from '../assets/te4.jpeg'
import te5 from '../assets/te5.jpeg'
import te6 from '../assets/te6.mp4'
import te7 from '../assets/te7.mp4'
import notice from '../assets/notice.png'
import thropy from '../assets/trophy.png'
import chaina from '../assets/chaina.png'
import india from '../assets/india.png'
import pakistan from '../assets/pakistan.png'
import ghana from '../assets/ghana.png'
import bangaladesh from '../assets/bangaladesh.png'
import nigeria from '../assets/nigeria.png'
import { FiDownload } from 'react-icons/fi'
import { TbCurrencyNaira } from 'react-icons/tb'
import { RiLuggageDepositFill } from 'react-icons/ri'
import { SlBulb } from 'react-icons/sl'
import { Link } from "react-router-dom";
import AlertDialog from '../components/Dialog'
import SuccessAlert from '../components/SuccessAlert'
import ErrorAlert from '../components/ErrorAlert'

import axios from 'axios';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination } from 'swiper';

SwiperCore.use([Autoplay, Pagination]);




export default function HomePage() {

  const [isLoggedin, setLoggin] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [errorOccured, setErrorOcured] = useState(false);
  const [errorMsg, setErrorMsg] = useState('')

  const accessToken = localStorage.getItem('token');


  useEffect(() => {
    const checkAccessToken = async () => {
      console.log(accessToken);
      if (accessToken) {
        setLoggin(prevState => !prevState);
      } else {
        setLoggin(false);
        window.location.href = '/login';
      }
    };

    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://queentest.com.ng/profile/leased-vips/',
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`,
            },
            withCredentials: true, /** send with cookies **/
          }
        );
        console.log(response);
      } catch (error) {
        // console.error('Error fetching VIP data:', error);
        if (
          error.request &&
          error.request.response &&
          error.request.response.includes(
            "Your token has expired,login"  
          )) {
              window.location.href = "/login";
              setErrorOcured(true);
              setErrorMsg('Your token has expired, login again');
              localStorage.removeItem('token')
          }
        // Handle the error, e.g., redirect to login or display an error message
      }
    };

    fetchData();
    checkAccessToken();
  }, []); 


  
  const CheckinUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://queentest.com.ng/account/checkin/',
        {},  // Empty data object if you don't need to send any data
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          withCredentials: true,
        }
      );

    const details = response.data;
    if(response.status === 201){
        console.log(details)
        setIsCheckedIn(true);
    }
    else if (response.status === 403){
        setErrorOcured(true);
        setErrorMsg("Your token has expired,login again");
        window.location.href = '/login'
    }
  } catch (error) {
    console.error('Error:', error.request.response.toString());
    setErrorOcured(true);
    setErrorMsg(error.request.response.toString());
    console.log(accessToken)
  }
};

  return (
    <div className="bg-[#f6f8f9] w-full h-full">
      <div className='flex justify-center items-center scroll-m-3 overflow-hidden'>
         {/* <Popup/> */}
      </div>
           
      {isCheckedIn ? <SuccessAlert title="Success!" text="User Checked in successfully. come back tomorrow" />: null}
      {errorOccured ? <ErrorAlert title="Error Occured!" text={errorMsg}/> : null}
      <div className="py-8 px-4 min-h-full">
        <Swiper
          className="swiper h-[200px] md:h-[480px] rounded-[20px] overflow-hidden translate-z-0 cursor-grab"
          autoplay={{ delay: 3000 }} // Adjust the delay as needed
          pagination={{ clickable: true }}
        >
          <SwiperSlide>
            <img className="w-full h-full mx-auto" src={te} alt='' />
          </SwiperSlide>
          <SwiperSlide>
            <img className="w-full h-full" src={te1} alt='' />
          </SwiperSlide>
          <SwiperSlide>
            <img className="w-full h-full" src={te2} alt='' />
          </SwiperSlide>
          <SwiperSlide>
            <img className="w-full h-full" src={te3} alt='' />
          </SwiperSlide>
          <SwiperSlide>
            <img className="w-full h-full" src={te4} alt='' />
          </SwiperSlide>
          <SwiperSlide>
            <img className="w-full h-full" src={te5} alt='' />
          </SwiperSlide>
        </Swiper>
        {/* swipper end */}
  
        {/* alert icon */}
        <div className="mx-2 h-[50px] mt-[20px] rounded-[16px] relative flex 
          items-center leading-[24px] text-[16px] bg-[#fff]">
          <i className="min-w-[24px] h-[24px] w-[24px] text-[20px] relative inline-block "><img src={notice} alt="" /> </i>
          <div className="flex flex-1 relative overflow-hidden items-center h-full">
            <marquee className="text-[#000] whitespace-nowrap transition-linear">+2348726722782  +2348045634567 
            +2347034567487 +23408132324570 +2348146745443 +2349163736737 +234704676774</marquee>
          </div>
        </div>

        {/* trophy */}
        <Link >
          <div className="p-[6px] mt-[10px] w-full h-[60px] bg-white rounded-[10px] flex items-center">
            <div className="ml-[10px] mt-[10px] "> <img className="w-[40px] 
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
            <Link to="pre-recharge" className="w-[48%] h-10 rounded-[10px] bg-white flex mt-[14px] p-[10px] items-center">
              <div className="w-[40%] h-[98%] rounded-lg text-white py-4 bg-[#1895b0] flex items-center justify-center">
                <TbCurrencyNaira />
              </div>
              <div className="flex flex-1 item-center pl-2 text-sm">
                Recharge
              </div>
            </Link>

            <Link to="withdraw" className="w-[48%] h-10 rounded-[10px] bg-white flex mt-[14px] p-[14px] items-center">
              <div className="w-[40%] h-[98%] rounded-lg py-4 text-white bg-[#1895b0] flex items-center justify-center">
                <RiLuggageDepositFill />
              </div>
              <div className="flex flex-1 item-center pl-2 text-sm">
                Withdraw
              </div>
            </Link>

            <Link to="precautions" className="w-[48%] h-10 rounded-[10px] bg-white flex mt-[14px] p-[10px] items-center">
              <div className="w-[40%] h-[98%] rounded-lg py-4 text-white bg-[#1895b0] flex items-center justify-center">
                <SlBulb />
              </div>
              <div className="flex flex-1 item-center pl-2 text-sm">
                Precautions
              </div>
            </Link>

            <Link to="get-app" className="w-[48%] h-10 rounded-[10px] bg-white flex mt-[14px] p-[10px] items-center">
              <div className="w-[40%] h-[98%] rounded-lg py-4 bg-[#1895b0] text-white flex items-center justify-center">
                <FiDownload />
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
          <button onClick={CheckinUser} className="block w-full rounded-xl py-2 h-[50%] text-[16px] 
          relative text-white bg-[rgb(24,149,176)]">Check in</button>
        </div>

        {/* videos box */}
       
        <div className="flex flex-col justify-center items-center mt-[20px] mb-[15px] w-full">
          <div className="text-[#333] p-[20px] text-[24px]">Video</div>
          {/* video card  */}
          <div className="my-[20px] flex flex-col justify-center mx-auto w-full bg-[#fff] rounded-[20px] ">
            <div className="p-[20px] font-xl text-md">Brand Test</div>
            <div className='mx-auto px-4 py-2 w-[90%] h-[90%] my-auto md:p-24 rounded-md flex justify-center items-center md:w-[80%] md:h-[100%]'>
               <video src={te6} controls></video>
            </div>
            <div className='mx-auto px-4 py-2 w-[90%] h-[90%] my-auto md:p-24 rounded-md flex justify-center items-center md:w-[80%] md:h-[1000%]'>
               <video src={te7} controls></video>
            </div>
          </div>

        </div>
        {/* Global Agency */}
        <div className="text-[24px] font-xl">
          Global Agency
        </div>
        {/* flag */}

        <div className="flex mt-8 mb-16 md:flex-1 flex-wrap p-8 gap-3 justify-center rounded-lg md:gap-2 bg-white relative">
          {/* flag card */}
          <div className="basis-1/4 border-box relative ml2">
            <div className="flex justify-center items-center flex-col h-full p-[16px,8px] bg-white">
              <div className="mb-[10px] text-[12px]">50k</div>
              <div className="h-[48px] relative inline-block"><img className="block w-full h-full" src={chaina} alt="" /></div>
              <div className="mt-[10px] text-[12px]">
                Chaina
              </div>
            </div>

          </div>
          {/* flag card */}
          <div className="basis-1/4 border-box relative ml2">
            <div className="flex justify-center items-center flex-col h-full p-[16px,8px] bg-white">
              <div className="mb-[10px] text-[12px]">125k</div>
              <div className="h-[48px] relative inline-block"><img className="block w-full h-full" src={india} alt="" /></div>
              <div className="mt-[10px] text-[12px]">
                India
              </div>
            </div>

          </div>
          {/* flag card */}
          <div className="basis-1/4 border-box relative ml2">
            <div className="flex justify-center items-center flex-col h-full p-[16px,8px] bg-white">
              <div className="mb-[10px] text-[12px]">76k</div>
              <div className="h-[48px] relative inline-block"><img className="block w-full h-full" src={pakistan} alt="" /></div>
              <div className="mt-[10px] text-[12px]">
                Pakistan
              </div>
            </div>

          </div>
          <div className="basis-1/4 border-box relative ml2">
            <div className="flex justify-center items-center flex-col h-full p-[16px,8px] bg-white">
              <div className="mb-[10px] text-[12px]">86k</div>
              <div className="h-[48px] relative inline-block"><img className="block w-full h-full" src={bangaladesh} alt="" /></div>
              <div className="mt-[10px] text-[12px]">
                Bangaladesh
              </div>
            </div>

          </div>
          <div className="basis-1/4 border-box relative ml2">
            <div className="flex justify-center items-center flex-col h-full p-[16px,8px] bg-white">
              <div className="mb-[10px] text-[12px]">107k</div>
              <div className="h-[48px] relative inline-block"><img className="block w-full h-full" src={nigeria} alt="" /></div>
              <div className="mt-[10px] text-[12px]">
                Nigeria
              </div>
            </div>

          </div>
          <div className="basis-1/4 border-box relative ml2">
            <div className="flex justify-center items-center flex-col h-full p-[16px,8px] bg-white">
              <div className="mb-[10px] text-[12px]">70k</div>
              <div className="h-[48px] relative inline-block"><img className="block w-full h-full" src={ghana} alt="" /></div>
              <div className="mt-[10px] text-[12px]">
                Ghana
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomBar />
    </div>
  )
}

