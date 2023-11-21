import React, {useState,useEffect  } from 'react'
import ivip from '../assets/1st.jpg'
import ButtomBar from '../components/BottomBar'

const Buy = () => {
    const [isLoggedin, setLoggin] = useState(false);

  useEffect(() => {
    const checkAccessToken = async () => {
      const accessToken = localStorage.getItem('token');
      console.log(accessToken);
      if (accessToken) {
        setLoggin(prevState => !prevState);
      } else {
        setLoggin(false);
        window.location.href = '/login';
      }
    };

    checkAccessToken();
  }, []); 
  return (
<div className="bg-[#f6f8f9] w-full h-full">
    <div className="">
        <div className="py-8 px-4 min-h-full">
            {/* card */}
            <div className=" w-[80%] h-[80%] relative mx-auto mb-8 bg-[#fff]  shadow-sm rounded-2xl">
                <div className="p-8">
                    <div className="flex mb-8">
                        <div className="w-24 h-20 mr-2">
                            <img src={ivip} alt="" />
                        </div>
                        <div className="flex-1 relative mb-3">
                            <div className="text-lg font-bold text-[#333] leading-relaxed overflow-hidden break-words ">
                                Vip level 1
                            </div>
                        </div>
                    </div>
                    <div className="flex mb-2 text-sm">
                        <div className="bg-[rgba(24,149,176,0.1)] mr-2 px-2 py-1 rounded-xl text-sm font-bold text-[#1895b0] leading-loose">Cycle sky 1</div>
                    </div>
                    <div className="flex text-left justify-between p-3 rounded-md border-solid border-[#f1edfe] border-2">
                        <div className="w-[50%]">
                            <div className="text-lg text-[#333] font-semibold">Daily Return</div>
                            <div className="text-md text-[#333] font-semibold">N500</div>
                        </div>
                        <div className="w-[50%]">
                            <div className="text-lg text-[#333] font-semibold">Total Revenue</div>
                            <div className="text-md text-[rgb(24,142,176)] font-semibold">N500</div>
                        </div>     
                    </div>
                    <div className='text-[#333] flex justify-between items-center pt-4'>
                        Current price <span className="text-md text-[rgb(24,142,176)] font-semibold">N5000</span>
                    </div>
                    <div className="w-full mt-4">
                    <button type='button' className="text-white block w-full h-14 bg-[rgb(24,149,176)] border-[rgb(24,149,176)] border-solid rounded-3xl text-lg py-2 px-8 ">Buy</button>
                    </div>
                </div>
            </div>
        </div>
        <ButtomBar/>
    </div>
</div>

  )
  }

export default Buy