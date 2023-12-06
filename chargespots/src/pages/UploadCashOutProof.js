import React, { useState, useEffect } from 'react'
import { FaAngleLeft } from 'react-icons/fa'
// import { TbCurrencyNaira } from 'react-icons/tb'
import { Link } from "react-router-dom";
import axios from 'axios';
import {useForm} from "react-hook-form";



const BindCardPage = () => {

    const [isLoggedin, setLoggin] = useState(false);
    const accessToken = localStorage.getItem('token');


    const {
        register,
        handleSubmit,
        reset,
        formState : { errors }
      }= useForm();
    
    const onSubmit = async (data,e) => {
        // e.preventDefault();

        try {
          // Fetch user data using the access token
          const response = await axios.post('https://queentest.com.ng/account/bank-details/', {
              tid: data.transcID,
              image:data.proof,
              feedback : data.feedback,
            }, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
              },
            withCredentials: true,
          });
  
          const details = response.data;
          if(response.status === 201){
              console.log(details)
              alert("success")
          }
          else{
              console.log(details)
          }
        } catch (error) {
          console.error('Error:', error.request.response.toString());
          console.log(data)
          alert("error occured "+ error.request.response.toString())
        }
      };
  
    useEffect(() => {
        const checkAccessToken = async () => {
          // Check the access token
          if (accessToken) {
            setLoggin(true);
          } else {
            setLoggin(false);
            // Redirect to login if not logged in
            window.location.href = '/login';
          }
        };
        checkAccessToken();
      }, [accessToken]);
  
 
    return (
        <div className="bg-[#f6f8f9] w-full h-screen">
            <div className="px-2 min-h-full">
                <div className="min-h-full">
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="relative z-10 leading-[22px] text-center bg-white">
                        <div className='relative flex items-center justify-between h-20 w-full'>
                            <div className='left-0 top-0 bottom-0 flex  items-center absolute p-[16px] text-[14px] cursor-pointer'>
                                <Link to="/withdrawal-proofs" >
                                    <FaAngleLeft className='text-[#1895b0] text-3xl font-bold mr-2 relative inline-block' />
                                </Link>
                            </div>
                            <div className='max-w-[60%] my-0 mx-auto flex-1 text-center text-[#323232] font-[600] text-[16px]'>
                                Upload Cashout Proof
                            </div>
                        </div>
                    </div>
                    {/* card */}
                    <div className="relative mt-8 mb-8 bg-[#fff]  shadow-sm rounded-2xl">
                        <div className="p-8">
                            <div className="flex justify-between flex-col">
                                <div>
                                  Transaction ID
                                </div>
                                <div>
                                    <div className='mt-2 outline-none bg-slate-300 h-[40px] flex items-center py-2 px-4 rounded-md'>
                                        <div className=''>
                                            <input  {...register('transcID', {
                                                required: 'proof is required',
                                                validate: {
                                                //   positive: (value) =>
                                                    // parseFloat(value) > 0 || 'Amount must be positive',
                                                //   min: (value) =>
                                                    // parseFloat(value) >= 3000 || 'Minimum amount is N3,000',
                                                },
                                              })}
                                            type='text' name ="transcID" className='outline-none text-[#323232] bg-slate-300 px-2 rounded-md h-full w-full'></input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between flex-col mt-4">
                                <div>
                                    Image Proof
                                </div>
                                <div>
                                    <div className='mt-2 outline-none bg-slate-300 h-[40px] flex items-center py-2 px-4 rounded-md'>
                                        <div className=''>
                                            <input  {...register('proof', {
                                                required: 'proof is required',
                                                validate: {
                                                //   positive: (value) =>
                                                    // parseFloat(value) > 0 || 'Amount must be positive',
                                                //   min: (value) =>
                                                    // parseFloat(value) >= 3000 || 'Minimum amount is N3,000',
                                                },
                                              })}
                                             type='file' name='proof' className='outline-none text-[#323232] bg-slate-300 px-2 rounded-md h-full w-full'></input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between flex-col mt-4">
                                <div>
                                    Feedback
                                </div>
                                <div>
                                    <div className='mt-2 outline-none bg-slate-300 h-[40px] flex items-center py-2 px-4 rounded-md'>
                                        <div className=''>
                                            <input  {...register('feedback', {
                                                required: 'feedback is required',
                                                validate: {
                                                //   positive: (value) =>
                                                    // parseFloat(value) > 0 || 'Amount must be positive',
                                                //   min: (value) =>
                                                    // parseFloat(value) >= 3000 || 'Minimum amount is N3,000',
                                                },
                                              })}
                                             type='text' name='feedback' className='outline-none text-[#323232] bg-slate-300 px-2 rounded-md h-full w-full'></input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                         
                         
                        </div>
                    </div>
                    <div className='flex justify-center items-center'>
                        <button className='py-2 px-4 bg-[#1894b0]  text-white rounded-lg font-extralight w-[80%] mx-2 '>Upload</button>
                    </div>
                    </form>

                </div>
            </div>
        </div>

    )
}

export default BindCardPage