import PropTypes from 'prop-types';
import React, { Component, useEffect, useState } from 'react'

const Popup = (props) => {
    const [isOpen, setIsOpen] = useState(props.trigger);

    useEffect(() => {
        setIsOpen(props.trigger);
    }, [props.trigger]);

    const handleClose = () => {
        setIsOpen(false);
    };

    return isOpen ? (
        <div className='w-[90%] h-[90%] m-auto rounded-xl left-0 right-0 top-[50%] max-w-[100vh]'>
            <div>{props.children}</div>
            <button onClick={handleClose}>Close</button>
        </div>
    ) : null;
};

Popup.propTypes = {
    trigger: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
};

export default Popup;
