import React, { createContext, useReducer, useContext } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-cycle
import Toast from '../components/Toast';
import '../components/Toast/styles.scss';

export const ToastContext = createContext();

const initialState = [];

export const ADD_TOAST = 'ADD_TOAST';
export const REMOVE_TOAST = 'REMOVE_TOAST';
export const REMOVE_ALL_TOAST = 'REMOVE_ALL_TOAST';

export const toastReducer = (state, action) => {
  switch (action.type) {
    case ADD_TOAST:
      return [
        ...state,
        {
          id: new Date().getTime(),
          type: action.payload.type,
          content: action.payload.content,
          duration: action.payload.duration || null,
        },
      ];
    case REMOVE_TOAST:
      return state.filter((toast) => toast.id !== action.payload.id);
    case REMOVE_ALL_TOAST:
      return initialState;
    default:
      return state;
  }
};

const ToastProvider = ({ children }) => {
  const [toast, toastDispatch] = useReducer(toastReducer, initialState);
  const toastData = { toast, toastDispatch };

  const handleCloseToast = (id) => {
    toastDispatch({ type: REMOVE_TOAST, payload: { id } });
  };

  return (
    <ToastContext.Provider value={toastData}>
      {children}
      {createPortal(
        <Toast toast={toast} onClose={handleCloseToast} />,
        document.body
      )}
    </ToastContext.Provider>
  );
};

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useToastContext = () => useContext(ToastContext);
export default ToastProvider;
