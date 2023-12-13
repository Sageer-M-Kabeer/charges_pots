import React, { useState, useEffect } from 'react';
import { FaAngleLeft } from 'react-icons/fa'
import { Link } from "react-router-dom";
import te from '../assets/te.png'
import axios from 'axios';

const WithdrawalProofUpload = () => {

    const accessToken = localStorage.getItem('token');
    const [data, setData] = useState([])


    useEffect(() => {

        const fetchData = async () => {
          try {
            const response = await axios.get(
              'https://queentest.com.ng/account/uploaded/cashoutproof',
              {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`,
                },
                withCredentials: true, /** send with cookies **/
              }
            );
    
            const resp = response.data;
    
            if (resp) {
              setData(resp)
            } else {
              // Handle the case where the response data is not as expected
            //   setText('No Vip Found');
            }
    
            console.log(response);
          } catch (error) {
            console.error('Error fetching data:', error);
            // Handle the error, e.g., redirect to login or display an error message
          }
        };
    
        fetchData();
      }, [accessToken]);
    
    
    
    return (
        <div className="bg-[#f6f8f9] w-full h-full">
            <div className="">
                <div className="min-h-full">
                    <div className="relative z-10 leading-[22px] text-center bg-white">
                        <div className='relative flex items-center justify-between h-20 w-full'>
                            <div className='left-0 top-0 bottom-0 flex  items-center absolute p-[16px] text-[14px] cursor-pointer'>
                                <Link to="/" >
                                    <FaAngleLeft className='text-[#1989fa] text-3xl font-bold mr-2 relative inline-block' />
                                </Link>
                            </div>
                            <div className='max-w-[60%] my-0 mx-auto flex-1 text-center text-[#323232] font-[600] text-[16px]'>
                                cashout Proof Upload
                            </div>
                        </div>
                    </div>
                    <div className='w-[50] font-thin text-md py-2 px-8 flex justify-center items-center'>
                        Upload today's receipt to Extract
                        The system will randomly draw a reward of N50 to N100
                    </div>
                    <div className="max-w-[80%] mx-auto fixed z-10 bottom-2 left-0 right-0">
                        <Link to="/upload-cashouts"><button type='button' className="text-white block w-full h-14 bg-[rgb(24,149,176)]
                         border-[rgb(24,149,176)] border-solid rounded-3xl text-lg py-2 px-20 ">Upload Proof</button></Link>
                    </div>


                    {/* card */}
                    {data.map((proof, index) => (
                    <div key={index} className="relative  mb-8 bg-[#fff]  shadow-sm rounded-2xl">
                        <div className="p-2">
                            <div className='py-2 px-1 font-thin text-md'>
                                <h4>{proof.phone}</h4>

                            </div>
                            <div className='py-10 px-2'>
                                <img className='mx-auto w-[70%] h-[70%] rounded-lg' src={proof.image} alt='' />
                            </div>
                            <div className='font-thin text-sm py-1 px-2 mb-0'>
                                <p>{proof.feedback}</p>
                            </div>
                        </div>
                    </div>
                        ))}
                </div>
            </div>

        </div>

    )
}

export default WithdrawalProofUpload