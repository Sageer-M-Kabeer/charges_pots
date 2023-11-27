import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { FaAngleLeft } from 'react-icons/fa'
import { TbCurrencyNaira } from 'react-icons/tb'
import { Link } from "react-router-dom";
import {useForm} from "react-hook-form";


const PreRecharge = () => {

        const {
          register,
          handleSubmit,
          reset,
          formState : { errors }
        }= useForm();

    const accessToken = localStorage.getItem('token');

    const [err, setErr] = useState('')
    const [accountBalance, setAccountBalance] = useState(0)


    const checkLength = (val) => val < 1000 ? true: false
    const checkEmpty = (val) => val === "" ? true: false

    // const handleChange = (e) => {
    //     setAmount(e.target.value)
    // }

    const [isLoggedin, setLoggin] = useState(false);

    useEffect(() => {
      const checkAccessToken = async () => {
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
          setLoggin(prevState => !prevState);
        } else {
          setLoggin(false);
          window.location.href = '/login';
        }
      };

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
          setAccountBalance(userData.main_balance);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

    //   eraseAmount()
      checkAccessToken();
      fetchUserData();
    }, [accessToken]); 

    const onSubmit = async (data, e) => {
        e.preventDefault();  
        window.location.href = `/recharge/${rechargeAmount}`;
    };

    const [rechargeAmount, setRechargeAmount] = useState('');

    const handleButtonClick = (amount) => {
        setRechargeAmount(amount.toString());
      };

    const handleChange = (e) => {
        setRechargeAmount(e.target.value);
    };

    return (
        <div className="bg-[#f6f8f9] w-full h-screen">
            <div className="px-2 min-h-full">
                <div className="min-h-full">
                    <div className="relative z-10 leading-[22px] text-center bg-white">
                        <div className='relative flex items-center justify-between h-20 w-full'>
                            <div className='left-0 top-0 bottom-0 flex  items-center absolute p-[16px] text-[14px] cursor-pointer'>
                                <Link to="/" >
                                    <FaAngleLeft className='text-[#1895b0] text-3xl font-bold mr-2 relative inline-block' />
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
                                <p>My current available balance <span className='text-[#cc1313]'><TbCurrencyNaira className='inline text-xl'/>{accountBalance}</span></p>
                            </div>


                        </div>
                    </div>
                    {/* card */}
                    <div className="relative mt-8 mb-8 bg-[#fff]  shadow-sm rounded-2xl">
                        <div className="p-8">
                            <div className='text-md font-thin py-2  w-full'>
                                <h4>Minimum deposit amount: <span className='text-[#1895b0]'>N3,000</span></h4>
                            </div>
                            <div>

                                <div className="flex flex-col p-4 gap-2">
                                    <div className='flex justify-center gap-2 p-2 md:justify-between'>
                                        <div onClick={(amount) => handleButtonClick(3000)}  className="w-24 cursor-pointer flex justify-center items-center rounded-md border-solid border-[#23232317] border-2  text-[#1895b0] py-2 px-5 hover:bg-[#1895b0] hover:border-0 hover:text-white">
                                            3000
                                        </div>
                                        <div onClick={(amount) => handleButtonClick(5000)} className="w-24 cursor-pointer  flex justify-center items-center rounded-md border-solid border-[#23232317] border-2  text-[#1895b0] py-2 px-5 hover:bg-[#1895b0] hover:border-0 hover:text-white">
                                            5000
                                        </div>
                                        <div onClick={(amount) => handleButtonClick(10000)} className="w-24 cursor-pointer  flex justify-center items-center rounded-md border-solid border-[#23232317] border-2  text-[#1895b0] py-2 px-5 hover:bg-[#1895b0] hover:border-0 hover:text-white">
                                            10000
                                        </div>

                                    </div>
                                    <div className='flex justify-center gap-2 p-2 md:justify-between'>
                                        <div onClick={(amount) => handleButtonClick(30000)} className="w-24 cursor-pointer flex justify-center items-center rounded-md border-solid border-[#23232317] border-2  text-[#1895b0] py-2 px-5 hover:bg-[#1895b0] hover:border-0 hover:text-white">
                                            30000
                                        </div>
                                        <div onClick={(amount) => handleButtonClick(50000)} className="w-24 cursor-pointer  flex justify-center items-center rounded-md border-solid border-[#23232317] border-2  text-[#1895b0] py-2 px-5 hover:bg-[#1895b0] hover:border-0 hover:text-white">
                                            50000
                                        </div>
                                        <div onClick={(amount) => handleButtonClick(100000)} className="w-24 cursor-pointer flex justify-center items-center rounded-md border-solid border-[#23232317] border-2  text-[#1895b0] py-2 px-5 hover:bg-[#1895b0] hover:border-0 hover:text-white">
                                            100000
                                        </div>

                                    </div>
                                    <div className='flex justify-center  md:justify-between gap-2 p-2'>
                                        <div onClick={(amount) => handleButtonClick(200000)} className="w-24 cursor-pointer flex justify-center items-center rounded-md border-solid border-[#23232317] border-2  text-[#1895b0] py-2 px-5 hover:bg-[#1895b0] hover:border-0 hover:text-white">
                                            200000
                                        </div>
                                        <div onClick={(amount) => handleButtonClick(500000)} className="w-24 cursor-pointer flex justify-center items-center rounded-md border-solid border-[#23232317] border-2  text-[#1895b0] py-2 px-5 hover:bg-[#1895b0] hover:border-0 hover:text-white">
                                            500000
                                        </div>
                                        <div onClick={(amount) => handleButtonClick(1500000)} className="w-24 cursor-pointer flex justify-center items-center rounded-md border-solid border-[#23232317] border-2  text-[#1895b0] py-2 px-5 hover:bg-[#1895b0] hover:border-0 hover:text-white">
                                            1500000
                                        </div>

                                    </div>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex justify-center items-center mt-2 w-full  rounded-md border-solid border-[#23232317] border-2">
                      <i className='p-2 text-[#1895b0]'><TbCurrencyNaira /> </i>
                      {/* Use the register function from react-hook-form */}
                      <input
                        {...register('amount', {
                          required: 'Amount is required',
                          validate: {
                            positive: (value) =>
                              parseFloat(value) > 0 || 'Amount must be positive',
                            min: (value) =>
                              parseFloat(value) >= 3000 || 'Minimum amount is N3,000',
                          },
                        })} name='amount' value={rechargeAmount} onChange={handleChange}
                        className='w-full py-2 pl-4  text-[#1895b0] outline-none'
                      />
                    </div>
                    <div className='flex justify-center items-center'>
                      {/* Use a regular button for form submission */}
                      <button
                        type="submit"
                        className='flex justify-center items-center mt-5 py-4 px-5 bg-[#1895b0] text-white rounded-lg font-light w-[80%]'
                      >
                        Confirm
                      </button>
                    </div>
                  </form>

                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>

    )
}

export default PreRecharge