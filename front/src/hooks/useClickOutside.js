import { useEffect } from 'react';

export default function useClickOutside(elRef, callback) {
  useEffect(() => {
    const listener = (e) => {
      if (!elRef?.current || !elRef?.current?.contains(e.target)) {
        callback(e);
      }
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [callback, elRef]);
}
