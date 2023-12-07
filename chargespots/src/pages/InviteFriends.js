import { useState,useEffect } from 'react'
import ivip from '../assets/1st.jpg'
import ButtomBar from '../components/BottomBar'
import { Link } from 'react-router-dom'
import axios from 'axios';


const InviteFriends = () => {

    const accessToken = localStorage.getItem('token');
    const [inviteCode, setInviteCode] = useState('')

    const copyToClipBoard = (e) => {
        navigator.clipboard.writeText(e).then(() => {
        }).catch(err => {
        //   console.error('Unable to copy text to clipboard', err);
        });
    }


    useEffect(() => {
        const checkAccessToken = async () => {
          // Check the access token
          if (accessToken) {
          } else {
            // Redirect to login if not logged in
            window.location.href = '/login';
          }
        };
    
        const fetchUserData = async () => {
          try {
            // Fetch user data using the access token
            const response = await axios.get('https://queentest.com.ng/api/profile/', {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
              },
              withCredentials: true,
            });
    
            const userData = response.data;
            setInviteCode(userData.code)
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
    
        checkAccessToken();
        fetchUserData();
      }, []);
    return (
        <div className="bg-[#f6f8f9] w-full h-full">
            <div className="">
                <div className="py-8 px-4 min-h-full">
                    <div className="flex justify-between bg-[#1895b0] p-2 mb-2 rounded-3xl">
                        <div className="text-white  cursor-pointer flex items-center justify-center font-[400] w-32 text-lg rounded-xl py-1 px-1">
                            <Link to="/team">
                                My invitation
                            </Link>

                        </div>
                        <div className=" bg-white  text-[#1895b0] ml-8 mx-auto flex items-center justify-center font-[400]w-32 text-lg rounded-xl py-3 px-2">
                            Invite Friends
                        </div>
                    </div>
                    <div>
                        <div className='mx-auto my-8 max-w-[100%] flex-col  flex justify-center items-center'>
                            <div className='flex justify-between gap-2 items-center'>
                                <span>My invitation code</span> <span onClick={copyToClipBoard} className='bg-[#1895b0] px-1 py-1 text-sm rounded-md text-white'>{inviteCode}</span>
                            </div>
                            <div onClick={copyToClipBoard} className='bg-[#1895b0] w-full  flex justify-center 
                            items-center px-12  text-center  py-3 rounded-md mt-4 text-white sm:px-auto sm:w-full sm:text-sm text-md'>
                                 https://charges-pots.com.ng/signup/{inviteCode}</div>
                        </div>
                        {/* card */}
                        <div className="relative text-[#323232] mt-8 mb-8 bg-[#fff]  shadow-sm rounded-2xl">
                            <div className="p-8">
                                <div className='flex justify-between flex-col '>
                                    <div className='flex justify-between flex-col mb-8'>
                                        <div className='font-light text-sm pb-4'>
                                            <div className='font-[500] mb-2 text-lg'>1.</div>
                                            You can use the invitation code to invite family and friends. Relatives and friends enter the invitation code of the inviter and become the first-level agent of the inviter. The chargespotsa agent will receive the fee commission of level 3, but the subordinates other than level 3 will not receive it commission.

                                        </div>
                                        <div className='font-light text-sm pb-4'>
                                            <div className='font-[500] mb-2 text-lg'>2.</div>
                                            Agency fees and example: When member A (inviter) invites member B (invitation and new member) to invest in charges-pots, member A gets an extra 10% commission from member
                                            (Invitation Reward)
                                            Level1 30%
                                            Level2 2%
                                            Level3 1%
\                                        </div>
                                        <div className='font-light text-sm pb-4'>
                                            <div className='font-[500] mb-2 text-lg'>3.</div>
                                            Tier 3 bonuses generated by members through participation in the charges-pots affiliate program are fully paid by chargespotsa.
                                        </div>
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

export default InviteFriends