import React from 'react'
import { FaAngleLeft } from 'react-icons/fa'
import { Link } from "react-router-dom";

const Precautions = () => {
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
                                Common problem
                            </div>
                        </div>
                    </div>
                    {/* card */}
                    <div className="relative mt-8 mb-8 bg-[#fff]  shadow-sm rounded-2xl">
                        <div className="p-8">
                            <div className='flex justify-between flex-col '>
                                <div className='flex justify-between flex-col gap-2 mb-8'>
                                    <details>
                                        <summary>
                                        What is chargespotsa?
                                        </summary>
                                        
                                        <p className='text-md font-extralight '>chargespotsa is the platform for chargespot to enter the Nigeria market. ChargeSpot was established in Hong Kong in 2017, and its services have since expanded to Japan, Thailand and Taiwan. It is the largest shared charger brand in Hong Kong. chargespotsa officially entered Nigeria on 2022.6.9</p>
                                    </details>
                                    <hr className='mt-2'/>
                                    <details>
                                        <summary>
                                        What does a chargespotsa do?
                                        </summary>
                                        
                                        <p className='text-md font-extralight '>After charges-pot entered Nigeria, in order to make it more convenient for local people to use chargers, so that people's lives and journeys can be fully charged anytime, anywhere, in order to build charging rental stations better and faster, the online platform charges-pots is specially opened, so that people can better participate in it Production, part of the profits obtained after the production of the rental station will be returned to the investor
How to register as a chargespotsa member?
Enter your mobile phone number to register through the invitation code.</p>
                                    </details>
                                    <hr className='mt-2'/>
                                    <details>
                                        <summary>
                                        How to invite subordinates?
                                        </summary>
                                        
                                        <p className='text-md font-extralight '>
Open the team information on the platform, copy the invitation link or invitation code to the invitee to register, the members who register through the invitation code are all members of your team.</p>
                                    </details>
                                    <hr className='mt-2'/>
                                    <details>
                                        <summary>
                                        How to recharge?
                                        </summary>
                                        
                                        <p className='text-md font-extralight '>Open the recharge page of the platform, enter the amount to be recharged, then enter your name, jump to the payment page, and transfer to the receiving account on the payment page. After the transfer is successful, upload the transaction certificate.
</p>
                                    </details>
                                    <hr className='mt-2'/>
                                    <details>
                                        <summary>
                                        How to buy products?
                                        </summary>
                                        
                                        <p className='text-md font-extralight '>Open the platform purchase page and choose the product you want to invest in. The interest will be returned to the member account every day, and the principal will be returned to the member account balance after the production cycle is completed.

</p>
                                    </details>
                                    <hr className='mt-2'/>
                                    <details>
                                        <summary>
                                        How to withdraw money?
                                        </summary>
                                        
                                        <p className='text-md font-extralight '>First of all, you need to bind your personal bank card, and bind it according to the requirements of the platform. Then click Withdraw, enter the withdrawal amount, and the withdrawal will arrive within 72 hours.

</p>
                                    </details>
                                    <hr className='mt-2'/>
                                    
                                    
                                    
                            

                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Precautions