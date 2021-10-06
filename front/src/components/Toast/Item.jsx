/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence, motion } from 'framer-motion';
import {
  IoCheckmarkSharp,
  IoClose,
  IoInformationCircleOutline,
} from 'react-icons/io5';

const transition = { duration: 0.4, ease: [0.6, 0.01, -0.05, 0.9] };

const Item = ({ toast, onClose, duration }) => {
  const toastRef = useRef();

  const renderItem = (content) => {
    if (typeof content === 'function') return content();
    return <p>{content}</p>;
  };

  const renderIcon = (type) => {
    switch (type) {
      case 'success':
        return <IoCheckmarkSharp />;
      case 'info':
        return <IoInformationCircleOutline />;
      case 'error':
        return <IoClose />;
      default:
        return null;
    }
  };

  useEffect(() => {
    let start = toast.duration || duration;
    const timer = setTimeout(() => {
      onClose(toast.id);
    }, toast.duration || duration);

    const interval = setInterval(() => {
      start -= 60;
      const value =
        100 -
        (((toast.duration || duration) - start) * 100) /
          (toast.duration || duration);
      if (toastRef.current)
        toastRef.current.style.setProperty('--beforeWidth', `${value}%`);
    }, 60);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [toast]);

  return (
    <AnimatePresence exitBeforeEnter initial="initial">
      <motion.div
        ref={toastRef}
        initial={{
          x: 500,
          opacity: 0,
        }}
        animate={{
          x: 0,
          opacity: 1,
          transition,
        }}
        exit={{
          x: 500,
          opacity: 0,
          transition,
        }}
        // eslint-disable-next-line react/no-array-index-key
        key={toast.id}
        className={`toast__container__item ${toast.type ? toast.type : ''}`}
      >
        <div className="icon">{renderIcon(toast.type)}</div>
        {renderItem(toast.content)}
        <span
          role="img"
          aria-label="close toast"
          className="toast__close"
          onClick={() => onClose(toast.id)}
        >
          <IoClose />
        </span>
      </motion.div>
    </AnimatePresence>
  );
};

Item.propTypes = {
  toast: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.oneOf(['success', 'error', 'info']),
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    duration: PropTypes.number,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  duration: PropTypes.number.isRequired,
};

export default Item;
