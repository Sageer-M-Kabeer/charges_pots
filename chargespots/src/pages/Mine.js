import React, { useEffect, useState } from 'react';
import logo from '../assets/logo2.png'
import ButtomBar from '../components/BottomBar'
import { AiOutlineRight } from 'react-icons/ai'
import { AiOutlineCreditCard } from 'react-icons/ai'
import { TbReportMoney, TbReport } from 'react-icons/tb'
import { RiCustomerService2Line } from 'react-icons/ri'
import { MdOutlineLanguage } from 'react-icons/md'
import { GoSignOut } from 'react-icons/go'
import { VscRefresh } from 'react-icons/vsc'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { TbCurrencyNaira } from 'react-icons/tb'
import ErrorAlert from '../components/ErrorAlert';
import PopOver from '../components/PopOver'



const Mine = () => {

   const accessToken =  localStorage.getItem('token')
   console.log(accessToken)

    const [phoneNumber, setPhoneNumber] = useState('XXXXXXXXXXX');
  const [accountBalance, setAccountBalance] = useState(0);
  const [inviteCode, setInviteCode] = useState('XXXXXX');
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalIncomeToday, setTotalIncomeToday] = useState(0);
  const [errorMsg, setErrorMsg]=useState('')
  const [errorOccured, setErrorOccured] = useState(false)
  const [showModal,setShowModal] = useState(false)


  useEffect(() => {
    const fetchUserData = async () => {
        try {
          const response = await axios.get('https://queentest.com.ng/api/profile/', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`,
            },
            withCredentials: true, // Send cookies with the request
          });
      
          const userData = response.data;
          setPhoneNumber(userData.phone_number);
          setAccountBalance(userData.main_balance);
          setInviteCode(userData.code);
          setTotalIncome(userData.total_income);
          setTotalIncomeToday(userData.total_income_today)
        } catch (error) {
        //   console.error('Error fetching user data:', error);
          if (
            error.request &&
            error.request.response &&
            error.request.response.includes(
              "Your token has expired,login"  
            )) {
                window.location.href = "/login";
                setErrorOccured(true);
                setErrorMsg('Your token has expired, login again');
                localStorage.removeItem('token')
            }
                //
        }
      };

    fetchUserData();
  }, []);

    const handleReload = () => {
        window.location.reload();
    };

    const handleLogout = async () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        window.location.href = '/login';
       };

    return (
        <div className="bg-[#f6f8f9] w-full h-full">
            <div className="">
                <div className="py-8 px-4 min-h-full">
                {errorOccured ? <ErrorAlert title="Error Occured" text = {errorMsg}/>: null}

                    <div>
                        {/* card */}
                        <div className="relative  mb-8 bg-[#fff]  shadow-sm rounded-2xl">
                            <div className="p-8">
                                <div className="flex p-1">
                                    <div className=" w-12 h-12 ">
                                        <img className="w-full h-full" src={logo} alt="" />
                                    </div>
                                    <div className="flex-1 pl-3 flex-col justify-center">
                                        <div className="flex mb-8 justify-between h-6 leading-[24px] font-medium">
                                            <div>{phoneNumber}</div>
                                            <div>
                                                <button onClick={handleReload} type="button" className="text-white right-0 bg-[rgb(24,149,176)] h-[24px] p-2 text-center flex justify-center items-center text-lg font-bold rounded-md ">
                                                    <VscRefresh />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex justify-between h-6 leading-[24px] font-medium">
                                            <div>invitation code</div>
                                            <div className="text-[#1895b0] p-[4px,8px] w-20 rounded-md text-center bg-[rgb(24,149,176,.1)] ">
                                                {inviteCode}
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
                                        <div className="relative text-right text-[#969799] mb-2 overflow-hidden ">
                                             <span className='flex justify-center items-center'> <TbCurrencyNaira size={22}/>{accountBalance}</span></div>
                                    </div>
                                    <div className="flex relative box-border w-full p-[10px,16px] font-[500]  text-[#323232]  mb-2 text-[18px] leading-[24px]">
                                        <div className="flex-1 "> <span>Total income</span></div>
                                        <div className="relative text-right text-[#969799] mb-2 overflow-hidden ">
                                             <span className='flex justify-center items-center'> <TbCurrencyNaira size={22}/>{totalIncome}</span></div>
                                    </div>
                                    <div className="flex relative box-border w-full p-[10px,16px] font-[500]  text-[#323232] mb-2 text-[18px] leading-[24px]">
                                        <div className="flex-1 "> <span>Today income</span></div>
                                        <div className="relative text-right text-[#969799] overflow-hidden ">
                                             <span className='flex items-center justify-center'> <TbCurrencyNaira size={22}/>{totalIncomeToday}</span></div>
                                    </div>


                                </div>

                            </div>
                        </div>
                        {/* card */}
                        <div className="relative  mb-10 bg-[#fff]  shadow-sm rounded-2xl">
                            <div className="p-8 flex justify-between flex-col gap-4">
                                <Link to="/recharge-records" className="m-[0,16px] pt-3 overflow-hidden bg-white">
                                    <div className="flex relative box-border w-full p-[10px,16px] text-[#323232] text-[14px] leading-[24px]">
                                        <div className='text-lg items-center mr-2'> <TbReportMoney /> </div>
                                        <div className="flex-1 "> <span className="text-sm">Recharge Record</span></div>
                                        <div className="relative text-right text-[#969799] overflow-hidden "> <span className="text-sm"><AiOutlineRight /></span></div>
                                    </div>
                                    <hr className="w- text-gray-100 h-1 mt-2" />

                                </Link>
                                <Link to="/withdraw-records" className="m-[0,16px] pt-1 overflow-hidden bg-white">
                                    <div className="flex relative box-border w-full p-[10px,16px] text-[#323232] text-[14px] leading-[24px]">
                                        <div className='text-lg items-center mr-2'> <TbReportMoney /> </div>
                                        <div className="flex-1 "> <span className="text-sm">Withdrawal Record</span></div>
                                        <div className="relative text-right text-[#969799] overflow-hidden "> <span className="text-sm"><AiOutlineRight /></span></div>
                                    </div>

                                </Link>
                                <hr className="w- text-gray-100 h-1 mt-1" />

                                <Link to="/checkin-records" className="m-[0,16px] pt-1 overflow-hidden bg-white">
                                    <div className="flex relative box-border w-full p-[10px,16px] text-[#323232] text-[14px] leading-[24px]">
                                        <div className='text-lg items-center mr-2'> <TbReport /> </div>
                                        <div className="flex-1 "><span className="text-sm">Check in Record</span></div>
                                        <div className="relative text-right text-[#969799] overflow-hidden "> <span className="text-sm"><AiOutlineRight /></span></div>
                                    </div>

                                </Link>
                                <hr className="w- text-gray-100 h-1 mt-1" />

                                <Link to="/bind-card" className="m-[0,16px] pt-1 overflow-hidden bg-white">
                                    <div className="flex relative box-border w-full p-[5px,16px] text-[#323232] text-[14px] leading-[24px]">
                                        <div className='text-lg pt-[2px] items-center mr-2'> <AiOutlineCreditCard /> </div>
                                        <div className="flex-1 "> <span className="text-sm">Blind Bank Card</span></div>
                                        <div className="relative text-right text-[#969799] overflow-hidden "> <span className="text-sm"><AiOutlineRight /></span></div>
                                    </div>

                                </Link>
                                <hr className="w- text-gray-100 h-1 mt-1" />

                                <div  className="m-[0,16px] pt-1 overflow-hidden bg-white" onClick={() => setShowModal(!showModal)}>
                                {showModal ? <PopOver color="blue" /> : null}
                                    <div className="flex relative box-border w-full p-[10px,16px] text-[#323232] text-[14px] leading-[24px]">
                                        <div className='text-lg items-center mr-2'> <RiCustomerService2Line /> </div>
                                        <div className="flex-1 "> <span className="text-sm">Customer Service</span></div>
                                        <div className="relative text-right text-[#969799] overflow-hidden "> <span className="text-sm"><AiOutlineRight /></span></div>
                                    </div>

                                </div>
                                <hr className="w- text-gray-100 h-1 mt-1" />

                                <Link className="m-[0,16px] pt-2 overflow-hidden bg-white">
                                    <div className="flex relative box-border w-full p-[10px,16px] text-[#323232] text-[14px] leading-[24px]">
                                        <div className='text-lg pt-[2px] items-center mr-2'> <MdOutlineLanguage /> </div>
                                        <div className="flex-1 "> <span className="text-sm">Modern Language</span></div>
                                        <div className="relative text-right text-[#969799] overflow-hidden "> <span className="text-sm"><AiOutlineRight /></span></div>
                                    </div>

                                </Link>
                                <hr className="w- text-gray-100 h-1 mt-1" />

                                <Link className="m-[0,16px] pt-1 overflow-hidden bg-white" onClick={handleLogout}>
                                    <div className="flex relative box-border w-full p-[10px,16px] text-[#323232] text-[14px] leading-[24px]">
                                        <div className='text-lg pt-1 items-center mr-2'> <GoSignOut /> </div>
                                        <div className="flex-1 "> <span className="text-sm">Sign Out</span></div>
                                        <div className="relative text-right text-[#969799] overflow-hidden "> <span className="text-sm"><AiOutlineRight /></span></div>
                                    </div>
                                </Link>

                                <hr className="w- text-gray-100 h-1 mt-1" />

                            </div>
                        </div>
                    </div>
                </div>
                <ButtomBar />
            </div>
        </div>

    )
}

export default Mine