import React, {useState,useEffect  } from 'react'
import ButtomBar from '../components/BottomBar'
import { Link } from 'react-router-dom'
import axios from 'axios';


const Team = () => {
    const [isLoggedin, setLoggin] = useState(false);

    const accessToken = localStorage.getItem('token');
    const [numberofInvites, setNumberOfInvites] = useState('');
    //level one
    const [teamRecharge, setTeamRecharge] = useState('')
    const [referralCount, setReferralCount] = useState('')

    //level two
    const [levetwoteamRecharge, setleveltwoTeamRecharge] = useState('')
    const [leveltworeferralCount, setleveltwoReferralCount] = useState('')
 
    //level two
    const [levethreeteamRecharge, setlevelthreeTeamRecharge] = useState('')
    const [levelthreereferralCount, setlevelthreeReferralCount] = useState('')

    useEffect(() => {
      const checkAccessToken = async () => {
        console.log(accessToken);
        if (accessToken) {
          setLoggin(prevState => !prevState);
        } else {
          setLoggin(false);
          window.location.href = '/login';
        }
      };
      const fetchUserData = async () => {
        try {
          const response = await axios.get('https://queentest.com.ng/api/teams/', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`,
            },
            withCredentials: true, // Send cookies with the request
          });
      
          const userData = response.data;
          setNumberOfInvites(userData.nnumber_of_invites)
          //level one
          setTeamRecharge(userData.level_one_recharge_number)
          setReferralCount(userData.level_one_referral_count)

          //level two
          setleveltwoTeamRecharge(userData.level_two_recharge_number)
          setleveltwoReferralCount(userData.level_two_referral_count)

           //level two
           setlevelthreeTeamRecharge(userData.level_three_recharge_number)
           setlevelthreeReferralCount(userData.level_three_referral_count)
 



        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
      checkAccessToken();
      fetchUserData()
    }, []); 
    
  
    return (
        <div className="bg-[#f6f8f9] w-full h-full">
            <div className="">
                <div className="py-8 px-4 min-h-full">
                    <div className="flex justify-between bg-[#1895b0] p-2 mb-2 rounded-3xl">
                        <div className="text-[#1895b0] cursor-pointer bg-white flex items-center justify-center font-[400] w-32 text-lg rounded-xl py-1 px-1">
                            <Link>
                                My invitation
                            </Link>

                        </div>
                        <div className="cursor-pointer text-white ml-8 mx-auto flex items-center justify-center font-[400]w-32 text-lg rounded-xl py-3 px-2">
                            <Link to="/invite-friends">
                                Invite Friends
                            </Link>
                        </div>
                    </div>
                    <div>
                        {/* card */}
                        <div className="relative  mb-8 bg-[#fff]  shadow-sm rounded-2xl">
                            <div className="p-8">
                                <div className="flex justify-around">
                                    <div className="border-solid border-2 mx-2 border-[#f1edfe] rounded-md text-center flex w-32 flex-col justify-between mt-3 py-3 px-2">
                                        <div className="flex-1 text-md font-[400] leading-3 text-[#333]">
                                            Number Of Invites
                                        </div>
                                        <div className="mt-3 text-center text-[#1895b0] font-[400] leading-3 ">
                                        {numberofInvites}
                                        </div>

                                    </div>
                                    <div className="border-solid border-2 mx-2 border-[#f1edfe] rounded-md flex w-32 flex-col justify-between mt-3 py-3 px-2">
                                        <div className="flex-1 text-center text-md font-[400]leading-3 text-[#333]">
                                            Invitation Reward
                                        </div>
                                        <div className="mt-3 text-[#1895b0] text-center font-[400] leading-3 ">
                                            0
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                        {/* card */}
                        <div className="relative  mb-8 bg-[#fff]  shadow-sm rounded-2xl">
                            <div className="p-8">
                                <div className="flex justify-around">
                                    <div className=" border-solid border-2 mx-2 border-[#f1edfe] rounded-md flex w-32 flex-col justify-between mt-3 py-3 px-2">
                                        <div className="flex-1 text-center text-md font-[400] leading-3 text-[#333]">
                                            Team  Recharge
                                        </div>
                                        <div className="mt-3 text-center text-[#1895b0] font-[400] leading-3 ">
                                            N0
                                        </div>

                                    </div>
                                    <div className=" mx-2 border-[#f1edfe] rounded-md flex w-32 flex-col justify-between mt-3 py-3 px-2">
                                        <div className="flex-1 text-center text-md font-[400] leading-3 text-[#333]">
                                            Commissions
                                        </div>
                                        <div className="mt-3 text-[#1895b0] text-center font-[400] leading-3 ">
                                            N0
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                        {/* card */}
                        <div className="relative  mb-8 bg-[#fff]  shadow-sm rounded-2xl">
                            <div className="p-8">
                                <div className="font-bold text-[#333] text-lg ">
                                    Level One
                                </div>
                                <div className="m-[0,16px] pt-6 overflow-hidden bg-white">
                                    <div className="flex relative box-border w-full p-[20px,16px] text-[#323232] text-[14px] leading-[24px]">
                                        <div className="flex-1 "> <span>Number Of Invites</span></div>
                                        <div className="relative text-right text-[#969799] overflow-hidden "> <span>{referralCount}</span></div>
                                    </div>

                                </div>
                                <div className="m-[0,16px] pt-6 overflow-hidden bg-white">
                                    <div className="flex relative box-border w-full p-[20px,16px] text-[#323232] text-[14px] leading-[24px]">
                                        <div className="flex-1 "> <span>Recharge Number</span></div>
                                        <div className="relative text-right text-[#969799] overflow-hidden "> <span>{teamRecharge}</span></div>
                                    </div>

                                </div>
                                <div className="m-[0,16px] pt-6 overflow-hidden bg-white">
                                    <div className="flex relative box-border w-full p-[20px,16px] text-[#323232] text-[14px] leading-[24px]">
                                        <div className="flex-1 "> <span>Comissions</span></div>
                                        <div className="relative text-right text-[#969799] overflow-hidden "> <span>N0</span></div>
                                    </div>
                                </div>


                            </div>
                            <div className="p-8">
                                <div className="font-bold text-[#333] text-lg ">
                                    Level Two
                                </div>
                                <div className="m-[0,16px] pt-6 overflow-hidden bg-white">
                                    <div className="flex relative box-border w-full p-[20px,16px] text-[#323232] text-[14px] leading-[24px]">
                                        <div className="flex-1 "> <span>Number Of Invites</span></div>
                                        <div className="relative text-right text-[#969799] overflow-hidden "> <span>{leveltworeferralCount}</span></div>
                                    </div>

                                </div>
                                <div className="m-[0,16px] pt-6 overflow-hidden bg-white">
                                    <div className="flex relative box-border w-full p-[20px,16px] text-[#323232] text-[14px] leading-[24px]">
                                        <div className="flex-1 "> <span>Recharge Number</span></div>
                                        <div className="relative text-right text-[#969799] overflow-hidden "> <span>{levetwoteamRecharge}</span></div>
                                    </div>

                                </div>
                                <div className="m-[0,16px] pt-6 overflow-hidden bg-white">
                                    <div className="flex relative box-border w-full p-[20px,16px] text-[#323232] text-[14px] leading-[24px]">
                                        <div className="flex-1 "> <span>Comissions</span></div>
                                        <div className="relative text-right text-[#969799] overflow-hidden "> <span>N0</span></div>
                                    </div>
                                </div>


                            </div>
                            <div className="p-8">
                                <div className="font-bold text-[#333] text-lg ">
                                    Level Three
                                </div>
                                <div className="m-[0,16px] pt-6 overflow-hidden bg-white">
                                    <div className="flex relative box-border w-full p-[20px,16px] text-[#323232] text-[14px] leading-[24px]">
                                        <div className="flex-1 "> <span>Number Of Invites</span></div>
                                        <div className="relative text-right text-[#969799] overflow-hidden "> <span>{levelthreereferralCount}</span></div>
                                    </div>

                                </div>
                                <div className="m-[0,16px] pt-6 overflow-hidden bg-white">
                                    <div className="flex relative box-border w-full p-[20px,16px] text-[#323232] text-[14px] leading-[24px]">
                                        <div className="flex-1 "> <span>Recharge Number</span></div>
                                        <div className="relative text-right text-[#969799] overflow-hidden "> <span>{levethreeteamRecharge}</span></div>
                                    </div>

                                </div>
                                <div className="m-[0,16px] pt-6 overflow-hidden bg-white">
                                    <div className="flex relative box-border w-full p-[20px,16px] text-[#323232] text-[14px] leading-[24px]">
                                        <div className="flex-1 "> <span>Comissions</span></div>
                                        <div className="relative text-right text-[#969799] overflow-hidden "> <span>N0</span></div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
                <ButtomBar />
            </div>
        </div>

    )
}

export default Team