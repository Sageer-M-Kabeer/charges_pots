import React, { useState, useEffect } from 'react';

const SuccessAlert = (props) => {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowAlert(false);
    }, 10000); // Close the alert after 5 seconds

    return () => clearTimeout(timeoutId); // Clear the timeout on component unmount
  }, []);

  return (
    showAlert && (
      <div className="bg-green-100 border-l-[5px] border-green-500 text-green-700 p-4 relative z-[999]" role="alert">
        <p className="font-bold">{props.title}</p>
        <p>{props.text}</p>
        <span className="cursor-pointer absolute my-auto top-2 right-2" onClick={() => setShowAlert(false)}>
          {/* Close icon (you can replace it with an actual icon component) */}
          &#x2716;
        </span>
      </div>
    )
  );
};

export default SuccessAlert;
