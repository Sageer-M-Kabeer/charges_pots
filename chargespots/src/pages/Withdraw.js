import React, { useState, useEffect } from 'react'
import { FaAngleLeft } from 'react-icons/fa'
import { Link } from "react-router-dom";
import axios from 'axios';
import SuccessAlert from '../components/SuccessAlert';
import ErrorAlert from '../components/ErrorAlert';


const Recharge = () => {

    const accessToken = localStorage.getItem('token');

    const [amount, setAmount] = useState('')
    const [isSent, setIsSent] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [errorOccured, setErrorOccured] = useState(false)
    const [accountBalance, setAccountBalance] = useState(0)
    // const []
    const [err, setErr] = useState('')

    const checkLength = (val) => val < 1000 ? true: false
    const checkEmpty = (val) => val === "" ? true: false

    const handleChange = (e) => {
        setAmount(e.target.value)
    }

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

  
      checkAccessToken();
      fetchUserData();
    }, [accessToken]); 

    const onSubmit = async (data, e) => {
        // e.preventDefault();  

        try {
          const response = await axios.post('https://queentest.com.ng/account/withdrawal/request/', {
            amount: amount,
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`,
            },
            withCredentials: true, // Send cookies with the request
          });
          if(response.status===201){
            setTimeout(() => {
              setErrorOccured(false);
            window.location.reload();
          }, 8000);
          }
          console.log(response)
      
        } catch (error) {
        //   console.log(error.response.request.response.toString())
          console.log(error.request.response)
          if (
            error.request &&
            error.request.response &&
            error.request.response.includes(
              "A valid number is required"
            )
          ) {
            setErrorOccured(true)
            setErrorMsg("Please enter a valid amount not less than N1000")
          }
          else if (
            error.request &&
            error.request.response &&
            error.request.response.includes(
                "Bank details are required for withdrawal"
            )
            
          ) {
            setErrorOccured(true)
            setErrorMsg("Bank details are required for withdrawal, Upload your bank details in mine section and try again.")
          }
          else if (
            error.request &&
            error.request.response &&
            error.request.response.includes(
                "only 1000 and above is allowed for withdrawal"
            )
            
          ) {
            setErrorOccured(true)
            setErrorMsg("only N1000 and above is allowed for withdrawal")
          }

          else if (
            error.request &&
            error.request.response &&
            error.request.response.includes(
                "Insufficient account balance for withdrawal"
            )
            
          ) {
            setErrorOccured(true)
            setErrorMsg("Insufficient account balance for withdrawal")
          }
          else if (
            error.request &&
            error.request.response &&
            error.request.response.includes(
                "You must purchase a VIP level before making a withdrawal"
            )
            
          ) {
            setErrorOccured(true)
            setErrorMsg("You must purchase a VIP acquirement before making a withdrawal")
          }
          else if (
            error.message.includes("Network Error")
          ) {
            setErrorOccured(true)
            setErrorMsg("Network Error")
          }
    
        }
        setIsSent(true)    
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
                                Withdraw
                            </div>
                        </div>
                    </div>
                    {isSent && !errorOccured ? <SuccessAlert title="Sent!" text="Withdrawal request sent successfully, The page will reload"/>:null}
                    {isSent && errorOccured ? <ErrorAlert title="Error Occured" text = {errorMsg}/>: null}
                    {/* card */}
                    <div className="relative mt-8 mb-8 bg-[#fff]  shadow-sm rounded-2xl">
                        <div className="p-8">

                            <div>
                                <p>Main balance <span className='text-[#cc1313]'>N{accountBalance}</span></p>
                            </div>



                            <div className='flex justify-between flex-col '>
                                <div className='flex justify-between flex-col mb-8'>
                                    <div className='text-lg mt-4 font-'>
                                        Withdraw Amount
                                    </div>
                                    <div className='mt-2 outline-none bg-slate-300 h-[40px] flex items-center py-2 px-4 rounded-md'>
                                        <div className=''>
                                            {/* <font>NAra</font> */}
                                            <input required onChange={handleChange}  value={amount} type='text' placeholder='enter amount' className='outline-none text-[#323232] bg-slate-300 px-2 rounded-md h-full w-full'></input>
                                        </div>
                                      
                                                            </div>
                                    <div className='flex mt-5 justify-center items-center'>
                                        <button onClick={onSubmit} className='py-2 px-4 bg-[#1894b0]  text-white rounded-lg font-extralight w-[80%] mx-2 '>Confirm</button>
                                    </div>
                                    <div className="text-center mb-3 text-sm p-2 text-[#ee0a24]">
                                            {isSent && checkEmpty(amount) && (<div className="errormsg">amount is required</div>)}
                                            {isSent && checkLength(amount) && (<div className="errormsg">you cannot withdraw less than N1000</div>)}
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>

                    {/* card */}
                    <div className="relative text-[#323232] mt-8 mb-8 bg-[#fff]  shadow-sm rounded-2xl">
                        <div className="p-8">
                            <div className='flex justify-between flex-col '>
                                <div className='flex justify-between flex-col mb-8'>
                                    <div className='font-light text-sm pb-4'>
                                        <div className='font-[500] mb-2 text-lg'>1.</div>
                                        Minimum withdrawal amount is 1000NGN. Same day withdrawals will be credited to your bank account within 72 hours.

                                    </div>
                                    <div className='font-light text-sm pb-4'>
                                        <div className='font-[500] mb-2 text-lg'>2.</div>
                                        Chargespots is subject to additional taxes and a withdrawal fee of 10% of the withdrawal amount.


                                    </div>
                                    <div className='font-light text-sm pb-4'>
                                        <div className='font-[500] mb-2 text-lg'>3.</div>
                                        Partners who have successfully withdrawn, don't forget to upload the receipt to get rewards
                                    </div>
                                    <div className='font-light text-sm pb-4'>
                                        <div className='font-[500] mb-2 text-lg'>4.</div>
                                        Withdrawal time: From Monday to Sunday, you can withdraw cash every day, and the withdrawal time is from 9:00am to 6:00pm
                                    </div>


                                </div>
                            </div>


                        </div>
                    </div>


                </div>
            </div>
        </div>

    )
}

export default Recharge