import React, { useEffect, useState } from 'react'

export default function useLocalStorage(key, initialValue) {

    const [storedValue, setStoredValue] = useState(initialValue);

    useEffect(()=>{
        const item = window.localStorage.getItem(key);
        if (item) {
            setStoredValue(JSON.parse(item))    
        }        
    },[])

    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (value) => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        // Save state
        setStoredValue(valueToStore);
        // Save to local storage
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        // A more advanced implementation would handle the error case
        console.log(error);
      }
    };
    return [storedValue, setValue];
  }