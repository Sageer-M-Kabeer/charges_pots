import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ButtomBar from '../components/BottomBar';

const Lease = () => {
  const accessToken = localStorage.getItem('token');
  const [isLoggedin, setLoggedIn] = useState(false);
  const [vipSubscriptions, setVipSubscriptions] = useState([]);

  useEffect(() => {

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
        // Handle the error, e.g., redirect to login or display an error message
      }
    };

    fetchData();
  }, [accessToken]);

  return (
    <div className="bg-[#f6f8f9] w-full h-full">
      <div className="">
        <div className="py-8 px-4 min-h-full">
          {vipSubscriptions.map((subscription, index) => (
            <div key={index} className="relative mb-8 bg-[#fff] shadow-sm rounded-2xl">
              <div className="p-8">
                <div className="flex mb-8">
                  <div className="w-24 h-20 mr-2 ">
                    <img className="rounded-md" src={subscription.vip_image} alt="vip_image" />
                  </div>
                  <div className="flex-1 relative mb-3">
                    <div className="text-lg font-bold text-[#333] leading-relaxed overflow-hidden break-words ">
                      VIP LEVEL: {subscription.level}
                      <div className="flex mb-2 text-sm">
                        <div className="bg-[rgba(24,149,176,0.1)] mt-8 mr-2 px-2 py-1 rounded-xl text-sm font-bold text-[#1895b0] leading-loose">
                          {subscription.vip_name}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="py-0 px-4">
                  <div className="flex justify-around p-2 ">
                    <div className="border-solid leading-3 pt-3 w-full flex justify-between">
                      <div className="text-[#1895b0]">Price: <span className='font-bold'>{subscription.vip_price}</span></div>
                    </div>
                  </div>
                  {/* Other content */}
                  <div>Production progress</div>

                  <div className="flex justify-around p-2 ">
                    <div className="border-solid leading-3 pt-3 w-full flex justify-between">
                        <div className="mb-4 relative rounded-md h-3 bg-[#ebebf0]">
                           {subscription.is_expired.toString() === "false" ? <div className="bg-green-500 py-2 px-4 rounded-md font-bold text-white">In Circle</div>:<div className="bg-red-500 py-2 px-4 rounded-md font-bold text-white">Expired</div>}
                        </div>
                    </div>
                    </div>
                    <div className="flex justify-between">


                    <div className="flex mx-auto text-left justify-center p-3 rounded-md border-solid border-[#f1edfe] border-2">
                                    <div className="">
                                        <div className="text-lg text-[#333] font-semibold">Circle Days</div>
                                        <div className="text-md text-[#333] font-semibold">{subscription.current_circle_day}</div>
                                    </div>                       
                                    </div>
                                    <div className="flex mx-auto text-left justify-center p-3 rounded-md border-solid border-[#f1edfe] border-2">
                                    <div className="">
                                    <div className="text-lg text-[#333] font-semibold">Total Revenue</div>
                                        <div className="text-md text-[rgb(24,142,176)] font-semibold">{subscription.total_revenue}</div>
                                    </div>                       
                                    </div>
                    </div>  
                </div>
              </div>
            </div>
          ))}
        </div>
        <ButtomBar />
      </div>
    </div>
  );
};

export default Lease;





