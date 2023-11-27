import React, { useState, useEffect } from 'react';

const PopUp = (props) => {
  const [showAlert, setShowAlert] = useState(true);

//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       setShowAlert(false);
//     }, 10000); // Close the alert after 5 seconds

//     return () => clearTimeout(timeoutId); // Clear the timeout on component unmount
//   }, []);

  return (
    showAlert && (
      <div className="flex flex-col flex-1 items-center rounded-xl bg-[#d5d5d5] p-4 m-4 h-[100%] w-80 z-50" role="alert">
        <p className="font-bold text-center text-xl">Welcome To Chargespots</p>
        <p className='text-center text-md'>loerm ijjsuduhhsdy yguihoids sduhisyygiuhasurui srhioiusos gyoieospguiggagg yagugadhiufuiiuadv
        loerm ijjsuduhhsdy yguihoids sduhisyygiuhasurui srhioiusos gyoieospguiggagg yagugadhiufuiiuadv
        loerm ijjsuduhhsdy yguihoids sduhisyygiuhasurui srhioiusos gyoieospguiggagg yagugadhiufuiiuadv
        loerm ijjsuduhhsdy yguihoids sduhisyygiuhasurui srhioiusos gyoieospguiggagg yagugadhiufuiiuadv
        loerm ijjsuduhhsdy yguihoids sduhisyygiuhasurui srhioiusos gyoieospguiggagg yagugadhiufuiiuadv
        loerm ijjsuduhhsdy yguihoids sduhisyygiuhasurui srhioiusos gyoieospguiggagg yagugadhiufuiiuadv
        loerm ijjsuduhhsdy yguihoids sduhisyygiuhasurui srhioiusos gyoieospguiggagg yagugadhiufuiiuadv
        loerm ijjsuduhhsdy yguihoids sduhisyygiuhasurui srhioiusos gyoieospguiggagg yagugadhiufuiiuadv
        loerm ijjsuduhhsdy yguihoids sduhisyygiuhasurui srhioiusos gyoieospguiggagg yagugadhiufuiiuadv</p>
        < button className="cursor-pointer rounded-md buttom-0 left-0  mx-auto items-center bg-[#efefef] px-4 py-2" onClick={() => setShowAlert(false)}>Close</button>
      </div>
    )
  );
};

export default PopUp;
    ;
