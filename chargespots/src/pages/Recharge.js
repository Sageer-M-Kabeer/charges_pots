import React, { useState, useEffect } from 'react'
import { FaAngleLeft } from 'react-icons/fa'
import {useForm} from "react-hook-form";
import { Link,useParams  } from "react-router-dom";
import { IoIosCopy } from 'react-icons/io';
import { FaLock } from 'react-icons/fa'
import box from '../assets/box.png'
import sh from '../assets/sh.png'
import { TbCurrencyNaira } from 'react-icons/tb'
import axios from 'axios';



const Recharge = () => {

  
    const copyToClipBoard = (e) => {
    navigator.clipboard.writeText(e).then(() => {
    }).catch(err => {
    //   console.error('Unable to copy text to clipboard', err);
    });
}

    const {amount} = useParams();
    // console.log(amount)

    
    const {
        register,
        handleSubmit,
        reset,
        formState : { errors }
      }= useForm();

  const accessToken = localStorage.getItem('token');

  const [err, setErr] = useState('');
  const [accountBalance, setAccountBalance] = useState(0);
  const [narration, setNarration] = useState("");
  const [proof, setProof] = useState('')
  const [value, setValue] = useState('')


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
      

  //   eraseAmount()
    checkAccessToken();
  }, [accessToken]); 

//   const FormData = FormData();
//   FormData.append("amount", amount)
  
  const onSubmit = async (data) => {
    // e.preventDefault();  
    // alert('hi',narration)

    try {
      const formData = new FormData();
      formData.append('amount', amount);
      formData.append('proof', data.proof[0]); // Assuming you're handling a single file
      formData.append('narration', data.narration);
  
      const response = await axios.post(
        'https://queentest.com.ng/account/deposit/request/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Set content type to handle files
            'Authorization': `Bearer ${accessToken}`,
          },
          withCredentials: true, // Send cookies with the request
        }
      );

      if(response.status===201){
        // setErrorOccured(false);
        alert('Hurray')
      }
      console.log(response)
  
    } catch (error) {
      console.log(error.response.request.response.toString())
    //   console.log(error.request.response)
    //   if (
    //     error.request &&
    //     error.request.response &&
    //     error.request.response.includes(
    //       "A valid number is required"
    //     )
    //   ) {
    //     // setErrorOccured(true)
    //     // setErrorMsg("Please enter a valid amount not less than N1000")
    //   }
    //   else if (
    //     error.request &&
    //     error.request.response &&
    //     error.request.response.includes(
    //         "Bank details are required for withdrawal"
    //     )
        
    //   ) {
    //     // setErrorOccured(true)
    //     // setErrorMsg("Bank details are required for withdrawal, Upload your bank details in mine section and try again.")
    //   }
    //   else if (
    //     error.request &&
    //     error.request.response &&
    //     error.request.response.includes(
    //         "only 1000 and above is allowed for withdrawal"
    //     )
        
    //   ) {
    //     // setErrorOccured(true)
    //     // setErrorMsg("only N1000 and above is allowed for withdrawal")
    //   }

    //   else if (
    //     error.request &&
    //     error.request.response &&
    //     error.request.response.includes(
    //         "You must purchase a VIP level before making a withdrawal"
    //     )
        
    //   ) {
    //     // setErrorOccured(true)
    //     // setErrorMsg("You must purchase a VIP acquirement before making a withdrawal")
    //   }
    //   else if (
    //     error.message.includes("Network Error")
    //   ) {
    //     // setErrorOccured(true)
    //     // setErrorMsg("Network Error")
    //   }

    }
    // console.log('data:',data);

  };

  const [rechargeAmount, setRechargeAmount] = useState('');

  const handleButtonClick = (amount) => {
      setRechargeAmount(amount.toString());
    };

  const handleChange = (e) => {
      setNarration(e.target.value);
  };
  const handleFileChange  = (e) => {
    setProof(e.target.value);
  }


    return (
        <div className="bg-[#f6f8f9] w-full h-screen">
            <div className="px-2 min-h-full">
                <div className="min-h-full">
                    <div className="relative z-10 leading-[22px] text-center bg-white">
                        <div className='relative flex items-center justify-between h-20 w-full'>
                            <div className='left-0 top-0 bottom-0 flex  items-center absolute p-[16px] text-[14px] cursor-pointer'>
                                <Link to="/pre-recharge" >
                                    <FaAngleLeft className='text-[#42afce] text-3xl font-bold mr-2 relative inline-block' />
                                </Link>
                                <div className='flex items-center'>
                                    <img src={sh} alt='' className='h-24 w-24 pb-[22px]'></img>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative mt-1 mb-8 bg-[#fff]  shadow-sm rounded-2xl">
                        <div className="p-8">
                          
                            <div className='flex justify-between flex-col '>
                                        <div className="text-xl text-[#f38755] font-bold flex flex-row justify-center">
                                            <TbCurrencyNaira className='flex justify-center items-center text-3xl '/><font>{amount}</font>
                                        </div>
                                        <div className='flex mt-4 justify-center items-center'>
                                             <button disabled className='py-2 px-4 bg-[#42afce] 
                                             text-white rounded-full font-extralight w-[98%] mx-2 '>
                                                Bank transfer</button>
                                        </div>
                                        <div>
                                            <div className="text-[#363636] text-md font-semibold">
                                                Make Transfer</div>
                                        </div>
                                        <div className='mt-4'>
                                            Make transfer of <span className='text-[#f38755] font-semibold
                                            '><TbCurrencyNaira className='inline-flex justify-center items-center text-xl my-auto'/><font>{amount}</font></span> to the account
                                        </div>
                                <form onSubmit={handleSubmit(onSubmit)} method='POST'>
                                <div className='flex justify-between flex-col mb-8'>
                                       <div className='mt-3 outline-none bg-slate-300 h-[40px] flex items-center py-10 px-4 rounded-md'>
                                        <div className='flex items-center justify-between flex-1 flex-row'>
                                            {/* <font>NAra</font> */}
                                            <label className='text-[#323232] text-md w-full'>Account Number</label>
                                            <font className="text-[#42afce] font-bold text-md w-full">45676456434
                                             </font>
                                             <div className="text-[#e6a9b0] text-lg">
                                                <button><IoIosCopy className=""/></button>
                                                </div>
                                             
                                        </div>
                                    </div>
                                    <div className='mt-3 outline-none bg-slate-300 h-[40px] flex items-center py-10 px-4 rounded-md'>
                                        <div className='flex items-center justify-between flex-1 flex-row'>
                                            {/* <font>NAra</font> */}
                                            <label className='text-[#323232] text-md w-full'>Bank Name</label>
                                            <font className="text-[#42afce] font-bold text-md w-full">yty suui s yus i</font>
                                            <div className="text-[#e6a9b0] text-lg">
                                                <button onClick={copyToClipBoard('eyyuus')}><IoIosCopy className=""/></button>
                                                </div>
                                        </div>
                                    </div>
                                      <div className='mt-3 outline-none bg-slate-300 h-[40px] flex items-center py-10 px-4 rounded-md'>
                                        <div className='flex items-center justify-between flex-1 flex-row'>
                                            {/* <font>NAra</font> */}
                                            <label className='text-[#323232] text-md w-full'>Account Name</label>
                                            <font className="text-[#42afce] font-bold text-md w-full">yty suui s yus i</font>
                                            <div className="text-[#e6a9b0] text-lg">
                                                <button><IoIosCopy className=""/></button>
                                                </div>
                                        </div>
                                    </div>
                                    <div className='mt-3 outline-none bg-slate-300 h-[40px] flex items-center py-10 px-4 rounded-md'>
                                        <div className='flex flex-row flex-1 items-center justify-between'>
                                            <label className='text-[#323232] text-md w-full'>Payment Proof</label>
                                            <input type='file'
                                             {...register('proof', {
                                                required: 'proof is required',
                                                validate: {
                                                //   positive: (value) =>
                                                    // parseFloat(value) > 0 || 'Amount must be positive',
                                                //   min: (value) =>
                                                    // parseFloat(value) >= 3000 || 'Minimum amount is N3,000',
                                                },
                                              })} name='proof' value={proof} accept=".jpg, .jpeg, .png"   onChange={handleFileChange}
                                            className='outline-none text-[#42afce] text-sm bg-slate-300 px-2 py-4 rounded-md h-full w-full'></input>
                                        </div>
                                    </div>
                                    <div className='mt-3 outline-none bg-slate-300 h-[40px] flex items-center py-10 px-4 rounded-md'>
                                        <div className='flex flex-row flex-1 items-center justify-between'>
                                            {/* <font>NAra</font> */}
                                            <label className='text-[#323232] text-md w-full'>Sender Name</label>
                                            <input type='text' placeholder='Enter Full Name'
                                             {...register('narration', {
                                                required: 'Name is required',
                                                validate: {
                                                //   positive: (value) =>
                                                    // parseFloat(value) > 0 || 'Amount must be positive',
                                                //   min: (value) =>
                                                    // parseFloat(value) >= 3000 || 'Minimum amount is N3,000',
                                                },
                                              })} name='narration' value={narration} onChange={handleChange}
                                            className='outline-none text-[#42afce] placeholder:text-[#b0b0b0] 
                                            bg-slate-300 px-2 py-4 rounded-md h-full w-full'></input>
                                        </div>
                                    </div>
                                    <div className='mt-2'>
                                    <div className='flex mt-2 justify-center items-center'>
                                             <button type='submit' className='py-3 px-4 bg-[#42afce] 
                                             text-white rounded-full font-extralight w-[98%] mx-2 '>
                                                I have made the payment >> </button>
                                        </div>

                                    

                                        <div className='px-auto text-[#cc1313] w-[98%] py-2 text-center'>
                                            Please confirm your transaction immediately after you have sent it to avoid failure
                                        </div>
                                        <div className='px-auto text-[#cc1313] w-[98%] py-2 text-center'>
                                            Please upload the transaction payment proof to confirm transaction after it has between
                                            processed by the system
                                        </div>
                                        <div className='flex flex-1 items-center justify-center mt-8'>
                                            <img src={box} alt="" className='h-[60%] w-[60%]'></img>
                                        </div>
                                        <div className='px-auto text-[#c6c6c6c] w-[98%] py-2 text-center'>
                                           This payment method will be available soon
                                        </div>
                                        <div className='px-auto text-[#c6c6c6c] w-[98%] py-2 text-center'>
                                           If you hav any questions, connect us by email.
                                           <div className='px-4 flex flex-row items-scenter 
                                           justify-center text-[#c6c6c6c] w-[95%] py-1 text-center'>
                                           <span className='w-full text-sm h-full text-center'>Email address: shpayservices@gmail.com</span>
                                           <div className="text-[#f87e7e] text-sm">
                                                <button><IoIosCopy className=""/></button>
                                                </div>
                                        </div>
                                        </div>
                                        <div className=' mt-16 flex items-center justify-center'>
                                            <span><FaLock/></span> <font className="ml-4 font-normal text-sm">Secured by 
                                                <span className='font-bold text-md'> SHPAY</span></font>
                                        </div>
                                    </div>
                                </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Recharge