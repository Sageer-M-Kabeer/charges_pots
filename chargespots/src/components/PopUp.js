import React, { useState, useEffect } from 'react';
export default function Modal() {
  const [showModal, setShowModal] = useState(true);

    // setShowModal(true);
 

  return (
    <>

{showModal && (
        <>
        <div
            className="justify-center items-center flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl text-center font-semibold">
                    Announcement
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto  max-h-[300px] overflow-y-auto">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    Welcome to Chages-post, Our company was established in 2017 and settled in Nigeria on December 24, 2023. We signed a 7-year agreement. Our platform is legal and regular.</p>

                              <ul>
                                          <li>1. New user registration bonus: 300NGN.</li>

                                        <li>  2. Invite your friends to invest, and you will immediately get 30% of your friend's investment amount as a referral reward.</li>

                                       <li>   3. Invest 3000NGN, earn 500NGN every day.</li>

                                       <li>   4. Invest 6000NGN, earn 1050NGN every day.</li>

                                        <li>  5. The minimum deposit amount is 3000 NGN. We do not accept deposit orders below 3000 Nigerian Naira. The amount entered here needs to be consistent with the amount you actually paid in order to be credited successfully.</li>
                              </ul>
                              <p className="my-4 text-blueGray-500 text-lg leading-relaxed"> (For example, if you submit an order of 3000 NGN here, you will also need to pay 3000 NGN in real time when making the actual payment) </p>
<ul>
                                        <li>  6. There is no time limit for withdrawal, (7X24h) withdrawals.</li>

                                        <li>  7. There is no limit to the number of daily withdrawals, and you can withdraw multiple times a day.</li>

                                        <li>      8. After purchasing Chages-post product, the income will last for 30 days.</li>
                                          </ul>

                                          For more investment information about Charges-post.

                                          
                  </p>
                </div>
                {/*footer*/}
                <div className='sticky'>
                <div className="flex items-center justify-center flex-col-reverse p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="bg-[#1895b0] rounded-full text-white font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Ok
                  </button>
                  <a href={'https://t.me/Charges_Pots_group'}  rel = "noreferrer" target='_blank'>
                  <button
                    className="bg-[#1895b0] text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Click to join Telegram official channel
                  </button>
                  </a>
                </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
      )}
    </>
  );
}