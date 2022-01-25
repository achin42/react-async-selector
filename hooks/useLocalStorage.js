import { useState, useEffect } from "react";

const isBrowser = (() => typeof window !== 'undefined')();

// function to get stored value
function getSavedValue(key, initialValue) {
    if(isBrowser) {
        const savedValue = JSON.parse(localStorage.getItem(key));
        if (savedValue) return savedValue;
        return initialValue;
    } else {
        return null;
    }
}

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    return getSavedValue(key, initialValue);
  });

  useEffect(() => {
    if(isBrowser) localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}

export default useLocalStorage;