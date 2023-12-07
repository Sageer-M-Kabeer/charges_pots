import React, { useState, useEffect } from 'react';
import { FaAngleLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RechargeRecordPage = () => {
  const accessToken = localStorage.getItem('token');
  const [isLoggedin, setLoggin] = useState(false);
  const [value, setValue] = useState([]);

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

    const fetchUserData = async () => {
      try {
        // Fetch user data using the access token
        const response = await axios.get('http://3.91.225.206/account/transactions/deposits/', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          withCredentials: true,
        });

        const userData = response.data;
        setValue(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    checkAccessToken();
    fetchUserData();
  }, [accessToken]);

  return (
    <div className="bg-[#f6f8f9] w-full h-screen">
    <div className="">
        <div className="min-h-full">
            <div className="relative z-10 leading-[22px] text-center bg-white">
                <div className='relative flex items-center justify-between h-20 w-full'>
                    <div className='left-0 top-0 bottom-0 flex  items-center absolute p-[16px] text-[14px] cursor-pointer'>
                        <Link to="/mine" >
                        <FaAngleLeft className='text-[#1989fa] text-3xl font-bold mr-2 relative inline-block'/>
                        </Link>
                    </div>
                    <div className='max-w-[80%] my-0 mx-auto flex-1 text-center text-[#323232] font-[600] text-[16px]'>
                        Recharge Records
                    </div>
                </div>
            </div>
      <div className='w-screen flex items-center justify-center py-2 px-6 min-h-full'>
        <ul className='font-[100] text-sm'>
          {value.map((record, index) => (
            <div key={index} className='flex flex-1 mt-4'>
              <li className='flex items-center justify-center flex-1 gap-2 md:gap-3'><span>{record.transaction_type}</span><span>N{record.amount}</span> <span> {record.timestamp}:</span>
                <span className={`ml-2 rounded-md py-1 px-2 font-semibold ${
                  record.status === 'approved' ? 'bg-[rgba(37,176,24,0.1)]' :
                  record.status === 'failed' ? 'bg-[rgba(176,24,24,0.1)]' :
                  record.status === 'pending' ? 'bg-[rgba(252,255,82,0.95)]' : ''
                }`}>{record.status}</span>
              </li>
            </div>
          ))}
        </ul>
      </div>
    
      </div>
    </div>
</div>
  );
};

export default RechargeRecordPage;
