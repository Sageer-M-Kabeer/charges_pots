import React, { useState, useEffect } from 'react';
import { Telegram } from '@mui/icons-material';
import { RiTelegramFill } from 'react-icons/ri';
export default function Modal() {
  const [showModal, setShowModal] = useState(true);

  return (
    <>

{showModal && (
        <>
        <div
            className="justify-center items-center flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-[80%] my-6 mx-auto max-w-sm">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col flex-1 w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
              
                {/*footer*/}
                <div className='sticky'>
                <div className="flex gap-4 items-center justify-center flex-col-reverse flex-1 p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                    className="bg-[#b01818]  text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>

                  <a href={'https://t.me/Chargerspots'} rel = "noreferrer" target='_blank'>
                  <button
                    className="bg-[#1895b0] flex justify-center items-center gap-2 flex-col h-40 w-40 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    <RiTelegramFill size={120}/>
                    <p>Contact Costomer Service</p>
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