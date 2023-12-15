import React, {useState,useEffect  } from 'react'
import ivip from '../assets/1st.jpg'
import ButtomBar from '../components/BottomBar'
import axios from 'axios';
import ErrorAlert from '../components/ErrorAlert';
import SuccessAlert from '../components/SuccessAlert';

const Buy = () => {
    const accessToken = localStorage.getItem('token');
  const [isLoggedin, setLoggedIn] = useState(false);
  const [vipSubscriptions, setVipSubscriptions] = useState([]);
  const [errorMsg, setErrorMsg]=useState('')
  const [errorOccured, setErrorOccured] = useState(false)
  const [success, setSuccess] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://queentest.com.ng/profile/vips/',
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`,
            },
            withCredentials: true, /** send with cookies **/
          }
        );

        const vipData = response.data;

        if (vipData) {
          setVipSubscriptions(vipData);
        } else {
          // Handle the case where the response data is not as expected
          console.error('Invalid response data structure');
        }

        console.log(response);
      } catch (error) {
        console.error('Error fetching VIP data:', error);
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
           
      }
    };

    fetchData();
  }, [accessToken]);

  const BuyVip = async (id) => {
    try {
        const response = await axios.post(
          'https://queentest.com.ng/profile/buy-vip/',{

            vip:id
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`,
            },
            withCredentials: true, /** send with cookies **/
          }
        );
        if (response.status === 201){
            setSuccess(true);
        }

        const buy = response.data;

        console.log(buy);

        console.log(response);
      } catch (error) {
        console.error('Error buying VIP:', error);
        if (
          error.request &&
          error.request.response &&
          error.request.response.includes(
            "Insufficient balance"  
          )){
            setErrorOccured(true);
            setErrorMsg("Insufficient balance to purchase this Vip recharge and try again. the page will refresh")

          }  
        // Handle the error, e.g., redirect to login or display an error message
      }

  }

  return (
<div className="bg-[#f6f8f9] w-full h-full">
    <div className="">
    {errorOccured ? <ErrorAlert title="Error Occured" text = {errorMsg}/>: null}
    {success ? <SuccessAlert title="Sucess" text ="Vip Level Purchase Successful"/>: null}
        <div className="py-8 px-4 min-h-full">
            {/* card */}
            {vipSubscriptions.map((subscription, index) => (
            <div key={index} className=" w-[80%] h-[80%] relative mx-auto mb-8 bg-[#fff]  shadow-sm rounded-2xl">
                <div className="p-8">
                    <div className="flex mb-8">
                        <div className="w-24 h-20 mr-2">
                            <img src={subscription.picture} alt="" />
                        </div>
                        <div className="flex-1 relative mb-3">
                            <div className="text-lg font-bold text-[#333] leading-relaxed overflow-hidden break-words ">
                                VIP LEVEL:{subscription.level}
                            </div>
                        </div>
                    </div>
                    <div className="flex mb-2 text-sm">
                        <div className="bg-[rgba(24,149,176,0.1)] mr-2 px-2 py-1 rounded-xl text-sm font-bold text-[#1895b0] leading-loose">{subscription.name}</div>
                    </div>
                    <div className="flex text-left justify-between p-3 rounded-md border-solid border-[#f1edfe] border-2">
                        <div className="w-[50%]">
                            <div className="text-lg text-[#333] font-semibold">Daily Return</div>
                            <div className="text-md text-[#333] font-semibold">N{subscription.daily_return}</div>
                        </div>
                        <div className="w-[50%]">
                            <div className="text-lg text-[#333] font-semibold">Total Revenue</div>
                            <div className="text-md text-[rgb(24,142,176)] font-semibold">N{subscription.total_revenue}</div>
                        </div>     
                    </div>
                    <div className='text-[#333] flex justify-between items-center pt-4'>
                        Current Price <span className="text-md text-[rgb(24,142,176)] font-semibold">N{subscription.price}</span>
                    </div>
                    <div className='text-[#333] flex justify-between items-center pt-1'>
                        Circle Days <span className="text-md text-[rgb(24,142,176)] font-semibold">{subscription.circle_days} Days</span>
                    </div>
                    <div className="w-full mt-4">
                    <button type='button' onClick={() => BuyVip(subscription.id)} 
                    className="text-white block w-full h-14 bg-[rgb(24,149,176)] border-[rgb(24,149,176)] border-solid rounded-3xl text-lg py-2 px-8 ">Buy</button>
                    </div>
                </div>
            </div>
            ))}
        </div>
        <ButtomBar/>
    </div>
</div>

  )
  }

export default Buy