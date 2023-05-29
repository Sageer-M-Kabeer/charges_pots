import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
const Popup = (props) =>{
    const [show,setshow] = useState(false);

    const closeHandler = (e) => {
        setshow(false);
        props.onClose(false)
    };

    useEffect( () => {
        setshow(props.show);
    },[props.show]);

    return (
        <div style={{visibility:show ? "visible":"hidden",
        opacity:show ? "1":"0"}} className="hidden opacity-0 fixed top-0 bottom-0 left-0 right-0 bg-[#fff] transition-[opacity,500ms]">
            <div className="m-[70px,auto] p-[20px] bg-white rounded-[5px] w-[30%] relative transition-all duration-[5s] ease-in-out md:w-[70%]">
                <h2 className="mt-0 text-[#333] font-sans">{props.style}</h2>
                <span onClick={closeHandler} className="absolute top-5 right-8 transition-all duration-200 text-[30px] font-sm decoration-0 text-[#333] ">&times;</span>
                <div className="max-w[30%] overflow-auto">
                    {props.children}
                </div>
            </div>

        </div>
    );

};

Popup.propTypes = {
    title:PropTypes.string.isRequired,
    show:PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default Popup
